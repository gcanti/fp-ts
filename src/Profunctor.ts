import { HKT2 } from './HKT'
import { Functor, FantasyFunctor } from './Functor'

export interface Profunctor<F> extends Functor<F> {
  promap: <A, B, C, D>(f: (a: A) => B, g: (c: C) => D) => (fbc: HKT2<F, B, C>) => HKT2<F, A, D>
}

export interface FantasyProfunctor<F, B, C> extends FantasyFunctor<F, C> {
  promap: <A, D>(f: (a: A) => B, g: (c: C) => D) => HKT2<F, A, D>
}

export const lmap = <F>(profunctor: Profunctor<F>) => <A, B>(f: (a: A) => B) => <C>(
  fbc: HKT2<F, B, C>
): HKT2<F, A, C> => profunctor.promap(f, (c: C) => c)(fbc)

export const rmap = <F>(profunctor: Profunctor<F>) => <C, D>(g: (c: C) => D) => <B>(
  fbc: HKT2<F, B, C>
): HKT2<F, B, D> => profunctor.promap((b: B) => b, g)(fbc)
