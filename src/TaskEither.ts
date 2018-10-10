import { Alt2 } from './Alt'
import { Bifunctor2 } from './Bifunctor'
import {
  Either,
  fromPredicate as eitherFromPredicate,
  left as eitherLeft,
  right as eitherRight,
  getSemigroup as eitherGetSemigroup,
  getApplySemigroup as eitherGetApplySemigroup
} from './Either'
import * as eitherT from './EitherT'
import { IO } from './IO'
import { Monad2 } from './Monad'
import { Task, fromIO as taskFromIO, task, tryCatch as taskTryCatch, getSemigroup as taskGetSemigroup } from './Task'
import { Lazy, constIdentity, constant, Predicate } from './function'
import { IOEither } from './IOEither'
import { Semigroup } from './Semigroup'
import { Monoid } from './Monoid'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    TaskEither: TaskEither<L, A>
  }
}

const eitherTTask = eitherT.getEitherT(task)

export const URI = 'TaskEither'

export type URI = typeof URI

const eitherTfold = eitherT.fold(task)
const eitherTmapLeft = eitherT.mapLeft(task)
const eitherTbimap = eitherT.bimap(task)

/**
 * @data
 * @constructor TaskEither
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
    return new TaskEither(eitherTTask.map(this.value, f))
  }
  ap<B>(fab: TaskEither<L, (a: A) => B>): TaskEither<L, B> {
    return new TaskEither(eitherTTask.ap(fab.value, this.value))
  }
  ap_<B, C>(this: TaskEither<L, (b: B) => C>, fb: TaskEither<L, B>): TaskEither<L, C> {
    return fb.ap(this)
  }
  /**
   * Combine two effectful actions, keeping only the result of the first
   * @since 1.6.0
   */
  applyFirst<B>(fb: TaskEither<L, B>): TaskEither<L, A> {
    return fb.ap(this.map(constant))
  }
  /**
   * Combine two effectful actions, keeping only the result of the second
   * @since 1.5.0
   */
  applySecond<B>(fb: TaskEither<L, B>): TaskEither<L, B> {
    return fb.ap(this.map(constIdentity as () => (b: B) => B))
  }
  chain<B>(f: (a: A) => TaskEither<L, B>): TaskEither<L, B> {
    return new TaskEither(eitherTTask.chain(a => f(a).value, this.value))
  }
  fold<R>(whenLeft: (l: L) => R, whenRight: (a: A) => R): Task<R> {
    return eitherTfold(whenLeft, whenRight, this.value)
  }
  mapLeft<M>(f: (l: L) => M): TaskEither<M, A> {
    return new TaskEither(eitherTmapLeft(f)(this.value))
  }
  /**
   * Transforms the failure value of the `TaskEither` into a new `TaskEither`
   */
  orElse<M>(f: (l: L) => TaskEither<M, A>): TaskEither<M, A> {
    return new TaskEither(this.value.chain(e => e.fold(l => f(l).value, a => eitherTTask.of(a))))
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
    return new TaskEither(eitherTbimap(this.value, f, g))
  }
  /**
   * Return `Right` if the given action succeeds, `Left` if it throws
   * @since 1.10.0
   */
  attempt<M = L>(): TaskEither<M, Either<L, A>> {
    return new TaskEither(this.value.map<Either<M, Either<L, A>>>(eitherRight))
  }
}

const map = <L, A, B>(fa: TaskEither<L, A>, f: (a: A) => B): TaskEither<L, B> => {
  return fa.map(f)
}

const of = <L, A>(a: A): TaskEither<L, A> => {
  return new TaskEither(eitherTTask.of(a))
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

const eitherTright = eitherT.right(task)
/**
 * @function
 * @since 1.0.0
 */
export const right = <L, A>(fa: Task<A>): TaskEither<L, A> => {
  return new TaskEither(eitherTright(fa))
}

const eitherTleft = eitherT.left(task)
/**
 * @function
 * @since 1.0.0
 */
export const left = <L, A>(fa: Task<L>): TaskEither<L, A> => {
  return new TaskEither(eitherTleft(fa))
}

const eitherTfromEither = eitherT.fromEither(task)
/**
 * @function
 * @since 1.0.0
 */
export const fromEither = <L, A>(fa: Either<L, A>): TaskEither<L, A> => {
  return new TaskEither(eitherTfromEither(fa))
}

/**
 * @function
 * @since 1.5.0
 */
export const fromIO = <L, A>(fa: IO<A>): TaskEither<L, A> => {
  return right(taskFromIO(fa))
}

/**
 * @function
 * @since 1.3.0
 */
export const fromLeft = <L, A>(l: L): TaskEither<L, A> => {
  return fromEither(eitherLeft(l))
}

/**
 * @function
 * @since 1.6.0
 */
export const fromIOEither = <L, A>(fa: IOEither<L, A>): TaskEither<L, A> => {
  return new TaskEither(taskFromIO(fa.value))
}

/**
 * @function
 * @since 1.6.0
 */
export const fromPredicate = <L, A>(predicate: Predicate<A>, whenFalse: (a: A) => L): ((a: A) => TaskEither<L, A>) => {
  const f = eitherFromPredicate(predicate, whenFalse)
  return a => fromEither(f(a))
}

/**
 * @function
 * @since 1.9.0
 */
export const getSemigroup = <L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> => {
  const S2 = taskGetSemigroup(eitherGetSemigroup<L, A>(S))
  return {
    concat: (x, y) => new TaskEither<L, A>(S2.concat(x.value, y.value))
  }
}

/**
 * @function
 * @since 1.9.0
 */
export const getApplySemigroup = <L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> => {
  const S2 = taskGetSemigroup(eitherGetApplySemigroup<L, A>(S))
  return {
    concat: (x, y) => new TaskEither<L, A>(S2.concat(x.value, y.value))
  }
}

/**
 * @function
 * @since 1.9.0
 */
export const getApplyMonoid = <L, A>(M: Monoid<A>): Monoid<TaskEither<L, A>> => {
  return {
    ...getApplySemigroup(M),
    empty: of(M.empty)
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L): TaskEither<L, A> => {
  return new TaskEither(taskTryCatch(f, onrejected))
}

/** Convert a node style callback function to one returning a `TaskEither` */
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
/**
 * Convert a node style callback function to one returning a `TaskEither`
 *
 * @example
 * import * as fs from 'fs'
 *
 * // const stat: (a: string | Buffer) => TaskEither<NodeJS.ErrnoException, fs.Stats>
 * const stat = taskify(fs.stat)
 * ```
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
 *
 * @function
 * @since 1.5.0
 */
export function taskify<L, R>(f: Function): () => TaskEither<L, R> {
  return function() {
    const args = Array.prototype.slice.call(arguments)
    return new TaskEither(
      new Task(
        () =>
          new Promise(resolve => {
            args.push((e: L, r: R) => (e != null ? resolve(eitherLeft<L, R>(e)) : resolve(eitherRight<L, R>(r))))
            f.apply(null, args)
          })
      )
    )
  }
}

/**
 * Make sure that a resource is cleaned up in the event of an exception. The
 * release action is called regardless of whether the body action throws or
 * returns.
 * @function
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

/**
 * @instance
 * @since 1.0.0
 */
export const taskEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> = {
  URI,
  bimap,
  map,
  of,
  ap,
  chain,
  alt
}
