/**
 * Lift a computation from the `Task` monad
 *
 * @since 2.0.0
 */
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3, URIS4, Kind4 } from './HKT'
import { MonadIO, MonadIO1, MonadIO2, MonadIO2C, MonadIO3, MonadIO3C, MonadIO4 } from './MonadIO'
import { Task } from './Task'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadTask<M> extends MonadIO<M> {
  readonly fromTask: <A>(fa: Task<A>) => HKT<M, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadTask1<M extends URIS> extends MonadIO1<M> {
  readonly fromTask: <A>(fa: Task<A>) => Kind<M, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadTask2<M extends URIS2> extends MonadIO2<M> {
  readonly fromTask: <E, A>(fa: Task<A>) => Kind2<M, E, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadTask2C<M extends URIS2, E> extends MonadIO2C<M, E> {
  readonly fromTask: <A>(fa: Task<A>) => Kind2<M, E, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadTask3<M extends URIS3> extends MonadIO3<M> {
  readonly fromTask: <R, E, A>(fa: Task<A>) => Kind3<M, R, E, A>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface MonadTask3C<M extends URIS3, E> extends MonadIO3C<M, E> {
  readonly fromTask: <R, A>(fa: Task<A>) => Kind3<M, R, E, A>
}

/**
 * @category type classes
 * @since 2.4.4
 */
export interface MonadTask4<M extends URIS4> extends MonadIO4<M> {
  readonly fromTask: <S, R, E, A>(fa: Task<A>) => Kind4<M, S, R, E, A>
}
