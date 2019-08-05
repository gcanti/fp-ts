import { Alt3 } from './Alt'
import { Bifunctor3 } from './Bifunctor'
import { Either } from './Either'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad3 } from './Monad'
import { MonadTask3 } from './MonadTask'
import { MonadThrow3 } from './MonadThrow'
import { Monoid } from './Monoid'
import { pipe, pipeable } from './pipeable'
import { getSemigroup as getReaderSemigroup, Reader } from './Reader'
import { ReaderEither } from './ReaderEither'
import { getReaderM } from './ReaderT'
import { Semigroup } from './Semigroup'
import { Task } from './Task'
import * as TE from './TaskEither'

import TaskEither = TE.TaskEither

const T = getReaderM(TE.taskEither)

declare module './HKT' {
  interface URItoKind3<R, E, A> {
    ReaderTaskEither: ReaderTaskEither<R, E, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'ReaderTaskEither'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface ReaderTaskEither<R, E, A> {
  (r: R): TaskEither<E, A>
}

/**
 * @since 2.0.0
 */
export function run<R, E, A>(ma: ReaderTaskEither<R, E, A>, r: R): Promise<Either<E, A>> {
  return ma(r)()
}

/**
 * @since 2.0.0
 */
export function left<R, E = never, A = never>(e: E): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.left(e))
}

/**
 * @since 2.0.0
 */
export const right: <R, E = never, A = never>(a: A) => ReaderTaskEither<R, E, A> = T.of

/**
 * @since 2.0.0
 */
export function rightTask<R, E = never, A = never>(ma: Task<A>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.rightTask(ma))
}

/**
 * @since 2.0.0
 */
export function leftTask<R, E = never, A = never>(me: Task<E>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.leftTask(me))
}

/**
 * @since 2.0.0
 */
export const fromTaskEither: <R, E, A>(ma: TaskEither<E, A>) => ReaderTaskEither<R, E, A> = T.fromM

/**
 * @since 2.0.0
 */
export const rightReader: <R, E = never, A = never>(ma: Reader<R, A>) => ReaderTaskEither<R, E, A> = T.fromReader

/**
 * @since 2.0.0
 */
export function leftReader<R, E = never, A = never>(me: Reader<R, E>): ReaderTaskEither<R, E, A> {
  return r => TE.left(me(r))
}

/**
 * @since 2.0.0
 */
export function fromIOEither<R, E, A>(ma: IOEither<E, A>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.fromIOEither(ma))
}

/**
 * @since 2.0.0
 */
export function fromReaderEither<R, E, A>(ma: ReaderEither<R, E, A>): ReaderTaskEither<R, E, A> {
  return r => TE.fromEither(ma(r))
}

/**
 * @since 2.0.0
 */
export function rightIO<R, E = never, A = never>(ma: IO<A>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.rightIO(ma))
}

/**
 * @since 2.0.0
 */
export function leftIO<R, E = never, A = never>(me: IO<E>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.leftIO(me))
}

/**
 * @since 2.0.0
 */
export function fold<R, E, A, B>(
  onLeft: (e: E) => Reader<R, Task<B>>,
  onRight: (a: A) => Reader<R, Task<B>>
): (ma: ReaderTaskEither<R, E, A>) => Reader<R, Task<B>> {
  return ma => r =>
    pipe(
      ma(r),
      TE.fold(e => onLeft(e)(r), a => onRight(a)(r))
    )
}

/**
 * @since 2.0.0
 */
export function getOrElse<R, E, A>(
  onLeft: (e: E) => Reader<R, Task<A>>
): (ma: ReaderTaskEither<R, E, A>) => Reader<R, Task<A>> {
  return ma => r => TE.getOrElse<E, A>(e => onLeft(e)(r))(ma(r))
}

/**
 * @since 2.0.0
 */
export function orElse<R, E, A, M>(
  onLeft: (e: E) => ReaderTaskEither<R, M, A>
): (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, M, A> {
  return ma => r => TE.orElse<E, A, M>(e => onLeft(e)(r))(ma(r))
}

/**
 * @since 2.0.0
 */
export function swap<R, E, A>(ma: ReaderTaskEither<R, E, A>): ReaderTaskEither<R, A, E> {
  return e => TE.swap(ma(e))
}

/**
 * @since 2.0.0
 */
export function getSemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderTaskEither<R, E, A>> {
  return getReaderSemigroup(TE.getSemigroup<E, A>(S))
}

/**
 * @since 2.0.0
 */
export function getApplySemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderTaskEither<R, E, A>> {
  return getReaderSemigroup(TE.getApplySemigroup<E, A>(S))
}

/**
 * @since 2.0.0
 */
export function getApplyMonoid<R, E, A>(M: Monoid<A>): Monoid<ReaderTaskEither<R, E, A>> {
  return {
    concat: getApplySemigroup<R, E, A>(M).concat,
    empty: right(M.empty)
  }
}

/**
 * @since 2.0.0
 */
export const ask: <R, E = never>() => ReaderTaskEither<R, E, R> = T.ask

/**
 * @since 2.0.0
 */
export const asks: <R, E = never, A = never>(f: (r: R) => A) => ReaderTaskEither<R, E, A> = T.asks

/**
 * @since 2.0.0
 */
export function local<Q, R>(f: (f: Q) => R): <E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<Q, E, A> {
  return ma => T.local(ma, f)
}

/**
 * Make sure that a resource is cleaned up in the event of an exception. The
 * release action is called regardless of whether the body action throws or
 * returns.
 *
 * @since 2.0.4
 */
export function bracket<R, E, A, B>(
  aquire: ReaderTaskEither<R, E, A>,
  use: (a: A) => ReaderTaskEither<R, E, B>,
  release: (a: A, e: Either<E, B>) => ReaderTaskEither<R, E, void>
): ReaderTaskEither<R, E, B> {
  return r => TE.bracket(aquire(r), a => use(a)(r), (a, e) => release(a, e)(r))
}

/**
 * @since 2.0.0
 */
export const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadTask3<URI> & MonadThrow3<URI> = {
  URI,
  map: T.map,
  of: right,
  ap: T.ap,
  chain: T.chain,
  alt: (fx, fy) => r => TE.taskEither.alt(fx(r), () => fy()(r)),
  bimap: (ma, f, g) => e => TE.taskEither.bimap(ma(e), f, g),
  mapLeft: (ma, f) => e => TE.taskEither.mapLeft(ma(e), f),
  fromIO: rightIO,
  fromTask: rightTask,
  throwError: left
}

/**
 * Like `readerTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
export const readerTaskEitherSeq: typeof readerTaskEither = {
  ...readerTaskEither,
  ap: (mab, ma) => T.chain(mab, f => T.map(ma, f))
}

const {
  alt,
  ap,
  apFirst,
  apSecond,
  bimap,
  chain,
  chainFirst,
  flatten,
  map,
  mapLeft,
  fromOption,
  fromEither,
  fromPredicate,
  filterOrElse
} = pipeable(readerTaskEither)

export {
  /**
   * @since 2.0.0
   */
  alt,
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
  bimap,
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
  flatten,
  /**
   * @since 2.0.0
   */
  map,
  /**
   * @since 2.0.0
   */
  mapLeft,
  /**
   * @since 2.0.0
   */
  fromOption,
  /**
   * @since 2.0.0
   */
  fromEither,
  /**
   * @since 2.0.0
   */
  fromPredicate,
  /**
   * @since 2.0.0
   */
  filterOrElse
}
