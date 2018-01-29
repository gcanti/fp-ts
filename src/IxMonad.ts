import { HKT3, HKT3S, HKT3As } from './HKT'
import { constant } from './function'

// Adapted from https://github.com/garyb/purescript-indexed-monad

/** @typeclass */
export interface IxMonad<F> {
  readonly URI: F
  iof<I, A>(a: A): HKT3<F, I, I, A>
  ichain<I, O, Z, A, B>(fa: HKT3<F, I, O, A>, f: (a: A) => HKT3<F, O, Z, B>): HKT3<F, I, Z, B>
}

export function iapplyFirst<F extends HKT3S>(
  ixmonad: IxMonad<F>
): <I, O, A>(fa: HKT3As<F, I, O, A>) => <Z, B>(fb: HKT3As<F, O, Z, B>) => HKT3As<F, I, Z, A>
export function iapplyFirst<F>(
  ixmonad: IxMonad<F>
): <I, O, A>(fa: HKT3<F, I, O, A>) => <Z, B>(fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, A>
/** @function */
export function iapplyFirst<F>(
  ixmonad: IxMonad<F>
): <I, O, A>(fa: HKT3<F, I, O, A>) => <Z, B>(fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, A> {
  return fa => fb => ixmonad.ichain(fa, a => ixmonad.ichain(fb, () => ixmonad.iof(a)))
}

export function iapplySecond<F extends HKT3S>(
  ixmonad: IxMonad<F>
): <I, O, A>(fa: HKT3As<F, I, O, A>) => <Z, B>(fb: HKT3As<F, O, Z, B>) => HKT3As<F, I, Z, B>
export function iapplySecond<F>(
  ixmonad: IxMonad<F>
): <I, O, A>(fa: HKT3<F, I, O, A>) => <Z, B>(fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, B>
/** @function */
export function iapplySecond<F>(
  ixmonad: IxMonad<F>
): <I, O, A>(fa: HKT3<F, I, O, A>) => <Z, B>(fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, B> {
  return fa => fb => ixmonad.ichain(fa, constant(fb))
}
