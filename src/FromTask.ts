/**
 * Lift a computation from the `Task` monad
 *
 * @since 2.10.0
 */
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3, URIS4, Kind4 } from './HKT'
import { FromIO, FromIO1, FromIO2, FromIO2C, FromIO3, FromIO3C, FromIO4 } from './FromIO'
import { Task } from './Task'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromTask<F> extends FromIO<F> {
  readonly fromTask: <A>(fa: Task<A>) => HKT<F, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromTask1<F extends URIS> extends FromIO1<F> {
  readonly fromTask: <A>(fa: Task<A>) => Kind<F, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromTask2<F extends URIS2> extends FromIO2<F> {
  readonly fromTask: <E, A>(fa: Task<A>) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromTask2C<F extends URIS2, E> extends FromIO2C<F, E> {
  readonly fromTask: <A>(fa: Task<A>) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromTask3<F extends URIS3> extends FromIO3<F> {
  readonly fromTask: <R, E, A>(fa: Task<A>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromTask3C<F extends URIS3, E> extends FromIO3C<F, E> {
  readonly fromTask: <R, A>(fa: Task<A>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromTask4<F extends URIS4> extends FromIO4<F> {
  readonly fromTask: <S, R, E, A>(fa: Task<A>) => Kind4<F, S, R, E, A>
}
