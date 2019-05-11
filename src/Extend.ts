import { Functor, Functor1, Functor2, Functor2C, Functor3 } from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'

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
  readonly extend: <A, B>(wa: Type<W, A>, f: (wa: Type<W, A>) => B) => Type<W, B>
}

/**
 * @since 2.0.0
 */
export interface Extend2<W extends URIS2> extends Functor2<W> {
  readonly extend: <L, A, B>(wa: Type2<W, L, A>, f: (wa: Type2<W, L, A>) => B) => Type2<W, L, B>
}

/**
 * @since 2.0.0
 */
export interface Extend2C<W extends URIS2, L> extends Functor2C<W, L> {
  readonly extend: <A, B>(wa: Type2<W, L, A>, f: (wa: Type2<W, L, A>) => B) => Type2<W, L, B>
}

/**
 * @since 2.0.0
 */
export interface Extend3<W extends URIS3> extends Functor3<W> {
  readonly extend: <U, L, A, B>(wa: Type3<W, U, L, A>, f: (wa: Type3<W, U, L, A>) => B) => Type3<W, U, L, B>
}
