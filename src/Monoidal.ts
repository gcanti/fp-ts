import { HKT, HKTS } from './HKT'
import { Functor } from './Functor'
import { Applicative } from './Applicative'
import { tuple } from './Tuple'
import { constant } from './function'

/**
 * Applicative functors are equivalent to strong lax monoidal functors
 * - https://wiki.haskell.org/Typeclassopedia#Alternative_formulation
 * - https://bartoszmilewski.com/2017/02/06/applicative-functors/
 */
export interface Monoidal<F extends HKTS> extends Functor<F> {
  readonly URI: F
  unit<U = any, V = any>(): HKT<void, U, V>[F]
  mult<A, B, U = any, V = any>(fa: HKT<A, U, V>[F], fb: HKT<B, U, V>[F]): HKT<[A, B], U, V>[F]
}

export function fromApplicative<F extends HKTS>(applicative: Applicative<F>): Monoidal<F> {
  return {
    URI: applicative.URI,
    map: applicative.map,
    unit(): HKT<void>[F] {
      return applicative.of(undefined)
    },
    mult<A, B>(fa: HKT<A>[F], fb: HKT<B>[F]): HKT<[A, B]>[F] {
      return applicative.ap<B, [A, B]>(applicative.ap<A, (b: B) => [A, B]>(applicative.of(tuple), fa), fb)
    }
  }
}

export function toApplicative<F extends HKTS>(monoidal: Monoidal<F>): Applicative<F> {
  return {
    URI: monoidal.URI,
    map: monoidal.map,
    of<A>(a: A): HKT<A>[F] {
      return monoidal.map<void, A>(constant(a), monoidal.unit())
    },
    ap<A, B>(fab: HKT<(a: A) => B>[F], fa: HKT<A>[F]): HKT<B>[F] {
      return monoidal.map<[(a: A) => B, A], B>(([f, a]) => f(a), monoidal.mult<(a: A) => B, A>(fab, fa))
    }
  }
}
