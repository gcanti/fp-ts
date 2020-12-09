/**
 * Lift a computation from the `IO` monad
 *
 * @since 2.0.0
 */
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { IO } from './IO'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadIO<M> {
  readonly URI: M
  readonly fromIO: <A>(fa: IO<A>) => HKT<M, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadIO1<M extends URIS> {
  readonly URI: M
  readonly fromIO: <A>(fa: IO<A>) => Kind<M, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadIO2<M extends URIS2> {
  readonly URI: M
  readonly fromIO: <E, A>(fa: IO<A>) => Kind2<M, E, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadIO2C<M extends URIS2, E> {
  readonly URI: M
  readonly fromIO: <A>(fa: IO<A>) => Kind2<M, E, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadIO3<M extends URIS3> {
  readonly URI: M
  readonly fromIO: <R, E, A>(fa: IO<A>) => Kind3<M, R, E, A>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface MonadIO3C<M extends URIS3, E> {
  readonly URI: M
  readonly fromIO: <R, A>(fa: IO<A>) => Kind3<M, R, E, A>
}

/**
 * @category type classes
 * @since 2.4.4
 */
export interface MonadIO4<M extends URIS4> {
  readonly URI: M
  readonly fromIO: <S, R, E, A>(fa: IO<A>) => Kind4<M, S, R, E, A>
}
