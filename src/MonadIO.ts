/**
 * @file Lift a computation from the `IO` monad
 */
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { IO } from './IO'
import { Monad, Monad1, Monad2, Monad3, Monad2C } from './Monad'

/**
 * @since 2.0.0
 */
export interface MonadIO<M> extends Monad<M> {
  readonly fromIO: <A>(fa: IO<A>) => HKT<M, A>
}

/**
 * @since 2.0.0
 */
export interface MonadIO1<M extends URIS> extends Monad1<M> {
  readonly fromIO: <A>(fa: IO<A>) => Kind<M, A>
}

/**
 * @since 2.0.0
 */
export interface MonadIO2<M extends URIS2> extends Monad2<M> {
  readonly fromIO: <E, A>(fa: IO<A>) => Kind2<M, E, A>
}

/**
 * @since 2.0.0
 */
export interface MonadIO2C<M extends URIS2, E> extends Monad2C<M, E> {
  readonly fromIO: <A>(fa: IO<A>) => Kind2<M, E, A>
}

/**
 * @since 2.0.0
 */
export interface MonadIO3<M extends URIS3> extends Monad3<M> {
  readonly fromIO: <R, E, A>(fa: IO<A>) => Kind3<M, R, E, A>
}
