import { HKT3, Type3, URIS3 } from './HKT'
import { constant } from './function'

// Adapted from https://github.com/garyb/purescript-indexed-monad

/**
 * @typeclass
 * @since 1.0.0
 */
export interface IxMonad<F> {
  readonly URI: F
  readonly iof: <I, A>(a: A) => HKT3<F, I, I, A>
  readonly ichain: <I, O, Z, A, B>(fa: HKT3<F, I, O, A>, f: (a: A) => HKT3<F, O, Z, B>) => HKT3<F, I, Z, B>
}

export interface IxMonad3<F extends URIS3> {
  readonly URI: F
  readonly iof: <I, A>(a: A) => Type3<F, I, I, A>
  readonly ichain: <I, O, Z, A, B>(fa: Type3<F, I, O, A>, f: (a: A) => Type3<F, O, Z, B>) => Type3<F, I, Z, B>
}

export function iapplyFirst<F extends URIS3>(
  ixmonad: IxMonad3<F>
): <I, O, A, Z, B>(fa: Type3<F, I, O, A>, fb: Type3<F, O, Z, B>) => Type3<F, I, Z, A>
export function iapplyFirst<F>(
  ixmonad: IxMonad<F>
): <I, O, A, Z, B>(fa: HKT3<F, I, O, A>, fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, A>
/**
 * @function
 * @since 1.0.0
 */
export function iapplyFirst<F>(
  ixmonad: IxMonad<F>
): <I, O, A, Z, B>(fa: HKT3<F, I, O, A>, fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, A> {
  return (fa, fb) => ixmonad.ichain(fa, a => ixmonad.ichain(fb, () => ixmonad.iof(a)))
}

export function iapplySecond<F extends URIS3>(
  ixmonad: IxMonad3<F>
): <I, O, A, Z, B>(fa: Type3<F, I, O, A>, fb: Type3<F, O, Z, B>) => Type3<F, I, Z, B>
export function iapplySecond<F>(
  ixmonad: IxMonad<F>
): <I, O, A, Z, B>(fa: HKT3<F, I, O, A>, fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, B>
/**
 * @function
 * @since 1.0.0
 */
export function iapplySecond<F>(
  ixmonad: IxMonad<F>
): <I, O, A, Z, B>(fa: HKT3<F, I, O, A>, fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, B> {
  return (fa, fb) => ixmonad.ichain(fa, constant(fb))
}
