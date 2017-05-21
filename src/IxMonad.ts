import { HKT, HKTS } from './HKT'
import { constant } from './function'

export interface StaticIxMonad<M extends HKTS> {
  iof<A, I>(a: A): HKT<I, I, A>[M]
  ichain<I, O, Z, A, B>(f: (a: A) => HKT<O, Z, B>[M], fa: HKT<I, O, A>[M]): HKT<I, Z, B>[M]
}

export interface FantasyIxMonad<M extends HKTS, I, O, A> {
  iof<Z, B>(b: B): HKT<Z, Z, B>[M]
  ichain<Z, B>(f: (a: A) => HKT<O, Z, B>[M]): HKT<I, Z, B>[M]
}

export function iapplyFirst<M extends HKTS>(ixmonad: StaticIxMonad<M>): <I, O, Z, A, B>(fa: HKT<I, O, A>[M], fb: HKT<O, Z, B>[M]) => HKT<I, Z, A>[M] {
  return <I, O, Z, A, B>(fa: HKT<I, O, A>[M], fb: HKT<O, Z, B>[M]) => ixmonad.ichain(a => ixmonad.ichain(() => ixmonad.iof(a), fb), fa)
}

export function iapplySecond<M extends HKTS>(ixmonad: StaticIxMonad<M>): <I, O, Z, A, B>(fa: HKT<I, O, A>[M], fb: HKT<O, Z, B>[M]) => HKT<I, Z, B>[M] {
  return <I, O, Z, A, B>(fa: HKT<I, O, A>[M], fb: HKT<O, Z, B>[M]) => ixmonad.ichain(constant(fb), fa)
}
