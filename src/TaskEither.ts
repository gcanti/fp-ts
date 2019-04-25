/**
 * @file `TaskEither<L, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `L`. If you want to represent an asynchronous computation that never fails, please see `Task`.
 */
import { Alt2 } from './Alt'
import { Bifunctor2 } from './Bifunctor'
import * as E from './Either'
import { getEitherT } from './EitherT'
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

const eitherT = getEitherT(task)

export interface TaskEither<L, A> extends Task<E.Either<L, A>> {}

/**
 * @since 2.0.0
 */
export const fold: <L, A, R>(ma: TaskEither<L, A>, onLeft: (l: L) => R, onRight: (a: A) => R) => Task<R> = eitherT.fold

/**
 * @since 2.0.0
 */
export function foldTask<L, A, R>(
  ma: TaskEither<L, A>,
  onLeft: (l: L) => Task<R>,
  onRight: (a: A) => Task<R>
): Task<R> {
  return task.chain(ma, e => E.fold(e, onLeft, onRight))
}

/**
 * @since 2.0.0
 */
export function getOrElse<L, A>(ma: TaskEither<L, A>, a: A): Task<A> {
  return getOrElseL(ma, () => a)
}

/**
 * @since 2.0.0
 */
export function getOrElseL<L, A>(ma: TaskEither<L, A>, f: (l: L) => A): Task<A> {
  return fold(ma, f, identity)
}

/**
 * @since 2.0.0
 */
export function mapLeft<L, A, M>(ma: TaskEither<L, A>, f: (l: L) => M): TaskEither<M, A> {
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
export const fromRight: <A>(a: A) => TaskEither<never, A> = eitherT.of

/**
 * @since 2.0.0
 */
export function orElse<L, A, M>(ma: TaskEither<L, A>, f: (l: L) => TaskEither<M, A>): TaskEither<M, A> {
  return task.chain(ma, e => E.fold<L, A, Task<E.Either<M, A>>>(e, f, eitherT.of))
}

/**
 * @since 2.0.0
 */
export function right<A>(fa: Task<A>): TaskEither<never, A> {
  return task.map(fa, E.right)
}

/**
 * @since 2.0.0
 */
export function left<L>(fl: Task<L>): TaskEither<L, never> {
  return task.map(fl, E.left)
}

/**
 * @since 2.0.0
 */
export const fromEither: <L, A>(fa: E.Either<L, A>) => TaskEither<L, A> = task.of

/**
 * @since 2.0.0
 */
export function fromIO<A>(fa: IO<A>): TaskEither<never, A> {
  return right(T.fromIO(fa))
}

/**
 * @since 2.0.0
 */
export function fromLeft<L>(l: L): TaskEither<L, never> {
  return fromEither(E.left(l))
}

/**
 * @since 2.0.0
 */
export const fromIOEither: <L, A>(fa: IOEither<L, A>) => TaskEither<L, A> = T.fromIO

/**
 * @since 2.0.0
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
 * @since 2.0.0
 */
export function getSemigroup<L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> {
  return T.getSemigroup(E.getSemigroup<L, A>(S))
}

/**
 * @since 2.0.0
 */
export function getApplySemigroup<L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> {
  return T.getSemigroup(E.getApplySemigroup<L, A>(S))
}

/**
 * @since 2.0.0
 */
export function getApplyMonoid<L, A>(M: Monoid<A>): Monoid<TaskEither<L, A>> {
  return {
    ...getApplySemigroup(M),
    empty: fromRight(M.empty)
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
 * function md5(path: string): TaskEither<string, string> {
 *   const mkHash = (p: string) =>
 *     new Promise<string>((resolve, reject) => {
 *       const hash = createHash('md5')
 *       const rs = createReadStream(p)
 *       rs.on('error', (error: Error) => reject(error.message))
 *       rs.on('data', (chunk: string) => hash.update(chunk))
 *       rs.on('end', () => resolve(hash.digest('hex')))
 *     })
 *   return tryCatch(() => mkHash(path), message => `cannot create md5 hash: ${String(message)}`)
 * }
 *
 * md5('foo')()
 *   .then(x => {
 *     assert.deepStrictEqual(x, left(`cannot create md5 hash: ENOENT: no such file or directory, open 'foo'`))
 *   })
 *
 *
 * @since 2.0.0
 */
export function tryCatch<L, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => L): TaskEither<L, A> {
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
 * @since 2.0.0
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
 * @since 2.0.0
 */
export function bracket<L, A, B>(
  acquire: TaskEither<L, A>,
  use: (a: A) => TaskEither<L, B>,
  release: (a: A, e: E.Either<L, B>) => TaskEither<L, void>
): TaskEither<L, B> {
  return taskEither.chain(acquire, a =>
    taskEither.chain(attempt(use(a)), e =>
      taskEither.chain(release(a, e), () => E.fold<L, B, TaskEither<L, B>>(e, fromLeft, taskEither.of))
    )
  )
}

/**
 * @since 2.0.0
 */
export const taskEither: Monad2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  MonadIO2<URI> &
  MonadTask2<URI> &
  MonadThrow2<URI> = {
  URI,
  bimap: (ma, f, g) => task.map(ma, e => E.either.bimap(e, f, g)),
  map: eitherT.map,
  of: fromRight,
  ap: eitherT.ap,
  chain: eitherT.chain,
  alt: (mx, my) => orElse(mx, () => my),
  fromIO,
  fromTask: right,
  throwError: fromLeft,
  fromEither,
  fromOption: (o, e) => (o._tag === 'None' ? fromLeft(e) : fromRight(o.value))
}

/**
 * Like `TaskEither` but `ap` is sequential
 *
 * @since 2.0.0
 */
export const taskEitherSeq: typeof taskEither = {
  ...taskEither,
  ap: (fab, fa) => taskEither.chain(fab, f => taskEither.map(fa, f))
}
