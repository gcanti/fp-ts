import { HKT, HKT2, HKT3 } from './HKT'
import { Alt, Alt2, Alt3, Alt2C, Alt3C } from './Alt'

/** @typeclass */
export interface Plus<F> extends Alt<F> {
  zero: <A>() => HKT<F, A>
}

export interface Plus2<F> extends Alt2<F> {
  zero: <L, A>() => HKT2<F, L, A>
}

export interface Plus3<F> extends Alt3<F> {
  zero: <U, L, A>() => HKT3<F, U, L, A>
}

export interface Plus2C<F, L> extends Alt2C<F, L> {
  zero: <A>() => HKT2<F, L, A>
}

export interface Plus3C<F, U, L> extends Alt3C<F, U, L> {
  zero: <A>() => HKT3<F, U, L, A>
}
