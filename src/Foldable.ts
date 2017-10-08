import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT3S, HKT3As } from './HKT'
import { Monoid, getEndomorphismMonoid, monoidArray } from './Monoid'
import { Applicative } from './Applicative'
import { applyFirst } from './Apply'
import { identity } from './function'

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

export const getFoldableComposition = <F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G> => {
  return {
    reduce: (f, b, fga) => F.reduce((b, ga) => G.reduce(f, b, ga), b, fga)
  }
}

/** A default implementation of `foldMap` using `foldl`. */
export const foldMap = <F, M>(F: Foldable<F>, M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: HKT<F, A>): M =>
  F.reduce((acc, x) => M.concat(acc)(f(x)), M.empty(), fa)

export const fold = <F, M>(F: Foldable<F>, M: Monoid<M>) => (fa: HKT<F, M>): M => foldMap(F, M)<M>(identity)(fa)

export const toArray = <F>(F: Foldable<F>) => <A>(fa: HKT<F, A>): Array<A> => foldMap(F, monoidArray)(a => [a])(fa)

/** A default implementation of `foldr` using `foldMap` */
export const foldr = <F>(F: Foldable<F>) => <A, B>(f: (a: A) => (b: B) => B) => (b: B) => (fa: HKT<F, A>): B =>
  foldMap(F, getEndomorphismMonoid<B>())(f)(fa)(b)

type Acc<M> = { init: boolean; acc: M }

/**
 * Fold a data structure, accumulating values in some `Monoid`,
 * combining adjacent elements using the specified separator
 */
export const intercalate = <F, M>(F: Foldable<F>, M: Monoid<M>) => (sep: M) => (fm: HKT<F, M>): M => {
  function go({ init, acc }: Acc<M>, x: M): Acc<M> {
    return init ? { init: false, acc: x } : { init: false, acc: M.concat(M.concat(acc)(sep))(x) }
  }
  return F.reduce(go, { init: true, acc: M.empty() }, fm).acc
}

export class Ops {
  /**
   * Traverse a data structure, performing some effects encoded by an
   * `Applicative` functor at each value, ignoring the final result.
   */
  traverse_<M extends HKT3S, F>(
    M: Applicative<M>,
    F: Foldable<F>
  ): <U, L, A, B>(f: (a: A) => HKT3As<M, U, L, B>, fa: HKT<F, A>) => HKT3As<M, U, L, void>
  traverse_<M extends HKT2S, F>(
    M: Applicative<M>,
    F: Foldable<F>
  ): <L, A, B>(f: (a: A) => HKT2As<M, L, B>, fa: HKT<F, A>) => HKT2As<M, L, void>
  traverse_<M extends HKTS, F>(
    M: Applicative<M>,
    F: Foldable<F>
  ): <A, B>(f: (a: A) => HKTAs<M, B>, fa: HKT<F, A>) => HKTAs<M, void>
  traverse_<M, F>(M: Applicative<M>, F: Foldable<F>): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void>
  traverse_<M, F>(M: Applicative<M>, F: Foldable<F>): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void> {
    return (f, fa) => toArray(F)(fa).reduce((mu, a) => applyFirst(M)(mu)(f(a)), M.of(undefined))
  }

  /**
   * Perform all of the effects in some data structure in the order
   * given by the `Foldable` instance, ignoring the final result.
   */
  sequence_<M extends HKT3S, F>(
    M: Applicative<M>,
    F: Foldable<F>
  ): <U, L, A>(fa: HKT<F, HKT3As<M, U, L, A>>) => HKT3As<M, U, L, void>
  sequence_<M extends HKT2S, F>(
    M: Applicative<M>,
    F: Foldable<F>
  ): <L, A>(fa: HKT<F, HKT2As<M, L, A>>) => HKT2As<M, L, void>
  sequence_<M extends HKTS, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKTAs<M, A>>) => HKTAs<M, void>
  sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>
  sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void> {
    return fa => this.traverse_(M, F)(ma => ma, fa)
  }
}

const ops = new Ops()
export const traverse_: Ops['traverse_'] = ops.traverse_
export const sequence_: Ops['sequence_'] = ops.sequence_
