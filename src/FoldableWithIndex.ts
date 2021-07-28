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
import {
  Foldable,
  Foldable1,
  Foldable2,
  Foldable2C,
  Foldable3,
  Foldable3C,
  Foldable4,
  FoldableComposition,
  FoldableComposition11,
  FoldableComposition12,
  FoldableComposition12C,
  FoldableComposition21,
  FoldableComposition22,
  FoldableComposition22C,
  FoldableComposition2C1,
  getFoldableComposition
} from './Foldable'
import { pipe } from './function'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { Monoid } from './Monoid'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex<F, I> extends Foldable<F> {
  readonly reduceWithIndex: <A, B>(fa: HKT<F, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fa: HKT<F, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fa: HKT<F, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex1<F extends URIS, I> extends Foldable1<F> {
  readonly reduceWithIndex: <A, B>(fa: Kind<F, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fa: Kind<F, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fa: Kind<F, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex2<F extends URIS2, I> extends Foldable2<F> {
  readonly reduceWithIndex: <E, A, B>(fa: Kind2<F, E, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <E, A>(fa: Kind2<F, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <E, A, B>(fa: Kind2<F, E, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex2C<F extends URIS2, I, E> extends Foldable2C<F, E> {
  readonly reduceWithIndex: <A, B>(fa: Kind2<F, E, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fa: Kind2<F, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fa: Kind2<F, E, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex3<F extends URIS3, I> extends Foldable3<F> {
  readonly reduceWithIndex: <R, E, A, B>(fa: Kind3<F, R, E, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <R, E, A>(fa: Kind3<F, R, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <R, E, A, B>(fa: Kind3<F, R, E, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface FoldableWithIndex3C<F extends URIS3, I, E> extends Foldable3C<F, E> {
  readonly reduceWithIndex: <R, A, B>(fa: Kind3<F, R, E, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <R, A>(fa: Kind3<F, R, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <R, A, B>(fa: Kind3<F, R, E, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex4<F extends URIS4, I> extends Foldable4<F> {
  readonly reduceWithIndex: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <S, R, E, A>(fa: Kind4<F, S, R, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `reduceWithIndex` composition.
 *
 * @category combinators
 * @since 2.10.0
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
  return (b, f) => (fga) =>
    F.reduceWithIndex(fga, b, (i, b, ga) => G.reduceWithIndex(ga, b, (j, b, a) => f([i, j], b, a)))
}

/**
 * `foldMapWithIndex` composition.
 *
 * @category combinators
 * @since 2.10.0
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
    return (f) => (fga) => foldMapWithIndexF(fga, (i, ga) => foldMapWithIndexG(ga, (j, a) => f([i, j], a)))
  }
}

/**
 * `reduceRightWithIndex` composition.
 *
 * @category combinators
 * @since 2.10.0
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
  return (b, f) => (fga) =>
    F.reduceRightWithIndex(fga, b, (i, ga, b) => G.reduceRightWithIndex(ga, b, (j, a, b) => f([i, j], a, b)))
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

// tslint:disable: deprecation

/**
 * @since 2.0.0
 * @deprecated
 */
export interface FoldableWithIndexComposition<F, FI, G, GI> extends FoldableComposition<F, G> {
  readonly reduceWithIndex: <A, B>(fga: HKT<F, HKT<G, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fga: HKT<F, HKT<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fga: HKT<F, HKT<G, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}

/**
 * @since 2.0.0
 * @deprecated
 */
export interface FoldableWithIndexComposition11<F extends URIS, FI, G extends URIS, GI>
  extends FoldableComposition11<F, G> {
  readonly reduceWithIndex: <A, B>(fga: Kind<F, Kind<G, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fga: Kind<F, Kind<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fga: Kind<F, Kind<G, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}

/**
 * @since 2.0.0
 * @deprecated
 */
export interface FoldableWithIndexComposition12<F extends URIS, FI, G extends URIS2, GI>
  extends FoldableComposition12<F, G> {
  readonly reduceWithIndex: <E, A, B>(fga: Kind<F, Kind2<G, E, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <E, A>(fga: Kind<F, Kind2<G, E, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <E, A, B>(fga: Kind<F, Kind2<G, E, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}

/**
 * @since 2.0.0
 * @deprecated
 */
export interface FoldableWithIndexComposition12C<F extends URIS, FI, G extends URIS2, GI, E>
  extends FoldableComposition12C<F, G, E> {
  readonly reduceWithIndex: <A, B>(fga: Kind<F, Kind2<G, E, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fga: Kind<F, Kind2<G, E, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fga: Kind<F, Kind2<G, E, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}

/**
 * @since 2.0.0
 * @deprecated
 */
export interface FoldableWithIndexComposition21<F extends URIS2, FI, G extends URIS, GI>
  extends FoldableComposition21<F, G> {
  readonly reduceWithIndex: <FE, A, B>(fga: Kind2<F, FE, Kind<G, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <FE, A>(fga: Kind2<F, FE, Kind<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <FE, A, B>(fga: Kind2<F, FE, Kind<G, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}

/**
 * @since 2.0.0
 * @deprecated
 */
export interface FoldableWithIndexComposition2C1<F extends URIS2, FI, G extends URIS, GI, FE>
  extends FoldableComposition2C1<F, G, FE> {
  readonly reduceWithIndex: <A, B>(fga: Kind2<F, FE, Kind<G, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fga: Kind2<F, FE, Kind<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fga: Kind2<F, FE, Kind<G, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}

/**
 * @since 2.0.0
 * @deprecated
 */
export interface FoldableWithIndexComposition22<F extends URIS2, FI, G extends URIS2, GI>
  extends FoldableComposition22<F, G> {
  readonly reduceWithIndex: <FE, GE, A, B>(
    fga: Kind2<F, FE, Kind2<G, GE, A>>,
    b: B,
    f: (i: [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <FE, GE, A>(fga: Kind2<F, FE, Kind2<G, GE, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <FE, GE, A, B>(
    fga: Kind2<F, FE, Kind2<G, GE, A>>,
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => B
}

/**
 * @since 2.0.0
 * @deprecated
 */
export interface FoldableWithIndexComposition22C<F extends URIS2, FI, G extends URIS2, GI, E>
  extends FoldableComposition22C<F, G, E> {
  readonly reduceWithIndex: <FE, A, B>(fga: Kind2<F, FE, Kind2<G, E, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <FE, A>(fga: Kind2<F, FE, Kind2<G, E, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <FE, A, B>(
    fga: Kind2<F, FE, Kind2<G, E, A>>,
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => B
}

/**
 * Use
 *
 * - [reduceWithIndex](#reducewithindex)
 * - [foldMapWithIndex](#foldmapwithindex)
 * - [reduceRightWithIndex](#reducerightwithindex)
 *
 * instead.
 *
 * @since 2.0.0
 * @deprecated
 */
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS2, GI, E>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex2C<G, GI, E>
): FoldableWithIndexComposition22C<F, FI, G, GI, E>
/** @deprecated */
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS2, GI>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition22<F, FI, G, GI>
/** @deprecated */
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS, GI, E>(
  F: FoldableWithIndex2C<F, FI, E>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition2C1<F, FI, G, GI, E>
/** @deprecated */
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS, GI>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition21<F, FI, G, GI>
/** @deprecated */
export function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS2, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition12<F, FI, G, GI>
/** @deprecated */
export function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS2, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition12<F, FI, G, GI>
/** @deprecated */
export function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition11<F, FI, G, GI>
/** @deprecated */
export function getFoldableWithIndexComposition<F, FI, G, GI>(
  F: FoldableWithIndex<F, FI>,
  G: FoldableWithIndex<G, GI>
): FoldableWithIndexComposition<F, FI, G, GI>
/** @deprecated */
export function getFoldableWithIndexComposition<F, FI, G, GI>(
  F: FoldableWithIndex<F, FI>,
  G: FoldableWithIndex<G, GI>
): FoldableWithIndexComposition<F, FI, G, GI> {
  const FC = getFoldableComposition(F, G)
  const _reduceWithIndex = reduceWithIndex(F, G)
  const _foldMapWithIndex = foldMapWithIndex(F, G)
  const _reduceRightWithIndex = reduceRightWithIndex(F, G)
  return {
    reduce: FC.reduce,
    foldMap: FC.foldMap,
    reduceRight: FC.reduceRight,
    reduceWithIndex: (fga, b, f: any) => pipe(fga, _reduceWithIndex(b, f)),
    foldMapWithIndex: (M) => {
      const foldMapWithIndexM = _foldMapWithIndex(M)
      return (fga, f: any) => pipe(fga, foldMapWithIndexM(f))
    },
    reduceRightWithIndex: (fga, b, f: any) => pipe(fga, _reduceRightWithIndex(b, f))
  }
}
