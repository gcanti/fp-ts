/**
 * @since 3.0.0
 */
import { Comonad2 } from './Comonad'
import { Endomorphism, identity, pipe } from './function'
import { Functor as FunctorHKT, Functor1, Functor2, Functor2C, Functor3, Functor3C } from './Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Extend2 } from './Extend'

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
export const map: Functor2<URI>['map'] = (f) => (fa) => ({
  peek: (s) => f(fa.peek(s)),
  pos: fa.pos
})

/**
 * @category Extend
 * @since 3.0.0
 */
export const extend: Extend2<URI>['extend'] = (f) => (wa) => ({
  peek: (s) => f({ peek: wa.peek, pos: s }),
  pos: wa.pos
})

/**
 * @category Extract
 * @since 3.0.0
 */
export const extract: Comonad2<URI>['extract'] = (wa) => wa.peek(wa.pos)

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
export type URI = 'Store'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Store: Store<E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor2<URI> = {
  map
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: Comonad2<URI> = {
  map,
  extend,
  extract
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Reposition the focus at the specified position
 *
 * @since 3.0.0
 */
export const seek = <S>(s: S) => <A>(wa: Store<S, A>): Store<S, A> => ({ peek: wa.peek, pos: s })

/**
 * Reposition the focus at the specified position, which depends on the current position
 *
 * @since 3.0.0
 */
export const seeks = <S>(f: Endomorphism<S>) => <A>(wa: Store<S, A>): Store<S, A> => ({ peek: wa.peek, pos: f(wa.pos) })

/**
 * Extract a value from a position which depends on the current position
 *
 * @since 3.0.0
 */
export const peeks = <S>(f: Endomorphism<S>) => <A>(wa: Store<S, A>): A => wa.peek(f(wa.pos))

/**
 * Extract a collection of values from positions which depend on the current position
 *
 * @since 3.0.0
 */
export function experiment<F extends URIS3>(
  F: Functor3<F>
): <R, E, S>(f: (s: S) => Kind3<F, R, E, S>) => <A>(wa: Store<S, A>) => Kind3<F, R, E, A>
export function experiment<F extends URIS3, E>(
  F: Functor3C<F, E>
): <R, S>(f: (s: S) => Kind3<F, R, E, S>) => <A>(wa: Store<S, A>) => Kind3<F, R, E, A>
export function experiment<F extends URIS2>(
  F: Functor2<F>
): <E, S>(f: (s: S) => Kind2<F, E, S>) => <A>(wa: Store<S, A>) => Kind2<F, E, A>
export function experiment<F extends URIS2, E>(
  F: Functor2C<F, E>
): <S>(f: (s: S) => Kind2<F, E, S>) => <A>(wa: Store<S, A>) => Kind2<F, E, A>
export function experiment<F extends URIS>(
  F: Functor1<F>
): <S>(f: (s: S) => Kind<F, S>) => <A>(wa: Store<S, A>) => Kind<F, A>
export function experiment<F>(F: FunctorHKT<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(wa: Store<S, A>) => HKT<F, A>
export function experiment<F>(F: FunctorHKT<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(wa: Store<S, A>) => HKT<F, A> {
  return (f) => (wa) =>
    pipe(
      f(wa.pos),
      F.map((s) => wa.peek(s))
    )
}
