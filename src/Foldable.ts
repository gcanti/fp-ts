import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { applyFirst } from './Apply'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C } from './Monad'
import { Monoid, unsafeMonoidArray } from './Monoid'
import { Option, none, some } from './Option_'
import { Ord, max, min } from './Ord'
import { Plus, Plus1, Plus2, Plus2C, Plus3, Plus3C } from './Plus'
import { Semiring } from './Semiring'
import { Setoid } from './Setoid'
import { Predicate } from './function'

/**
 * Use {@link Foldable2v}
 * @typeclass
 * @since 1.0.0
 * @deprecated
 */
export interface Foldable<F> {
  readonly URI: F
  readonly reduce: <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B) => B
}

export interface Foldable1<F extends URIS> {
  readonly URI: F
  readonly reduce: <A, B>(fa: Type<F, A>, b: B, f: (b: B, a: A) => B) => B
}

export interface Foldable2<F extends URIS2> {
  readonly URI: F
  readonly reduce: <L, A, B>(fa: Type2<F, L, A>, b: B, f: (b: B, a: A) => B) => B
}

export interface Foldable3<F extends URIS3> {
  readonly URI: F
  readonly reduce: <U, L, A, B>(fa: Type3<F, U, L, A>, b: B, f: (b: B, a: A) => B) => B
}

export interface Foldable2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly reduce: <A, B>(fa: Type2<F, L, A>, b: B, f: (b: B, a: A) => B) => B
}

export interface Foldable3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly reduce: <A, B>(fa: Type3<F, U, L, A>, b: B, f: (b: B, a: A) => B) => B
}

export interface FoldableComposition<F, G> {
  readonly reduce: <A, B>(fga: HKT<F, HKT<G, A>>, b: B, f: (b: B, a: A) => B) => B
}

export interface FoldableComposition11<F extends URIS, G extends URIS> {
  readonly reduce: <A, B>(fga: Type<F, Type<G, A>>, b: B, f: (b: B, a: A) => B) => B
}

export interface FoldableComposition12<F extends URIS, G extends URIS2> {
  readonly reduce: <LG, A, B>(fga: Type<F, Type2<G, LG, A>>, b: B, f: (b: B, a: A) => B) => B
}

export interface FoldableComposition12C<F extends URIS, G extends URIS2, LG> {
  readonly reduce: <A, B>(fga: Type<F, Type2<G, LG, A>>, b: B, f: (b: B, a: A) => B) => B
}

export interface FoldableComposition21<F extends URIS2, G extends URIS> {
  readonly reduce: <LF, A, B>(fga: Type2<F, LF, Type<G, A>>, b: B, f: (b: B, a: A) => B) => B
}

export interface FoldableComposition2C1<F extends URIS2, G extends URIS, LF> {
  readonly reduce: <A, B>(fga: Type2<F, LF, Type<G, A>>, b: B, f: (b: B, a: A) => B) => B
}

export interface FoldableComposition22<F extends URIS2, G extends URIS2> {
  readonly reduce: <LF, LG, A, B>(fga: Type2<F, LF, Type2<G, LG, A>>, b: B, f: (b: B, a: A) => B) => B
}

export interface FoldableComposition22C<F extends URIS2, G extends URIS2, LG> {
  readonly reduce: <LF, A, B>(fga: Type2<F, LF, Type2<G, LG, A>>, b: B, f: (b: B, a: A) => B) => B
}

export interface FoldableComposition3C1<F extends URIS3, G extends URIS, UF, LF> {
  readonly reduce: <A, B>(fga: Type3<F, UF, LF, Type<G, A>>, b: B, f: (b: B, a: A) => B) => B
}

/**
 * @since 1.0.0
 */
export function getFoldableComposition<F extends URIS3, G extends URIS, UF, LF>(
  F: Foldable3C<F, UF, LF>,
  G: Foldable1<G>
): FoldableComposition3C1<F, G, UF, LF>
export function getFoldableComposition<F extends URIS2, G extends URIS2, LG>(
  F: Foldable2C<F, LG>,
  G: Foldable2<G>
): FoldableComposition22C<F, G, LG>
export function getFoldableComposition<F extends URIS2, G extends URIS2>(
  F: Foldable2<F>,
  G: Foldable2<G>
): FoldableComposition22<F, G>
export function getFoldableComposition<F extends URIS2, G extends URIS>(
  F: Foldable2<F>,
  G: Foldable1<G>
): FoldableComposition21<F, G>
export function getFoldableComposition<F extends URIS, G extends URIS2>(
  F: Foldable1<F>,
  G: Foldable2<G>
): FoldableComposition12<F, G>
export function getFoldableComposition<F extends URIS, G extends URIS>(
  F: Foldable1<F>,
  G: Foldable1<G>
): FoldableComposition11<F, G>
// tslint:disable-next-line: deprecation
export function getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G>
// tslint:disable-next-line: deprecation
export function getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G> {
  return {
    reduce: (fga, b, f) => F.reduce(fga, b, (b, ga) => G.reduce(ga, b, f))
  }
}

/**
 * A default implementation of `foldMap` using `foldl`.
 * Map each element of the structure to a monoid, and combine the results.
 *
 * @since 1.0.0
 */
export function foldMap<F extends URIS3, M>(
  F: Foldable3<F>,
  M: Monoid<M>
): <U, L, A>(fa: Type3<F, U, L, A>, f: (a: A) => M) => M
export function foldMap<F extends URIS3, M, U, L>(
  F: Foldable3C<F, U, L>,
  M: Monoid<M>
): <A>(fa: Type3<F, U, L, A>, f: (a: A) => M) => M
export function foldMap<F extends URIS2, M>(
  F: Foldable2<F>,
  M: Monoid<M>
): <L, A>(fa: Type2<F, L, A>, f: (a: A) => M) => M
export function foldMap<F extends URIS2, M, L>(
  F: Foldable2C<F, L>,
  M: Monoid<M>
): <A>(fa: Type2<F, L, A>, f: (a: A) => M) => M
export function foldMap<F extends URIS, M>(F: Foldable1<F>, M: Monoid<M>): <A>(fa: Type<F, A>, f: (a: A) => M) => M
// tslint:disable-next-line: deprecation
export function foldMap<F, M>(F: Foldable<F>, M: Monoid<M>): <A>(fa: HKT<F, A>, f: (a: A) => M) => M
// tslint:disable-next-line: deprecation
export function foldMap<F, M>(F: Foldable<F>, M: Monoid<M>): <A>(fa: HKT<F, A>, f: (a: A) => M) => M {
  return (fa, f) => F.reduce(fa, M.empty, (acc, x) => M.concat(acc, f(x)))
}

/**
 * A default implementation of `foldr` using `foldMap`
 *
 * @since 1.0.0
 */
export function foldr<F extends URIS3>(
  F: Foldable3<F>
): <U, L, A, B>(fa: Type3<F, U, L, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F extends URIS3, U, L>(
  F: Foldable3C<F, U, L>
): <A, B>(fa: Type3<F, U, L, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F extends URIS2>(F: Foldable2<F>): <L, A, B>(fa: Type2<F, L, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F extends URIS2, L>(
  F: Foldable2C<F, L>
): <A, B>(fa: Type2<F, L, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F extends URIS>(F: Foldable1<F>): <A, B>(fa: Type<F, A>, b: B, f: (a: A, b: B) => B) => B
// tslint:disable-next-line: deprecation
export function foldr<F>(F: Foldable<F>): <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B
// tslint:disable-next-line: deprecation
export function foldr<F>(F: Foldable<F>): <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B {
  const toArrayF = toArray(F)
  return (fa, b, f) => toArrayF(fa).reduceRight((acc, a) => f(a, acc), b)
}

/**
 * @since 1.0.0
 */
export function fold<F extends URIS3, M>(F: Foldable3<F>, M: Monoid<M>): <U, L>(fa: Type3<F, U, L, M>) => M
export function fold<F extends URIS3, M, U, L>(F: Foldable3C<F, U, L>, M: Monoid<M>): (fa: Type3<F, U, L, M>) => M
export function fold<F extends URIS2, M>(F: Foldable2<F>, M: Monoid<M>): <L>(fa: Type2<F, L, M>) => M
export function fold<F extends URIS2, M, L>(F: Foldable2C<F, L>, M: Monoid<M>): (fa: Type2<F, L, M>) => M
export function fold<F extends URIS, M>(F: Foldable1<F>, M: Monoid<M>): (fa: Type<F, M>) => M
// tslint:disable-next-line: deprecation
export function fold<F, M>(F: Foldable<F>, M: Monoid<M>): (fa: HKT<F, M>) => M
// tslint:disable-next-line: deprecation
export function fold<F, M>(F: Foldable<F>, M: Monoid<M>): (fa: HKT<F, M>) => M {
  return fa => F.reduce(fa, M.empty, M.concat)
}

/**
 * Similar to 'reduce', but the result is encapsulated in a monad.
 *
 * Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.
 *
 * @since 1.0.0
 */
export function foldM<F extends URIS, M extends URIS3>(
  F: Foldable1<F>,
  M: Monad3<M>
): <U, L, A, B>(f: (b: B, a: A) => Type3<M, U, L, B>, b: B, fa: Type<F, A>) => Type3<M, U, L, B>
export function foldM<F extends URIS, M extends URIS3, U, L>(
  F: Foldable1<F>,
  M: Monad3C<M, U, L>
): <A, B>(f: (b: B, a: A) => Type3<M, U, L, B>, b: B, fa: Type<F, A>) => Type3<M, U, L, B>
export function foldM<F extends URIS, M extends URIS2>(
  F: Foldable1<F>,
  M: Monad2<M>
): <L, A, B>(f: (b: B, a: A) => Type2<M, L, B>, b: B, fa: Type<F, A>) => Type2<M, L, B>
export function foldM<F extends URIS, M extends URIS2, L>(
  F: Foldable1<F>,
  M: Monad2C<M, L>
): <A, B>(f: (b: B, a: A) => Type2<M, L, B>, b: B, fa: Type<F, A>) => Type2<M, L, B>
export function foldM<F extends URIS, M extends URIS>(
  F: Foldable1<F>,
  M: Monad1<M>
): <A, B>(f: (b: B, a: A) => Type<M, B>, b: B, fa: Type<F, A>) => Type<M, B>
export function foldM<F, M>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>,
  M: Monad<M>
): <A, B>(f: (b: B, a: A) => HKT<M, B>, b: B, fa: HKT<F, A>) => HKT<M, B>
export function foldM<F, M>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>,
  M: Monad<M>
): <A, B>(f: (b: B, a: A) => HKT<M, B>, b: B, fa: HKT<F, A>) => HKT<M, B> {
  return (f, b, fa) => F.reduce(fa, M.of(b), (mb, a) => M.chain(mb, b => f(b, a)))
}

/**
 * Use {@link traverse}
 *
 * @since 1.0.0
 * @deprecated
 */
export function traverse_<M extends URIS3, F extends URIS>(
  M: Applicative3<M>,
  F: Foldable1<F>
): <U, L, A, B>(f: (a: A) => Type3<M, U, L, B>, fa: Type<F, A>) => Type3<M, U, L, void>
export function traverse_<M extends URIS3, F extends URIS, U, L>(
  M: Applicative3C<M, U, L>,
  F: Foldable1<F>
): <A, B>(f: (a: A) => Type3<M, U, L, B>, fa: Type<F, A>) => Type3<M, U, L, void>
export function traverse_<M extends URIS2, F extends URIS>(
  M: Applicative2<M>,
  F: Foldable1<F>
): <L, A, B>(f: (a: A) => Type2<M, L, B>, fa: Type<F, A>) => Type2<M, L, void>
export function traverse_<M extends URIS2, F extends URIS, L>(
  M: Applicative2C<M, L>,
  F: Foldable1<F>
): <A, B>(f: (a: A) => Type2<M, L, B>, fa: Type<F, A>) => Type2<M, L, void>
export function traverse_<M extends URIS, F extends URIS>(
  M: Applicative1<M>,
  F: Foldable1<F>
): <A, B>(f: (a: A) => Type<M, B>, fa: Type<F, A>) => Type<M, void>
export function traverse_<M, F>(
  M: Applicative<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void>
export function traverse_<M, F>(
  M: Applicative<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void> {
  const toArrayF = toArray(F)
  const applyFirstM = applyFirst(M)
  const initialValue = M.of(undefined)
  return (f, fa) => toArrayF(fa).reduce((mu, a) => applyFirstM(mu, f(a)), initialValue)
}

/**
 * Perform all of the effects in some data structure in the order given by the `Foldable` instance, ignoring the final result.
 *
 * @since 1.0.0
 */
export function sequence_<M extends URIS3, F extends URIS>(
  M: Applicative3<M>,
  F: Foldable1<F>
): <U, L, A>(fa: Type<F, Type3<M, U, L, A>>) => Type3<M, U, L, void>
export function sequence_<M extends URIS3, F extends URIS, U, L>(
  M: Applicative3C<M, U, L>,
  F: Foldable1<F>
): <A>(fa: Type<F, Type3<M, U, L, A>>) => Type3<M, U, L, void>
export function sequence_<M extends URIS2, F extends URIS>(
  M: Applicative2<M>,
  F: Foldable1<F>
): <L, A>(fa: Type<F, Type2<M, L, A>>) => Type2<M, L, void>
export function sequence_<M extends URIS2, F extends URIS, L>(
  M: Applicative2C<M, L>,
  F: Foldable1<F>
): <A>(fa: Type<F, Type2<M, L, A>>) => Type2<M, L, void>
export function sequence_<M extends URIS, F extends URIS>(
  M: Applicative1<M>,
  F: Foldable1<F>
): <A>(fa: Type<F, Type<M, A>>) => Type<M, void>
// tslint:disable-next-line: deprecation
export function sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>
// tslint:disable-next-line: deprecation
export function sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void> {
  const traverse_MF = traverse_(M, F)
  return fa => traverse_MF(ma => ma, fa)
}

/**
 * Combines a collection of elements using the `Alt` operation
 *
 * @since 1.0.0
 */
export function oneOf<F extends URIS, P extends URIS3>(
  F: Foldable1<F>,
  P: Plus3<P>
): <U, L, A>(fga: Type<F, Type3<P, U, L, A>>) => Type3<P, U, L, A>
export function oneOf<F extends URIS, P extends URIS3, U, L>(
  F: Foldable1<F>,
  P: Plus3C<P, U, L>
): <A>(fga: Type<F, Type3<P, U, L, A>>) => Type3<P, U, L, A>
export function oneOf<F extends URIS, P extends URIS2>(
  F: Foldable1<F>,
  P: Plus2<P>
): <L, A>(fga: Type<F, Type2<P, L, A>>) => Type2<P, L, A>
export function oneOf<F extends URIS, P extends URIS2, L>(
  F: Foldable1<F>,
  P: Plus2C<P, L>
): <A>(fga: Type<F, Type2<P, L, A>>) => Type2<P, L, A>
export function oneOf<F extends URIS, P extends URIS>(
  F: Foldable1<F>,
  P: Plus1<P>
): <A>(fga: Type<F, Type<P, A>>) => Type<P, A>
// tslint:disable-next-line: deprecation
export function oneOf<F, P>(F: Foldable<F>, P: Plus<P>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A>
// tslint:disable-next-line: deprecation
export function oneOf<F, P>(F: Foldable<F>, P: Plus<P>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A> {
  return fga => F.reduce(fga, P.zero(), (acc, a) => P.alt(acc, a))
}

type Acc<M> = { init: boolean; acc: M }

/**
 * Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator
 *
 * @since 1.0.0
 */
export function intercalate<F extends URIS3, M>(
  F: Foldable3<F>,
  M: Monoid<M>
): (sep: M) => <U, L>(fm: Type3<F, U, L, M>) => M
export function intercalate<F extends URIS3, M, U, L>(
  F: Foldable3C<F, U, L>,
  M: Monoid<M>
): (sep: M) => (fm: Type3<F, U, L, M>) => M
export function intercalate<F extends URIS2, M>(F: Foldable2<F>, M: Monoid<M>): (sep: M) => <L>(fm: Type2<F, L, M>) => M
export function intercalate<F extends URIS2, M, L>(
  F: Foldable2C<F, L>,
  M: Monoid<M>
): (sep: M) => (fm: Type2<F, L, M>) => M
export function intercalate<F extends URIS, M>(F: Foldable1<F>, M: Monoid<M>): (sep: M) => (fm: Type<F, M>) => M
// tslint:disable-next-line: deprecation
export function intercalate<F, M>(F: Foldable<F>, M: Monoid<M>): (sep: M) => (fm: HKT<F, M>) => M
// tslint:disable-next-line: deprecation
export function intercalate<F, M>(F: Foldable<F>, M: Monoid<M>): (sep: M) => (fm: HKT<F, M>) => M {
  return sep => {
    function go({ init, acc }: Acc<M>, x: M): Acc<M> {
      return init ? { init: false, acc: x } : { init: false, acc: M.concat(M.concat(acc, sep), x) }
    }
    return fm => F.reduce(fm, { init: true, acc: M.empty }, go).acc
  }
}

/**
 * Find the sum of the numeric values in a data structure
 *
 * @since 1.0.0
 */
export function sum<F extends URIS3, A>(F: Foldable3<F>, S: Semiring<A>): <U, L>(fa: Type3<F, U, L, A>) => A
export function sum<F extends URIS3, A, U, L>(F: Foldable3C<F, U, L>, S: Semiring<A>): (fa: Type3<F, U, L, A>) => A
export function sum<F extends URIS2, A>(F: Foldable2<F>, S: Semiring<A>): <L>(fa: Type2<F, L, A>) => A
export function sum<F extends URIS2, A, L>(F: Foldable2C<F, L>, S: Semiring<A>): (fa: Type2<F, L, A>) => A
export function sum<F extends URIS, A>(F: Foldable1<F>, S: Semiring<A>): (fa: Type<F, A>) => A
// tslint:disable-next-line: deprecation
export function sum<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A
// tslint:disable-next-line: deprecation
export function sum<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A {
  return fa => F.reduce(fa, S.zero, (b, a) => S.add(b, a))
}

/**
 * Find the product of the numeric values in a data structure
 *
 * @since 1.0.0
 */
export function product<F extends URIS3, A>(F: Foldable3<F>, S: Semiring<A>): <U, L>(fa: Type3<F, U, L, A>) => A
export function product<F extends URIS3, A, U, L>(F: Foldable3C<F, U, L>, S: Semiring<A>): (fa: Type3<F, U, L, A>) => A
export function product<F extends URIS2, A>(F: Foldable2<F>, S: Semiring<A>): <L>(fa: Type2<F, L, A>) => A
export function product<F extends URIS2, A, L>(F: Foldable2C<F, L>, S: Semiring<A>): (fa: Type2<F, L, A>) => A
export function product<F extends URIS, A>(F: Foldable1<F>, S: Semiring<A>): (fa: Type<F, A>) => A
// tslint:disable-next-line: deprecation
export function product<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A
// tslint:disable-next-line: deprecation
export function product<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A {
  return fa => F.reduce(fa, S.one, (b, a) => S.mul(b, a))
}

/**
 * Test whether a value is an element of a data structure
 *
 * @since 1.0.0
 */
export function elem<F extends URIS3, A>(F: Foldable3<F>, S: Setoid<A>): <U, L>(a: A, fa: Type3<F, U, L, A>) => boolean
export function elem<F extends URIS3, A, U, L>(
  F: Foldable3C<F, U, L>,
  S: Setoid<A>
): (a: A, fa: Type3<F, U, L, A>) => boolean
export function elem<F extends URIS2, A>(F: Foldable2<F>, S: Setoid<A>): <L>(a: A, fa: Type2<F, L, A>) => boolean
export function elem<F extends URIS2, A, L>(F: Foldable2C<F, L>, S: Setoid<A>): (a: A, fa: Type2<F, L, A>) => boolean
export function elem<F extends URIS, A>(F: Foldable1<F>, S: Setoid<A>): (a: A, fa: Type<F, A>) => boolean
// tslint:disable-next-line: deprecation
export function elem<F, A>(F: Foldable<F>, S: Setoid<A>): (a: A, fa: HKT<F, A>) => boolean
// tslint:disable-next-line: deprecation
export function elem<F, A>(F: Foldable<F>, S: Setoid<A>): (a: A, fa: HKT<F, A>) => boolean {
  return (a, fa) => F.reduce<A, boolean>(fa, false, (b, x) => b || S.equals(x, a))
}

/**
 * Try to find an element in a data structure which satisfies a predicate
 *
 * @since 1.0.0
 */
export function find<F extends URIS3>(F: Foldable3<F>): <U, L, A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Option<A>
export function find<F extends URIS3, U, L>(
  F: Foldable3C<F, U, L>
): <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Option<A>
export function find<F extends URIS2>(F: Foldable2<F>): <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Option<A>
export function find<F extends URIS2, L>(F: Foldable2C<F, L>): <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Option<A>
export function find<F extends URIS>(F: Foldable1<F>): <A>(fa: Type<F, A>, p: Predicate<A>) => Option<A>
// tslint:disable-next-line: deprecation
export function find<F>(F: Foldable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A>
// tslint:disable-next-line: deprecation
export function find<F>(F: Foldable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A> {
  return <A>(fa: HKT<F, A>, p: Predicate<A>) =>
    F.reduce<A, Option<A>>(fa, none, (b, a) => {
      if (b.isNone() && p(a)) {
        return some(a)
      } else {
        return b
      }
    })
}

/**
 * Find the smallest element of a structure, according to its `Ord` instance
 *
 * @since 1.0.0
 */
export function minimum<F extends URIS3, A>(F: Foldable3<F>, O: Ord<A>): <U, L>(fa: Type3<F, U, L, A>) => Option<A>
export function minimum<F extends URIS3, A, U, L>(
  F: Foldable3C<F, U, L>,
  O: Ord<A>
): (fa: Type3<F, U, L, A>) => Option<A>
export function minimum<F extends URIS2, A>(F: Foldable2<F>, O: Ord<A>): <L>(fa: Type2<F, L, A>) => Option<A>
export function minimum<F extends URIS2, A, L>(F: Foldable2C<F, L>, O: Ord<A>): (fa: Type2<F, L, A>) => Option<A>
export function minimum<F extends URIS, A>(F: Foldable1<F>, O: Ord<A>): (fa: Type<F, A>) => Option<A>
// tslint:disable-next-line: deprecation
export function minimum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A>
// tslint:disable-next-line: deprecation
export function minimum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A> {
  const minO = min(O)
  return fa => F.reduce(fa, none, (b: Option<A>, a) => (b.isNone() ? some(a) : some(minO(b.value, a))))
}

/**
 * Find the largest element of a structure, according to its `Ord` instance
 *
 * @since 1.0.0
 */
export function maximum<F extends URIS3, A>(F: Foldable3<F>, O: Ord<A>): <U, L>(fa: Type3<F, U, L, A>) => Option<A>
export function maximum<F extends URIS3, A, U, L>(
  F: Foldable3C<F, U, L>,
  O: Ord<A>
): (fa: Type3<F, U, L, A>) => Option<A>
export function maximum<F extends URIS2, A>(F: Foldable2<F>, O: Ord<A>): <L>(fa: Type2<F, L, A>) => Option<A>
export function maximum<F extends URIS2, A, L>(F: Foldable2C<F, L>, O: Ord<A>): (fa: Type2<F, L, A>) => Option<A>
export function maximum<F extends URIS, A>(F: Foldable1<F>, O: Ord<A>): (fa: Type<F, A>) => Option<A>
// tslint:disable-next-line: deprecation
export function maximum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A>
// tslint:disable-next-line: deprecation
export function maximum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A> {
  const maxO = max(O)
  return fa => F.reduce(fa, none, (b: Option<A>, a) => (b.isNone() ? some(a) : some(maxO(b.value, a))))
}

/**
 * @since 1.0.0
 */
export function toArray<F extends URIS3>(F: Foldable3<F>): <U, L, A>(fa: Type3<F, U, L, A>) => Array<A>
export function toArray<F extends URIS3, U, L>(F: Foldable3C<F, U, L>): <A>(fa: Type3<F, U, L, A>) => Array<A>
export function toArray<F extends URIS2>(F: Foldable2<F>): <L, A>(fa: Type2<F, L, A>) => Array<A>
export function toArray<F extends URIS2, L>(F: Foldable2C<F, L>): <A>(fa: Type2<F, L, A>) => Array<A>
export function toArray<F extends URIS>(F: Foldable1<F>): <A>(fa: Type<F, A>) => Array<A>
// tslint:disable-next-line: deprecation
export function toArray<F>(F: Foldable<F>): <A>(fa: HKT<F, A>) => Array<A>
// tslint:disable-next-line: deprecation
export function toArray<F>(F: Foldable<F>): <A>(fa: HKT<F, A>) => Array<A> {
  const foldMapF = foldMap(F, unsafeMonoidArray)
  return fa => foldMapF(fa, a => [a])
}

/**
 * Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the
 * final result.
 *
 * @since 1.7.0
 */
export function traverse<M extends URIS3, F extends URIS>(
  M: Applicative3<M>,
  F: Foldable1<F>
): <U, L, A, B>(fa: Type<F, A>, f: (a: A) => Type3<M, U, L, B>) => Type3<M, U, L, void>
export function traverse<M extends URIS3, F extends URIS, U, L>(
  M: Applicative3C<M, U, L>,
  F: Foldable1<F>
): <A, B>(fa: Type<F, A>, f: (a: A) => Type3<M, U, L, B>) => Type3<M, U, L, void>
export function traverse<M extends URIS2, F extends URIS>(
  M: Applicative2<M>,
  F: Foldable1<F>
): <L, A, B>(fa: Type<F, A>, f: (a: A) => Type2<M, L, B>) => Type2<M, L, void>
export function traverse<M extends URIS2, F extends URIS, L>(
  M: Applicative2C<M, L>,
  F: Foldable1<F>
): <A, B>(fa: Type<F, A>, f: (a: A) => Type2<M, L, B>) => Type2<M, L, void>
export function traverse<M extends URIS, F extends URIS>(
  M: Applicative1<M>,
  F: Foldable1<F>
): <A, B>(fa: Type<F, A>, f: (a: A) => Type<M, B>) => Type<M, void>
export function traverse<M, F>(
  M: Applicative<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void>
export function traverse<M, F>(
  M: Applicative<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void> {
  const traverseMF = traverse_(M, F)
  return (fa, f) => traverseMF(f, fa)
}
