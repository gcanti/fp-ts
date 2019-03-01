import { Extend, Extend1, Extend2, Extend2C, Extend3, Extend3C } from './Extend'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'

/**
 * @since 1.0.0
 */
export interface Comonad<F> extends Extend<F> {
  readonly extract: <A>(ca: HKT<F, A>) => A
}

export interface Comonad1<F extends URIS> extends Extend1<F> {
  readonly extract: <A>(ca: Type<F, A>) => A
}

export interface Comonad2<F extends URIS2> extends Extend2<F> {
  readonly extract: <L, A>(ca: Type2<F, L, A>) => A
}

export interface Comonad3<F extends URIS3> extends Extend3<F> {
  readonly extract: <U, L, A>(ca: Type3<F, U, L, A>) => A
}

export interface Comonad2C<F extends URIS2, L> extends Extend2C<F, L> {
  readonly extract: <A>(ca: Type2<F, L, A>) => A
}

export interface Comonad3C<F extends URIS3, U, L> extends Extend3C<F, U, L> {
  readonly extract: <A>(ca: Type3<F, U, L, A>) => A
}
