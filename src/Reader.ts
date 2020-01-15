/**
 * @since 2.0.0
 */
import { Category2 } from './Category'
import { Choice2 } from './Choice'
import * as E from './Either'
import { identity as id } from './function'
import { identity } from './Identity'
import { Monad2 } from './Monad'
import { Monoid } from './Monoid'
import { Profunctor2 } from './Profunctor'
import { getReaderM } from './ReaderT'
import { Semigroup } from './Semigroup'
import { Strong2 } from './Strong'
import { pipeable } from './pipeable'

const T = getReaderM(identity)

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Reader: Reader<E, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Reader'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface Reader<R, A> {
  (r: R): A
}

/**
 * Reads the current context
 *
 * @since 2.0.0
 */
export const ask: <R>() => Reader<R, R> = T.ask

/**
 * Projects a value from the global context in a Reader
 *
 * @since 2.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => Reader<R, A> = T.asks

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 2.0.0
 */
export function local<Q, R>(f: (d: Q) => R): <A>(ma: Reader<R, A>) => Reader<Q, A> {
  return ma => T.local(ma, f)
}

/**
 * @since 2.0.0
 */
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<Reader<R, A>> {
  return {
    concat: (x, y) => e => S.concat(x(e), y(e))
  }
}

/**
 * @since 2.0.0
 */
export function getMonoid<R, A>(M: Monoid<A>): Monoid<Reader<R, A>> {
  return {
    concat: getSemigroup<R, A>(M).concat,
    empty: () => M.empty
  }
}

/**
 * @since 2.0.0
 */
export const of: <R, A>(a: A) => Reader<R, A> = T.of

/**
 * @since 2.0.0
 */
export const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI> = {
  URI,
  map: (ma, f) => e => f(ma(e)),
  of,
  ap: T.ap,
  chain: T.chain,
  promap: (mbc, f, g) => a => g(mbc(f(a))),
  compose: (ab, la) => l => ab(la(l)),
  id: () => id,
  first: pab => ([a, c]) => [pab(a), c],
  second: pbc => ([a, b]) => [a, pbc(b)],
  left: <A, B, C>(pab: Reader<A, B>): Reader<E.Either<A, C>, E.Either<B, C>> =>
    E.fold<A, C, E.Either<B, C>>(a => E.left(pab(a)), E.right),
  right: <A, B, C>(pbc: Reader<B, C>): Reader<E.Either<A, B>, E.Either<A, C>> =>
    E.fold<A, B, E.Either<A, C>>(E.left, b => E.right(pbc(b)))
}

const { ap, apFirst, apSecond, chain, chainFirst, compose, flatten, map, promap } = pipeable(reader)

export {
  /**
   * @since 2.0.0
   */
  ap,
  /**
   * @since 2.0.0
   */
  apFirst,
  /**
   * @since 2.0.0
   */
  apSecond,
  /**
   * @since 2.0.0
   */
  chain,
  /**
   * @since 2.0.0
   */
  chainFirst,
  /**
   * @since 2.0.0
   */
  compose,
  /**
   * @since 2.0.0
   */
  flatten,
  /**
   * @since 2.0.0
   */
  map,
  /**
   * @since 2.0.0
   */
  promap
}
