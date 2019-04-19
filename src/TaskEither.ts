/**
 * @file `TaskEither<L, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `L`. If you want to represent an asynchronous computation that never fails, please see `Task`.
 */
import { Alt2 } from './Alt'
import { Bifunctor2 } from './Bifunctor'
import * as E from './Either'
import * as eitherT from './EitherT'
import { identity, Lazy, Predicate, Refinement } from './function'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2 } from './Monad'
import { MonadIO2 } from './MonadIO'
import { MonadTask2 } from './MonadTask'
import { MonadThrow2 } from './MonadThrow'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import Task = T.Task

const task = T.task

declare module './HKT' {
  interface URI2HKT2<L, A> {
    TaskEither: TaskEither<L, A>
  }
}

export const URI = 'TaskEither'

export type URI = typeof URI

const EitherT = eitherT.getEitherT(task)
const foldT = eitherT.fold(task)

export interface TaskEither<L, A> extends Task<E.Either<L, A>> {}

/**
 * @since 2.0.0
 */
export const fold = <L, A, R>(ma: TaskEither<L, A>, onLeft: (l: L) => R, onRight: (a: A) => R): Task<R> => {
  return foldT(ma, onLeft, onRight)
}

/**
 * @since 2.0.0
 */
export const foldTask = <L, A, R>(
  ma: TaskEither<L, A>,
  onLeft: (l: L) => Task<R>,
  onRight: (a: A) => Task<R>
): Task<R> => {
  return task.chain(ma, e => E.fold(e, onLeft, onRight))
}

/**
 * @since 2.0.0
 */
export const getOrElse = <L, A>(ma: TaskEither<L, A>, a: A): Task<A> => {
  return getOrElseL(ma, () => a)
}

/**
 * @since 2.0.0
 */
export const getOrElseL = <L, A>(ma: TaskEither<L, A>, f: (l: L) => A): Task<A> => {
  return fold(ma, f, identity)
}

/**
 * @since 2.0.0
 */
export const mapLeft = <L, A, M>(ma: TaskEither<L, A>, f: (l: L) => M): TaskEither<M, A> => {
  return task.map(ma, e => E.mapLeft(e, f))
}

/**
 * @since 2.0.0
 */
export function filterOrElse<L, A, B extends A>(ma: TaskEither<L, A>, p: Refinement<A, B>, zero: L): TaskEither<L, B>
export function filterOrElse<L, A>(ma: TaskEither<L, A>, p: Predicate<A>, zero: L): TaskEither<L, A>
export function filterOrElse<L, A>(ma: TaskEither<L, A>, p: Predicate<A>, zero: L): TaskEither<L, A> {
  return task.map(ma, e => E.filterOrElse(e, p, zero))
}

/**
 * @since 2.0.0
 */
export function filterOrElseL<L, A, B extends A>(
  ma: TaskEither<L, A>,
  p: Refinement<A, B>,
  zero: (a: A) => L
): TaskEither<L, B>
export function filterOrElseL<L, A>(ma: TaskEither<L, A>, p: Predicate<A>, zero: (a: A) => L): TaskEither<L, A>
export function filterOrElseL<L, A>(ma: TaskEither<L, A>, p: Predicate<A>, zero: (a: A) => L): TaskEither<L, A> {
  return task.map(ma, e => E.filterOrElseL(e, p, zero))
}

/**
 * @since 2.0.0
 */
export const make = <A>(a: A): TaskEither<never, A> => {
  return EitherT.of(a)
}

/**
 * @since 2.0.0
 */
export const orElse = <L, A, M>(ma: TaskEither<L, A>, f: (l: L) => TaskEither<M, A>): TaskEither<M, A> => {
  return task.chain(ma, e => E.fold<L, A, Task<E.Either<M, A>>>(e, f, EitherT.of))
}

const alt = <L, A>(fx: TaskEither<L, A>, fy: TaskEither<L, A>): TaskEither<L, A> => {
  return orElse(fx, () => fy)
}

const bimap = <L, V, A, B>(fa: TaskEither<L, A>, f: (l: L) => V, g: (a: A) => B): TaskEither<V, B> => {
  return task.map(fa, e => E.either.bimap(e, f, g))
}

/**
 * @since 1.0.0
 */
export const right = <A>(fa: Task<A>): TaskEither<never, A> => {
  return task.map(fa, E.right)
}

/**
 * @since 1.0.0
 */
export const left = <L>(fl: Task<L>): TaskEither<L, never> => {
  return task.map(fl, E.left)
}

/**
 * @since 1.0.0
 */
export const fromEither = <L, A>(fa: E.Either<L, A>): TaskEither<L, A> => {
  return task.of(fa)
}

/**
 * @since 1.5.0
 */
export const fromIO = <A>(fa: IO<A>): TaskEither<never, A> => {
  return right(T.fromIO(fa))
}

/**
 * @since 1.3.0
 */
export const fromLeft = <L>(l: L): TaskEither<L, never> => {
  return fromEither(E.left(l))
}

/**
 * @since 1.6.0
 */
export const fromIOEither = <L, A>(fa: IOEither<L, A>): TaskEither<L, A> => {
  return T.fromIO(fa.value)
}

/**
 * @since 1.6.0
 */
export function fromPredicate<L, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => L
): ((a: A) => TaskEither<L, B>)
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): ((a: A) => TaskEither<L, A>)
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): ((a: A) => TaskEither<L, A>) {
  const f = E.fromPredicate(predicate, onFalse)
  return a => fromEither(f(a))
}

/**
 * @since 1.9.0
 */
export const getSemigroup = <L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> => {
  return T.getSemigroup(E.getSemigroup<L, A>(S))
}

/**
 * @since 1.9.0
 */
export const getApplySemigroup = <L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> => {
  return T.getSemigroup(E.getApplySemigroup<L, A>(S))
}

/**
 * @since 1.9.0
 */
export const getApplyMonoid = <L, A>(M: Monoid<A>): Monoid<TaskEither<L, A>> => {
  return {
    ...getApplySemigroup(M),
    empty: make(M.empty)
  }
}

/**
 * Transforms a `Promise` into a `TaskEither`, catching the possible error.
 *
 * @example
 * import { createHash } from 'crypto'
 * import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
 * import { createReadStream } from 'fs'
 * import { left } from 'fp-ts/lib/Either'
 *
 * const md5 = (path: string): TaskEither<string, string> => {
 *   const mkHash = (p: string) =>
 *     new Promise<string>((resolve, reject) => {
 *       const hash = createHash('md5')
 *       const rs = createReadStream(p)
 *       rs.on('error', (error: Error) => reject(error.message))
 *       rs.on('data', (chunk: string) => hash.update(chunk))
 *       rs.on('end', () => {
 *         return resolve(hash.digest('hex'))
 *       })
 *     })
 *   return tryCatch(() => mkHash(path), message => `cannot create md5 hash: ${String(message)}`)
 * }
 *
 * md5('foo')
 *   .run()
 *   .then(x => {
 *     assert.deepStrictEqual(x, left(`cannot create md5 hash: ENOENT: no such file or directory, open 'foo'`))
 *   })
 *
 *
 * @since 1.0.0
 */
export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => L): TaskEither<L, A> => {
  return T.tryCatch(f, onRejected)
}

/**
 * Convert a node style callback function to one returning a `TaskEither`
 *
 * **Note**. If the function `f` admits multiple overloadings, `taskify` will pick last one. If you want a different
 * behaviour, add an explicit type annotation
 *
 * ```ts
 * // readFile admits multiple overloadings
 *
 * // const readFile: (a: string) => TaskEither<NodeJS.ErrnoException, Buffer>
 * const readFile = taskify(fs.readFile)
 *
 * const readFile2: (filename: string, encoding: string) => TaskEither<NodeJS.ErrnoException, Buffer> = taskify(
 *   fs.readFile
 * )
 * ```
 *
 * @example
 * import { taskify } from 'fp-ts/lib/TaskEither'
 * import * as fs from 'fs'
 *
 * // const stat: (a: string | Buffer) => TaskEither<NodeJS.ErrnoException, fs.Stats>
 * const stat = taskify(fs.stat)
 * assert.strictEqual(stat.length, 0)
 *
 *
 * @since 1.5.0
 */
export function taskify<L, R>(f: (cb: (e: L | null | undefined, r?: R) => void) => void): () => TaskEither<L, R>
export function taskify<A, L, R>(
  f: (a: A, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A) => TaskEither<L, R>
export function taskify<A, B, L, R>(
  f: (a: A, b: B, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B) => TaskEither<L, R>
export function taskify<A, B, C, L, R>(
  f: (a: A, b: B, c: C, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C) => TaskEither<L, R>
export function taskify<A, B, C, D, L, R>(
  f: (a: A, b: B, c: C, d: D, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D) => TaskEither<L, R>
export function taskify<A, B, C, D, E, L, R>(
  f: (a: A, b: B, c: C, d: D, e: E, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D, e: E) => TaskEither<L, R>
export function taskify<L, R>(f: Function): () => TaskEither<L, R> {
  return function() {
    const args = Array.prototype.slice.call(arguments)
    return () =>
      new Promise(resolve => {
        const cbResolver = (e: L, r: R) => (e != null ? resolve(E.left(e)) : resolve(E.right(r)))
        f.apply(null, args.concat(cbResolver))
      })
  }
}

const fromTask = right

const chain = EitherT.chain

/**
 * @since 2.0.0
 */
export function attempt<L, A>(ma: TaskEither<L, A>): TaskEither<L, E.Either<L, A>> {
  return task.map(ma, E.right)
}

/**
 * Make sure that a resource is cleaned up in the event of an exception. The
 * release action is called regardless of whether the body action throws or
 * returns.
 *
 * @since 1.10.0
 */
export const bracket = <L, A, B>(
  acquire: TaskEither<L, A>,
  use: (a: A) => TaskEither<L, B>,
  release: (a: A, e: E.Either<L, B>) => TaskEither<L, void>
): TaskEither<L, B> => {
  return chain(acquire, a =>
    chain(attempt(use(a)), e => chain(release(a, e), () => E.fold<L, B, TaskEither<L, B>>(e, fromLeft, taskEither.of)))
  )
}

const throwError = fromLeft

const map = EitherT.map

/**
 * @since 1.0.0
 */
export const taskEither: Monad2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  MonadIO2<URI> &
  MonadTask2<URI> &
  MonadThrow2<URI> = {
  URI,
  bimap,
  map,
  of: make,
  ap: EitherT.ap,
  chain,
  alt,
  fromIO,
  fromTask,
  throwError,
  fromEither,
  fromOption: (o, e) => (o.isNone() ? throwError(e) : make(o.value))
}

/**
 * Like `TaskEither` but `ap` is sequential
 *
 * @since 1.10.0
 */
export const taskEitherSeq: typeof taskEither = {
  ...taskEither,
  ap: (fab, fa) => chain(fab, f => map(fa, f))
}
