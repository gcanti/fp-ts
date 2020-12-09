/**
 * The `MonadThrow` type class represents those monads which support errors via
 * `throwError`, where `throwError(e)` halts, yielding the error `e`.
 *
 * Laws:
 *
 * - Left zero: `M.chain(M.throwError(e), f) = M.throwError(e)`
 *
 * @since 2.0.0
 */
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadThrow<M> {
  readonly URI: M
  readonly throwError: <E, A>(e: E) => HKT<M, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadThrow1<M extends URIS> {
  readonly URI: M
  readonly throwError: <E, A>(e: E) => Kind<M, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadThrow2<M extends URIS2> {
  readonly URI: M
  readonly throwError: <E, A>(e: E) => Kind2<M, E, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadThrow2C<M extends URIS2, E> {
  readonly URI: M
  readonly throwError: <A>(e: E) => Kind2<M, E, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadThrow3<M extends URIS3> {
  readonly URI: M
  readonly throwError: <R, E, A>(e: E) => Kind3<M, R, E, A>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface MonadThrow3C<M extends URIS3, E> {
  readonly URI: M
  readonly throwError: <R, A>(e: E) => Kind3<M, R, E, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadThrow4<M extends URIS4> {
  readonly URI: M
  readonly throwError: <S, R, E, A>(e: E) => Kind4<M, S, R, E, A>
}
