/**
 * @file Lift a computation from the `Task` monad
 */
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
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
  readonly fromTask: <A>(fa: Task<A>) => Type<M, A>
}

/**
 * @since 2.0.0
 */
export interface MonadTask2<M extends URIS2> extends Monad2<M> {
  readonly fromTask: <L, A>(fa: Task<A>) => Type2<M, L, A>
}

/**
 * @since 2.0.0
 */
export interface MonadTask2C<M extends URIS2, L> extends Monad2C<M, L> {
  readonly fromTask: <A>(fa: Task<A>) => Type2<M, L, A>
}

/**
 * @since 2.0.0
 */
export interface MonadTask3<M extends URIS3> extends Monad3<M> {
  readonly fromTask: <U, L, A>(fa: Task<A>) => Type3<M, U, L, A>
}
