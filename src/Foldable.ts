import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT3S, HKT3As } from './HKT'
import { Monoid, getEndomorphismMonoid, unsafeMonoidArray } from './Monoid'
import { Applicative } from './Applicative'
import { applyFirst } from './Apply'
import { identity, Predicate } from './function'
import { Ord, min, max } from './Ord'
import { Option, none, some } from './Option'
import { Semiring } from './Semiring'
import { Monad } from './Monad'
import { Plus } from './Plus'
import { Setoid } from './Setoid'

/** @typeclass */
export interface Foldable<F> {
  readonly URI: F
  reduce<A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B): B
}

export interface FoldableComposition<F, G> {
  reduce<A, B>(fga: HKT<F, HKT<G, A>>, b: B, f: (b: B, a: A) => B): B
}

/** @function */
export const getFoldableComposition = <F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G> => {
  return {
    reduce: (fga, b, f) => F.reduce(fga, b, (b, ga) => G.reduce(ga, b, f))
  }
}

/**
 * A default implementation of `foldMap` using `foldl`
 * @function
 */
export const foldMap = <F, M>(F: Foldable<F>, M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: HKT<F, A>): M => {
  return F.reduce(fa, M.empty(), (acc, x) => M.concat(acc)(f(x)))
}

/**
 * A default implementation of `foldr` using `foldMap`
 * @function
 */
export const foldr = <F>(F: Foldable<F>) => <A, B>(f: (a: A) => (b: B) => B) => (b: B) => (fa: HKT<F, A>): B => {
  return foldMap(F, getEndomorphismMonoid<B>())(f)(fa)(b)
}

/** @function */
export const fold = <F, M>(F: Foldable<F>, M: Monoid<M>) => (fa: HKT<F, M>): M => {
  return foldMap(F, M)<M>(identity)(fa)
}

/**
 * Similar to 'reduce', but the result is encapsulated in a monad.
 *
 * Note: this function is not generally stack-safe, e.g., for monads which
 * build up thunks a la `IO`.
 */
export function foldM<F, M extends HKT3S>(
  F: Foldable<F>,
  M: Monad<M>
): <U, L, A, B>(f: (b: B, a: A) => HKT3As<M, U, L, B>, b: B, fa: HKT<F, A>) => HKT3As<M, U, L, B>
export function foldM<F, M extends HKT2S>(
  F: Foldable<F>,
  M: Monad<M>
): <L, A, B>(f: (b: B, a: A) => HKT2As<M, L, B>, b: B, fa: HKT<F, A>) => HKT2As<M, L, B>
export function foldM<F, M extends HKTS>(
  F: Foldable<F>,
  M: Monad<M>
): <A, B>(f: (b: B, a: A) => HKTAs<M, B>, b: B, fa: HKT<F, A>) => HKTAs<M, B>
export function foldM<F, M>(
  F: Foldable<F>,
  M: Monad<M>
): <A, B>(f: (b: B, a: A) => HKT<M, B>, b: B, fa: HKT<F, A>) => HKT<M, B>
/**
 * Similar to 'reduce', but the result is encapsulated in a monad.
 *
 * Note: this function is not generally stack-safe, e.g., for monads which
 * build up thunks a la `IO`.
 * @function
 */
export function foldM<F, M>(
  F: Foldable<F>,
  M: Monad<M>
): <A, B>(f: (b: B, a: A) => HKT<M, B>, b: B, fa: HKT<F, A>) => HKT<M, B> {
  return (f, b, fa) => F.reduce(fa, M.of(b), (mb, a) => M.chain(mb, b => f(b, a)))
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

/**
 * Combines a collection of elements using the `Alt` operation
 */
export function oneOf<F, P extends HKT3S>(
  F: Foldable<F>,
  P: Plus<P>
): <U, L, A>(fga: HKT<F, HKT3As<P, U, L, A>>) => HKT3As<P, U, L, A>
export function oneOf<F, P extends HKT2S>(
  F: Foldable<F>,
  P: Plus<P>
): <L, A>(fga: HKT<F, HKT2As<P, L, A>>) => HKT2As<P, L, A>
export function oneOf<F, P extends HKTS>(F: Foldable<F>, P: Plus<P>): <A>(fga: HKT<F, HKTAs<P, A>>) => HKTAs<P, A>
export function oneOf<F, P>(F: Foldable<F>, P: Plus<P>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A>
export function oneOf<F, P>(F: Foldable<F>, P: Plus<P>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A> {
  return foldr(F)((a: HKT<P, any>) => (b: HKT<P, any>) => P.alt(a, b))(P.zero())
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
  return F.reduce(fm, { init: true, acc: M.empty() }, go).acc
}

/**
 * Find the sum of the numeric values in a data structure
 * @function
 */
export const sum = <F, A>(F: Foldable<F>, S: Semiring<A>) => (fa: HKT<F, A>): A => {
  return F.reduce(fa, S.zero(), (b, a) => S.add(b)(a))
}

/**
 * Find the product of the numeric values in a data structure
 * @function
 */
export const product = <F, A>(F: Foldable<F>, S: Semiring<A>) => (fa: HKT<F, A>): A => {
  return F.reduce(fa, S.one(), (b, a) => S.mul(b)(a))
}

/**
 * Test whether a value is an element of a data structure
 * @function
 */
export const elem = <F, A>(F: Foldable<F>, S: Setoid<A>) => (a: A) => (fa: HKT<F, A>): boolean => {
  return F.reduce(fa, false, (b, x) => b || S.equals(x, a))
}

/**
 * Try to find an element in a data structure which satisfies a predicate
 * @function
 */
export const find = <F>(F: Foldable<F>) => <A>(p: Predicate<A>) => (fa: HKT<F, A>): Option<A> => {
  return F.reduce(fa, none, (b: Option<A>, a) => {
    if (b.isNone() && p(a)) {
      return some(a)
    } else {
      return b
    }
  })
}

/**
 * Find the smallest element of a structure, according to its `Ord` instance
 * @function
 */
export const minimum = <F, A>(F: Foldable<F>, O: Ord<A>) => (fa: HKT<F, A>): Option<A> => {
  const min_ = min(O)
  return F.reduce(fa, none, (b: Option<A>, a) => b.fold(() => some(a), b => some(min_(b)(a))))
}

/**
 * Find the largest element of a structure, according to its `Ord` instance
 * @function
 */
export const maximum = <F, A>(F: Foldable<F>, O: Ord<A>) => (fa: HKT<F, A>): Option<A> => {
  const max_ = max(O)
  return F.reduce(fa, none, (b: Option<A>, a) => b.fold(() => some(a), b => some(max_(b)(a))))
}

/** @function */
export const toArray = <F>(F: Foldable<F>): (<A>(fa: HKT<F, A>) => Array<A>) => {
  return foldMap(F, unsafeMonoidArray)(a => [a])
}
