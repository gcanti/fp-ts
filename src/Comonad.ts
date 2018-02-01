import { HKT, URIS, URIS2, URIS3, Type, Type2, Type3 } from './HKT'
import { Extend, Extend1, Extend2, Extend3, Extend2C, Extend3C } from './Extend'

/** @typeclass */
export interface Comonad<F> extends Extend<F> {
  extract: <A>(ca: HKT<F, A>) => A
}

export interface Comonad1<F extends URIS> extends Extend1<F> {
  extract: <A>(ca: Type<F, A>) => A
}

export interface Comonad2<F extends URIS2> extends Extend2<F> {
  extract: <L, A>(ca: Type2<F, L, A>) => A
}

export interface Comonad3<F extends URIS3> extends Extend3<F> {
  extract: <U, L, A>(ca: Type3<F, U, L, A>) => A
}

export interface Comonad2C<F extends URIS2, L> extends Extend2C<F, L> {
  extract: <A>(ca: Type2<F, L, A>) => A
}

export interface Comonad3C<F extends URIS3, U, L> extends Extend3C<F, U, L> {
  extract: <A>(ca: Type3<F, U, L, A>) => A
}
