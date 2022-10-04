/**
 * @since 3.0.0
 */
import type { CategoryKind } from './CategoryKind'
import type { TypeLambda, Kind, TypeClass } from './HKT'

/**
 * @category model
 * @since 3.0.0
 */
export interface FromIdentity<F extends TypeLambda> extends TypeClass<F> {
  readonly of: <A, S>(a: A) => Kind<F, S, unknown, never, never, A>
}

/**
 * @since 3.0.0
 */
export const idKind =
  <F extends TypeLambda>(Pointed: FromIdentity<F>): CategoryKind<F>['idKind'] =>
  () =>
    Pointed.of
