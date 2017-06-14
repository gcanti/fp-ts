import { HKT, HKTS } from './HKT'
import { constant } from './function'

// Adapted from https://github.com/garyb/purescript-indexed-monad

export interface IxMonad<F extends HKTS> {
  readonly URI: F
  iof<I, A>(a: A): HKT<A, I, I>[F]
  ichain<I, O, Z, A, B>(f: (a: A) => HKT<B, Z, O>[F], fa: HKT<A, O, I>[F]): HKT<B, Z, I>[F]
}

export interface FantasyIxMonad<F extends HKTS, A, O, I> {
  iof<I, B>(b: B): HKT<B, I, I>[F]
  ichain<Z, B>(f: (a: A) => HKT<B, Z, O>[F]): HKT<B, Z, I>[F]
}

export function iapplyFirst<F extends HKTS>(
  ixmonad: IxMonad<F>
): <I, O, Z, A, B>(fa: HKT<A, O, I>[F], fb: HKT<B, Z, O>[F]) => HKT<A, Z, I>[F] {
  return <I, O, Z, A, B>(fa: HKT<A, O, I>[F], fb: HKT<B, Z, O>[F]) =>
    ixmonad.ichain(a => ixmonad.ichain(() => ixmonad.iof(a), fb), fa)
}

export function iapplySecond<F extends HKTS>(
  ixmonad: IxMonad<F>
): <I, O, Z, A, B>(fa: HKT<A, O, I>[F], fb: HKT<B, Z, O>[F]) => HKT<B, Z, I>[F] {
  return <I, O, Z, A, B>(fa: HKT<A, O, I>[F], fb: HKT<B, Z, O>[F]) => ixmonad.ichain(constant(fb), fa)
}
