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

/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition<F, FI, G, GI> {
  readonly reduceWithIndex: <A, B>(fga: HKT<F, HKT<G, A>>, b: B, f: (i: readonly [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fga: HKT<F, HKT<G, A>>, f: (i: readonly [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fga: HKT<F, HKT<G, A>>, b: B, f: (i: readonly [FI, GI], a: A, b: B) => B) => B
}

/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition11<F extends URIS, FI, G extends URIS, GI> {
  readonly reduceWithIndex: <A, B>(fga: Kind<F, Kind<G, A>>, b: B, f: (i: readonly [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(fga: Kind<F, Kind<G, A>>, f: (i: readonly [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fga: Kind<F, Kind<G, A>>, b: B, f: (i: readonly [FI, GI], a: A, b: B) => B) => B
}

/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition12<F extends URIS, FI, G extends URIS2, GI> {
  readonly reduceWithIndex: <E, A, B>(
    fga: Kind<F, Kind2<G, E, A>>,
    b: B,
    f: (i: readonly [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <E, A>(fga: Kind<F, Kind2<G, E, A>>, f: (i: readonly [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <E, A, B>(
    fga: Kind<F, Kind2<G, E, A>>,
    b: B,
    f: (i: readonly [FI, GI], a: A, b: B) => B
  ) => B
}

/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition12C<F extends URIS, FI, G extends URIS2, GI, E> {
  readonly reduceWithIndex: <A, B>(fga: Kind<F, Kind2<G, E, A>>, b: B, f: (i: readonly [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(fga: Kind<F, Kind2<G, E, A>>, f: (i: readonly [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(
    fga: Kind<F, Kind2<G, E, A>>,
    b: B,
    f: (i: readonly [FI, GI], a: A, b: B) => B
  ) => B
}

/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition21<F extends URIS2, FI, G extends URIS, GI> {
  readonly reduceWithIndex: <FE, A, B>(
    fga: Kind2<F, FE, Kind<G, A>>,
    b: B,
    f: (i: readonly [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <FE, A>(fga: Kind2<F, FE, Kind<G, A>>, f: (i: readonly [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <FE, A, B>(
    fga: Kind2<F, FE, Kind<G, A>>,
    b: B,
    f: (i: readonly [FI, GI], a: A, b: B) => B
  ) => B
}

/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition2C1<F extends URIS2, FI, G extends URIS, GI, FE> {
  readonly reduceWithIndex: <A, B>(fga: Kind2<F, FE, Kind<G, A>>, b: B, f: (i: readonly [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(fga: Kind2<F, FE, Kind<G, A>>, f: (i: readonly [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(
    fga: Kind2<F, FE, Kind<G, A>>,
    b: B,
    f: (i: readonly [FI, GI], a: A, b: B) => B
  ) => B
}

/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition22<F extends URIS2, FI, G extends URIS2, GI> {
  readonly reduceWithIndex: <FE, GE, A, B>(
    fga: Kind2<F, FE, Kind2<G, GE, A>>,
    b: B,
    f: (i: readonly [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <FE, GE, A>(fga: Kind2<F, FE, Kind2<G, GE, A>>, f: (i: readonly [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <FE, GE, A, B>(
    fga: Kind2<F, FE, Kind2<G, GE, A>>,
    b: B,
    f: (i: readonly [FI, GI], a: A, b: B) => B
  ) => B
}

/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition22C<F extends URIS2, FI, G extends URIS2, GI, E> {
  readonly reduceWithIndex: <FE, A, B>(
    fga: Kind2<F, FE, Kind2<G, E, A>>,
    b: B,
    f: (i: readonly [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <FE, A>(fga: Kind2<F, FE, Kind2<G, E, A>>, f: (i: readonly [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <FE, A, B>(
    fga: Kind2<F, FE, Kind2<G, E, A>>,
    b: B,
    f: (i: readonly [FI, GI], a: A, b: B) => B
  ) => B
}

/**
 * @since 2.0.0
 */
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS2, GI, E>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex2C<G, GI, E>
): FoldableWithIndexComposition22C<F, FI, G, GI, E>
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS2, GI>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition22<F, FI, G, GI>
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS, GI, E>(
  F: FoldableWithIndex2C<F, FI, E>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition2C1<F, FI, G, GI, E>
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS, GI>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition21<F, FI, G, GI>
export function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS2, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition12<F, FI, G, GI>
export function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS2, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition12<F, FI, G, GI>
export function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition11<F, FI, G, GI>
export function getFoldableWithIndexComposition<F, FI, G, GI>(
  F: FoldableWithIndex<F, FI>,
  G: FoldableWithIndex<G, GI>
): FoldableWithIndexComposition<F, FI, G, GI>
export function getFoldableWithIndexComposition<F, FI, G, GI>(
  F: FoldableWithIndex<F, FI>,
  G: FoldableWithIndex<G, GI>
): FoldableWithIndexComposition<F, FI, G, GI> {
  return {
    reduceWithIndex: (fga, b, f) =>
      F.reduceWithIndex(fga, b, (fi, b, ga) => G.reduceWithIndex(ga, b, (gi, b, a) => f([fi, gi], b, a))),
    foldMapWithIndex: (M) => {
      const foldMapWithIndexF = F.foldMapWithIndex(M)
      const foldMapWithIndexG = G.foldMapWithIndex(M)
      return (fga, f) => foldMapWithIndexF(fga, (fi, ga) => foldMapWithIndexG(ga, (gi, a) => f([fi, gi], a)))
    },
    reduceRightWithIndex: (fga, b, f) =>
      F.reduceRightWithIndex(fga, b, (fi, ga, b) => G.reduceRightWithIndex(ga, b, (gi, a, b) => f([fi, gi], a, b)))
  }
}
