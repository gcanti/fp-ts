/**
 * @since 3.0.0
 */
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
