import { Monad, FantasyMonad } from './Monad'
import { Endomorphism } from './function'

export const URI = 'State'

export type URI = typeof URI

export class State<S, A> implements FantasyMonad<URI, A> {
  readonly _S: S
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: (s: S) => [A, S]) {}
  run(s: S): [A, S] {
    return this.value(s)
  }
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
  of<S2, B>(b: B): State<S2, B> {
    return of(b)
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

export function map<S, A, B>(f: (a: A) => B, fa: State<S, A>): State<S, B> {
  return fa.map(f)
}

export function ap<S, A, B>(fab: State<S, (a: A) => B>, fa: State<S, A>): State<S, B> {
  return fa.ap(fab)
}

export function of<S, A>(a: A): State<S, A> {
  return new State(s => [a, s])
}

export function chain<S, A, B>(f: (a: A) => State<S, B>, fa: State<S, A>): State<S, B> {
  return fa.chain(f)
}

export function get<S>(): State<S, S> {
  return new State(s => [s, s])
}

export function put<S>(s: S): State<S, undefined> {
  return new State(() => [undefined, s])
}

export function modify<S>(f: Endomorphism<S>): State<S, undefined> {
  return new State(s => [undefined, f(s)])
}

export function gets<S, A>(f: (s: S) => A): State<S, A> {
  return new State(s => [f(s), s])
}

const proof: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
// tslint:disable-next-line no-unused-expression
proof
