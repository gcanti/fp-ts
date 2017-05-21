import { HKT, HKTS } from './HKT'
import { StaticFunctor, FantasyFunctor } from './Functor'
import { identity } from './function'

export interface StaticProfunctor<F extends HKTS> extends StaticFunctor<F> {
  promap<A, B, C, D>(ab: (a: A) => B, cd: (c: C) => D, fbc: HKT<C, B>[F]): HKT<D, A>[F]
}

export interface FantasyProfunctor<F extends HKTS, B, C> extends FantasyFunctor<F, C> {
  promap<A, D>(ab: (a: A) => B, cd: (c: C) => D): HKT<D, A>[F]
}

export function lmap<F extends HKTS>(profunctor: StaticProfunctor<F>): <A, B, C>(f: (a: A) => B, fbc: HKT<C, B>[F]) => HKT<C, A>[F] {
  return <A, B, C>(f: (a: A) => B, fbc: HKT<C, B>[F]) => profunctor.promap<A, B, C, C>(f, identity, fbc)
}

export function rmap<F extends HKTS>(profunctor: StaticProfunctor<F>): <B, C, D>(f: (a: C) => D, fbc: HKT<C, B>[F]) => HKT<D, B>[F] {
  return <B, C, D>(f: (a: C) => D, fbc: HKT<C, B>[F]) => profunctor.map<C, D>(f, fbc)
}
