/**
 * @since 3.0.0
 */
import type { Comonad as Comonad_ } from './Comonad'
import type { Endomorphism } from './Endomorphism'
import type { Extend as Extend_ } from './Extend'
import { identity, pipe } from './function'
import { flap as flap_, Functor as Functor_ } from './Functor'
import type { HKT, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

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
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor_<StoreF>['map'] = (f) => (fa) => ({
  peek: (s) => f(fa.peek(s)),
  pos: fa.pos
})

/**
 * @category Extend
 * @since 3.0.0
 */
export const extend: Extend_<StoreF>['extend'] = (f) => (wa) => ({
  peek: (s) => f({ peek: wa.peek, pos: s }),
  pos: wa.pos
})

/**
 * @category Extract
 * @since 3.0.0
 */
export const extract: Comonad_<StoreF>['extract'] = (wa) => wa.peek(wa.pos)

/**
 * Derivable from `Extend`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const duplicate: <E, A>(wa: Store<E, A>) => Store<E, Store<E, A>> =
  /*#__PURE__*/
  extend(identity)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export interface StoreF extends HKT {
  readonly type: Store<this['E'], this['A']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<StoreF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: Comonad_<StoreF> = {
  map,
  extend,
  extract
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Reposition the focus at the specified position.
 *
 * @since 3.0.0
 */
export const seek = <S>(s: S) => <A>(wa: Store<S, A>): Store<S, A> => ({ peek: wa.peek, pos: s })

/**
 * Reposition the focus at the specified position, which depends on the current position.
 *
 * @since 3.0.0
 */
export const seeks = <S>(f: Endomorphism<S>) => <A>(wa: Store<S, A>): Store<S, A> => ({ peek: wa.peek, pos: f(wa.pos) })

/**
 * Extract a value from a position which depends on the current position.
 *
 * @since 3.0.0
 */
export const peeks = <S>(f: Endomorphism<S>) => <A>(wa: Store<S, A>): A => wa.peek(f(wa.pos))

/**
 * Extract a collection of values from positions which depend on the current position.
 *
 * @since 3.0.0
 */
export function experiment<F extends HKT>(
  F: Functor_<F>
): <S1, S2, R, E>(f: (s: S1) => Kind<F, S2, R, E, S1>) => <A>(wa: Store<S1, A>) => Kind<F, S2, R, E, A> {
  return (f) => (wa) =>
    pipe(
      f(wa.pos),
      F.map((s) => wa.peek(s))
    )
}
