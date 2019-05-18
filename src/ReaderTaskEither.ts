import { Alt3 } from './Alt'
import { Bifunctor3 } from './Bifunctor'
import { Either } from './Either'
import { pipeOp, Predicate, Refinement } from './function'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad3 } from './Monad'
import { MonadIO3 } from './MonadIO'
import { MonadTask3 } from './MonadTask'
import { Option } from './Option'
import { Reader } from './Reader'
import { getReaderM } from './ReaderT'
import { Task } from './Task'
import * as TE from './TaskEither'

import TaskEither = TE.TaskEither

const T = getReaderM(TE.taskEither)

declare module './HKT' {
  interface URI2HKT3<U, L, A> {
    ReaderTaskEither: ReaderTaskEither<U, L, A>
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
export function left<E>(e: E): ReaderTaskEither<unknown, E, never> {
  return fromTaskEither(TE.left(e))
}

/**
 * @since 2.0.0
 */
export const right: <A>(a: A) => ReaderTaskEither<unknown, never, A> = T.of

/**
 * @since 2.0.0
 */
export function rightTask<A>(ma: Task<A>): ReaderTaskEither<unknown, never, A> {
  return fromTaskEither(TE.rightTask(ma))
}

/**
 * @since 2.0.0
 */
export function leftTask<E>(me: Task<E>): ReaderTaskEither<unknown, E, never> {
  return fromTaskEither(TE.leftTask(me))
}

/**
 * @since 2.0.0
 */
export const fromTaskEither: <E, A>(ma: TaskEither<E, A>) => ReaderTaskEither<unknown, E, A> = T.fromM

/**
 * @since 2.0.0
 */
export const rightReader: <R, A>(ma: Reader<R, A>) => ReaderTaskEither<R, never, A> = T.fromReader

/**
 * @since 2.0.0
 */
export function leftReader<R, E>(me: Reader<R, E>): ReaderTaskEither<R, E, never> {
  return r => TE.left(me(r))
}

/**
 * @since 2.0.0
 */
export function fromIOEither<E, A>(ma: IOEither<E, A>): ReaderTaskEither<unknown, E, A> {
  return fromTaskEither(TE.fromIOEither(ma))
}

/**
 * @since 2.0.0
 */
export function fromEither<E, A>(ma: Either<E, A>): ReaderTaskEither<unknown, E, A> {
  return fromTaskEither(TE.fromEither(ma))
}

/**
 * @since 2.0.0
 */
export function fromOption<E, A>(ma: Option<A>, onNone: () => E): ReaderTaskEither<unknown, E, A> {
  return fromTaskEither(TE.fromOption(ma, onNone))
}

/**
 * @since 2.0.0
 */
export function rightIO<A>(ma: IO<A>): ReaderTaskEither<unknown, never, A> {
  return fromTaskEither(TE.rightIO(ma))
}

/**
 * @since 2.0.0
 */
export function leftIO<E>(me: IO<E>): ReaderTaskEither<unknown, E, never> {
  return fromTaskEither(TE.leftIO(me))
}

/**
 * @since 2.0.0
 */
export function fromPredicate<E, A, B extends A>(
  refinement: Refinement<A, B>,
  onFalse: (a: A) => E
): (a: A) => ReaderTaskEither<unknown, E, B>
export function fromPredicate<E, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => E
): (a: A) => ReaderTaskEither<unknown, E, A>
export function fromPredicate<E, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => E
): (a: A) => ReaderTaskEither<unknown, E, A> {
  const f = TE.fromPredicate(predicate, onFalse)
  return a => fromTaskEither(f(a))
}

/**
 * @since 2.0.0
 */
export function fold<R, E, A, B>(
  onLeft: (e: E) => Reader<R, Task<B>>,
  onRight: (a: A) => Reader<R, Task<B>>
): (ma: ReaderTaskEither<R, E, A>) => Reader<R, Task<B>> {
  return ma => r => pipeOp(ma(r), TE.fold(e => onLeft(e)(r), a => onRight(a)(r)))
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
  f: (e: E) => ReaderTaskEither<R, M, A>
): (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, M, A> {
  return ma => r => TE.orElse<E, A, M>(e => f(e)(r))(ma(r))
}

/**
 * @since 2.0.0
 */
export const ask: <R>() => ReaderTaskEither<R, never, R> = T.ask

/**
 * @since 2.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => ReaderTaskEither<R, never, A> = T.asks

/**
 * @since 2.0.0
 */
export const local: <Q, R>(f: (f: Q) => R) => <E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<Q, E, A> =
  T.local

const alt = <R, E, A>(
  fx: ReaderTaskEither<R, E, A>,
  fy: () => ReaderTaskEither<R, E, A>
): ReaderTaskEither<R, E, A> => {
  return r => TE.taskEither.alt(fx(r), () => fy()(r))
}

/**
 * @since 2.0.0
 */
export const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadIO3<URI> & MonadTask3<URI> = {
  URI,
  map: T.map,
  of: right,
  ap: T.ap,
  chain: T.chain,
  alt,
  bimap: (ma, f, g) => e => TE.taskEither.bimap(ma(e), f, g),
  mapLeft: (ma, f) => e => TE.taskEither.mapLeft(ma(e), f),
  fromIO: rightIO,
  fromTask: rightTask
}

/**
 * Like `readerTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
export const readerTaskEitherSeq: typeof readerTaskEither = {
  ...readerTaskEither,
  ap: (mab, ma) => T.chain(mab, f => T.map(ma, f))
}
