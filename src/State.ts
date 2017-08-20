import { Monad, FantasyMonad } from './Monad'
import { Endomorphism } from './function'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    State: State<L, A>
  }
}

export const URI = 'State'

export type URI = typeof URI

export class State<S, A> implements FantasyMonad<URI, A> {
  readonly _A: A
  readonly _L: S
  readonly _URI: URI
  constructor(public readonly run: (s: S) => [A, S]) {}
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
  chain<B>(f: (a: A) => State<S, B>): State<S, B> {
    return new State(s => {
      const [a, s1] = this.run(s)
      return f(a).run(s1)
    })
  }
}

export const map = <S, A, B>(f: (a: A) => B, fa: State<S, A>): State<S, B> => fa.map(f)

export const of = <S, A>(a: A): State<S, A> => new State(s => [a, s])

export const ap = <S, A, B>(fab: State<S, (a: A) => B>, fa: State<S, A>): State<S, B> => fa.ap(fab)

export const chain = <S, A, B>(f: (a: A) => State<S, B>, fa: State<S, A>): State<S, B> => fa.chain(f)

export const get = <S>(): State<S, S> => new State(s => [s, s])

export const put = <S>(s: S): State<S, undefined> => new State(() => [undefined, s])

export const modify = <S>(f: Endomorphism<S>): State<S, undefined> => new State(s => [undefined, f(s)])

export const gets = <S, A>(f: (s: S) => A): State<S, A> => new State(s => [f(s), s])

export const state: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
