import { HKT, HKTS, HKT2, HKT2S } from './HKT'
import { getFunctorComposition } from './Functor'
import { StaticPointed, FantasyPointed } from './Pointed'
import { StaticApply, FantasyApply } from './Apply'

export interface StaticApplicative<F extends HKTS> extends StaticPointed<F>, StaticApply<F> {}

export interface FantasyApplicative<F extends HKTS, A> extends FantasyPointed<F, A>, FantasyApply<F, A> {}

/** returns the composition of two applicatives */
export function getApplicativeComposition<FG extends HKTS>(URI: FG): <F extends HKTS, G extends HKTS>(applicativeF: StaticApplicative<F>, applicativeG: StaticApplicative<G>) => StaticApplicative<FG> {
  return <F extends HKTS, G extends HKTS>(applicativeF: StaticApplicative<F>, applicativeG: StaticApplicative<G>) => {
    const functor = getFunctorComposition(URI)(applicativeF, applicativeG)

    function of<A>(a: A): HKT<HKT<A>[G]>[F] {
      return applicativeF.of(applicativeG.of(a))
    }

    function ap<A, B>(fgab: HKT<HKT<(a: A) => B>[G]>[F], fga: HKT<HKT<A>[G]>[F]): HKT<HKT<B>[G]>[F] {
      return applicativeF.ap<HKT<A>[G], HKT<B>[G]>(applicativeF.map((h: HKT<(a: A) => B>[G]) => (ga: HKT<A>[G]) => applicativeG.ap<A, B>(h, ga), fgab), fga)
    }

    return {
      ...functor,
      of,
      ap
    }
  }
}

/** Perform a applicative action when a condition is true */
export function when<F extends HKT2S>(applicative: StaticApplicative<F>): <L>(condition: boolean, fu: HKT2<L, void>[F]) => HKT2<L, void>[F]
export function when<F extends HKTS>(applicative: StaticApplicative<F>): (condition: boolean, fu: HKT<void>[F]) => HKT<void>[F]
export function when<F extends HKTS>(applicative: StaticApplicative<F>): (condition: boolean, fu: HKT<void>[F]) => HKT<void>[F] {
  return (condition: boolean, fu: HKT<void>[F]) => {
    return condition ? fu : applicative.of(undefined)
  }
}
