import { Monad, FantasyMonad } from './Monad'
import { Endomorphism } from './function'
import { getStateT } from './StateT'
import * as id from './Id'

declare module './HKT' {
  interface HKT<A, U> {
    'Kleisli<Id, S, [A, S]>': (u: U) => [A, U]
    State: State<U, A>
  }
}

export const URI = 'State'

export type URI = typeof URI

const stateTId = getStateT('Kleisli<Id, S, [A, S]>', id)

export class State<S, A> implements FantasyMonad<URI, A> {
  readonly _S: S
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: (s: S) => [A, S]) {}
  run(s: S): [A, S] {
    return stateTId.run(s, this.value)
  }
  eval(s: S): A {
    return stateTId.eval(s, this.value)
  }
  exec(s: S): S {
    return stateTId.exec(s, this.value)
  }
  map<B>(f: (a: A) => B): State<S, B> {
    return new State<S, B>(stateTId.map(f, this.value))
  }
  of<S2, B>(b: B): State<S2, B> {
    return of<S2, B>(b)
  }
  ap<B>(fab: State<S, (a: A) => B>): State<S, B> {
    return new State(stateTId.ap(fab.value, this.value))
  }
  chain<B>(f: (a: A) => State<S, B>): State<S, B> {
    return new State<S, B>(stateTId.chain(a => f(a).value, this.value))
  }
}

export function map<S, A, B>(f: (a: A) => B, fa: State<S, A>): State<S, B> {
  return fa.map(f)
}

export function ap<S, A, B>(fab: State<S, (a: A) => B>, fa: State<S, A>): State<S, B> {
  return fa.ap(fab)
}

export function of<S, A>(a: A): State<S, A> {
  return new State<S, A>(stateTId.of<A, S>(a))
}

export function chain<S, A, B>(f: (a: A) => State<S, B>, fa: State<S, A>): State<S, B> {
  return fa.chain(f)
}

export function get<S>(): State<S, S> {
  return new State<S, S>(stateTId.get<S>())
}

export function put<S>(s: S): State<S, void> {
  return new State(stateTId.put<S>(s))
}

export function modify<S>(f: Endomorphism<S>): State<S, void> {
  return new State<S, void>(stateTId.modify<S>(f))
}

export function gets<S, A>(f: (s: S) => A): State<S, A> {
  return new State<S, A>(stateTId.gets<S, A>(f))
}

const proof:
  Monad<URI>
= { URI, map, of, ap, chain }
// tslint:disable-next-line no-unused-expression
{ proof }
