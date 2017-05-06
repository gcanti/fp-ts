import { HKT, HKTS, HKT2, HKT2S } from './HKT'
import { StaticFunctor, FantasyFunctor } from './Functor'
import { Curried2, Curried3, Curried4, identity } from './function'

export interface StaticApply<F extends HKTS> extends StaticFunctor<F> {
  ap<A, B>(fab: HKT<(a: A) => B>[F], fa: HKT<A>[F]): HKT<B>[F]
}

export interface FantasyApply<F extends HKTS, A> extends FantasyFunctor<F, A> {
  ap<B>(fab: FantasyApply<F, (a: A) => B>): HKT<B>[F]
}

export function applySecond<F extends HKT2S>(apply: StaticApply<F>): <L, A, B>(fa: HKT2<L, A>[F], fb: HKT2<L, B>[F]) => HKT2<L, B>[F]
export function applySecond<F extends HKTS>(apply: StaticApply<F>): <A, B>(fa: HKT<A>[F], fb: HKT<B>[F]) => HKT<B>[F]
export function applySecond<F extends HKTS>(apply: StaticApply<F>): <A, B>(fa: HKT<A>[F], fb: HKT<B>[F]) => HKT<B>[F] {
  return <A, B>(fa: HKT<A>[F], fb: HKT<B>[F]) => apply.ap<B, B>(apply.map(() => identity, fa), fb)
}

export function applyFirst<F extends HKT2S>(apply: StaticApply<F>): <L, A, B>(fa: HKT2<L, A>[F], fb: HKT2<L, B>[F]) => HKT2<L, A>[F]
export function applyFirst<F extends HKTS>(apply: StaticApply<F>): <A, B>(fa: HKT<A>[F], fb: HKT<B>[F]) => HKT<A>[F]
export function applyFirst<F extends HKTS>(apply: StaticApply<F>): <A, B>(fa: HKT<A>[F], fb: HKT<B>[F]) => HKT<A>[F] {
  return <A, B>(fa: HKT<A>[F], fb: HKT<B>[F]) => apply.ap<A, A>(apply.map(() => identity, fb), fa)
}

export function liftA2<F extends HKT2S, A, B, C>(apply: StaticApply<F>, f: Curried2<A, B, C>): <P1>(fa: HKT2<P1, A>[F], fb: HKT2<P1, B>[F]) => HKT2<P1, C>[F]
export function liftA2<F extends HKTS, A, B, C>(apply: StaticApply<F>, f: Curried2<A, B, C>): (fa: HKT<A>[F], fb: HKT<B>[F]) => HKT<C>[F]
export function liftA2<F extends HKTS, A, B, C>(apply: StaticApply<F>, f: Curried2<A, B, C>): (fa: HKT<A>[F], fb: HKT<B>[F]) => HKT<C>[F] {
  return (fa, fb) => apply.ap<B, C>(apply.map(f, fa), fb)
}

export function liftA3<F extends HKT2S, A, B, C, D>(apply: StaticApply<F>, f: Curried3<A, B, C, D>): <P1>(fa: HKT2<P1, A>[F], fb: HKT2<P1, B>[F], fc: HKT2<P1, C>[F]) => HKT2<P1, D>[F]
export function liftA3<F extends HKTS, A, B, C, D>(apply: StaticApply<F>, f: Curried3<A, B, C, D>): (fa: HKT<A>[F], fb: HKT<B>[F], fc: HKT<C>[F]) => HKT<D>[F]
export function liftA3<F extends HKTS, A, B, C, D>(apply: StaticApply<F>, f: Curried3<A, B, C, D>): (fa: HKT<A>[F], fb: HKT<B>[F], fc: HKT<C>[F]) => HKT<D>[F] {
  return (fa, fb, fc) => apply.ap<C, D>(apply.ap<B, (c: C) => D>(apply.map(f, fa), fb), fc)
}

export function liftA4<F extends HKT2S, A, B, C, D, E>(apply: StaticApply<F>, f: Curried4<A, B, C, D, E>): <P1>(fa: HKT2<P1, A>[F], fb: HKT2<P1, B>[F], fc: HKT2<P1, C>[F], fd: HKT2<P1, D>[F]) => HKT2<P1, E>[F]
export function liftA4<F extends HKTS, A, B, C, D, E>(apply: StaticApply<F>, f: Curried4<A, B, C, D, E>): (fa: HKT<A>[F], fb: HKT<B>[F], fc: HKT<C>[F], fd: HKT<D>[F]) => HKT<E>[F]
export function liftA4<F extends HKTS, A, B, C, D, E>(apply: StaticApply<F>, f: Curried4<A, B, C, D, E>): (fa: HKT<A>[F], fb: HKT<B>[F], fc: HKT<C>[F], fd: HKT<D>[F]) => HKT<E>[F] {
  return (fa, fb, fc, fd) => apply.ap<D, E>(apply.ap<C, (d: D) => E>(apply.ap<B, Curried2<C, D, E>>(apply.map(f, fa), fb), fc), fd)
}
