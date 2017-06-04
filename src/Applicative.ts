import { HKT, HKTS } from './HKT'
import { getCompositionFunctor } from './Functor'
import { Apply, FantasyApply } from './Apply'

export interface Applicative<F extends HKTS> extends Apply<F> {
  of<A, U = any, V = any>(a: A): HKT<A, U, V>[F]
}

export interface FantasyApplicative<F extends HKTS, A> extends FantasyApply<F, A> {
  of<A, U = any, V = any>(a: A): HKT<A, U, V>[F]
}

/** returns the composition of two applicatives
 * Note: requires an implicit proof that HKT<A>[FG] ~ HKT<HKT<A>[G]>[F]
 */
export function getCompositionApplicative<FG extends HKTS, F extends HKTS, G extends HKTS>(
  URI: FG,
  applicativeF: Applicative<F>,
  applicativeG: Applicative<G>
): Applicative<FG> {
  const functor = getCompositionFunctor(URI, applicativeF, applicativeG)

  function of<A>(a: A): HKT<HKT<A>[G]>[F] {
    return applicativeF.of(applicativeG.of(a))
  }

  function ap<A, B>(fgab: HKT<HKT<(a: A) => B>[G]>[F], fga: HKT<HKT<A>[G]>[F]): HKT<HKT<B>[G]>[F] {
    return applicativeF.ap<HKT<A>[G], HKT<B>[G]>(
      applicativeF.map((h: HKT<(a: A) => B>[G]) => (ga: HKT<A>[G]) => applicativeG.ap<A, B>(h, ga), fgab),
      fga
    )
  }

  return {
    ...functor,
    of,
    ap: ap as any
  }
}

/** Perform a applicative action when a condition is true */
export function when<F extends HKTS>(
  applicative: Applicative<F>
): (condition: boolean, fu: HKT<void>[F]) => HKT<void>[F] {
  return (condition: boolean, fu: HKT<void>[F]) => {
    return condition ? fu : applicative.of(undefined)
  }
}
