import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Apply, FantasyApply } from './Apply'
import {
  getFunctorComposition,
  FunctorComposition,
  FunctorComposition11,
  FunctorComposition12,
  FunctorComposition21,
  FunctorComposition22
} from './Functor'

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

export interface ApplicativeComposition11<F extends HKTS, G extends HKTS> extends FunctorComposition11<F, G> {
  of<A>(a: A): HKTAs<F, HKTAs<G, A>>
  ap<A, B>(fgab: HKTAs<F, HKTAs<G, (a: A) => B>>, fga: HKTAs<F, HKTAs<G, A>>): HKTAs<F, HKTAs<G, B>>
}

export interface ApplicativeComposition12<F extends HKTS, G extends HKT2S> extends FunctorComposition12<F, G> {
  of<L, A>(a: A): HKTAs<F, HKT2As<G, L, A>>
  ap<L, A, B>(fgab: HKTAs<F, HKT2As<G, L, (a: A) => B>>, fga: HKTAs<F, HKT2As<G, L, A>>): HKTAs<F, HKT2As<G, L, B>>
}

export interface ApplicativeComposition21<F extends HKT2S, G extends HKTS> extends FunctorComposition21<F, G> {
  of<L, A>(a: A): HKT2As<F, L, HKTAs<G, A>>
  ap<L, A, B>(fgab: HKT2As<F, L, HKTAs<G, (a: A) => B>>, fga: HKT2As<F, L, HKTAs<G, A>>): HKT2As<F, L, HKTAs<G, B>>
}

export interface ApplicativeComposition22<F extends HKT2S, G extends HKT2S> extends FunctorComposition22<F, G> {
  of<L, M, A>(a: A): HKT2As<F, L, HKT2As<G, M, A>>
  ap<L, M, A, B>(
    fgab: HKT2As<F, L, HKT2As<G, M, (a: A) => B>>,
    fga: HKT2As<F, L, HKT2As<G, M, A>>
  ): HKT2As<F, L, HKT2As<G, M, B>>
}

export class Ops {
  /** Perform a applicative action when a condition is true */
  when<F extends HKT2S>(F: Applicative<F>): (condition: boolean) => <L>(fu: HKT2As<F, L, void>) => HKT2As<F, L, void>
  when<F extends HKTS>(F: Applicative<F>): (condition: boolean) => (fu: HKTAs<F, void>) => HKTAs<F, void>
  when<F>(F: Applicative<F>): (condition: boolean) => (fu: HKT<F, void>) => HKT<F, void>
  when<F>(F: Applicative<F>): (condition: boolean) => (fu: HKT<F, void>) => HKT<F, void> {
    return condition => fu => (condition ? fu : F.of(undefined))
  }

  getApplicativeComposition<F extends HKT2S>(
    F: Applicative<F>
  ): <G extends HKT2S>(G: Applicative<G>) => ApplicativeComposition22<F, G>
  getApplicativeComposition<F extends HKT2S>(
    F: Applicative<F>
  ): <G extends HKTS>(G: Applicative<G>) => ApplicativeComposition21<F, G>
  getApplicativeComposition<F extends HKTS>(
    F: Applicative<F>
  ): <G extends HKT2S>(G: Applicative<G>) => ApplicativeComposition12<F, G>
  getApplicativeComposition<F extends HKTS>(
    F: Applicative<F>
  ): <G extends HKTS>(G: Applicative<G>) => ApplicativeComposition11<F, G>
  getApplicativeComposition<F>(F: Applicative<F>): <G>(G: Applicative<G>) => ApplicativeComposition<F, G>
  getApplicativeComposition<F>(F: Applicative<F>): <G>(G: Applicative<G>) => ApplicativeComposition<F, G> {
    return <G>(G: Applicative<G>) => {
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
}

const ops = new Ops()
export const when: Ops['when'] = ops.when
export const getApplicativeComposition: Ops['getApplicativeComposition'] = ops.getApplicativeComposition
