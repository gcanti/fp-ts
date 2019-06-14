import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor4 } from './Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3, URIS4, Kind4 } from './HKT'

/**
 * @since 2.0.0
 */
export interface Extend<W> extends Functor<W> {
  readonly extend: <A, B>(wa: HKT<W, A>, f: (wa: HKT<W, A>) => B) => HKT<W, B>
}

/**
 * @since 2.0.0
 */
export interface Extend1<W extends URIS> extends Functor1<W> {
  readonly extend: <A, B>(wa: Kind<W, A>, f: (wa: Kind<W, A>) => B) => Kind<W, B>
}

/**
 * @since 2.0.0
 */
export interface Extend2<W extends URIS2> extends Functor2<W> {
  readonly extend: <L, A, B>(wa: Kind2<W, L, A>, f: (wa: Kind2<W, L, A>) => B) => Kind2<W, L, B>
}

/**
 * @since 2.0.0
 */
export interface Extend2C<W extends URIS2, L> extends Functor2C<W, L> {
  readonly extend: <A, B>(wa: Kind2<W, L, A>, f: (wa: Kind2<W, L, A>) => B) => Kind2<W, L, B>
}

/**
 * @since 2.0.0
 */
export interface Extend3<W extends URIS3> extends Functor3<W> {
  readonly extend: <U, L, A, B>(wa: Kind3<W, U, L, A>, f: (wa: Kind3<W, U, L, A>) => B) => Kind3<W, U, L, B>
}

/**
 * @since 2.0.0
 */
export interface Extend4<W extends URIS4> extends Functor4<W> {
  readonly extend: <X, U, L, A, B>(wa: Kind4<W, X, U, L, A>, f: (wa: Kind4<W, X, U, L, A>) => B) => Kind4<W, X, U, L, B>
}
