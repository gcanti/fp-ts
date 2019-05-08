import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C } from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'

/**
 * @since 2.0.0
 */
export interface Extend<W> extends Functor<W> {
  readonly extend: <A, B>(wa: HKT<W, A>, f: (fa: HKT<W, A>) => B) => HKT<W, B>
}

export interface Extend1<W extends URIS> extends Functor1<W> {
  readonly extend: <A, B>(wa: Type<W, A>, f: (fa: Type<W, A>) => B) => Type<W, B>
}

export interface Extend2<W extends URIS2> extends Functor2<W> {
  readonly extend: <L, A, B>(wa: Type2<W, L, A>, f: (fa: Type2<W, L, A>) => B) => Type2<W, L, B>
}

export interface Extend3<W extends URIS3> extends Functor3<W> {
  readonly extend: <U, L, A, B>(wa: Type3<W, U, L, A>, f: (fa: Type3<W, U, L, A>) => B) => Type3<W, U, L, B>
}

export interface Extend2C<W extends URIS2, L> extends Functor2C<W, L> {
  readonly extend: <A, B>(wa: Type2<W, L, A>, f: (fa: Type2<W, L, A>) => B) => Type2<W, L, B>
}

export interface Extend3C<W extends URIS3, U, L> extends Functor3C<W, U, L> {
  readonly extend: <A, B>(wa: Type3<W, U, L, A>, f: (fa: Type3<W, U, L, A>) => B) => Type3<W, U, L, B>
}
