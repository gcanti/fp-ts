import { HKT2, HKT2S } from './HKT'
import { StaticFunctor, FantasyFunctor } from './Functor'
import { identity } from './function'

export interface StaticProfunctor<F extends HKT2S> extends StaticFunctor<F> {
  promap<A, B, C, D>(ab: (a: A) => B, cd: (c: C) => D, fbc: HKT2<B, C>[F]): HKT2<A, D>[F]
}

export interface FantasyProfunctor<F extends HKT2S, B, C> extends FantasyFunctor<F, C> {
  promap<A, D>(ab: (a: A) => B, cd: (c: C) => D): HKT2<A, D>[F]
}

export function lmap<F extends HKT2S, A, B, C>(profunctor: StaticProfunctor<F>, f: (a: A) => B, fbc: HKT2<B, C>[F]): HKT2<A, C>[F] {
  return profunctor.promap<A, B, C, C>(f, identity, fbc)
}

export function rmap<F extends HKT2S, A, B, C>(profunctor: StaticProfunctor<F>, f: (a: B) => C, fab: HKT2<A, B>[F]): HKT2<A, C>[F] {
  return profunctor.map(f, fab)
}
