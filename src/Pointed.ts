/**
 * @since 3.0.0
 */
import type { CategoryKind } from './CategoryKind'
import type { TypeLambda, Kind, TypeClass } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Pointed<F extends TypeLambda> extends TypeClass<F> {
  readonly of: <A, S>(a: A) => Kind<F, S, unknown, never, never, A>
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const idKind =
  <F extends TypeLambda>(Pointed: Pointed<F>): CategoryKind<F>['idKind'] =>
  () =>
    Pointed.of
