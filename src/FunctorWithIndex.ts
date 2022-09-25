/**
 * A `FunctorWithIndex` is a type constructor which supports a mapping operation `mapWithIndex`.
 *
 * `mapWithIndex` can be used to turn functions `i -> a -> b` into functions `f a -> f b` whose argument and return types use the type
 * constructor `f` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.mapWithIndex((_i, a) => a) <-> fa`
 * 2. Composition: `F.mapWithIndex((_i, a) => bc(ab(a))) <-> flow(F.mapWithIndex((_i, a) => ab(a)), F.mapWithIndex((_i, b) => bc(b)))`
 *
 * @since 3.0.0
 */
import { pipe } from './function'
import type { TypeLambda, Kind, Typeclass } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FunctorWithIndex<F extends TypeLambda, I> extends Typeclass<F> {
  readonly mapWithIndex: <A, B>(
    f: (i: I, a: A) => B
  ) => <S, R, W, E>(self: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
}
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `mapWithIndex` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const getMapWithIndexComposition =
  <F extends TypeLambda, I, G extends TypeLambda, J>(
    F: FunctorWithIndex<F, I>,
    G: FunctorWithIndex<G, J>
  ): (<A, B>(
    f: (i: readonly [I, J], a: A) => B
  ) => <FS, FR, FW, FE, GS, GR, GW, GE>(
    fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
  ) => Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>) =>
  (f) =>
    F.mapWithIndex((i, ga) =>
      pipe(
        ga,
        G.mapWithIndex((j, a) => f([i, j], a))
      )
    )
