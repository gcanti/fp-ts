import { HKT2, HKT2S, HKT2As, HKT3S, HKT3As } from './HKT'
import { Functor, FantasyFunctor } from './Functor'

export interface Profunctor<F> extends Functor<F> {
  promap<A, B, C, D>(f: (a: A) => B, g: (c: C) => D, fbc: HKT2<F, B, C>): HKT2<F, A, D>
}

export interface FantasyProfunctor<F, B, C> extends FantasyFunctor<F, C> {
  promap: <A, D>(f: (a: A) => B, g: (c: C) => D) => HKT2<F, A, D>
}

export class Ops {
  lmap<F extends HKT3S>(
    profunctor: Profunctor<F>
  ): <A, B>(f: (a: A) => B) => <U, C>(fbc: HKT3As<F, U, B, C>) => HKT3As<F, U, A, C>
  lmap<F extends HKT2S>(
    profunctor: Profunctor<F>
  ): <A, B>(f: (a: A) => B) => <C>(fbc: HKT2As<F, B, C>) => HKT2As<F, A, C>
  lmap<F>(profunctor: Profunctor<F>): <A, B>(f: (a: A) => B) => <C>(fbc: HKT2<F, B, C>) => HKT2<F, A, C>
  lmap<F>(profunctor: Profunctor<F>): <A, B>(f: (a: A) => B) => <C>(fbc: HKT2<F, B, C>) => HKT2<F, A, C> {
    return f => fbc => profunctor.promap(f, c => c, fbc)
  }

  rmap<F extends HKT3S>(
    profunctor: Profunctor<F>
  ): <C, D>(g: (c: C) => D) => <U, B>(fbc: HKT3As<F, U, B, C>) => HKT3As<F, U, B, D>
  rmap<F extends HKT2S>(
    profunctor: Profunctor<F>
  ): <C, D>(g: (c: C) => D) => <B>(fbc: HKT2As<F, B, C>) => HKT2As<F, B, D>
  rmap<F>(profunctor: Profunctor<F>): <C, D>(g: (c: C) => D) => <B>(fbc: HKT2<F, B, C>) => HKT2<F, B, D>
  rmap<F>(profunctor: Profunctor<F>): <C, D>(g: (c: C) => D) => <B>(fbc: HKT2<F, B, C>) => HKT2<F, B, D> {
    return g => fbc => profunctor.promap(b => b, g, fbc)
  }
}

const ops = new Ops()
export const lmap: Ops['lmap'] = ops.lmap
export const rmap: Ops['rmap'] = ops.rmap
