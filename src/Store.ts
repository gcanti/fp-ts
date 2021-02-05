/**
 * @since 2.0.0
 */
import { Comonad2 } from './Comonad'
import { Endomorphism, identity, pipe } from './function'
import { flap as flap_, Functor as FunctorHKT, Functor1, Functor2, Functor2C, Functor3, Functor3C } from './Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Extend2 } from './Extend'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Store<S, A> {
  readonly peek: (s: S) => A
  readonly pos: S
}

/**
 * Reposition the focus at the specified position
 *
 * @since 2.0.0
 */
export function seek<S>(s: S): <A>(wa: Store<S, A>) => Store<S, A> {
  return (wa) => ({ peek: wa.peek, pos: s })
}

/**
 * Reposition the focus at the specified position, which depends on the current position
 *
 * @since 2.0.0
 */
export function seeks<S>(f: Endomorphism<S>): <A>(wa: Store<S, A>) => Store<S, A> {
  return (wa) => ({ peek: wa.peek, pos: f(wa.pos) })
}

/**
 * Extract a value from a position which depends on the current position
 *
 * @since 2.0.0
 */
export function peeks<S>(f: Endomorphism<S>): <A>(wa: Store<S, A>) => A {
  return (wa) => wa.peek(f(wa.pos))
}

/**
 * Extract a collection of values from positions which depend on the current position
 *
 * @since 2.0.0
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
  return (f) => (wa) => F.map(f(wa.pos), (s) => wa.peek(s))
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _extend: Extend2<URI>['extend'] = (wa, f) => pipe(wa, extend(f))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Extend
 * @since 2.0.0
 */
export const extend: <E, A, B>(f: (wa: Store<E, A>) => B) => (wa: Store<E, A>) => Store<E, B> = (f) => (wa) => ({
  peek: (s) => f({ peek: wa.peek, pos: s }),
  pos: wa.pos
})

/**
 * @category Extract
 * @since 2.6.2
 */
export const extract: <E, A>(wa: Store<E, A>) => A = (wa) => wa.peek(wa.pos)

/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const duplicate: <E, A>(wa: Store<E, A>) => Store<E, Store<E, A>> =
  /*#__PURE__*/
  extend(identity)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Store<E, A>) => Store<E, B> = (f) => (fa) => ({
  peek: (s) => f(fa.peek(s)),
  pos: fa.pos
})

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'Store'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Store<E, A>
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Comonad: Comonad2<URI> = {
  URI,
  map: _map,
  extend: _extend,
  extract
}

// -------------------------------------------------------------------------------------
// derivables
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.10.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const store: Comonad2<URI> = Comonad
