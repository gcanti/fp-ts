import { HKT2, HKT3, URIS2, Type2, URIS3, Type3 } from './HKT'

/** @typeclass */
export interface Profunctor<F> {
  map<L, A, B>(fa: HKT2<F, L, A>, f: (a: A) => B): HKT2<F, L, B>
  promap<A, B, C, D>(fbc: HKT2<F, B, C>, f: (a: A) => B, g: (c: C) => D): HKT2<F, A, D>
}

export interface Profunctor3<F, U> {
  map<U, L, A, B>(fa: HKT3<F, U, L, A>, f: (a: A) => B): HKT3<F, U, L, B>
  promap<A, B, C, D>(fbc: HKT3<F, U, B, C>, f: (a: A) => B, g: (c: C) => D): HKT3<F, U, A, D>
}

export function lmap<F extends URIS3>(
  profunctor: Profunctor<F>
): <U, A, B, C>(fbc: HKT3<F, U, B, C>, f: (a: A) => B) => Type3<F, U, A, C>
export function lmap<F extends URIS2>(
  profunctor: Profunctor<F>
): <A, B, C>(fbc: HKT2<F, B, C>, f: (a: A) => B) => Type2<F, A, C>
export function lmap<F>(profunctor: Profunctor<F>): <A, B, C>(fbc: HKT2<F, B, C>, f: (a: A) => B) => HKT2<F, A, C>
/** @function */
export function lmap<F>(profunctor: Profunctor<F>): <A, B, C>(fbc: HKT2<F, B, C>, f: (a: A) => B) => HKT2<F, A, C> {
  return (fbc, f) => profunctor.promap(fbc, f, c => c)
}

export function rmap<F extends URIS3>(
  profunctor: Profunctor<F>
): <U, B, C, D>(fbc: HKT3<F, U, B, C>, g: (c: C) => D) => Type3<F, U, B, D>
export function rmap<F extends URIS2>(
  profunctor: Profunctor<F>
): <B, C, D>(fbc: HKT2<F, B, C>, g: (c: C) => D) => Type2<F, B, D>
export function rmap<F>(profunctor: Profunctor<F>): <B, C, D>(fbc: HKT2<F, B, C>, g: (c: C) => D) => HKT2<F, B, D>
/** @function */
export function rmap<F>(profunctor: Profunctor<F>): <B, C, D>(fbc: HKT2<F, B, C>, g: (c: C) => D) => HKT2<F, B, D> {
  return (fbc, g) => profunctor.promap(fbc, b => b, g)
}
