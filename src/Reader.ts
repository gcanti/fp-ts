import { Category2 } from './Category'
import { Choice2 } from './Choice'
import * as E from './Either'
import { identity as id } from './function'
import { identity } from './Identity'
import { Monad2 } from './Monad'
import { Monoid } from './Monoid'
import { Profunctor2 } from './Profunctor'
import { getReaderT } from './ReaderT'
import { Semigroup } from './Semigroup'
import { Strong2 } from './Strong'

const T = getReaderT(identity)

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Reader: Reader<L, A>
  }
}

export const URI = 'Reader'

export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface Reader<E, A> {
  (e: E): A
}

/**
 * @since 2.0.0
 */
export function run<E, A>(ma: Reader<E, A>, e: E): A {
  return ma(e)
}

/**
 * Reads the current context
 *
 * @since 2.0.0
 */
export function ask<E>(): Reader<E, E> {
  return id
}

/**
 * Projects a value from the global context in a Reader
 *
 * @since 2.0.0
 */
export function asks<E, A>(f: (e: E) => A): Reader<E, A> {
  return f
}

/**
 * changes the value of the local context during the execution of the action `ma`
 *
 * @since 2.0.0
 */
export function local<E, A, D>(ma: Reader<E, A>, f: (d: D) => E): Reader<D, A> {
  return e => ma(f(e))
}

/**
 * @since 2.0.0
 */
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<Reader<E, A>> {
  return {
    concat: (x, y) => e => S.concat(x(e), y(e))
  }
}

/**
 * @since 2.0.0
 */
export function getMonoid<E, A>(M: Monoid<A>): Monoid<Reader<E, A>> {
  return {
    ...getSemigroup(M),
    empty: () => M.empty
  }
}

function left<A, B, C>(pab: Reader<A, B>): Reader<E.Either<A, C>, E.Either<B, C>> {
  return e => E.fold<A, C, E.Either<B, C>>(e, a => E.left(pab(a)), E.right)
}

function right<A, B, C>(pbc: Reader<B, C>): Reader<E.Either<A, B>, E.Either<A, C>> {
  return e => E.fold<A, B, E.Either<A, C>>(e, E.left, b => E.right(pbc(b)))
}

/**
 * @since 2.0.0
 */
export const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI> = {
  URI,
  map: (ma, f) => e => f(ma(e)),
  of: T.of,
  ap: T.ap,
  chain: T.chain,
  promap: (mbc, f, g) => a => g(mbc(f(a))),
  compose: (ab, la) => l => ab(la(l)),
  id: () => id,
  first: pab => ([a, c]) => [pab(a), c],
  second: pbc => ([a, b]) => [a, pbc(b)],
  left,
  right
}
