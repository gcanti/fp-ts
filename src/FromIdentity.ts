/**
 * @since 3.0.0
 */
import type { KleisliCategory } from './KleisliCategory'
import type { TypeLambda, Kind, TypeClass } from './HKT'

/**
 * @category model
 * @since 3.0.0
 */
export interface FromIdentity<F extends TypeLambda> extends TypeClass<F> {
  readonly succeed: <A, S>(a: A) => Kind<F, S, unknown, never, never, A>
}

/**
 * @since 3.0.0
 */
export const idKleisli =
  <F extends TypeLambda>(FromIdentity: FromIdentity<F>): KleisliCategory<F>['idKleisli'] =>
  () =>
    FromIdentity.succeed
