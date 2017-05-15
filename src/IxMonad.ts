import { HKT3, HKT3S } from './HKT'
import { constant } from './function'

export interface StaticIxMonad<M extends HKT3S> {
  iof<A, I>(a: A): HKT3<I, I, A>[M]
  ichain<I, O, Z, A, B>(f: (a: A) => HKT3<O, Z, B>[M], fa: HKT3<I, O, A>[M]): HKT3<I, Z, B>[M]
}

export interface FantasyIxMonad<M extends HKT3S, I, O, A> {
  iof<Z, B>(b: B): HKT3<Z, Z, B>[M]
  ichain<Z, B>(f: (a: A) => HKT3<O, Z, B>[M]): HKT3<I, Z, B>[M]
}

export function iapplyFirst<M extends HKT3S>(ixmonad: StaticIxMonad<M>): <I, O, Z, A, B>(fa: HKT3<I, O, A>[M], fb: HKT3<O, Z, B>[M]) => HKT3<I, Z, A>[M] {
  return <I, O, Z, A, B>(fa: HKT3<I, O, A>[M], fb: HKT3<O, Z, B>[M]) => ixmonad.ichain(a => ixmonad.ichain(() => ixmonad.iof(a), fb), fa)
}

export function iapplySecond<M extends HKT3S>(ixmonad: StaticIxMonad<M>): <I, O, Z, A, B>(fa: HKT3<I, O, A>[M], fb: HKT3<O, Z, B>[M]) => HKT3<I, Z, B>[M] {
  return <I, O, Z, A, B>(fa: HKT3<I, O, A>[M], fb: HKT3<O, Z, B>[M]) => ixmonad.ichain(constant(fb), fa)
}
