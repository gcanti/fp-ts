import { HKT, HKT2, HKT3 } from './HKT'
import { Functor, Functor2, Functor3, Functor2C, Functor3C } from './Functor'

/** @typeclass */
export interface Alt<F> extends Functor<F> {
  alt<A>(fx: HKT<F, A>, fy: HKT<F, A>): HKT<F, A>
}

export interface Alt2<F> extends Functor2<F> {
  alt<L, A>(fx: HKT2<F, L, A>, fy: HKT2<F, L, A>): HKT2<F, L, A>
}

export interface Alt3<F> extends Functor3<F> {
  alt<U, L, A>(fx: HKT3<F, U, L, A>, fy: HKT3<F, U, L, A>): HKT3<F, U, L, A>
}

export interface Alt2C<F, L> extends Functor2C<F, L> {
  alt<A>(fx: HKT2<F, L, A>, fy: HKT2<F, L, A>): HKT2<F, L, A>
}

export interface Alt3C<F, U, L> extends Functor3C<F, U, L> {
  alt<A>(fx: HKT3<F, U, L, A>, fy: HKT3<F, U, L, A>): HKT3<F, U, L, A>
}
