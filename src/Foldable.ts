/**
 * @since 3.0.0
 */
import { flow, pipe } from './function'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C, Monad4 } from './Monad'
import { Monoid } from './Monoid'

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Foldable<F> {
  readonly URI?: F
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: HKT<F, A>) => B
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Foldable1<F extends URIS> {
  readonly URI?: F
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: Kind<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Kind<F, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: Kind<F, A>) => B
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Foldable2<F extends URIS2> {
  readonly URI?: F
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <E>(fa: Kind2<F, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Kind2<F, E, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <E>(fa: Kind2<F, E, A>) => B
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Foldable2C<F extends URIS2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: Kind2<F, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Kind2<F, E, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: Kind2<F, E, A>) => B
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Foldable3<F extends URIS3> {
  readonly URI?: F
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <R, E>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Foldable3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <R>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <R>(fa: Kind3<F, R, E, A>) => B
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Foldable4<F extends URIS4> {
  readonly URI?: F
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
}

/**
 * Similar to 'reduce', but the result is encapsulated in a monad.
 *
 * Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.
 *
 * @example
 * import { reduceM } from 'fp-ts/Foldable'
 * import { Monad, some } from 'fp-ts/Option'
 * import { make, Foldable } from 'fp-ts/Tree'
 * import { pipe } from 'fp-ts/function'
 *
 * const t = make(1, [make(2, []), make(3, []), make(4, [])])
 * assert.deepStrictEqual(pipe(t, reduceM(Foldable)(Monad)(0, (b, a) => (a > 2 ? some(b + a) : some(b)))), some(7))
 *
 * @since 3.0.0
 */
export function reduceM<F extends URIS>(
  F: Foldable1<F>
): {
  <M extends URIS4>(M: Monad4<M>): <B, A, S, R, E>(
    b: B,
    f: (b: B, a: A) => Kind4<M, S, R, E, B>
  ) => (fa: Kind<F, A>) => Kind4<M, S, R, E, B>
  <M extends URIS3>(M: Monad3<M>): <B, A, R, E>(
    b: B,
    f: (b: B, a: A) => Kind3<M, R, E, B>
  ) => (fa: Kind<F, A>) => Kind3<M, R, E, B>
  <M extends URIS3, E>(M: Monad3C<M, E>): <B, A, R>(
    b: B,
    f: (b: B, a: A) => Kind3<M, R, E, B>
  ) => (fa: Kind<F, A>) => Kind3<M, R, E, B>
  <M extends URIS2>(M: Monad2<M>): <B, A, E>(
    b: B,
    f: (b: B, a: A) => Kind2<M, E, B>
  ) => (fa: Kind<F, A>) => Kind2<M, E, B>
  <M extends URIS2, E>(M: Monad2C<M, E>): <B, A>(
    b: B,
    f: (b: B, a: A) => Kind2<M, E, B>
  ) => (fa: Kind<F, A>) => Kind2<M, E, B>
  <M extends URIS>(M: Monad1<M>): <B, A>(b: B, f: (b: B, a: A) => Kind<M, B>) => (fa: Kind<F, A>) => Kind<M, B>
}
export function reduceM<F>(
  F: Foldable<F>
): <M>(M: Monad<M>) => <B, A>(b: B, f: (b: B, a: A) => HKT<M, B>) => (fa: HKT<F, A>) => HKT<M, B>
export function reduceM<F>(
  F: Foldable<F>
): <M>(M: Monad<M>) => <B, A>(b: B, f: (b: B, a: A) => HKT<M, B>) => (fa: HKT<F, A>) => HKT<M, B> {
  return (M) => (b, f) =>
    F.reduce(M.of(b), (mb, a) =>
      pipe(
        mb,
        M.chain((b) => f(b, a))
      )
    )
}

/**
 * Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator.
 *
 * @example
 * import { intercalate } from 'fp-ts/Foldable'
 * import { Monoid } from 'fp-ts/string'
 * import * as T from 'fp-ts/Tree'
 * import { pipe } from 'fp-ts/function'
 *
 * const t = T.make('a', [T.make('b', []), T.make('c', []), T.make('d', [])])
 * assert.strictEqual(pipe(t, intercalate(T.Foldable)(Monoid)('|')), 'a|b|c|d')
 *
 * @since 3.0.0
 */
export function intercalate<F extends URIS4>(
  F: Foldable4<F>
): <M>(M: Monoid<M>) => (sep: M) => <S, R, E>(fm: Kind4<F, S, R, E, M>) => M
export function intercalate<F extends URIS3>(
  F: Foldable3<F>
): <M>(M: Monoid<M>) => (sep: M) => <R, E>(fm: Kind3<F, R, E, M>) => M
export function intercalate<F extends URIS3, E>(
  F: Foldable3C<F, E>
): <M>(M: Monoid<M>) => (sep: M) => <R>(fm: Kind3<F, R, E, M>) => M
export function intercalate<F extends URIS2>(
  F: Foldable2<F>
): <M>(M: Monoid<M>) => (sep: M) => <E>(fm: Kind2<F, E, M>) => M
export function intercalate<F extends URIS2, E>(
  F: Foldable2C<F, E>
): <M>(M: Monoid<M>) => (sep: M) => (fm: Kind2<F, E, M>) => M
export function intercalate<F extends URIS>(F: Foldable1<F>): <M>(M: Monoid<M>) => (sep: M) => (fm: Kind<F, M>) => M
export function intercalate<F>(F: Foldable<F>): <M>(M: Monoid<M>) => (sep: M) => (fm: HKT<F, M>) => M
export function intercalate<F>(F: Foldable<F>): <M>(M: Monoid<M>) => (sep: M) => (fm: HKT<F, M>) => M {
  return <M>(M: Monoid<M>) => (sep: M) => (fm: HKT<F, M>) => {
    const go = ([init, acc]: readonly [boolean, M], m: M): readonly [boolean, M] =>
      init ? [false, m] : [false, pipe(acc, M.concat(sep), M.concat(m))]
    return pipe(fm, F.reduce([true, M.empty], go))[1]
  }
}

/**
 * Transforms a `Foldable` into a read-only array.
 *
 * @example
 * import { toReadonlyArray } from 'fp-ts/Foldable'
 * import { Foldable, make } from 'fp-ts/Tree'
 *
 * const t = make(1, [make(2, []), make(3, []), make(4, [])])
 * assert.deepStrictEqual(toReadonlyArray(Foldable)(t), [1, 2, 3, 4])
 *
 * @since 3.0.0
 */
export function toReadonlyArray<F extends URIS4>(
  F: Foldable4<F>
): <S, R, E, A>(fa: Kind4<F, S, R, E, A>) => ReadonlyArray<A>
export function toReadonlyArray<F extends URIS3>(F: Foldable3<F>): <R, E, A>(fa: Kind3<F, R, E, A>) => ReadonlyArray<A>
export function toReadonlyArray<F extends URIS3, E>(
  F: Foldable3C<F, E>
): <R, A>(fa: Kind3<F, R, E, A>) => ReadonlyArray<A>
export function toReadonlyArray<F extends URIS2>(F: Foldable2<F>): <E, A>(fa: Kind2<F, E, A>) => ReadonlyArray<A>
export function toReadonlyArray<F extends URIS2, E>(F: Foldable2C<F, E>): <A>(fa: Kind2<F, E, A>) => ReadonlyArray<A>
export function toReadonlyArray<F extends URIS>(F: Foldable1<F>): <A>(fa: Kind<F, A>) => ReadonlyArray<A>
export function toReadonlyArray<F>(F: Foldable<F>): <A>(fa: HKT<F, A>) => ReadonlyArray<A>
export function toReadonlyArray<F>(F: Foldable<F>): <A>(fa: HKT<F, A>) => ReadonlyArray<A> {
  return <A>(fa: HKT<F, A>) =>
    pipe(
      fa,
      // tslint:disable-next-line: readonly-array
      F.reduce([], (acc: Array<A>, a) => {
        acc.push(a)
        return acc
      })
    )
}

/**
 * @since 3.0.0
 */
export function reduce<F extends URIS, G extends URIS>(
  F: Foldable1<F>,
  G: Foldable1<G>
): <B, A>(b: B, f: (b: B, a: A) => B) => (fga: Kind<F, Kind<G, A>>) => B
export function reduce<F, G>(
  F: Foldable<F>,
  G: Foldable<G>
): <B, A>(b: B, f: (b: B, a: A) => B) => (fga: HKT<F, HKT<G, A>>) => B
export function reduce<F, G>(
  F: Foldable<F>,
  G: Foldable<G>
): <B, A>(b: B, f: (b: B, a: A) => B) => (fga: HKT<F, HKT<G, A>>) => B {
  return (b, f) => F.reduce(b, (b, ga) => G.reduce(b, f)(ga))
}

/**
 * @since 3.0.0
 */
export function foldMap<F extends URIS, G extends URIS>(
  F: Foldable1<F>,
  G: Foldable1<G>
): <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fga: Kind<F, Kind<G, A>>) => M
export function foldMap<F, G>(
  F: Foldable<F>,
  G: Foldable<G>
): <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fga: HKT<F, HKT<G, A>>) => M
export function foldMap<F, G>(
  F: Foldable<F>,
  G: Foldable<G>
): <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fga: HKT<F, HKT<G, A>>) => M {
  return (M) => flow(G.foldMap(M), F.foldMap(M))
}

/**
 * @since 3.0.0
 */
export function reduceRight<F extends URIS, G extends URIS>(
  F: Foldable1<F>,
  G: Foldable1<G>
): <B, A>(b: B, f: (a: A, b: B) => B) => (fga: Kind<F, Kind<G, A>>) => B
export function reduceRight<F, G>(
  F: Foldable<F>,
  G: Foldable<G>
): <B, A>(b: B, f: (a: A, b: B) => B) => (fga: HKT<F, HKT<G, A>>) => B
export function reduceRight<F, G>(
  F: Foldable<F>,
  G: Foldable<G>
): <B, A>(b: B, f: (a: A, b: B) => B) => (fga: HKT<F, HKT<G, A>>) => B {
  return (b, f) => F.reduceRight(b, (ga, b) => G.reduceRight(b, f)(ga))
}
