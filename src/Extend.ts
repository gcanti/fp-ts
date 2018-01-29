import { HKT, HKT2, HKT3, HKTS, HKT2S, HKTAs, HKT2As, HKT3S, HKT3As } from './HKT'
import { Functor, Functor2, Functor3, Functor2C, Functor3C } from './Functor'

/** @typeclass */
export interface Extend<F> extends Functor<F> {
  extend<A, B>(f: (fa: HKT<F, A>) => B, ea: HKT<F, A>): HKT<F, B>
}

export interface Extend2<F> extends Functor2<F> {
  extend<L, A, B>(f: (fa: HKT2<F, L, A>) => B, ea: HKT2<F, L, A>): HKT2<F, L, B>
}

export interface Extend3<F> extends Functor3<F> {
  extend<U, L, A, B>(f: (fa: HKT3<F, U, L, A>) => B, ea: HKT3<F, U, L, A>): HKT3<F, U, L, B>
}

export interface Extend2C<F, L> extends Functor2C<F, L> {
  extend<A, B>(f: (fa: HKT2<F, L, A>) => B, ea: HKT2<F, L, A>): HKT2<F, L, B>
}

export interface Extend3C<F, U, L> extends Functor3C<F, U, L> {
  extend<A, B>(f: (fa: HKT3<F, U, L, A>) => B, ea: HKT3<F, U, L, A>): HKT3<F, U, L, B>
}

export function duplicate<F extends HKT3S>(
  extend: Extend<F>
): <U, L, A>(ma: HKT3As<F, U, L, A>) => HKT3As<F, U, L, HKT3As<F, U, L, A>>
export function duplicate<F extends HKT2S>(
  extend: Extend<F>
): <L, A>(ma: HKT2As<F, L, A>) => HKT2As<F, L, HKT2As<F, L, A>>
export function duplicate<F extends HKTS>(extend: Extend<F>): <A>(ma: HKTAs<F, A>) => HKTAs<F, HKTAs<F, A>>
export function duplicate<F>(extend: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>>
/** @function */
export function duplicate<F>(extend: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>> {
  return ma => extend.extend(ma => ma, ma)
}
