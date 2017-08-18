import { HKT } from './HKT'
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

export class Store<S, A> implements FantasyComonad<URI, A> {
  readonly _A: A
  readonly _L: S
  readonly _URI: URI
  constructor(public readonly peek: (s: S) => A, public readonly pos: S) {}
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
  inspect() {
    return this.toString()
  }
  toString() {
    return `new Store(${toString(this.peek)}, ${toString(this.pos)})`
  }
}

export const map = <S, A, B>(f: (a: A) => B, sa: Store<S, A>): Store<S, B> => sa.map(f)

export const extract = <S, A>(sa: Store<S, A>): A => sa.extract()

export const extend = <S, A, B>(f: (sa: Store<S, A>) => B, sa: Store<S, A>): Store<S, B> => sa.extend(f)

/** Reads the value at the specified position in the specified context */
export const peek = <S, A>(sa: Store<S, A>) => (s: S): A => sa.peek(s)

/** Extract a value from a position which depends on the current position */
export const peeks = <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>) => (s: S): A => sa.peek(f(sa.pos))

/** Reposition the focus at the specified position */
export const seek = <S>(s: S) => <A>(sa: Store<S, A>): Store<S, A> => sa.seek(s)

/** Reposition the focus at the specified position, which depends on the current position */
export const seeks = <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>): Store<S, A> => new Store(sa.peek, f(sa.pos))

export class Ops {
  /** Extract a collection of values from positions which depend on the current position */
  experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A>
  experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A> {
    return f => sa => F.map(s => sa.peek(s), f(sa.pos))
  }
}

const ops = new Ops()
export const experiment: Ops['experiment'] = ops.experiment

export const store: Comonad<URI> = { URI, map, extract, extend }
