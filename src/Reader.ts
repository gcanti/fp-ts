import { Monad, FantasyMonad } from './Monad'
import { Endomorphism } from './function'
import { getReaderT } from './ReaderT'
import * as id from './Id'

declare module './HKT' {
  interface HKT<A, U> {
    'Kleisli<Id, E, A>': (u: U) => A
    Reader: Reader<U, A>
  }
}

export const URI = 'Reader'

export type URI = typeof URI

const readerTId = getReaderT('Kleisli<Id, E, A>', id)

export class Reader<E, A> implements FantasyMonad<URI, A> {
  static of = of
  readonly _E: E
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: (e: E) => A) {}
  run(e: E): A {
    return readerTId.run(e, this.value)
  }
  map<B>(f: (a: A) => B): Reader<E, B> {
    return new Reader(readerTId.map(f, this.value))
  }
  of<E2, B>(b: B): Reader<E2, B> {
    return of<E2, B>(b)
  }
  ap<B>(fab: Reader<E, (a: A) => B>): Reader<E, B> {
    return new Reader(readerTId.ap(fab.value, this.value))
  }
  chain<B>(f: (a: A) => Reader<E, B>): Reader<E, B> {
    return new Reader(readerTId.chain(a => f(a).value, this.value))
  }
}

export function map<E, A, B>(f: (a: A) => B, fa: Reader<E, A>): Reader<E, B> {
  return fa.map(f)
}

export function of<E, A>(a: A): Reader<E, A> {
  return new Reader(readerTId.of(a))
}

export function ap<E, A, B>(fab: Reader<E, (a: A) => B>, fa: Reader<E, A>): Reader<E, B> {
  return fa.ap(fab)
}

export function chain<E, A, B>(f: (a: A) => Reader<E, B>, fa: Reader<E, A>): Reader<E, B> {
  return fa.chain(f)
}

/** reads the current context */
export function ask<E>(): Reader<E, E> {
  return new Reader(readerTId.ask<E>())
}

/** Projects a value from the global context in a Reader */
export function asks<E, A>(f: (e: E) => A): Reader<E, A> {
  return new Reader(readerTId.asks(f))
}

/** changes the value of the local context during the execution of the action `fa` */
export function local<E, A>(f: Endomorphism<E>, fa: Reader<E, A>): Reader<E, A> {
  return new Reader(readerTId.local(f, fa.value))
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain } as (
    Monad<URI>
  )
)
