/**
 * @file `TaskEither<L, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `L`. If you want to represent an asynchronous computation that never fails, please see `Task`.
 */
import { Alt2 } from './Alt'
import { Bifunctor2 } from './Bifunctor'
import * as E from './Either'
import { getEitherM } from './EitherT'
import { Predicate, Refinement, Lazy } from './function'
import { IOEither } from './IOEither'
import { Monad2 } from './Monad'
import { MonadIO2 } from './MonadIO'
import { MonadTask2 } from './MonadTask'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { getSemigroup as getTaskSemigroup, Task, task } from './Task'
import { Option } from './Option'
import { IO } from './IO'

const T = getEitherM(task)

declare module './HKT' {
  interface URI2HKT2<L, A> {
    TaskEither: TaskEither<L, A>
  }
}

export const URI = 'TaskEither'

export type URI = typeof URI

export interface TaskEither<L, A> extends Task<E.Either<L, A>> {}

/**
 * @since 2.0.0
 */
export const left: <L>(l: L) => TaskEither<L, never> = T.left

/**
 * @since 2.0.0
 */
export const right: <A>(a: A) => TaskEither<never, A> = T.of

/**
 * @since 2.0.0
 */
export function rightIO<A>(ma: IO<A>): TaskEither<never, A> {
  return rightTask(task.fromIO(ma))
}

/**
 * @since 2.0.0
 */
export function leftIO<L>(ml: IO<L>): TaskEither<L, never> {
  return leftTask(task.fromIO(ml))
}

/**
 * @since 2.0.0
 */
export const rightTask: <A>(ma: Task<A>) => TaskEither<never, A> = T.rightM

/**
 * @since 2.0.0
 */
export const leftTask: <L>(ml: Task<L>) => TaskEither<L, never> = T.leftM

/**
 * @since 2.0.0
 */
export const fromEither: <L, A>(ma: E.Either<L, A>) => TaskEither<L, A> = task.of

/**
 * @since 2.0.0
 */
export function fromOption<L, A>(ma: Option<A>, onNone: () => L): TaskEither<L, A> {
  return fromEither(E.fromOption(ma, onNone))
}

/**
 * @since 2.0.0
 */
export const fromIOEither: <L, A>(fa: IOEither<L, A>) => TaskEither<L, A> = task.fromIO

/**
 * @since 2.0.0
 */
export function fromPredicate<L, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => L
): (a: A) => TaskEither<L, B>
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => TaskEither<L, A>
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => TaskEither<L, A> {
  const f = E.fromPredicate(predicate, onFalse)
  return a => task.of(f(a))
}

/**
 * @since 2.0.0
 */
export const fold: <L, A, R>(ma: TaskEither<L, A>, onLeft: (l: L) => Task<R>, onRight: (a: A) => Task<R>) => Task<R> =
  T.fold

/**
 * @since 2.0.0
 */
export const getOrElse: <L, A>(ma: TaskEither<L, A>, f: (l: L) => Task<A>) => Task<A> = T.getOrElse

/**
 * @since 2.0.0
 */
export function filterOrElse<L, A, B extends A>(
  ma: TaskEither<L, A>,
  p: Refinement<A, B>,
  zero: (a: A) => L
): TaskEither<L, B>
export function filterOrElse<L, A>(ma: TaskEither<L, A>, p: Predicate<A>, zero: (a: A) => L): TaskEither<L, A>
export function filterOrElse<L, A>(ma: TaskEither<L, A>, p: Predicate<A>, zero: (a: A) => L): TaskEither<L, A> {
  return task.map(ma, e => E.filterOrElse(e, p, zero))
}

/**
 * @since 2.0.0
 */
export const orElse: <L, A, M>(ma: TaskEither<L, A>, f: (l: L) => TaskEither<M, A>) => TaskEither<M, A> = T.orElse

/**
 * @since 2.0.0
 */
export const swap: <L, A>(ma: TaskEither<L, A>) => TaskEither<A, L> = T.swap

/**
 * @since 2.0.0
 */
export function getSemigroup<L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> {
  return getTaskSemigroup(E.getSemigroup<L, A>(S))
}

/**
 * @since 2.0.0
 */
export function getApplySemigroup<L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> {
  return getTaskSemigroup(E.getApplySemigroup<L, A>(S))
}

/**
 * @since 2.0.0
 */
export function getApplyMonoid<L, A>(M: Monoid<A>): Monoid<TaskEither<L, A>> {
  return {
    concat: getApplySemigroup<L, A>(M).concat,
    empty: right(M.empty)
  }
}

/**
 * @since 2.0.0
 */
export function tryCatch<L, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => L): TaskEither<L, A> {
  return () => f().then(a => E.right(a), reason => E.left(onRejected(reason)))
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
    taskEither.chain(task.map(use(a), E.right), e =>
      taskEither.chain(release(a, e), () => E.fold<L, B, TaskEither<L, B>>(e, left, taskEither.of))
    )
  )
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
export const taskEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> & MonadTask2<URI> = {
  URI,
  bimap: T.bimap,
  mapLeft: T.mapLeft,
  map: T.map,
  of: right,
  ap: T.ap,
  chain: T.chain,
  alt: orElse,
  fromIO: rightIO,
  fromTask: rightTask
}

/**
 * Like `TaskEither` but `ap` is sequential
 *
 * @since 2.0.0
 */
export const taskEitherSeq: typeof taskEither = {
  ...taskEither,
  ap: (fab, fa) => T.chain(fab, f => T.map(fa, f))
}
