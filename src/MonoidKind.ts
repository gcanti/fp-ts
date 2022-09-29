/**
 * TODO: description
 *
 * `MonoidK` instances should satisfy the following laws in addition to the `SemigroupK` laws:
 *
 * 1. Left identity: `emptyKind |> combineKind(fa) <-> fa`
 * 2. Right identity: `fa |> combineKind(emptyKind) <-> fa`
 * 3. Annihilation1: `emptyKind |> map(f) <-> emptyKind`
 * 4. Distributivity: `fab |> combineKind(gab) |> ap(fa) <-> fab |> ap(fa) |> combineKind(gab |> A.ap(fa))`
 * 5. Annihilation2: `emptyKind |> ap(fa) <-> emptyKind`
 *
 * @since 3.0.0
 */
import * as semigroupKind from './SemigroupKind'
import type { SemigroupKind } from './SemigroupKind'
import type { TypeLambda, Kind } from './HKT'
import type { Pointed } from './Pointed'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface MonoidKind<F extends TypeLambda> extends SemigroupKind<F> {
  readonly emptyKind: <S>() => Kind<F, S, unknown, never, never, never>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const guard =
  <F extends TypeLambda>(F: MonoidKind<F>, P: Pointed<F>) =>
  <S>(b: boolean): Kind<F, S, unknown, never, never, void> =>
    b ? P.of(undefined) : F.emptyKind()

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const combineKindAll = <F extends TypeLambda>(F: MonoidKind<F>) => {
  const combineKAllF = semigroupKind.combineKindAll(F)
  return <S, R, O, E, A>(as: ReadonlyArray<Kind<F, S, R, O, E, A>>): Kind<F, S, R, O, E, A> => {
    return combineKAllF<S, R, O, E, A>(F.emptyKind())(as)
  }
}
