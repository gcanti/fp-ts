import { HKT, HKT2, HKT3, URIS, URIS2, URIS3, Type, Type2, Type3 } from './HKT'
import { Functor, Functor1, Functor2, Functor3, Functor2C, Functor3C } from './Functor'

/** @typeclass */
export interface Extend<F> extends Functor<F> {
  extend<A, B>(f: (fa: HKT<F, A>) => B, ea: HKT<F, A>): HKT<F, B>
}

export interface Extend1<F extends URIS> extends Functor1<F> {
  extend<A, B>(f: (fa: HKT<F, A>) => B, ea: HKT<F, A>): Type<F, B>
}

export interface Extend2<F extends URIS2> extends Functor2<F> {
  extend<L, A, B>(f: (fa: HKT2<F, L, A>) => B, ea: HKT2<F, L, A>): Type2<F, L, B>
}

export interface Extend3<F extends URIS3> extends Functor3<F> {
  extend<U, L, A, B>(f: (fa: HKT3<F, U, L, A>) => B, ea: HKT3<F, U, L, A>): Type3<F, U, L, B>
}

export interface Extend2C<F extends URIS2, L> extends Functor2C<F, L> {
  extend<A, B>(f: (fa: HKT2<F, L, A>) => B, ea: HKT2<F, L, A>): Type2<F, L, B>
}

export interface Extend3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
  extend<A, B>(f: (fa: HKT3<F, U, L, A>) => B, ea: HKT3<F, U, L, A>): Type3<F, U, L, B>
}

export function duplicate<F extends URIS3>(
  extend: Extend<F>
): <U, L, A>(ma: HKT3<F, U, L, A>) => Type3<F, U, L, Type3<F, U, L, A>>
export function duplicate<F extends URIS2>(extend: Extend<F>): <L, A>(ma: HKT2<F, L, A>) => Type2<F, L, Type2<F, L, A>>
export function duplicate<F extends URIS>(extend: Extend<F>): <A>(ma: HKT<F, A>) => Type<F, Type<F, A>>
export function duplicate<F>(extend: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>>
/** @function */
export function duplicate<F>(extend: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>> {
  return ma => extend.extend(ma => ma, ma)
}
