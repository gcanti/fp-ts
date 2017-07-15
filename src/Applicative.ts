import { HKT, HKTS, HKT2S, URI2HKT, URI2HKT2 } from './HKT'
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
  of<A>(a: A): URI2HKT<URI2HKT<A>[G]>[F]
  ap<A, B>(fgab: URI2HKT<URI2HKT<(a: A) => B>[G]>[F], fga: URI2HKT<URI2HKT<A>[G]>[F]): URI2HKT<URI2HKT<B>[G]>[F]
}

export interface ApplicativeComposition12<F extends HKTS, G extends HKT2S> extends FunctorComposition12<F, G> {
  of<L, A>(a: A): URI2HKT<URI2HKT2<L, A>[G]>[F]
  ap<L, A, B>(
    fgab: URI2HKT<URI2HKT2<L, (a: A) => B>[G]>[F],
    fga: URI2HKT<URI2HKT2<L, A>[G]>[F]
  ): URI2HKT<URI2HKT2<L, B>[G]>[F]
}

export interface ApplicativeComposition21<F extends HKT2S, G extends HKTS> extends FunctorComposition21<F, G> {
  of<L, A>(a: A): URI2HKT2<L, URI2HKT<A>[G]>[F]
  ap<L, A, B>(
    fgab: URI2HKT2<L, URI2HKT<(a: A) => B>[G]>[F],
    fga: URI2HKT2<L, URI2HKT<A>[G]>[F]
  ): URI2HKT2<L, URI2HKT<B>[G]>[F]
}

export interface ApplicativeComposition22<F extends HKT2S, G extends HKT2S> extends FunctorComposition22<F, G> {
  of<L, M, A>(a: A): URI2HKT2<L, URI2HKT2<M, A>[G]>[F]
  ap<L, M, A, B>(
    fgab: URI2HKT2<L, URI2HKT2<M, (a: A) => B>[G]>[F],
    fga: URI2HKT2<L, URI2HKT2<M, A>[G]>[F]
  ): URI2HKT2<L, URI2HKT2<M, B>[G]>[F]
}

export class Ops {
  /** Perform a applicative action when a condition is true */
  when<F extends HKT2S>(F: Applicative<F>): <L>(condition: boolean, fu: URI2HKT2<L, void>[F]) => URI2HKT2<L, void>[F]
  when<F extends HKTS>(F: Applicative<F>): (condition: boolean, fu: URI2HKT<void>[F]) => URI2HKT<void>[F]
  when<F>(F: Applicative<F>): (condition: boolean, fu: HKT<F, void>) => HKT<F, void>
  when<F>(F: Applicative<F>): (condition: boolean, fu: HKT<F, void>) => HKT<F, void> {
    return (condition, fu) => (condition ? fu : F.of(undefined))
  }

  getApplicativeComposition<F extends HKT2S, G extends HKT2S>(
    F: Applicative<F>,
    G: Applicative<G>
  ): ApplicativeComposition22<F, G>
  getApplicativeComposition<F extends HKT2S, G extends HKTS>(
    F: Applicative<F>,
    G: Applicative<G>
  ): ApplicativeComposition21<F, G>
  getApplicativeComposition<F extends HKTS, G extends HKT2S>(
    F: Applicative<F>,
    G: Applicative<G>
  ): ApplicativeComposition12<F, G>
  getApplicativeComposition<F extends HKTS, G extends HKTS>(
    F: Applicative<F>,
    G: Applicative<G>
  ): ApplicativeComposition11<F, G>
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
