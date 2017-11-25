import { Monad, FantasyMonad } from './Monad'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    State: State<L, A>
  }
}

export const URI = 'State'

export type URI = typeof URI

/**
 * @data
 * @constructor State
 */
export class State<S, A> implements FantasyMonad<URI, A> {
  readonly _A: A
  readonly _L: S
  readonly _URI: URI
  constructor(readonly run: (s: S) => [A, S]) {}
  eval(s: S): A {
    return this.run(s)[0]
  }
  exec(s: S): S {
    return this.run(s)[1]
  }
  map<B>(f: (a: A) => B): State<S, B> {
    return new State(s => {
      const [a, s1] = this.run(s)
      return [f(a), s1]
    })
  }
  ap<B>(fab: State<S, (a: A) => B>): State<S, B> {
    return fab.chain(f => this.map(f)) // <= derived
  }
  ap_<B, C>(this: State<S, (b: B) => C>, fb: State<S, B>): State<S, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => State<S, B>): State<S, B> {
    return new State(s => {
      const [a, s1] = this.run(s)
      return f(a).run(s1)
    })
  }
}

/** @function */
export const map = <S, A, B>(f: (a: A) => B, fa: State<S, A>): State<S, B> => {
  return fa.map(f)
}

/** @function */
export const of = <S, A>(a: A): State<S, A> => {
  return new State(s => [a, s])
}

/** @function */
export const ap = <S, A, B>(fab: State<S, (a: A) => B>, fa: State<S, A>): State<S, B> => {
  return fa.ap(fab)
}

/** @function */
export const chain = <S, A, B>(f: (a: A) => State<S, B>, fa: State<S, A>): State<S, B> => {
  return fa.chain(f)
}

/** @function */
export const get = <S>(): State<S, S> => {
  return new State(s => [s, s])
}

/** @function */
export const put = <S>(s: S): State<S, undefined> => {
  return new State(() => [undefined, s])
}

/** @function */
export const modify = <S>(f: (s: S) => S): State<S, undefined> => {
  return new State(s => [undefined, f(s)])
}

/** @function */
export const gets = <S, A>(f: (s: S) => A): State<S, A> => {
  return new State(s => [f(s), s])
}

/** @instance */
export const state: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
