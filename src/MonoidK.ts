/**
 * TODO: description
 *
 * `MonoidK` instances should satisfy the following laws in addition to the `SemigroupK` laws:
 *
 * 1. Left identity: `emptyK |> combineK(() => fa) <-> fa`
 * 2. Right identity: `fa |> combineK(() => emptyK) <-> fa`
 * 3. Annihilation1: `emptyK |> map(f) <-> emptyK`
 * 4. Distributivity: `fab |> combineK(() => gab) |> ap(fa) <-> fab |> ap(fa) |> combineK(() => gab |> A.ap(fa))`
 * 5. Annihilation2: `emptyK |> ap(fa) <-> emptyK`
 *
 * @since 3.0.0
 */
import * as semigroupK from './SemigroupK'
import type { SemigroupK } from './SemigroupK'
import type { HKT, Kind } from './HKT'
import type { Pointed } from './Pointed'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface MonoidK<F extends HKT> extends SemigroupK<F> {
  readonly emptyK: <S, R = unknown, W = never, E = never, A = never>() => Kind<F, S, R, W, E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const guard =
  <F extends HKT>(F: MonoidK<F>, P: Pointed<F>) =>
  <S, R = unknown, W = never, E = never>(b: boolean): Kind<F, S, R, W, E, void> =>
    b ? P.of(undefined) : F.emptyK()

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const combineKAll = <F extends HKT>(
  F: MonoidK<F>
): (<S, R, W, E, A>(as: ReadonlyArray<Kind<F, S, R, W, E, A>>) => Kind<F, S, R, W, E, A>) =>
  semigroupK.combineKAll(F)(F.emptyK())