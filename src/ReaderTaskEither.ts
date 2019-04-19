import { Alt3 } from './Alt'
import { Bifunctor3 } from './Bifunctor'
import { Either } from './Either'
import { Predicate, Refinement } from './function'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad3 } from './Monad'
import { MonadIO3 } from './MonadIO'
import { MonadTask3 } from './MonadTask'
import { MonadThrow3 } from './MonadThrow'
import { Reader } from './Reader'
import * as readerT from './ReaderT'
import { Task } from './Task'
import * as TE from './TaskEither'

import TaskEither = TE.TaskEither

const T = readerT.getReaderT(TE.taskEither)

declare module './HKT' {
  interface URI2HKT3<U, L, A> {
    ReaderTaskEither: ReaderTaskEither<U, L, A>
  }
}

export const URI = 'ReaderTaskEither'

export type URI = typeof URI

/**
 * @since 1.6.0
 */
export interface ReaderTaskEither<E, L, A> {
  (e: E): TaskEither<L, A>
}

const map = <E, L, A, B>(ma: ReaderTaskEither<E, L, A>, f: (a: A) => B): ReaderTaskEither<E, L, B> => {
  return T.map(ma, f)
}

/**
 * @since 2.0.0
 */
export const make = <A>(a: A): ReaderTaskEither<unknown, never, A> => {
  return T.of(a)
}

/**
 * @since 2.0.0
 */
export const run = <E, L, A>(ma: ReaderTaskEither<E, L, A>, e: E): Promise<Either<L, A>> => {
  return ma(e)()
}

const ap = <E, L, A, B>(
  fab: ReaderTaskEither<E, L, (a: A) => B>,
  fa: ReaderTaskEither<E, L, A>
): ReaderTaskEither<E, L, B> => {
  return T.ap(fab, fa)
}

const chain = <E, L, A, B>(
  fa: ReaderTaskEither<E, L, A>,
  f: (a: A) => ReaderTaskEither<E, L, B>
): ReaderTaskEither<E, L, B> => {
  return T.chain(fa, f)
}

/**
 * @since 2.0.0
 */
export function orElse<E, L, A, M>(
  ma: ReaderTaskEither<E, L, A>,
  f: (l: L) => ReaderTaskEither<E, M, A>
): ReaderTaskEither<E, M, A> {
  return e => TE.orElse(ma(e), l => f(l)(e))
}

/**
 * @since 2.0.0
 */
export function mapLeft<E, L, A, M>(ma: ReaderTaskEither<E, L, A>, f: (l: L) => M): ReaderTaskEither<E, M, A> {
  return e => TE.mapLeft(ma(e), f)
}

/**
 * @since 2.0.0
 */
export function fold<E, L, A, R>(
  ma: ReaderTaskEither<E, L, A>,
  onLeft: (l: L) => R,
  onRight: (a: A) => R
): Reader<E, Task<R>> {
  return new Reader(e => TE.fold(ma(e), onLeft, onRight))
}

const alt = <E, L, A>(fx: ReaderTaskEither<E, L, A>, fy: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, A> => {
  return orElse(fx, () => fy)
}

const bimap = <E, L, V, A, B>(
  fa: ReaderTaskEither<E, L, A>,
  f: (l: L) => V,
  g: (a: A) => B
): ReaderTaskEither<E, V, B> => {
  return e => TE.taskEither.bimap(fa(e), f, g)
}

/**
 * @since 1.6.0
 */
export const ask = <E>(): ReaderTaskEither<E, never, E> => {
  return e => TE.taskEither.of(e)
}

/**
 * @since 1.6.0
 */
export const asks = <E, A>(f: (e: E) => A): ReaderTaskEither<E, never, A> => {
  return e => TE.taskEither.of(f(e))
}

/**
 * @since 1.6.0
 */
export const local = <E, L, A, F>(ma: ReaderTaskEither<E, L, A>, f: (f: F) => E): ReaderTaskEither<F, L, A> => {
  return e => ma(f(e))
}

/**
 * @since 1.6.0
 */
export const right = <E, A>(fa: Task<A>): ReaderTaskEither<E, never, A> => {
  return () => TE.right(fa)
}

/**
 * @since 1.6.0
 */
export const left = <E, L>(fa: Task<L>): ReaderTaskEither<E, L, never> => {
  return () => TE.left(fa)
}

/**
 * @since 1.6.0
 */
export const fromTaskEither = <E, L, A>(fa: TaskEither<L, A>): ReaderTaskEither<E, L, A> => {
  return () => fa
}

const readerTfromReader = readerT.fromReader(TE.taskEither)
/**
 * @since 1.6.0
 */
export const fromReader = <E, A>(fa: Reader<E, A>): ReaderTaskEither<E, never, A> => {
  return readerTfromReader(fa)
}

/**
 * @since 1.6.0
 */
export const fromEither = <L, A>(fa: Either<L, A>): ReaderTaskEither<unknown, L, A> => {
  return fromTaskEither(TE.fromEither(fa))
}

/**
 * @since 1.6.0
 */
export const fromIO = <A>(fa: IO<A>): ReaderTaskEither<unknown, never, A> => {
  return fromTaskEither(TE.fromIO(fa))
}

/**
 * @since 1.6.0
 */
export const fromLeft = <L>(l: L): ReaderTaskEither<unknown, L, never> => {
  return fromTaskEither(TE.fromLeft(l))
}

/**
 * @since 1.6.0
 */
export const fromIOEither = <L, A>(fa: IOEither<L, A>): ReaderTaskEither<unknown, L, A> => {
  return fromTaskEither(TE.fromIOEither(fa))
}

/**
 * @since 1.6.0
 */
export function fromPredicate<L, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => L
): ((a: A) => ReaderTaskEither<unknown, L, B>)
export function fromPredicate<L, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => L
): ((a: A) => ReaderTaskEither<unknown, L, A>)
export function fromPredicate<L, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => L
): ((a: A) => ReaderTaskEither<unknown, L, A>) {
  const f = TE.fromPredicate(predicate, onFalse)
  return a => fromTaskEither(f(a))
}

/**
 * @since 1.6.0
 */
export const tryCatch = <E, L, A>(
  f: (e: E) => Promise<A>,
  onError: (reason: unknown, e: E) => L
): ReaderTaskEither<E, L, A> => {
  return e => TE.tryCatch(() => f(e), (reason: unknown) => onError(reason, e))
}

const fromTask = right

const throwError = fromLeft

/**
 * @since 1.6.0
 */
export const readerTaskEither: Monad3<URI> &
  Bifunctor3<URI> &
  Alt3<URI> &
  MonadIO3<URI> &
  MonadTask3<URI> &
  MonadThrow3<URI> = {
  URI,
  map,
  of: make,
  ap,
  chain,
  alt,
  bimap,
  fromIO,
  fromTask,
  throwError,
  fromEither,
  fromOption: (o, e) => (o.isNone() ? throwError(e) : make(o.value))
}

/**
 * Like `readerTaskEither` but `ap` is sequential
 * @since 1.10.0
 */
export const readerTaskEitherSeq: typeof readerTaskEither = {
  ...readerTaskEither,
  ap: (fab, fa) => chain(fab, f => map(fa, f))
}
