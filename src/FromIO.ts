/**
 * Lift a computation from the `IO` monad
 *
 * @since 3.0.0
 */
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { IO } from './IO'

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO<M> {
  readonly URI: M
  readonly fromIO: <A>(fa: IO<A>) => HKT<M, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO1<M extends URIS> {
  readonly URI: M
  readonly fromIO: <A>(fa: IO<A>) => Kind<M, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO2<M extends URIS2> {
  readonly URI: M
  readonly fromIO: <A, E>(fa: IO<A>) => Kind2<M, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO2C<M extends URIS2, E> {
  readonly URI: M
  readonly fromIO: <A>(fa: IO<A>) => Kind2<M, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO3<M extends URIS3> {
  readonly URI: M
  readonly fromIO: <A, R, E>(fa: IO<A>) => Kind3<M, R, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO3C<M extends URIS3, E> {
  readonly URI: M
  readonly fromIO: <A, R>(fa: IO<A>) => Kind3<M, R, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO4<M extends URIS4> {
  readonly URI: M
  readonly fromIO: <A, S, R, E>(fa: IO<A>) => Kind4<M, S, R, E, A>
}
