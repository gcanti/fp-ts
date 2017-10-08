import { HKT } from './HKT'
import { Functor } from './Functor'
import { Applicative } from './Applicative'
import { constant, tupleCurried } from './function'
import { liftA2 } from './Apply'

/**
 * Applicative functors are equivalent to strong lax monoidal functors
 * - https://wiki.haskell.org/Typeclassopedia#Alternative_formulation
 * - https://bartoszmilewski.com/2017/02/06/applicative-functors/
 */
export interface Monoidal<F> extends Functor<F> {
  unit(): HKT<F, void>
  mult<A, B>(fa: HKT<F, A>, fb: HKT<F, B>): HKT<F, [A, B]>
}

export const fromApplicative = <F>(applicative: Applicative<F>): Monoidal<F> => ({
  URI: applicative.URI,
  map: applicative.map,
  unit: () => applicative.of(undefined),
  mult: <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => liftA2(applicative)<A, B, [A, B]>(tupleCurried)(fa)(fb)
})

export const toApplicative = <F>(monoidal: Monoidal<F>): Applicative<F> => ({
  URI: monoidal.URI,
  map: monoidal.map,
  of: a => monoidal.map(constant(a), monoidal.unit()),
  ap: (fab, fa) => monoidal.map(([f, a]) => f(a), monoidal.mult(fab, fa))
})
