import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT3S, HKT3As, HKT2, HKT3 } from './HKT'
import { Functor, Functor2, Functor3 } from './Functor'
import { Curried2, Curried3, Curried4, constant } from './function'

/** @typeclass */
export interface Apply<F> extends Functor<F> {
  ap<A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>): HKT<F, B>
}

/** Apply interface specialized for kind * -> * -> * */
export interface Apply2<M, L> extends Functor2<M, L> {
  ap<A, B>(fab: HKT2<M, L, (a: A) => B>, fa: HKT2<M, L, A>): HKT2<M, L, B>
}

/** Apply interface specialized for kind * -> * -> * -> * */
export interface Apply3<M, U, L> extends Functor3<M, U, L> {
  ap<A, B>(fab: HKT3<M, U, L, (a: A) => B>, fa: HKT3<M, U, L, A>): HKT3<M, U, L, B>
}

/** Combine two effectful actions, keeping only the result of the first */
export function applyFirst<F extends HKT3S>(
  F: Apply<F>
): <U, L, A>(fa: HKT3As<F, U, L, A>) => <B>(fb: HKT3As<F, U, L, B>) => HKT3As<F, U, L, A>
export function applyFirst<F extends HKT2S>(
  F: Apply<F>
): <L, A>(fa: HKT2As<F, L, A>) => <B>(fb: HKT2As<F, L, B>) => HKT2As<F, L, A>
export function applyFirst<F extends HKTS>(F: Apply<F>): <A>(fa: HKTAs<F, A>) => <B>(fb: HKTAs<F, B>) => HKTAs<F, A>
export function applyFirst<F>(F: Apply<F>): <A>(fa: HKT<F, A>) => <B>(fb: HKT<F, B>) => HKT<F, A>
/**
 * Combine two effectful actions, keeping only the result of the first
 * @function
 */
export function applyFirst<F>(F: Apply<F>): <A>(fa: HKT<F, A>) => <B>(fb: HKT<F, B>) => HKT<F, A> {
  return fa => fb => F.ap(F.map(a => constant(a), fa), fb)
}

/** Combine two effectful actions, keeping only the result of the second */
export function applySecond<F extends HKT3S>(
  F: Apply<F>
): <U, L, A>(fa: HKT3As<F, U, L, A>) => <B>(fb: HKT3As<F, U, L, B>) => HKT3As<F, U, L, B>
export function applySecond<F extends HKT2S>(
  F: Apply<F>
): <L, A>(fa: HKT2As<F, L, A>) => <B>(fb: HKT2As<F, L, B>) => HKT2As<F, L, B>
export function applySecond<F extends HKTS>(F: Apply<F>): <A>(fa: HKTAs<F, A>) => <B>(fb: HKTAs<F, B>) => HKTAs<F, B>
export function applySecond<F>(F: Apply<F>): <A>(fa: HKT<F, A>) => <B>(fb: HKT<F, B>) => HKT<F, B>
/**
 * Combine two effectful actions, keeping only the result of the second
 * @function
 */
export function applySecond<F>(F: Apply<F>): <A>(fa: HKT<F, A>) => <B>(fb: HKT<F, B>) => HKT<F, B> {
  return <A>(fa: HKT<F, A>) => <B>(fb: HKT<F, B>) => F.ap(F.map(() => (b: B) => b, fa), fb)
}

/**
 * Lift a function of two arguments to a function which accepts and returns values wrapped with the type constructor `F`
 */
export function liftA2<F extends HKT3S>(
  F: Apply<F>
): <A, B, C>(f: Curried2<A, B, C>) => <U, L>(fa: HKT3As<F, U, L, A>) => (fb: HKT3As<F, U, L, B>) => HKT3As<F, U, L, C>
export function liftA2<F extends HKT2S>(
  F: Apply<F>
): <A, B, C>(f: Curried2<A, B, C>) => <L>(fa: HKT2As<F, L, A>) => (fb: HKT2As<F, L, B>) => HKT2As<F, L, C>
export function liftA2<F extends HKTS>(
  F: Apply<F>
): <A, B, C>(f: Curried2<A, B, C>) => Curried2<HKTAs<F, A>, HKTAs<F, B>, HKTAs<F, C>>
export function liftA2<F>(F: Apply<F>): <A, B, C>(f: Curried2<A, B, C>) => Curried2<HKT<F, A>, HKT<F, B>, HKT<F, C>>
/**
 * Lift a function of two arguments to a function which accepts and returns values wrapped with the type constructor `F`
 * @function
 */
export function liftA2<F>(F: Apply<F>): <A, B, C>(f: Curried2<A, B, C>) => Curried2<HKT<F, A>, HKT<F, B>, HKT<F, C>> {
  return f => fa => fb => F.ap(F.map(f, fa), fb)
}

/**
 * Lift a function of three arguments to a function which accepts and returns values wrapped with the type constructor `F`
 */
export function liftA3<F extends HKT3S>(
  F: Apply<F>
): <A, B, C, D>(
  f: Curried3<A, B, C, D>
) => <U, L>(fa: HKT3As<F, U, L, A>) => (fb: HKT3As<F, U, L, B>) => (fc: HKT3As<F, U, L, C>) => HKT3As<F, U, L, D>
export function liftA3<F extends HKT2S>(
  F: Apply<F>
): <A, B, C, D>(
  f: Curried3<A, B, C, D>
) => <L>(fa: HKT2As<F, L, A>) => (fb: HKT2As<F, L, B>) => (fc: HKT2As<F, L, C>) => HKT2As<F, L, D>
export function liftA3<F extends HKTS>(
  F: Apply<F>
): <A, B, C, D>(f: Curried3<A, B, C, D>) => Curried3<HKTAs<F, A>, HKTAs<F, B>, HKTAs<F, C>, HKTAs<F, D>>
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
  return f => fa => fb => fc => F.ap(F.ap(F.map(f, fa), fb), fc)
}

/**
 * Lift a function of four arguments to a function which accepts and returns values wrapped with the type constructor `F`
 */
export function liftA4<F extends HKT3S>(
  F: Apply<F>
): <A, B, C, D, E>(
  f: Curried4<A, B, C, D, E>
) => <U, L>(
  fa: HKT3As<F, U, L, A>
) => (fb: HKT3As<F, U, L, B>) => (fc: HKT3As<F, U, L, C>) => (fd: HKT3As<F, U, L, D>) => HKT3As<F, U, L, E>
export function liftA4<F extends HKT2S>(
  F: Apply<F>
): <A, B, C, D, E>(
  f: Curried4<A, B, C, D, E>
) => <L>(
  fa: HKT2As<F, L, A>
) => (fb: HKT2As<F, L, B>) => (fc: HKT2As<F, L, C>) => (fd: HKT2As<F, L, D>) => HKT2As<F, L, E>
export function liftA4<F extends HKTS>(
  F: Apply<F>
): <A, B, C, D, E>(
  f: Curried4<A, B, C, D, E>
) => Curried4<HKTAs<F, A>, HKTAs<F, B>, HKTAs<F, C>, HKTAs<F, D>, HKTAs<F, E>>
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
  return f => fa => fb => fc => fd => F.ap(F.ap(F.ap(F.map(f, fa), fb), fc), fd)
}
