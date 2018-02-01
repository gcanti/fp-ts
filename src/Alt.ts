import { HKT, URIS, URIS2, URIS3, Type, Type2, Type3 } from './HKT'
import { Functor, Functor1, Functor2, Functor3, Functor2C, Functor3C } from './Functor'

/** @typeclass */
export interface Alt<F> extends Functor<F> {
  alt: <A>(fx: HKT<F, A>, fy: HKT<F, A>) => HKT<F, A>
}

export interface Alt1<F extends URIS> extends Functor1<F> {
  alt: <A>(fx: Type<F, A>, fy: Type<F, A>) => Type<F, A>
}

export interface Alt2<F extends URIS2> extends Functor2<F> {
  alt: <L, A>(fx: Type2<F, L, A>, fy: Type2<F, L, A>) => Type2<F, L, A>
}

export interface Alt3<F extends URIS3> extends Functor3<F> {
  alt: <U, L, A>(fx: Type3<F, U, L, A>, fy: Type3<F, U, L, A>) => Type3<F, U, L, A>
}

export interface Alt2C<F extends URIS2, L> extends Functor2C<F, L> {
  alt: <A>(fx: Type2<F, L, A>, fy: Type2<F, L, A>) => Type2<F, L, A>
}

export interface Alt3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
  alt: <A>(fx: Type3<F, U, L, A>, fy: Type3<F, U, L, A>) => Type3<F, U, L, A>
}
