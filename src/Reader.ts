import { Monad } from './Monad'
import { identity } from './function'

export const URI = 'Reader'

export type URI = typeof URI

/**
 * @data
 * @constructor Reader
 */
export class Reader<E, A> {
  readonly '-A': A
  readonly '-L': E
  readonly '-URI': URI
  constructor(readonly run: (e: E) => A) {}
  map<B>(f: (a: A) => B): Reader<E, B> {
    return new Reader((e: E) => f(this.run(e)))
  }
  ap<B>(fab: Reader<E, (a: A) => B>): Reader<E, B> {
    return new Reader((e: E) => fab.run(e)(this.run(e)))
  }
  ap_<B, C>(this: Reader<E, (b: B) => C>, fb: Reader<E, B>): Reader<E, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Reader<E, B>): Reader<E, B> {
    return new Reader((e: E) => f(this.run(e)).run(e))
  }
}

/** @function */
export const map = <E, A, B>(fa: Reader<E, A>, f: (a: A) => B): Reader<E, B> => {
  return fa.map(f)
}

/** @function */
export const of = <E, A>(a: A): Reader<E, A> => {
  return new Reader((e: E) => a)
}

/** @function */
export const ap = <E, A, B>(fab: Reader<E, (a: A) => B>, fa: Reader<E, A>): Reader<E, B> => {
  return fa.ap(fab)
}

/** @function */
export const chain = <E, A, B>(fa: Reader<E, A>, f: (a: A) => Reader<E, B>): Reader<E, B> => {
  return fa.chain(f)
}

/**
 * reads the current context
 * @function
 */
export const ask = <E>(): Reader<E, E> => {
  return new Reader(identity)
}

/**
 * Projects a value from the global context in a Reader
 * @function
 */
export const asks = <E, A>(f: (e: E) => A): Reader<E, A> => {
  return new Reader(f)
}

/**
 * changes the value of the local context during the execution of the action `fa`
 * @function
 */
export const local = <E>(f: (e: E) => E) => <A>(fa: Reader<E, A>): Reader<E, A> => {
  return new Reader((e: E) => fa.run(f(e)))
}

/** @instance */
export const reader: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
