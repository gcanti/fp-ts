/**
 * @file `TaskEither<L, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `L`. If you want to represent an asynchronous computation that never fails, please see `Task`.
 */
import { Alt2 } from './Alt'
import { Bifunctor2 } from './Bifunctor'
import {
  Either,
  fromPredicate as eitherFromPredicate,
  getApplySemigroup as eitherGetApplySemigroup,
  getSemigroup as eitherGetSemigroup,
  left as eitherLeft,
  right as eitherRight
} from './Either'
import * as eitherT from './EitherT'
import { constant, constIdentity, Lazy, Predicate, Refinement, identity } from './function'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2 } from './Monad'
import { MonadIO2 } from './MonadIO'
import { MonadTask2 } from './MonadTask'
import { MonadThrow2 } from './MonadThrow'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { fromIO as taskFromIO, getSemigroup as taskGetSemigroup, Task, task, tryCatch as taskTryCatch } from './Task'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    TaskEither: TaskEither<L, A>
  }
}

export const URI = 'TaskEither'

export type URI = typeof URI

const T = eitherT.getEitherT2v(task)
const foldT = eitherT.fold(task)

/**
 * @since 1.0.0
 */
export class TaskEither<L, A> {
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: Task<Either<L, A>>) {}
  /** Runs the inner `Task` */
  run(): Promise<Either<L, A>> {
    return this.value.run()
  }
  map<B>(f: (a: A) => B): TaskEither<L, B> {
    return new TaskEither(T.map(this.value, f))
  }
  ap<B>(fab: TaskEither<L, (a: A) => B>): TaskEither<L, B> {
    return new TaskEither(T.ap(fab.value, this.value))
  }
  /**
   * Flipped version of `ap`
   */
  ap_<B, C>(this: TaskEither<L, (b: B) => C>, fb: TaskEither<L, B>): TaskEither<L, C> {
    return fb.ap(this)
  }
  /**
   * Combine two (parallel) effectful actions, keeping only the result of the first
   * @since 1.6.0
   */
  applyFirst<B>(fb: TaskEither<L, B>): TaskEither<L, A> {
    return fb.ap(this.map(constant))
  }
  /**
   * Combine two (parallel) effectful actions, keeping only the result of the second
   * @since 1.5.0
   */
  applySecond<B>(fb: TaskEither<L, B>): TaskEither<L, B> {
    return fb.ap(this.map<(b: B) => B>(constIdentity))
  }
  /**
   * Combine two (sequential) effectful actions, keeping only the result of the first
   * @since 1.12.0
   */
  chainFirst<B>(fb: TaskEither<L, B>): TaskEither<L, A> {
    return this.chain(a => fb.map(() => a))
  }
  /**
   * Combine two (sequential) effectful actions, keeping only the result of the second
   * @since 1.12.0
   */
  chainSecond<B>(fb: TaskEither<L, B>): TaskEither<L, B> {
    return this.chain(() => fb)
  }
  chain<B>(f: (a: A) => TaskEither<L, B>): TaskEither<L, B> {
    return new TaskEither(T.chain(this.value, a => f(a).value))
  }
  fold<R>(onLeft: (l: L) => R, onRight: (a: A) => R): Task<R> {
    return foldT(onLeft, onRight, this.value)
  }
  /**
   * Similar to `fold`, but the result is flattened.
   * @since 1.10.0
   */
  foldTask<R>(onLeft: (l: L) => Task<R>, onRight: (a: A) => Task<R>): Task<R> {
    return this.value.chain(e => e.fold(onLeft, onRight))
  }
  /**
   * Similar to `fold`, but the result is flattened.
   * @since 1.10.0
   */
  foldTaskEither<M, B>(onLeft: (l: L) => TaskEither<M, B>, onRight: (a: A) => TaskEither<M, B>): TaskEither<M, B> {
    return new TaskEither(this.value.chain(e => e.fold(onLeft, onRight).value))
  }
  /**
   * Similar to `fold`, return the value from Right or the given argument if Left.
   * @since 1.17.0
   */
  getOrElse(a: A): Task<A> {
    return this.getOrElseL(() => a)
  }
  /**
   * @since 1.17.0
   */
  getOrElseL(f: (l: L) => A): Task<A> {
    return this.fold(f, identity)
  }
  mapLeft<M>(f: (l: L) => M): TaskEither<M, A> {
    return new TaskEither(this.value.map(e => e.mapLeft(f)))
  }
  /**
   * Transforms the failure value of the `TaskEither` into a new `TaskEither`
   */
  orElse<M>(f: (l: L) => TaskEither<M, A>): TaskEither<M, A> {
    return new TaskEither(this.value.chain(e => e.fold<Task<Either<M, A>>>(l => f(l).value, T.of)))
  }
  /**
   * @since 1.6.0
   */
  alt(fy: TaskEither<L, A>): TaskEither<L, A> {
    return this.orElse(() => fy)
  }
  /**
   * @since 1.2.0
   */
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): TaskEither<V, B> {
    return new TaskEither(this.value.map(e => e.bimap(f, g)))
  }
  /**
   * Return `Right` if the given action succeeds, `Left` if it throws
   * @since 1.10.0
   */
  attempt<M = L>(): TaskEither<M, Either<L, A>> {
    return new TaskEither(this.value.map<Either<M, Either<L, A>>>(eitherRight))
  }
  /**
   * @since 1.11.0
   */
  filterOrElse<B extends A>(p: Refinement<A, B>, zero: L): TaskEither<L, B>
  filterOrElse(p: Predicate<A>, zero: L): TaskEither<L, A>
  filterOrElse(p: Predicate<A>, zero: L): TaskEither<L, A> {
    return new TaskEither(this.value.map(e => e.filterOrElse(p, zero)))
  }
  /**
   * @since 1.11.0
   */
  filterOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): TaskEither<L, B>
  filterOrElseL(p: Predicate<A>, zero: (a: A) => L): TaskEither<L, A>
  filterOrElseL(p: Predicate<A>, zero: (a: A) => L): TaskEither<L, A> {
    return new TaskEither(this.value.map(e => e.filterOrElseL(p, zero)))
  }
}

const map = <L, A, B>(fa: TaskEither<L, A>, f: (a: A) => B): TaskEither<L, B> => {
  return fa.map(f)
}

const of = <L, A>(a: A): TaskEither<L, A> => {
  return new TaskEither(T.of(a))
}

const ap = <L, A, B>(fab: TaskEither<L, (a: A) => B>, fa: TaskEither<L, A>): TaskEither<L, B> => {
  return fa.ap(fab)
}

const chain = <L, A, B>(fa: TaskEither<L, A>, f: (a: A) => TaskEither<L, B>): TaskEither<L, B> => {
  return fa.chain(f)
}

const alt = <L, A>(fx: TaskEither<L, A>, fy: TaskEither<L, A>): TaskEither<L, A> => {
  return fx.alt(fy)
}

const bimap = <L, V, A, B>(fa: TaskEither<L, A>, f: (l: L) => V, g: (a: A) => B): TaskEither<V, B> => {
  return fa.bimap(f, g)
}

/**
 * @since 1.0.0
 */
export const right = <L, A>(fa: Task<A>): TaskEither<L, A> => {
  return new TaskEither(fa.map<Either<L, A>>(eitherRight))
}

/**
 * @since 1.0.0
 */
export const left = <L, A>(fl: Task<L>): TaskEither<L, A> => {
  return new TaskEither(fl.map<Either<L, A>>(eitherLeft))
}

/**
 * @since 1.0.0
 */
export const fromEither = <L, A>(fa: Either<L, A>): TaskEither<L, A> => {
  return new TaskEither(task.of(fa))
}

/**
 * @since 1.5.0
 */
export const fromIO = <L, A>(fa: IO<A>): TaskEither<L, A> => {
  return right(taskFromIO(fa))
}

/**
 * @since 1.3.0
 */
export const fromLeft = <L, A>(l: L): TaskEither<L, A> => {
  return fromEither(eitherLeft(l))
}

/**
 * @since 1.6.0
 */
export const fromIOEither = <L, A>(fa: IOEither<L, A>): TaskEither<L, A> => {
  return new TaskEither(taskFromIO(fa.value))
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
  const f = eitherFromPredicate(predicate, onFalse)
  return a => fromEither(f(a))
}

/**
 * @since 1.9.0
 */
export const getSemigroup = <L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> => {
  const S2 = taskGetSemigroup(eitherGetSemigroup<L, A>(S))
  return {
    concat: (x, y) => new TaskEither<L, A>(S2.concat(x.value, y.value))
  }
}

/**
 * @since 1.9.0
 */
export const getApplySemigroup = <L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> => {
  const S2 = taskGetSemigroup(eitherGetApplySemigroup<L, A>(S))
  return {
    concat: (x, y) => new TaskEither<L, A>(S2.concat(x.value, y.value))
  }
}

/**
 * @since 1.9.0
 */
export const getApplyMonoid = <L, A>(M: Monoid<A>): Monoid<TaskEither<L, A>> => {
  return {
    ...getApplySemigroup(M),
    empty: of(M.empty)
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
export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: unknown) => L): TaskEither<L, A> => {
  return new TaskEither(taskTryCatch(f, onrejected))
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
    return new TaskEither(
      new Task(
        () =>
          new Promise(resolve => {
            const cbResolver = (e: L, r: R) =>
              e != null ? resolve(eitherLeft<L, R>(e)) : resolve(eitherRight<L, R>(r))
            f.apply(null, args.concat(cbResolver))
          })
      )
    )
  }
}

const fromTask = right

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
  release: (a: A, e: Either<L, B>) => TaskEither<L, void>
): TaskEither<L, B> => {
  return acquire.chain(a =>
    use(a)
      .attempt()
      .chain(e => release(a, e).chain(() => e.fold<TaskEither<L, B>>(fromLeft, taskEither.of)))
  )
}

const throwError = fromLeft

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
  of,
  ap,
  chain,
  alt,
  fromIO,
  fromTask,
  throwError,
  fromEither,
  fromOption: (o, e) => (o.isNone() ? throwError(e) : of(o.value))
}

/**
 * Like `TaskEither` but `ap` is sequential
 *
 * @since 1.10.0
 */
export const taskEitherSeq: typeof taskEither = {
  ...taskEither,
  ap: (fab, fa) => fab.chain(f => fa.map(f))
}
