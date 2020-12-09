/**
 * A `Foldable` with an additional index.
 * A `FoldableWithIndex` instance must be compatible with its `Foldable` instance
 *
 * ```ts
 * reduce(fa, b, f) = reduceWithIndex(fa, b, (_, b, a) => f(b, a))
 * foldMap(M)(fa, f) = foldMapWithIndex(M)(fa, (_, a) => f(a))
 * reduceRight(fa, b, f) = reduceRightWithIndex(fa, b, (_, a, b) => f(a, b))
 * ```
 *
 * @since 2.0.0
 */
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { Monoid } from './Monoid'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex<F, I> {
  readonly URI: F
  readonly reduceWithIndex: <A, B>(fa: HKT<F, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fa: HKT<F, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fa: HKT<F, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex1<F extends URIS, I> {
  readonly URI: F
  readonly reduceWithIndex: <A, B>(fa: Kind<F, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fa: Kind<F, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fa: Kind<F, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex2<F extends URIS2, I> {
  readonly URI: F
  readonly reduceWithIndex: <E, A, B>(fa: Kind2<F, E, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <E, A>(fa: Kind2<F, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <E, A, B>(fa: Kind2<F, E, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex2C<F extends URIS2, I, E> {
  readonly URI: F
  readonly reduceWithIndex: <A, B>(fa: Kind2<F, E, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fa: Kind2<F, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fa: Kind2<F, E, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex3<F extends URIS3, I> {
  readonly URI: F
  readonly reduceWithIndex: <R, E, A, B>(fa: Kind3<F, R, E, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <R, E, A>(fa: Kind3<F, R, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <R, E, A, B>(fa: Kind3<F, R, E, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface FoldableWithIndex3C<F extends URIS3, I, E> {
  readonly URI: F
  readonly reduceWithIndex: <R, A, B>(fa: Kind3<F, R, E, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <R, A>(fa: Kind3<F, R, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <R, A, B>(fa: Kind3<F, R, E, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex4<F extends URIS4, I> {
  readonly URI: F
  readonly reduceWithIndex: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <S, R, E, A>(fa: Kind4<F, S, R, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}
