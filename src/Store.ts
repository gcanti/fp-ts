import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT3S, HKT3As } from './HKT'
import { Comonad, FantasyComonad } from './Comonad'
import { Functor } from './Functor'
import { Endomorphism, toString } from './function'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Store: Store<L, A>
  }
}

export const URI = 'Store'

export type URI = typeof URI

/**
 * @data
 * @constructor Store
 */
export class Store<S, A> implements FantasyComonad<URI, A> {
  readonly '-A': A
  readonly '-L': S
  readonly '-URI': URI
  constructor(readonly peek: (s: S) => A, readonly pos: S) {}
  /** Reposition the focus at the specified position */
  seek(s: S): Store<S, A> {
    return new Store(this.peek, s)
  }
  map<B>(f: (a: A) => B): Store<S, B> {
    return new Store(s => f(this.peek(s)), this.pos)
  }
  extract(): A {
    return this.peek(this.pos)
  }
  extend<B>(f: (sa: Store<S, A>) => B): Store<S, B> {
    return new Store(s => f(this.seek(s)), this.pos)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new Store(${toString(this.peek)}, ${toString(this.pos)})`
  }
}

/** @function */
export const map = <S, A, B>(f: (a: A) => B, sa: Store<S, A>): Store<S, B> => {
  return sa.map(f)
}

/** @function */
export const extract = <S, A>(sa: Store<S, A>): A => {
  return sa.extract()
}

/** @function */
export const extend = <S, A, B>(f: (sa: Store<S, A>) => B, sa: Store<S, A>): Store<S, B> => {
  return sa.extend(f)
}

/**
 * Reads the value at the specified position in the specified context
 * @function
 */
export const peek = <S, A>(sa: Store<S, A>) => (s: S): A => {
  return sa.peek(s)
}

/**
 * Extract a value from a position which depends on the current position
 * @function
 */
export const peeks = <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>) => (s: S): A => {
  return sa.peek(f(sa.pos))
}

/**
 * Reposition the focus at the specified position
 * @function
 */
export const seek = <S>(s: S) => <A>(sa: Store<S, A>): Store<S, A> => {
  return sa.seek(s)
}

/**
 * Reposition the focus at the specified position, which depends on the current position
 * @function
 */
export const seeks = <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>): Store<S, A> => {
  return new Store(sa.peek, f(sa.pos))
}

/** Extract a collection of values from positions which depend on the current position */
export function experiment<F extends HKT3S>(
  F: Functor<F>
): <U, L, S>(f: (s: S) => HKT3As<F, U, L, S>) => <A>(sa: Store<S, A>) => HKT3As<F, U, L, A>
export function experiment<F extends HKT2S>(
  F: Functor<F>
): <L, S>(f: (s: S) => HKT2As<F, L, S>) => <A>(sa: Store<S, A>) => HKT2As<F, L, A>
export function experiment<F extends HKTS>(
  F: Functor<F>
): <S>(f: (s: S) => HKTAs<F, S>) => <A>(sa: Store<S, A>) => HKTAs<F, A>
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A>
/** @function */
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A> {
  return f => sa => F.map(s => sa.peek(s), f(sa.pos))
}

/** @instance */
export const store: Comonad<URI> = { URI, map, extract, extend }
