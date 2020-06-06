/**
 * @since 2.0.0
 */
import { Extend, Extend1, Extend2, Extend2C, Extend3 } from './Extend'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Comonad<W> extends Extend<W> {
  readonly extract: <A>(wa: HKT<W, A>) => A
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Comonad1<W extends URIS> extends Extend1<W> {
  readonly extract: <A>(wa: Kind<W, A>) => A
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Comonad2<W extends URIS2> extends Extend2<W> {
  readonly extract: <E, A>(wa: Kind2<W, E, A>) => A
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Comonad2C<W extends URIS2, E> extends Extend2C<W, E> {
  readonly extract: <A>(wa: Kind2<W, E, A>) => A
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Comonad3<W extends URIS3> extends Extend3<W> {
  readonly extract: <R, E, A>(wa: Kind3<W, R, E, A>) => A
}
