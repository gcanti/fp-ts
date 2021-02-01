/**
 * Lift a computation from the `IO` monad
 *
 * @since 2.10.0
 */
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { IO } from './IO'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromIO<F> {
  readonly URI: F
  readonly fromIO: <A>(fa: IO<A>) => HKT<F, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromIO1<F extends URIS> {
  readonly URI: F
  readonly fromIO: <A>(fa: IO<A>) => Kind<F, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromIO2<F extends URIS2> {
  readonly URI: F
  readonly fromIO: <E, A>(fa: IO<A>) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromIO2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly fromIO: <A>(fa: IO<A>) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromIO3<F extends URIS3> {
  readonly URI: F
  readonly fromIO: <R, E, A>(fa: IO<A>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromIO3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly fromIO: <R, A>(fa: IO<A>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromIO4<F extends URIS4> {
  readonly URI: F
  readonly fromIO: <S, R, E, A>(fa: IO<A>) => Kind4<F, S, R, E, A>
}
