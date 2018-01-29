import { HKT2, HKT3, HKT2S, HKT2As, HKT3S, HKT3As } from './HKT'

/** @typeclass */
export interface Profunctor<F> {
  map<L, A, B>(fa: HKT2<F, L, A>, f: (a: A) => B): HKT2<F, L, B>
  promap<A, B, C, D>(fbc: HKT2<F, B, C>, f: (a: A) => B, g: (c: C) => D): HKT2<F, A, D>
}

export interface Profunctor3<F, U> {
  map<U, L, A, B>(fa: HKT3<F, U, L, A>, f: (a: A) => B): HKT3<F, U, L, B>
  promap<A, B, C, D>(fbc: HKT3<F, U, B, C>, f: (a: A) => B, g: (c: C) => D): HKT3<F, U, A, D>
}

export function lmap<F extends HKT3S>(
  profunctor: Profunctor<F>
): <U, A, B, C>(fbc: HKT3As<F, U, B, C>, f: (a: A) => B) => HKT3As<F, U, A, C>
export function lmap<F extends HKT2S>(
  profunctor: Profunctor<F>
): <A, B, C>(fbc: HKT2As<F, B, C>, f: (a: A) => B) => HKT2As<F, A, C>
export function lmap<F>(profunctor: Profunctor<F>): <A, B, C>(fbc: HKT2<F, B, C>, f: (a: A) => B) => HKT2<F, A, C>
/** @function */
export function lmap<F>(profunctor: Profunctor<F>): <A, B, C>(fbc: HKT2<F, B, C>, f: (a: A) => B) => HKT2<F, A, C> {
  return (fbc, f) => profunctor.promap(fbc, f, c => c)
}

export function rmap<F extends HKT3S>(
  profunctor: Profunctor<F>
): <U, B, C, D>(fbc: HKT3As<F, U, B, C>, g: (c: C) => D) => HKT3As<F, U, B, D>
export function rmap<F extends HKT2S>(
  profunctor: Profunctor<F>
): <B, C, D>(fbc: HKT2As<F, B, C>, g: (c: C) => D) => HKT2As<F, B, D>
export function rmap<F>(profunctor: Profunctor<F>): <B, C, D>(fbc: HKT2<F, B, C>, g: (c: C) => D) => HKT2<F, B, D>
/** @function */
export function rmap<F>(profunctor: Profunctor<F>): <B, C, D>(fbc: HKT2<F, B, C>, g: (c: C) => D) => HKT2<F, B, D> {
  return (fbc, g) => profunctor.promap(fbc, b => b, g)
}
