import { HKT2, HKT2S, HKT2As, HKT3S, HKT3As } from './HKT'
import { Functor } from './Functor'

/** @typeclass */
export interface Profunctor<F> extends Functor<F> {
  promap<A, B, C, D>(f: (a: A) => B, g: (c: C) => D, fbc: HKT2<F, B, C>): HKT2<F, A, D>
}

export function lmap<F extends HKT3S>(
  profunctor: Profunctor<F>
): <A, B>(f: (a: A) => B) => <U, C>(fbc: HKT3As<F, U, B, C>) => HKT3As<F, U, A, C>
export function lmap<F extends HKT2S>(
  profunctor: Profunctor<F>
): <A, B>(f: (a: A) => B) => <C>(fbc: HKT2As<F, B, C>) => HKT2As<F, A, C>
export function lmap<F>(profunctor: Profunctor<F>): <A, B>(f: (a: A) => B) => <C>(fbc: HKT2<F, B, C>) => HKT2<F, A, C>
/** @function */
export function lmap<F>(profunctor: Profunctor<F>): <A, B>(f: (a: A) => B) => <C>(fbc: HKT2<F, B, C>) => HKT2<F, A, C> {
  return f => fbc => profunctor.promap(f, c => c, fbc)
}

export function rmap<F extends HKT3S>(
  profunctor: Profunctor<F>
): <C, D>(g: (c: C) => D) => <U, B>(fbc: HKT3As<F, U, B, C>) => HKT3As<F, U, B, D>
export function rmap<F extends HKT2S>(
  profunctor: Profunctor<F>
): <C, D>(g: (c: C) => D) => <B>(fbc: HKT2As<F, B, C>) => HKT2As<F, B, D>
export function rmap<F>(profunctor: Profunctor<F>): <C, D>(g: (c: C) => D) => <B>(fbc: HKT2<F, B, C>) => HKT2<F, B, D>
/** @function */
export function rmap<F>(profunctor: Profunctor<F>): <C, D>(g: (c: C) => D) => <B>(fbc: HKT2<F, B, C>) => HKT2<F, B, D> {
  return g => fbc => profunctor.promap(b => b, g, fbc)
}
