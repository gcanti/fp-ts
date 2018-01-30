import { HKT, HKT2, HKT3, URIS, URIS2, URIS3, Type, Type2, Type3 } from './HKT'
import { Functor, Functor1, Functor2, Functor3, Functor2C, Functor3C } from './Functor'
import { Applicative } from './Applicative'
import { constant, tupleCurried } from './function'
import { liftA2 } from './Apply'

/**
 * Applicative functors are equivalent to strong lax monoidal functors
 * - https://wiki.haskell.org/Typeclassopedia#Alternative_formulation
 * - https://bartoszmilewski.com/2017/02/06/applicative-functors/
 * @typeclass
 */
export interface Monoidal<F> extends Functor<F> {
  unit: () => HKT<F, void>
  mult<A, B>(fa: HKT<F, A>, fb: HKT<F, B>): HKT<F, [A, B]>
}

export interface Monoidal1<F extends URIS> extends Functor1<F> {
  unit: () => Type<F, void>
  mult<A, B>(fa: HKT<F, A>, fb: HKT<F, B>): Type<F, [A, B]>
}

export interface Monoidal2<F extends URIS2> extends Functor2<F> {
  unit: <L>() => Type2<F, L, void>
  mult<L, A, B>(fa: HKT2<F, L, A>, fb: HKT2<F, L, B>): Type2<F, L, [A, B]>
}

export interface Monoidal3<F extends URIS3> extends Functor3<F> {
  unit: <U, L>() => Type3<F, U, L, void>
  mult<U, L, A, B>(fa: HKT3<F, U, L, A>, fb: HKT3<F, U, L, B>): Type3<F, U, L, [A, B]>
}

export interface Monoidal2C<F extends URIS2, L> extends Functor2C<F, L> {
  unit: () => Type2<F, L, void>
  mult<A, B>(fa: HKT2<F, L, A>, fb: HKT2<F, L, B>): Type2<F, L, [A, B]>
}

export interface Monoidal3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
  unit: () => Type3<F, U, L, void>
  mult<A, B>(fa: HKT3<F, U, L, A>, fb: HKT3<F, U, L, B>): Type3<F, U, L, [A, B]>
}

/** @function */
export const fromApplicative = <F>(applicative: Applicative<F>): Monoidal<F> => {
  return {
    URI: applicative.URI,
    map: applicative.map,
    unit: () => applicative.of(undefined),
    mult: <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => liftA2(applicative)<A, B, [A, B]>(tupleCurried)(fa)(fb)
  }
}

/** @function */
export const toApplicative = <F>(monoidal: Monoidal<F>): Applicative<F> => {
  return {
    URI: monoidal.URI,
    map: monoidal.map,
    of: a => monoidal.map(monoidal.unit(), constant(a)),
    ap: (fab, fa) => monoidal.map(monoidal.mult(fab, fa), ([f, a]) => f(a))
  }
}
