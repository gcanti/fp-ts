import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT3S, HKT3As } from './HKT'
import { Monoid, getEndomorphismMonoid, monoidArray } from './Monoid'
import { Applicative } from './Applicative'
import { applyFirst } from './Apply'
import { identity } from './function'

/** @typeclass */
export interface Foldable<F> {
  readonly URI: F
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: HKT<F, A>): B
}

export interface FantasyFoldable<A> {
  reduce<B>(f: (b: B, a: A) => B, b: B): B
}

export interface FoldableComposition<F, G> {
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fga: HKT<F, HKT<G, A>>): B
}

/** @function */
export const getFoldableComposition = <F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G> => {
  return {
    reduce: (f, b, fga) => F.reduce((b, ga) => G.reduce(f, b, ga), b, fga)
  }
}

/**
 * A default implementation of `foldMap` using `foldl`
 * @function
 */
export const foldMap = <F, M>(F: Foldable<F>, M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: HKT<F, A>): M => {
  return F.reduce((acc, x) => M.concat(acc)(f(x)), M.empty(), fa)
}

/** @function */
export const fold = <F, M>(F: Foldable<F>, M: Monoid<M>) => (fa: HKT<F, M>): M => {
  return foldMap(F, M)<M>(identity)(fa)
}

/** @function */
export const toArray = <F>(F: Foldable<F>) => <A>(fa: HKT<F, A>): Array<A> => {
  return foldMap(F, monoidArray)(a => [a])(fa)
}

/**
 * A default implementation of `foldr` using `foldMap`
 * @function
 */
export const foldr = <F>(F: Foldable<F>) => <A, B>(f: (a: A) => (b: B) => B) => (b: B) => (fa: HKT<F, A>): B => {
  return foldMap(F, getEndomorphismMonoid<B>())(f)(fa)(b)
}

type Acc<M> = { init: boolean; acc: M }

/**
 * Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator
 * @function
 */
export const intercalate = <F, M>(F: Foldable<F>, M: Monoid<M>) => (sep: M) => (fm: HKT<F, M>): M => {
  function go({ init, acc }: Acc<M>, x: M): Acc<M> {
    return init ? { init: false, acc: x } : { init: false, acc: M.concat(M.concat(acc)(sep))(x) }
  }
  return F.reduce(go, { init: true, acc: M.empty() }, fm).acc
}

/**
 * Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the final result.
 */
export function traverse_<M extends HKT3S, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <U, L, A, B>(f: (a: A) => HKT3As<M, U, L, B>, fa: HKT<F, A>) => HKT3As<M, U, L, void>
export function traverse_<M extends HKT2S, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <L, A, B>(f: (a: A) => HKT2As<M, L, B>, fa: HKT<F, A>) => HKT2As<M, L, void>
export function traverse_<M extends HKTS, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <A, B>(f: (a: A) => HKTAs<M, B>, fa: HKT<F, A>) => HKTAs<M, void>
export function traverse_<M, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void>
/**
 * Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the final result.
 * @function
 */
export function traverse_<M, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void> {
  return (f, fa) => toArray(F)(fa).reduce((mu, a) => applyFirst(M)(mu)(f(a)), M.of(undefined))
}

/**
 * Perform all of the effects in some data structure in the order given by the `Foldable` instance, ignoring the final result.
 */
export function sequence_<M extends HKT3S, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <U, L, A>(fa: HKT<F, HKT3As<M, U, L, A>>) => HKT3As<M, U, L, void>
export function sequence_<M extends HKT2S, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <L, A>(fa: HKT<F, HKT2As<M, L, A>>) => HKT2As<M, L, void>
export function sequence_<M extends HKTS, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <A>(fa: HKT<F, HKTAs<M, A>>) => HKTAs<M, void>
export function sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>
/**
 * Perform all of the effects in some data structure in the order given by the `Foldable` instance, ignoring the final result.
 * @function
 */
export function sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void> {
  return fa => traverse_(M, F)(ma => ma, fa)
}
