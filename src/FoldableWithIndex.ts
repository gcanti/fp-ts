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
import type { TypeLambda, Kind, Typeclass } from './HKT'
import type { Monoid } from './Monoid'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FoldableWithIndex<F extends TypeLambda, I> extends Typeclass<F> {
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => <S, R, W, E>(self: Kind<F, S, R, W, E, A>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: I, a: A) => M) => <S, R, W, E>(self: Kind<F, S, R, W, E, A>) => M
  readonly reduceRightWithIndex: <B, A>(
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => <S, R, W, E>(self: Kind<F, S, R, W, E, A>) => B
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `reduceWithIndex` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const getReduceWithIndexComposition =
  <F extends TypeLambda, I, G extends TypeLambda, J>(
    F: FoldableWithIndex<F, I>,
    G: FoldableWithIndex<G, J>
  ): (<B, A>(
    b: B,
    f: (i: readonly [I, J], b: B, a: A) => B
  ) => <FS, FR, FW, FE, GS, GR, GW, GE>(fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>) => B) =>
  (b, f) =>
    F.reduceWithIndex(b, (i, b, ga) =>
      pipe(
        ga,
        G.reduceWithIndex(b, (j, b, a) => f([i, j], b, a))
      )
    )

/**
 * `foldMapWithIndex` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const getFoldMapWithIndexComposition =
  <F extends TypeLambda, I, G extends TypeLambda, J>(
    F: FoldableWithIndex<F, I>,
    G: FoldableWithIndex<G, J>
  ): (<M>(
    M: Monoid<M>
  ) => <A>(
    f: (i: readonly [I, J], a: A) => M
  ) => <FS, FR, FW, FE, GS, GR, GW, GE>(fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>) => M) =>
  (M) => {
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

/**
 * `reduceRightWithIndex` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const getReduceRightWithIndexComposition =
  <F extends TypeLambda, I, G extends TypeLambda, J>(
    F: FoldableWithIndex<F, I>,
    G: FoldableWithIndex<G, J>
  ): (<B, A>(
    b: B,
    f: (i: readonly [I, J], a: A, b: B) => B
  ) => <FS, FR, FW, FE, GS, GR, GW, GE>(fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>) => B) =>
  (b, f) =>
    F.reduceRightWithIndex(b, (i, ga, b) =>
      pipe(
        ga,
        G.reduceRightWithIndex(b, (j, a, b) => f([i, j], a, b))
      )
    )
