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
import type { TypeLambda, Kind, TypeClass } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FunctorWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly mapWithIndex: <A, B>(
    f: (i: I, a: A) => B
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}
// -------------------------------------------------------------------------------------
// compositions
// -------------------------------------------------------------------------------------

/**
 * `mapWithIndex` composition.
 *
 * @category compositions
 * @since 3.0.0
 */
export const getMapWithIndexComposition =
  <F extends TypeLambda, I, G extends TypeLambda, J>(
    FunctorWithIndexF: FunctorWithIndex<F, I>,
    FunctorWithIndexG: FunctorWithIndex<G, J>
  ): (<A, B>(
    f: (i: readonly [I, J], a: A) => B
  ) => <FS, FR, FO, FE, GS, GR, GO, GE>(
    fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
  ) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>) =>
  (f) =>
    FunctorWithIndexF.mapWithIndex((i, ga) =>
      pipe(
        ga,
        FunctorWithIndexG.mapWithIndex((j, a) => f([i, j], a))
      )
    )
