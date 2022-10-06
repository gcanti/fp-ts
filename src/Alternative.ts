/**
 * TODO: description
 *
 * `MonoidK` instances should satisfy the following laws in addition to the `Alt` laws:
 *
 * 1. Left identity: `emptyKind |> orElse(fa) <-> fa`
 * 2. Right identity: `fa |> orElse(emptyKind) <-> fa`
 * 3. Annihilation1: `emptyKind |> map(f) <-> emptyKind`
 * 4. Distributivity: `fab |> orElse(gab) |> ap(fa) <-> fab |> ap(fa) |> orElse(gab |> A.ap(fa))`
 * 5. Annihilation2: `emptyKind |> ap(fa) <-> emptyKind`
 *
 * @since 3.0.0
 */
import * as alt from './Alt'
import type { Alt } from './Alt'
import type { TypeLambda, Kind } from './HKT'
import type { FromIdentity } from './FromIdentity'

/**
 * @category model
 * @since 3.0.0
 */
export interface Alternative<F extends TypeLambda> extends Alt<F> {
  readonly emptyKind: <S>() => Kind<F, S, unknown, never, never, never>
}

/**
 * @since 3.0.0
 */
export const guard =
  <F extends TypeLambda>(F: Alternative<F>, P: FromIdentity<F>) =>
  <S>(b: boolean): Kind<F, S, unknown, never, never, void> =>
    b ? P.succeed(undefined) : F.emptyKind()

/**
 * Returns an effect that runs each of the specified effects in order until one of them succeeds.
 *
 * @since 3.0.0
 */
export const firstSuccessOf = <F extends TypeLambda>(F: Alternative<F>) => {
  const firstSuccessOf_ = alt.firstSuccessOf(F)
  return <S, R, O, E, A>(as: ReadonlyArray<Kind<F, S, R, O, E, A>>): Kind<F, S, R, O, E, A> => {
    return firstSuccessOf_<S, R, O, E, A>(F.emptyKind())(as)
  }
}
