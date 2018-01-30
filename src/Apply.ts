import { HKT, URIS, URIS2, Type, Type2, URIS3, Type3, HKT2, HKT3 } from './HKT'
import { Functor, Functor1, Functor2, Functor3, Functor2C, Functor3C } from './Functor'
import { Curried2, Curried3, Curried4, constant } from './function'

/** @typeclass */
export interface Apply<F> extends Functor<F> {
  ap<A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>): HKT<F, B>
}

export interface Apply1<F extends URIS> extends Functor1<F> {
  ap<A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>): Type<F, B>
}

export interface Apply2<F extends URIS2> extends Functor2<F> {
  ap<L, A, B>(fab: HKT2<F, L, (a: A) => B>, fa: HKT2<F, L, A>): Type2<F, L, B>
}

export interface Apply3<F extends URIS3> extends Functor3<F> {
  ap<U, L, A, B>(fab: HKT3<F, U, L, (a: A) => B>, fa: HKT3<F, U, L, A>): Type3<F, U, L, B>
}

export interface Apply2C<F extends URIS2, L> extends Functor2C<F, L> {
  ap<A, B>(fab: HKT2<F, L, (a: A) => B>, fa: HKT2<F, L, A>): Type2<F, L, B>
}

export interface Apply3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
  ap<A, B>(fab: HKT3<F, U, L, (a: A) => B>, fa: HKT3<F, U, L, A>): Type3<F, U, L, B>
}

/** Combine two effectful actions, keeping only the result of the first */
export function applyFirst<F extends URIS3>(
  F: Apply<F>
): <U, L, A, B>(fa: HKT3<F, U, L, A>, fb: HKT3<F, U, L, B>) => Type3<F, U, L, A>
export function applyFirst<F extends URIS2>(
  F: Apply<F>
): <L, A, B>(fa: HKT2<F, L, A>, fb: HKT2<F, L, B>) => Type2<F, L, A>
export function applyFirst<F extends URIS>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => Type<F, A>
export function applyFirst<F>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, A>
/**
 * Combine two effectful actions, keeping only the result of the first
 * @function
 */
export function applyFirst<F>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, A> {
  return (fa, fb) => F.ap(F.map(fa, a => constant(a)), fb)
}

/** Combine two effectful actions, keeping only the result of the second */
export function applySecond<F extends URIS3>(
  F: Apply<F>
): <U, L, A, B>(fa: HKT3<F, U, L, A>, fb: HKT3<F, U, L, B>) => Type3<F, U, L, B>
export function applySecond<F extends URIS2>(
  F: Apply<F>
): <L, A, B>(fa: HKT2<F, L, A>, fb: HKT2<F, L, B>) => Type2<F, L, B>
export function applySecond<F extends URIS>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => Type<F, B>
export function applySecond<F>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, B>
/**
 * Combine two effectful actions, keeping only the result of the second
 * @function
 */
export function applySecond<F>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, B> {
  return <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => F.ap(F.map(fa, () => (b: B) => b), fb)
}

/**
 * Lift a function of two arguments to a function which accepts and returns values wrapped with the type constructor `F`
 */
export function liftA2<F extends URIS3>(
  F: Apply<F>
): <A, B, C>(f: Curried2<A, B, C>) => <U, L>(fa: HKT3<F, U, L, A>) => (fb: HKT3<F, U, L, B>) => Type3<F, U, L, C>
export function liftA2<F extends URIS2>(
  F: Apply<F>
): <A, B, C>(f: Curried2<A, B, C>) => <L>(fa: HKT2<F, L, A>) => (fb: HKT2<F, L, B>) => Type2<F, L, C>
export function liftA2<F extends URIS>(
  F: Apply<F>
): <A, B, C>(f: Curried2<A, B, C>) => Curried2<HKT<F, A>, HKT<F, B>, Type<F, C>>
export function liftA2<F>(F: Apply<F>): <A, B, C>(f: Curried2<A, B, C>) => Curried2<HKT<F, A>, HKT<F, B>, HKT<F, C>>
/**
 * Lift a function of two arguments to a function which accepts and returns values wrapped with the type constructor `F`
 * @function
 */
export function liftA2<F>(F: Apply<F>): <A, B, C>(f: Curried2<A, B, C>) => Curried2<HKT<F, A>, HKT<F, B>, HKT<F, C>> {
  return f => fa => fb => F.ap(F.map(fa, f), fb)
}

/**
 * Lift a function of three arguments to a function which accepts and returns values wrapped with the type constructor `F`
 */
export function liftA3<F extends URIS3>(
  F: Apply<F>
): <A, B, C, D>(
  f: Curried3<A, B, C, D>
) => <U, L>(fa: HKT3<F, U, L, A>) => (fb: HKT3<F, U, L, B>) => (fc: HKT3<F, U, L, C>) => Type3<F, U, L, D>
export function liftA3<F extends URIS2>(
  F: Apply<F>
): <A, B, C, D>(
  f: Curried3<A, B, C, D>
) => <L>(fa: HKT2<F, L, A>) => (fb: HKT2<F, L, B>) => (fc: HKT2<F, L, C>) => Type2<F, L, D>
export function liftA3<F extends URIS>(
  F: Apply<F>
): <A, B, C, D>(f: Curried3<A, B, C, D>) => Curried3<HKT<F, A>, HKT<F, B>, HKT<F, C>, Type<F, D>>
export function liftA3<F>(
  F: Apply<F>
): <A, B, C, D>(f: Curried3<A, B, C, D>) => Curried3<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>>
/**
 * Lift a function of three arguments to a function which accepts and returns values wrapped with the type constructor `F`
 * @function
 */
export function liftA3<F>(
  F: Apply<F>
): <A, B, C, D>(f: Curried3<A, B, C, D>) => Curried3<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>> {
  return f => fa => fb => fc => F.ap(F.ap(F.map(fa, f), fb), fc)
}

/**
 * Lift a function of four arguments to a function which accepts and returns values wrapped with the type constructor `F`
 */
export function liftA4<F extends URIS3>(
  F: Apply<F>
): <A, B, C, D, E>(
  f: Curried4<A, B, C, D, E>
) => <U, L>(
  fa: HKT3<F, U, L, A>
) => (fb: HKT3<F, U, L, B>) => (fc: HKT3<F, U, L, C>) => (fd: HKT3<F, U, L, D>) => Type3<F, U, L, E>
export function liftA4<F extends URIS2>(
  F: Apply<F>
): <A, B, C, D, E>(
  f: Curried4<A, B, C, D, E>
) => <L>(fa: HKT2<F, L, A>) => (fb: HKT2<F, L, B>) => (fc: HKT2<F, L, C>) => (fd: HKT2<F, L, D>) => Type2<F, L, E>
export function liftA4<F extends URIS>(
  F: Apply<F>
): <A, B, C, D, E>(f: Curried4<A, B, C, D, E>) => Curried4<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>, Type<F, E>>
export function liftA4<F>(
  F: Apply<F>
): <A, B, C, D, E>(f: Curried4<A, B, C, D, E>) => Curried4<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>, HKT<F, E>>
/**
 * Lift a function of four arguments to a function which accepts and returns values wrapped with the type constructor `F`
 * @function
 */
export function liftA4<F>(
  F: Apply<F>
): <A, B, C, D, E>(f: Curried4<A, B, C, D, E>) => Curried4<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>, HKT<F, E>> {
  return f => fa => fb => fc => fd => F.ap(F.ap(F.ap(F.map(fa, f), fb), fc), fd)
}
