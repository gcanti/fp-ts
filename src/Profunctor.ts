import { HKT, HKTS } from './HKT'
import { StaticFunctor, FantasyFunctor } from './Functor'
import { identity } from './function'

export interface StaticProfunctor<F extends HKTS> extends StaticFunctor<F> {
  promap<A, B, C, D, V = any>(ab: (a: A) => B, cd: (c: C) => D, fbc: HKT<C, B, V>[F]): HKT<D, A, V>[F]
}

export interface FantasyProfunctor<F extends HKTS, B, C> extends FantasyFunctor<F, C> {
  promap<A, D, V = any>(ab: (a: A) => B, cd: (c: C) => D): HKT<D, A, V>[F]
}

export function lmap<F extends HKTS>(profunctor: StaticProfunctor<F>): <A, B, C, V = any>(f: (a: A) => B, fbc: HKT<C, B, V>[F]) => HKT<C, A, V>[F] {
  return <A, B, C>(f: (a: A) => B, fbc: HKT<C, B>[F]) => profunctor.promap<A, B, C, C>(f, identity, fbc)
}

export function rmap<F extends HKTS>(profunctor: StaticProfunctor<F>): <B, C, D, V = any>(f: (a: C) => D, fbc: HKT<C, B, V>[F]) => HKT<D, B, V>[F] {
  return <B, C, D>(f: (a: C) => D, fbc: HKT<C, B>[F]) => profunctor.map<C, D>(f, fbc)
}
