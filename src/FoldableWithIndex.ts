/**
 * A `Foldable` with an additional index.
 *
 * A `FoldableWithIndex` instance must be compatible with its `Foldable` instance:
 *
 * ```ts
 * reduce(b, f) = reduceWithIndex(b, (_, b, a) => f(b, a))
 * foldMap(M)(f) = foldMapWithIndex(M)((_, a) => f(a))
 * reduceRight(b, f) = reduceRightWithIndex(b, (_, a, b) => f(a, b))
 * ```
 *
 * @since 3.0.0
 */
import { pipe } from './function'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { Monoid } from './Monoid'

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FoldableWithIndex<F, I> {
  readonly URI?: F
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => (fa: HKT<F, A>) => B
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FoldableWithIndex1<F extends URIS, I> {
  readonly URI?: F
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Kind<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Kind<F, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Kind<F, A>) => B
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FoldableWithIndex2<F extends URIS2, I> {
  readonly URI?: F
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => <E>(fa: Kind2<F, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <E>(fa: Kind2<F, E, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => <E>(fa: Kind2<F, E, A>) => B
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FoldableWithIndex2C<F extends URIS2, I, E> {
  readonly URI?: F
  readonly _E?: E
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Kind2<F, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Kind2<F, E, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Kind2<F, E, A>) => B
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FoldableWithIndex3<F extends URIS3, I> {
  readonly URI?: F
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <R, E>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FoldableWithIndex3C<F extends URIS3, I, E> {
  readonly URI?: F
  readonly _E?: E
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <R>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => <R>(fa: Kind3<F, R, E, A>) => B
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FoldableWithIndex4<F extends URIS4, I> {
  readonly URI?: F
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
}

/**
 * @since 3.0.0
 */
export function reduceWithIndex<F extends URIS, I, G extends URIS, J>(
  F: FoldableWithIndex1<F, I>,
  G: FoldableWithIndex1<G, J>
): <B, A>(b: B, f: (ij: readonly [I, J], b: B, a: A) => B) => (fga: Kind<F, Kind<G, A>>) => B
export function reduceWithIndex<F, I, G, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
): <B, A>(b: B, f: (ij: readonly [I, J], b: B, a: A) => B) => (fga: HKT<F, HKT<G, A>>) => B
export function reduceWithIndex<F, I, G, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
): <B, A>(b: B, f: (ij: readonly [I, J], b: B, a: A) => B) => (fga: HKT<F, HKT<G, A>>) => B {
  return (b, f) =>
    F.reduceWithIndex(b, (i, b, ga) =>
      pipe(
        ga,
        G.reduceWithIndex(b, (j, b, a) => f([i, j], b, a))
      )
    )
}

/**
 * @since 3.0.0
 */
export function foldMapWithIndex<F extends URIS, I, G extends URIS, J>(
  F: FoldableWithIndex1<F, I>,
  G: FoldableWithIndex1<G, J>
): <M>(M: Monoid<M>) => <A>(f: (ij: readonly [I, J], a: A) => M) => (fga: Kind<F, Kind<G, A>>) => M
export function foldMapWithIndex<F, I, G, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
): <M>(M: Monoid<M>) => <A>(f: (ij: readonly [I, J], a: A) => M) => (fga: HKT<F, HKT<G, A>>) => M
export function foldMapWithIndex<F, I, G, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
): <M>(M: Monoid<M>) => <A>(f: (ij: readonly [I, J], a: A) => M) => (fga: HKT<F, HKT<G, A>>) => M {
  return (M) => {
    const foldMapWithIndexF = F.foldMapWithIndex(M)
    const foldMapWithIndexG = G.foldMapWithIndex(M)
    return (f) =>
      foldMapWithIndexF((i, ga) =>
        pipe(
          ga,
          foldMapWithIndexG((j, a) => f([i, j], a))
        )
      )
  }
}

/**
 * @since 3.0.0
 */
export function reduceRightWithIndex<F extends URIS, I, G extends URIS, J>(
  F: FoldableWithIndex1<F, I>,
  G: FoldableWithIndex1<G, J>
): <B, A>(b: B, f: (ij: readonly [I, J], a: A, b: B) => B) => (fga: Kind<F, Kind<G, A>>) => B
export function reduceRightWithIndex<F, I, G, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
): <B, A>(b: B, f: (ij: readonly [I, J], a: A, b: B) => B) => (fga: HKT<F, HKT<G, A>>) => B
export function reduceRightWithIndex<F, I, G, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
): <B, A>(b: B, f: (ij: readonly [I, J], a: A, b: B) => B) => (fga: HKT<F, HKT<G, A>>) => B {
  return (b, f) =>
    F.reduceRightWithIndex(b, (i, ga, b) =>
      pipe(
        ga,
        G.reduceRightWithIndex(b, (j, a, b) => f([i, j], a, b))
      )
    )
}
