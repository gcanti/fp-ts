/**
 * @file `TaskEither<E, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`. If you want to represent an asynchronous computation that never fails, please see `Task`.
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

/**
 * @since 2.0.0
 */
export const URI = 'TaskEither'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface TaskEither<E, A> extends Task<E.Either<E, A>> {}

/**
 * @since 2.0.0
 */
export const left: <E>(e: E) => TaskEither<E, never> = T.left

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
export function leftIO<E>(me: IO<E>): TaskEither<E, never> {
  return leftTask(task.fromIO(me))
}

/**
 * @since 2.0.0
 */
export const rightTask: <A>(ma: Task<A>) => TaskEither<never, A> = T.rightM

/**
 * @since 2.0.0
 */
export const leftTask: <E>(me: Task<E>) => TaskEither<E, never> = T.leftM

/**
 * @since 2.0.0
 */
export const fromEither: <E, A>(ma: E.Either<E, A>) => TaskEither<E, A> = task.of

/**
 * @since 2.0.0
 */
export function fromOption<E, A>(ma: Option<A>, onNone: () => E): TaskEither<E, A> {
  return fromEither(E.fromOption(ma, onNone))
}

/**
 * @since 2.0.0
 */
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskEither<E, A> = task.fromIO

/**
 * @since 2.0.0
 */
export function fromPredicate<E, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => E
): (a: A) => TaskEither<E, B>
export function fromPredicate<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => TaskEither<E, A>
export function fromPredicate<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => TaskEither<E, A> {
  const f = E.fromPredicate(predicate, onFalse)
  return a => task.of(f(a))
}

/**
 * @since 2.0.0
 */
export const fold: <E, A, R>(
  onLeft: (e: E) => Task<R>,
  onRight: (a: A) => Task<R>
) => (ma: TaskEither<E, A>) => Task<R> = T.fold

/**
 * @since 2.0.0
 */
export const getOrElse: <E, A>(f: (e: E) => Task<A>) => (ma: TaskEither<E, A>) => Task<A> = T.getOrElse

/**
 * @since 2.0.0
 */
export function filterOrElse<E, A, B extends A>(
  refinement: Refinement<A, B>,
  onFalse: (a: A) => E
): (ma: TaskEither<E, A>) => TaskEither<E, B>
export function filterOrElse<E, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => E
): (ma: TaskEither<E, A>) => TaskEither<E, A>
export function filterOrElse<E, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => E
): (ma: TaskEither<E, A>) => TaskEither<E, A> {
  return ma => task.map(ma, E.filterOrElse(predicate, onFalse))
}

/**
 * @since 2.0.0
 */
export const orElse: <E, A, M>(f: (e: E) => TaskEither<M, A>) => (ma: TaskEither<E, A>) => TaskEither<M, A> = T.orElse

/**
 * @since 2.0.0
 */
export const swap: <E, A>(ma: TaskEither<E, A>) => TaskEither<A, E> = T.swap

/**
 * @since 2.0.0
 */
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>> {
  return getTaskSemigroup(E.getSemigroup<E, A>(S))
}

/**
 * @since 2.0.0
 */
export function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>> {
  return getTaskSemigroup(E.getApplySemigroup<E, A>(S))
}

/**
 * @since 2.0.0
 */
export function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<TaskEither<E, A>> {
  return {
    concat: getApplySemigroup<E, A>(M).concat,
    empty: right(M.empty)
  }
}

/**
 * @since 2.0.0
 */
export function tryCatch<E, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => E): TaskEither<E, A> {
  return () => f().then(a => E.right(a), reason => E.left(onRejected(reason)))
}

/**
 * Make sure that a resource is cleaned up in the event of an exception. The
 * release action is called regardless of whether the body action throws or
 * returns.
 *
 * @since 2.0.0
 */
export const bracket: <E, A, B>(
  acquire: TaskEither<E, A>,
  use: (a: A) => TaskEither<E, B>,
  release: (a: A, e: E.Either<E, B>) => TaskEither<E, void>
) => TaskEither<E, B> = T.bracket

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
  alt: T.alt,
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
  ap: (mab, ma) => T.chain(mab, f => T.map(ma, f))
}
