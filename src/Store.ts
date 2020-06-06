/**
 * @since 2.0.0
 */
import { Comonad2 } from './Comonad'
import { Endomorphism, identity } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C } from './Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Store: Store<E, A>
  }
}

/**
 * @category model
 * @since 2.0.0
 */
export const URI = 'Store'

/**
 * @category model
 * @since 2.0.0
 */
export type URI = typeof URI

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
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(wa: Store<S, A>) => HKT<F, A>
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(wa: Store<S, A>) => HKT<F, A> {
  return (f) => (wa) => F.map(f(wa.pos), (s) => wa.peek(s))
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

const map_: <E, A, B>(fa: Store<E, A>, f: (a: A) => B) => Store<E, B> = (wa, f) => ({
  peek: (s) => f(wa.peek(s)),
  pos: wa.pos
})

const extend_: <E, A, B>(wa: Store<E, A>, f: (wa: Store<E, A>) => B) => Store<E, B> = (wa, f) => ({
  peek: (s) => f({ peek: wa.peek, pos: s }),
  pos: wa.pos
})

/**
 * @category Extend
 * @since 2.0.0
 */
export const duplicate: <E, A>(wa: Store<E, A>) => Store<E, Store<E, A>> = (wa) => extend_(wa, identity)

/**
 * @category Extract
 * @since 2.6.2
 */
export const extract: <E, A>(wa: Store<E, A>) => A = (wa) => wa.peek(wa.pos)

/**
 * @category Extend
 * @since 2.0.0
 */
export const extend: <E, A, B>(f: (wa: Store<E, A>) => B) => (wa: Store<E, A>) => Store<E, B> = (f) => (wa) =>
  extend_(wa, f)

/**
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Store<E, A>) => Store<E, B> = (f) => (fa) => map_(fa, f)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const store: Comonad2<URI> = {
  URI,
  map: map_,
  extract,
  extend: extend_
}
