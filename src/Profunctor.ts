import { HKT2 } from './HKT'
import { Functor, FantasyFunctor } from './Functor'

export interface Profunctor<F> extends Functor<F> {
  promap<A, B, C, D>(f: (a: A) => B, g: (c: C) => D, fbc: HKT2<F, B, C>): HKT2<F, A, D>
}

export interface FantasyProfunctor<F, B, C> extends FantasyFunctor<F, C> {
  promap<A, D>(f: (a: A) => B, g: (c: C) => D): HKT2<F, A, D>
}

export function lmap<F>(profunctor: Profunctor<F>): <A, B, C>(f: (a: A) => B, fbc: HKT2<F, B, C>) => HKT2<F, A, C> {
  return (f, fbc) => profunctor.promap(f, c => c, fbc)
}

export function rmap<F>(profunctor: Profunctor<F>): <B, C, D>(g: (c: C) => D, fbc: HKT2<F, B, C>) => HKT2<F, B, D> {
  return <B, C, D>(g: (c: C) => D, fbc: HKT2<F, B, C>) => profunctor.promap((b: B) => b, g, fbc)
}
