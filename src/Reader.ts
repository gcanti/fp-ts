import { Category2 } from './Category'
import { identity, tuple } from './function'
import { Monad2 } from './Monad'
import { Profunctor2 } from './Profunctor'
import { Strong2 } from './Strong'
import { Choice2 } from './Choice'
import { Either, left as eitherLeft, right as eitherRight } from './Either'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Reader: Reader<L, A>
  }
}

export const URI = 'Reader'

export type URI = typeof URI

/**
 * @data
 * @constructor Reader
 * @since 1.0.0
 */
export class Reader<E, A> {
  readonly _A!: A
  readonly _L!: E
  readonly _URI!: URI
  constructor(readonly run: (e: E) => A) {}
  map<B>(f: (a: A) => B): Reader<E, B> {
    return new Reader((e: E) => f(this.run(e)))
  }
  ap<B>(fab: Reader<E, (a: A) => B>): Reader<E, B> {
    return new Reader((e: E) => fab.run(e)(this.run(e)))
  }
  /**
   * Flipped version of {@link ap}
   */
  ap_<B, C>(this: Reader<E, (b: B) => C>, fb: Reader<E, B>): Reader<E, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Reader<E, B>): Reader<E, B> {
    return new Reader((e: E) => f(this.run(e)).run(e))
  }
  /**
   * @since 1.6.1
   */
  local<E2 = E>(f: (e: E2) => E): Reader<E2, A> {
    return new Reader(e => this.run(f(e)))
  }
}

const map = <E, A, B>(fa: Reader<E, A>, f: (a: A) => B): Reader<E, B> => {
  return fa.map(f)
}

const of = <E, A>(a: A): Reader<E, A> => {
  return new Reader(() => a)
}

const ap = <E, A, B>(fab: Reader<E, (a: A) => B>, fa: Reader<E, A>): Reader<E, B> => {
  return fa.ap(fab)
}

const chain = <E, A, B>(fa: Reader<E, A>, f: (a: A) => Reader<E, B>): Reader<E, B> => {
  return fa.chain(f)
}

/**
 * reads the current context
 * @function
 * @since 1.0.0
 */
export const ask = <E>(): Reader<E, E> => {
  return new Reader(identity)
}

/**
 * Projects a value from the global context in a Reader
 * @function
 * @since 1.0.0
 */
export const asks = <E, A>(f: (e: E) => A): Reader<E, A> => {
  return new Reader(f)
}

/**
 * changes the value of the local context during the execution of the action `fa`
 * @function
 * @since 1.0.0
 */
export const local = <E, E2 = E>(f: (e: E2) => E) => <A>(fa: Reader<E, A>): Reader<E2, A> => {
  return fa.local(f)
}

const promap = <A, B, C, D>(fbc: Reader<B, C>, f: (a: A) => B, g: (c: C) => D): Reader<A, D> => {
  return new Reader(a => g(fbc.run(f(a))))
}

const compose = <L, A, B>(ab: Reader<A, B>, la: Reader<L, A>): Reader<L, B> => {
  return new Reader(l => ab.run(la.run(l)))
}

const id = <A>(): Reader<A, A> => {
  return new Reader(identity)
}

const first = <A, B, C>(pab: Reader<A, B>): Reader<[A, C], [B, C]> => {
  return new Reader(([a, c]) => tuple(pab.run(a), c))
}

const second = <A, B, C>(pbc: Reader<B, C>): Reader<[A, B], [A, C]> => {
  return new Reader(([a, b]) => tuple(a, pbc.run(b)))
}

const left = <A, B, C>(pab: Reader<A, B>): Reader<Either<A, C>, Either<B, C>> => {
  return new Reader(e => e.fold<Either<B, C>>(a => eitherLeft(pab.run(a)), eitherRight))
}

const right = <A, B, C>(pbc: Reader<B, C>): Reader<Either<A, B>, Either<A, C>> => {
  return new Reader(e => e.fold<Either<A, C>>(eitherLeft, b => eitherRight(pbc.run(b))))
}

/**
 * @instance
 * @since 1.0.0
 */
export const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  promap,
  compose,
  id,
  first,
  second,
  left,
  right
}
