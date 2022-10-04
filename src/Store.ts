/**
 * @since 3.0.0
 */
import type { Comonad as Comonad_ } from './Comonad'
import type { Endomorphism } from './Endomorphism'
import { identity, pipe } from './Function'
import * as functor from './Functor'
import type { TypeLambda, Kind } from './HKT'

/**
 * @category model
 * @since 3.0.0
 */
export interface Store<S, A> {
  readonly peek: (s: S) => A
  readonly pos: S
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <S>(fa: Store<S, A>) => Store<S, B> = (f) => (fa) => ({
  peek: (s) => f(fa.peek(s)),
  pos: fa.pos
})

/**
 * @since 3.0.0
 */
export const extend: <S, A, B>(f: (wa: Store<S, A>) => B) => (wa: Store<S, A>) => Store<S, B> = (f) => (wa) => ({
  peek: (s) => f({ peek: wa.peek, pos: s }),
  pos: wa.pos
})

/**
 * @category Extract
 * @since 3.0.0
 */
export const extract: <S, A>(wa: Store<S, A>) => A = (wa) => wa.peek(wa.pos)

/**
 * @since 3.0.0
 */
export const duplicate: <S, A>(wa: Store<S, A>) => Store<S, Store<S, A>> = /*#__PURE__*/ extend(identity)

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface StoreTypeLambda extends TypeLambda {
  readonly type: Store<this['InOut1'], this['Out1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<StoreTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <S, B>(fab: Store<S, (a: A) => B>) => Store<S, B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: Comonad_<StoreTypeLambda> = {
  map,
  extend,
  extract
}

/**
 * Reposition the focus at the specified position.
 *
 * @since 3.0.0
 */
export const seek =
  <S>(s: S) =>
  <A>(wa: Store<S, A>): Store<S, A> => ({ peek: wa.peek, pos: s })

/**
 * Reposition the focus at the specified position, which depends on the current position.
 *
 * @since 3.0.0
 */
export const seeks =
  <S>(f: Endomorphism<S>) =>
  <A>(wa: Store<S, A>): Store<S, A> => ({ peek: wa.peek, pos: f(wa.pos) })

/**
 * Extract a value from a position which depends on the current position.
 *
 * @since 3.0.0
 */
export const peeks =
  <S>(f: Endomorphism<S>) =>
  <A>(wa: Store<S, A>): A =>
    wa.peek(f(wa.pos))

/**
 * Extract a collection of values from positions which depend on the current position.
 *
 * @since 3.0.0
 */
export function experiment<F extends TypeLambda>(
  F: functor.Functor<F>
): <S1, S2, R, O, E>(f: (s: S1) => Kind<F, S2, R, O, E, S1>) => <A>(wa: Store<S1, A>) => Kind<F, S2, R, O, E, A> {
  return (f) => (wa) =>
    pipe(
      f(wa.pos),
      F.map((s) => wa.peek(s))
    )
}
