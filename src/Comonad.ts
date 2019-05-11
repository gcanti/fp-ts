import { Extend, Extend1, Extend2, Extend2C, Extend3 } from './Extend'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'

/**
 * @since 2.0.0
 */
export interface Comonad<W> extends Extend<W> {
  readonly extract: <A>(wa: HKT<W, A>) => A
}

/**
 * @since 2.0.0
 */
export interface Comonad1<W extends URIS> extends Extend1<W> {
  readonly extract: <A>(wa: Type<W, A>) => A
}

/**
 * @since 2.0.0
 */
export interface Comonad2<W extends URIS2> extends Extend2<W> {
  readonly extract: <L, A>(wa: Type2<W, L, A>) => A
}

/**
 * @since 2.0.0
 */
export interface Comonad2C<W extends URIS2, L> extends Extend2C<W, L> {
  readonly extract: <A>(wa: Type2<W, L, A>) => A
}

/**
 * @since 2.0.0
 */
export interface Comonad3<W extends URIS3> extends Extend3<W> {
  readonly extract: <U, L, A>(wa: Type3<W, U, L, A>) => A
}
