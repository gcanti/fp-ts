import { HKT } from './HKT'
import { Apply, FantasyApply } from './Apply'
import { getFunctorComposition, FunctorComposition } from './Functor'
import './overloadings'

export interface Applicative<F> extends Apply<F> {
  of<A>(a: A): HKT<F, A>
}

export interface FantasyApplicative<F, A> extends FantasyApply<F, A> {
  of<A>(a: A): HKT<F, A>
}

export interface ApplicativeComposition<F, G> extends FunctorComposition<F, G> {
  of<A>(a: A): HKT<F, HKT<G, A>>
  ap<A, B>(fgab: HKT<F, HKT<G, (a: A) => B>>, fga: HKT<F, HKT<G, A>>): HKT<F, HKT<G, B>>
}

export class Ops {
  /** Perform a applicative action when a condition is true */
  when<F>(F: Applicative<F>): (condition: boolean, fu: HKT<F, void>) => HKT<F, void>
  when<F>(F: Applicative<F>): (condition: boolean, fu: HKT<F, void>) => HKT<F, void> {
    return (condition, fu) => (condition ? fu : F.of(undefined))
  }

  getApplicativeComposition<F, G>(F: Applicative<F>, G: Applicative<G>): ApplicativeComposition<F, G>
  getApplicativeComposition<F, G>(F: Applicative<F>, G: Applicative<G>): ApplicativeComposition<F, G> {
    const { map } = getFunctorComposition(F, G)

    function of<A>(a: A): HKT<F, HKT<G, A>> {
      return F.of(G.of(a))
    }

    function ap<A, B>(fgab: HKT<F, HKT<G, (a: A) => B>>, fga: HKT<F, HKT<G, A>>): HKT<F, HKT<G, B>> {
      return F.ap(F.map(h => (ga: HKT<G, A>) => G.ap<A, B>(h, ga), fgab), fga)
    }

    return {
      map,
      of,
      ap
    }
  }
}

const ops = new Ops()
export const when: Ops['when'] = ops.when
export const getApplicativeComposition: Ops['getApplicativeComposition'] = ops.getApplicativeComposition
