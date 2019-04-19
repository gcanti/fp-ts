import { Category2 } from './Category'
import { identity } from './function'
import { Monad2 } from './Monad'
import { Profunctor2 } from './Profunctor'
import { Strong2 } from './Strong'
import { Choice2 } from './Choice'
import * as E from './Either'
import { Semigroup } from './Semigroup'
import { Monoid } from './Monoid'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Reader: Reader<L, A>
  }
}

export const URI = 'Reader'

export type URI = typeof URI

/**
 * @since 1.0.0
 */
export interface Reader<E, A> {
  (e: E): A
}

/**
 * @since 2.0.0
 */
export const run = <E, A>(fa: Reader<E, A>, e: E): A => {
  return fa(e)
}

const map = <E, A, B>(fa: Reader<E, A>, f: (a: A) => B): Reader<E, B> => {
  return e => f(fa(e))
}

const of = <E, A>(a: A): Reader<E, A> => {
  return () => a
}

const ap = <E, A, B>(fab: Reader<E, (a: A) => B>, fa: Reader<E, A>): Reader<E, B> => {
  return e => fab(e)(fa(e))
}

const chain = <E, A, B>(fa: Reader<E, A>, f: (a: A) => Reader<E, B>): Reader<E, B> => {
  return e => f(fa(e))(e)
}

/**
 * reads the current context
 *
 * @since 1.0.0
 */
export const ask = <E>(): Reader<E, E> => {
  return identity
}

/**
 * Projects a value from the global context in a Reader
 *
 * @since 1.0.0
 */
export const asks = <E, A>(f: (e: E) => A): Reader<E, A> => {
  return f
}

/**
 * changes the value of the local context during the execution of the action `fa`
 *
 * @since 1.0.0
 */
export const local = <E, A, D>(fa: Reader<E, A>, f: (d: D) => E): Reader<D, A> => {
  return e => fa(f(e))
}

const promap = <A, B, C, D>(fbc: Reader<B, C>, f: (a: A) => B, g: (c: C) => D): Reader<A, D> => {
  return a => g(fbc(f(a)))
}

const compose = <L, A, B>(ab: Reader<A, B>, la: Reader<L, A>): Reader<L, B> => {
  return l => ab(la(l))
}

const first = <A, B, C>(pab: Reader<A, B>): Reader<[A, C], [B, C]> => {
  return ([a, c]) => [pab(a), c]
}

const second = <A, B, C>(pbc: Reader<B, C>): Reader<[A, B], [A, C]> => {
  return ([a, b]) => [a, pbc(b)]
}

const left = <A, B, C>(pab: Reader<A, B>): Reader<E.Either<A, C>, E.Either<B, C>> => {
  return e => E.fold<A, C, E.Either<B, C>>(e, a => E.left(pab(a)), E.right)
}

const right = <A, B, C>(pbc: Reader<B, C>): Reader<E.Either<A, B>, E.Either<A, C>> => {
  return e => E.fold<A, B, E.Either<A, C>>(e, E.left, b => E.right(pbc(b)))
}

/**
 * @since 1.14.0
 */
export const getSemigroup = <E, A>(S: Semigroup<A>): Semigroup<Reader<E, A>> => {
  return {
    concat: (x, y) => e => S.concat(x(e), y(e))
  }
}

/**
 * @since 1.14.0
 */
export const getMonoid = <E, A>(M: Monoid<A>): Monoid<Reader<E, A>> => {
  return {
    ...getSemigroup(M),
    empty: of(M.empty)
  }
}

/**
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
  id: ask,
  first,
  second,
  left,
  right
}
