import { Comonad2 } from './Comonad'
import { Endomorphism } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3 } from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Store: Store<L, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Store'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface Store<S, A> {
  readonly peek: (s: S) => A
  readonly pos: S
}

const map = <S, A, B>(wa: Store<S, A>, f: (a: A) => B): Store<S, B> => {
  return { peek: s => f(wa.peek(s)), pos: wa.pos }
}

const extract = <S, A>(wa: Store<S, A>): A => {
  return wa.peek(wa.pos)
}

/**
 * Reposition the focus at the specified position
 *
 * @since 2.0.0
 */
export function seek<S>(s: S): <A>(wa: Store<S, A>) => Store<S, A> {
  return wa => ({ peek: wa.peek, pos: s })
}

/**
 * Reposition the focus at the specified position, which depends on the current position
 *
 * @since 2.0.0
 */
export function seeks<S>(f: Endomorphism<S>): <A>(wa: Store<S, A>) => Store<S, A> {
  return wa => ({ peek: wa.peek, pos: f(wa.pos) })
}

/**
 * Extract a value from a position which depends on the current position
 *
 * @since 2.0.0
 */
export function peeks<S>(f: Endomorphism<S>): <A>(wa: Store<S, A>) => A {
  return wa => wa.peek(f(wa.pos))
}

/**
 * Extract a collection of values from positions which depend on the current position
 *
 * @since 2.0.0
 */
export function experiment<F extends URIS3>(
  F: Functor3<F>
): <U, L, S>(f: (s: S) => Type3<F, U, L, S>) => <A>(wa: Store<S, A>) => Type3<F, U, L, A>
export function experiment<F extends URIS2>(
  F: Functor2<F>
): <L, S>(f: (s: S) => Type2<F, L, S>) => <A>(wa: Store<S, A>) => Type2<F, L, A>
export function experiment<F extends URIS2, L>(
  F: Functor2C<F, L>
): <S>(f: (s: S) => Type2<F, L, S>) => <A>(wa: Store<S, A>) => Type2<F, L, A>
export function experiment<F extends URIS>(
  F: Functor1<F>
): <S>(f: (s: S) => Type<F, S>) => <A>(wa: Store<S, A>) => Type<F, A>
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(wa: Store<S, A>) => HKT<F, A>
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(wa: Store<S, A>) => HKT<F, A> {
  return f => wa => F.map(f(wa.pos), s => wa.peek(s))
}

const extend = <S, A, B>(wa: Store<S, A>, f: (wa: Store<S, A>) => B): Store<S, B> => {
  return { peek: s => f({ peek: wa.peek, pos: s }), pos: wa.pos }
}

/**
 * @since 2.0.0
 */
export const store: Comonad2<URI> = {
  URI,
  map,
  extract,
  extend
}
