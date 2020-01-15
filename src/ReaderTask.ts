/**
 * @since 2.3.0
 */
import { IO } from './IO'
import { Monad2 } from './Monad'
import { MonadTask2 } from './MonadTask'
import { Monoid } from './Monoid'
import { pipeable } from './pipeable'
import { getSemigroup as getReaderSemigroup, Reader } from './Reader'
import { getReaderM } from './ReaderT'
import { Semigroup } from './Semigroup'
import * as TA from './Task'

import Task = TA.Task

const T = getReaderM(TA.task)

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly ReaderTask: ReaderTask<E, A>
  }
}

/**
 * @since 2.3.0
 */
export const URI = 'ReaderTask'

/**
 * @since 2.3.0
 */
export type URI = typeof URI

/**
 * @since 2.3.0
 */
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}

/**
 * @since 2.4.0
 */
export function run<R, A>(ma: ReaderTask<R, A>, r: R): Promise<A> {
  return ma(r)()
}

/**
 * @since 2.3.0
 */
export const fromTask: <R, A>(ma: Task<A>) => ReaderTask<R, A> = T.fromM

/**
 * @since 2.3.0
 */
export const fromReader: <R, A = never>(ma: Reader<R, A>) => ReaderTask<R, A> = T.fromReader

/**
 * @since 2.3.0
 */
export function fromIO<R, A>(ma: IO<A>): ReaderTask<R, A> {
  return fromTask(TA.fromIO(ma))
}

/**
 * @since 2.3.0
 */
export const of: <R, A>(a: A) => ReaderTask<R, A> = T.of

/**
 * @since 2.3.0
 */
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>> {
  return getReaderSemigroup(TA.getSemigroup<A>(S))
}

/**
 * @since 2.3.0
 */
export function getMonoid<R, A>(M: Monoid<A>): Monoid<ReaderTask<R, A>> {
  return {
    concat: getSemigroup<R, A>(M).concat,
    empty: of(M.empty)
  }
}

/**
 * @since 2.3.0
 */
export const ask: <R>() => ReaderTask<R, R> = T.ask

/**
 * @since 2.3.0
 */
export const asks: <R, A = never>(f: (r: R) => A) => ReaderTask<R, A> = T.asks

/**
 * @since 2.3.0
 */
export function local<Q, R>(f: (f: Q) => R): <A>(ma: ReaderTask<R, A>) => ReaderTask<Q, A> {
  return ma => T.local(ma, f)
}

/**
 * @since 2.4.0
 */
export function fromIOK<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>): <R>(...a: A) => ReaderTask<R, B> {
  return (...a) => fromIO(f(...a))
}

/**
 * @since 2.4.0
 */
export function chainIOK<A, B>(f: (a: A) => IO<B>): <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B> {
  return chain<any, A, B>(fromIOK(f))
}

/**
 * @since 2.4.0
 */
export function fromTaskK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
): <R>(...a: A) => ReaderTask<R, B> {
  return (...a) => fromTask(f(...a))
}

/**
 * @since 2.4.0
 */
export function chainTaskK<A, B>(f: (a: A) => Task<B>): <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B> {
  return chain<any, A, B>(fromTaskK(f))
}

/**
 * @since 2.3.0
 */

export const readerTask: Monad2<URI> & MonadTask2<URI> = {
  URI,
  map: T.map,
  of,
  ap: T.ap,
  chain: T.chain,
  fromIO,
  fromTask
}

/**
 * Like `readerTask` but `ap` is sequential
 * @since 2.3.0
 */
export const readerTaskSeq: typeof readerTask = {
  ...readerTask,
  ap: (mab, ma) => T.chain(mab, f => T.map(ma, f))
}

const { ap, apFirst, apSecond, chain, chainFirst, flatten, map } = pipeable(readerTask)

export {
  /**
   * @since 2.3.0
   */
  ap,
  /**
   * @since 2.3.0
   */
  apFirst,
  /**
   * @since 2.3.0
   */
  apSecond,
  /**
   * @since 2.3.0
   */
  chain,
  /**
   * @since 2.3.0
   */
  chainFirst,
  /**
   * @since 2.3.0
   */
  flatten,
  /**
   * @since 2.3.0
   */
  map
}
