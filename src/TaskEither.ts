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
import { pipeable } from './pipeable'

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
  /** @obsolete */
  map<B>(f: (a: A) => B): TaskEither<L, B> {
    return new TaskEither(T.map(this.value, f))
  }
  /** @obsolete */
  ap<B>(fab: TaskEither<L, (a: A) => B>): TaskEither<L, B> {
    return new TaskEither(T.ap(fab.value, this.value))
  }
  /**
   * Flipped version of `ap`
   * @obsolete
   */
  ap_<B, C>(this: TaskEither<L, (b: B) => C>, fb: TaskEither<L, B>): TaskEither<L, C> {
    return fb.ap(this)
  }
  /**
   * Combine two (parallel) effectful actions, keeping only the result of the first
   * @since 1.6.0
   * @obsolete
   */
  applyFirst<B>(fb: TaskEither<L, B>): TaskEither<L, A> {
    return fb.ap(this.map(constant))
  }
  /**
   * Combine two (parallel) effectful actions, keeping only the result of the second
   * @since 1.5.0
   * @obsolete
   */
  applySecond<B>(fb: TaskEither<L, B>): TaskEither<L, B> {
    // tslint:disable-next-line: deprecation
    return fb.ap(this.map<(b: B) => B>(constIdentity))
  }
  /**
   * Combine two (sequential) effectful actions, keeping only the result of the first
   * @since 1.12.0
   * @obsolete
   */
  chainFirst<B>(fb: TaskEither<L, B>): TaskEither<L, A> {
    return this.chain(a => fb.map(() => a))
  }
  /**
   * Combine two (sequential) effectful actions, keeping only the result of the second
   * @since 1.12.0
   * @obsolete
   */
  chainSecond<B>(fb: TaskEither<L, B>): TaskEither<L, B> {
    return this.chain(() => fb)
  }
  /** @obsolete */
  chain<B>(f: (a: A) => TaskEither<L, B>): TaskEither<L, B> {
    return new TaskEither(T.chain(this.value, a => f(a).value))
  }
  /** @obsolete */
  fold<R>(onLeft: (l: L) => R, onRight: (a: A) => R): Task<R> {
    return foldT(onLeft, onRight, this.value)
  }
  /**
   * Similar to `fold`, but the result is flattened.
   * @since 1.10.0
   * @obsolete
   */
  foldTask<R>(onLeft: (l: L) => Task<R>, onRight: (a: A) => Task<R>): Task<R> {
    return this.value.chain(e => e.fold(onLeft, onRight))
  }
  /**
   * Similar to `fold`, but the result is flattened.
   * @since 1.10.0
   * @obsolete
   */
  foldTaskEither<M, B>(onLeft: (l: L) => TaskEither<M, B>, onRight: (a: A) => TaskEither<M, B>): TaskEither<M, B> {
    return new TaskEither(this.value.chain(e => e.fold(onLeft, onRight).value))
  }
  /**
   * Similar to `fold`, return the value from Right or the given argument if Left.
   * @since 1.17.0
   * @obsolete
   */
  getOrElse(a: A): Task<A> {
    return this.getOrElseL(() => a)
  }
  /**
   * @since 1.17.0
   * @obsolete
   */
  getOrElseL(f: (l: L) => A): Task<A> {
    return this.fold(f, identity)
  }
  /** @obsolete */
  mapLeft<M>(f: (l: L) => M): TaskEither<M, A> {
    return new TaskEither(this.value.map(e => e.mapLeft(f)))
  }
  /**
   * Transforms the failure value of the `TaskEither` into a new `TaskEither`
   * @obsolete
   */
  orElse<M>(f: (l: L) => TaskEither<M, A>): TaskEither<M, A> {
    return new TaskEither(this.value.chain(e => e.fold<Task<Either<M, A>>>(l => f(l).value, T.of)))
  }
  /**
   * @since 1.6.0
   * @obsolete
   */
  alt(fy: TaskEither<L, A>): TaskEither<L, A> {
    return this.orElse(() => fy)
  }
  /**
   * @since 1.2.0
   * @obsolete
   */
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): TaskEither<V, B> {
    return new TaskEither(this.value.map(e => e.bimap(f, g)))
  }
  /**
   * Return `Right` if the given action succeeds, `Left` if it throws
   * @since 1.10.0
   * @obsolete
   */
  attempt<M = L>(): TaskEither<M, Either<L, A>> {
    return new TaskEither(this.value.map<Either<M, Either<L, A>>>(eitherRight))
  }
  /**
   * @since 1.11.0
   * @obsolete
   */
  filterOrElse<B extends A>(p: Refinement<A, B>, zero: L): TaskEither<L, B>
  filterOrElse(p: Predicate<A>, zero: L): TaskEither<L, A>
  filterOrElse(p: Predicate<A>, zero: L): TaskEither<L, A> {
    return new TaskEither(this.value.map(e => e.filterOrElse(p, zero)))
  }
  /**
   * @since 1.11.0
   * @obsolete
   */
  filterOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): TaskEither<L, B>
  filterOrElseL(p: Predicate<A>, zero: (a: A) => L): TaskEither<L, A>
  filterOrElseL(p: Predicate<A>, zero: (a: A) => L): TaskEither<L, A> {
    return new TaskEither(this.value.map(e => e.filterOrElseL(p, zero)))
  }
}

/**
 * Use `rightTask`
 *
 * @since 1.0.0
 * @deprecated
 */
export const right = <L, A>(fa: Task<A>): TaskEither<L, A> => {
  return new TaskEither(fa.map<Either<L, A>>(eitherRight))
}

/**
 * Use `leftTask`
 *
 * @since 1.0.0
 * @deprecated
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
 * Use `rightIO`
 *
 * @since 1.5.0
 * @deprecated
 */
export const fromIO = <L, A>(fa: IO<A>): TaskEither<L, A> => {
  return rightIO(fa)
}

/**
 * Use `left2v`
 *
 * @since 1.3.0
 * @deprecated
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
): (a: A) => TaskEither<L, B>
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => TaskEither<L, A>
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => TaskEither<L, A> {
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
    empty: right2v(M.empty)
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
      .chain(e => release(a, e).chain(() => e.fold<TaskEither<L, B>>(left2v, taskEither.of)))
  )
}

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
  bimap: (fla, f, g) => fla.bimap(f, g),
  map: (fa, f) => fa.map(f),
  of: right2v,
  ap: (fab, fa) => fa.ap(fab),
  chain: (fa, f) => fa.chain(f),
  alt: (fx, fy) => fx.alt(fy),
  fromIO,
  fromTask: rightTask,
  throwError: left2v,
  fromEither,
  fromOption: (o, e) => (o.isNone() ? left2v(e) : right2v(o.value))
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

//
// backporting
//

/**
 * @since 1.19.0
 */
export function right2v<A>(a: A): TaskEither<never, A> {
  return new TaskEither(T.of(a))
}

/**
 * @since 1.19.0
 */
export function left2v<L>(l: L): TaskEither<L, never> {
  return fromEither(eitherLeft(l))
}

/**
 * @since 1.19.0
 */
export function rightIO<A>(ma: IO<A>): TaskEither<never, A> {
  return rightTask(task.fromIO(ma))
}

/**
 * @since 1.19.0
 */
export function leftIO<E>(me: IO<E>): TaskEither<E, never> {
  return leftTask(task.fromIO(me))
}

/**
 * @since 1.19.0
 */
export function rightTask<A>(ma: Task<A>): TaskEither<never, A> {
  // tslint:disable-next-line: deprecation
  return right(ma)
}

/**
 * @since 1.19.0
 */
export function leftTask<E>(me: Task<E>): TaskEither<E, never> {
  // tslint:disable-next-line: deprecation
  return left(me)
}

/**
 * @since 1.19.0
 */
export function fold<E, A, R>(
  onLeft: (e: E) => Task<R>,
  onRight: (a: A) => Task<R>
): (ma: TaskEither<E, A>) => Task<R> {
  return ma => ma.foldTask(onLeft, onRight)
}

/**
 * @since 1.19.0
 */
export function getOrElse<E, A>(f: (e: E) => Task<A>): (ma: TaskEither<E, A>) => Task<A> {
  return fold(f, task.of)
}

/**
 * @since 1.19.0
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
  return ma => ma.filterOrElseL(predicate, onFalse)
}

/**
 * @since 1.19.0
 */
export function orElse<E, A, M>(f: (e: E) => TaskEither<M, A>): (ma: TaskEither<E, A>) => TaskEither<M, A> {
  return ma => ma.orElse(f)
}

const { alt, ap, apFirst, apSecond, bimap, chain, chainFirst, flatten, map, mapLeft } = pipeable(taskEither)

export { alt, ap, apFirst, apSecond, bimap, chain, chainFirst, flatten, map, mapLeft }
