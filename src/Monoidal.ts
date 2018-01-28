import { HKT } from './HKT'
import { Functor } from './Functor'
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
  unit(): HKT<F, void>
  mult<A, B>(fa: HKT<F, A>, fb: HKT<F, B>): HKT<F, [A, B]>
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
