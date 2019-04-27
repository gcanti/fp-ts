import { Comonad2 } from './Comonad'
import { Endomorphism } from './function'
import { Functor, Functor2, Functor3 } from './Functor'
import { HKT, HKT2, HKT3, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Store: Store<L, A>
  }
}

export const URI = 'Store'

export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface Store<S, A> {
  readonly peek: (s: S) => A
  readonly pos: S
}

const map = <S, A, B>(sa: Store<S, A>, f: (a: A) => B): Store<S, B> => {
  return { peek: s => f(sa.peek(s)), pos: sa.pos }
}

const extract = <S, A>(sa: Store<S, A>): A => {
  return sa.peek(sa.pos)
}

/** Reposition the focus at the specified position */
export function seek<S, A>(sa: Store<S, A>, s: S): Store<S, A> {
  return { peek: sa.peek, pos: s }
}

const extend = <S, A, B>(sa: Store<S, A>, f: (sa: Store<S, A>) => B): Store<S, B> => {
  return { peek: s => f(seek(sa, s)), pos: sa.pos }
}

/**
 * Extract a value from a position which depends on the current position
 *
 * @since 2.0.0
 */
export const peeks = <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>) => (_: S): A => {
  return sa.peek(f(sa.pos))
}

/**
 * Reposition the focus at the specified position, which depends on the current position
 *
 * @since 2.0.0
 */
export const seeks = <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>): Store<S, A> => {
  return { peek: sa.peek, pos: f(sa.pos) }
}

/**
 * Extract a collection of values from positions which depend on the current position
 *
 * @since 2.0.0
 */
export function experiment<F extends URIS3>(
  F: Functor3<F>
): <U, L, S>(f: (s: S) => HKT3<F, U, L, S>) => <A>(sa: Store<S, A>) => Type3<F, U, L, A>
export function experiment<F extends URIS2>(
  F: Functor2<F>
): <L, S>(f: (s: S) => HKT2<F, L, S>) => <A>(sa: Store<S, A>) => Type2<F, L, A>
export function experiment<F extends URIS>(
  F: Functor<F>
): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => Type<F, A>
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A>
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A> {
  return f => sa => F.map(f(sa.pos), s => sa.peek(s))
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
