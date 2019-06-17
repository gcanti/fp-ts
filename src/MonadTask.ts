/**
 * @file Lift a computation from the `Task` monad
 */
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3 } from './Monad'
import { Task } from './Task'

/**
 * @since 2.0.0
 */
export interface MonadTask<M> extends Monad<M> {
  readonly fromTask: <A>(fa: Task<A>) => HKT<M, A>
}

/**
 * @since 2.0.0
 */
export interface MonadTask1<M extends URIS> extends Monad1<M> {
  readonly fromTask: <A>(fa: Task<A>) => Kind<M, A>
}

/**
 * @since 2.0.0
 */
export interface MonadTask2<M extends URIS2> extends Monad2<M> {
  readonly fromTask: <E, A>(fa: Task<A>) => Kind2<M, E, A>
}

/**
 * @since 2.0.0
 */
export interface MonadTask2C<M extends URIS2, E> extends Monad2C<M, E> {
  readonly fromTask: <A>(fa: Task<A>) => Kind2<M, E, A>
}

/**
 * @since 2.0.0
 */
export interface MonadTask3<M extends URIS3> extends Monad3<M> {
  readonly fromTask: <R, E, A>(fa: Task<A>) => Kind3<M, R, E, A>
}
