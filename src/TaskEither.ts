import { Alt2 } from './Alt'
import { Bifunctor2 } from './Bifunctor'
import { Either, left as eitherLeft, right as eitherRight } from './Either'
import * as eitherT from './EitherT'
import { IO } from './IO'
import { Monad2 } from './Monad'
import { Task, fromIO as taskFromIO, task, tryCatch as taskTryCatch } from './Task'
import { Lazy, constIdentity, constant } from './function'
import { IOEither } from './IOEither'

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
  /** Runs the inner task */
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
  fold<R>(left: (l: L) => R, right: (a: A) => R): Task<R> {
    return eitherTfold(left, right, this.value)
  }
  mapLeft<M>(f: (l: L) => M): TaskEither<M, A> {
    return new TaskEither(eitherTmapLeft(f)(this.value))
  }
  /** Transforms the failure value of the `TaskEither` into a new `TaskEither` */
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

const alt = <L, A, B>(fx: TaskEither<L, A>, fy: TaskEither<L, A>): TaskEither<L, A> => {
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
 * @since 1.0.0
 */
export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L): TaskEither<L, A> => {
  return new TaskEither(taskTryCatch(f, onrejected))
}

/** Convert a node style callback function to one returning a `TaskEither` */
export function taskify<L, R>(f: (cb: (e: L, r: R) => void) => void): () => TaskEither<L, R>
export function taskify<A, L, R>(f: (a: A, cb: (e: L, r: R) => void) => void): (a: A) => TaskEither<L, R>
export function taskify<A, B, L, R>(f: (a: A, b: B, cb: (e: L, r: R) => void) => void): (a: A, b: B) => TaskEither<L, R>
export function taskify<A, B, C, L, R>(
  f: (a: A, b: B, c: C, cb: (e: L, r: R) => void) => void
): (a: A, b: B, c: C) => TaskEither<L, R>
export function taskify<A, B, C, D, L, R>(
  f: (a: A, b: B, c: C, d: D, cb: (e: L, r: R) => void) => void
): (a: A, b: B, c: C, d: D) => TaskEither<L, R>
export function taskify<A, B, C, D, E, L, R>(
  f: (a: A, b: B, c: C, d: D, e: E, cb: (e: L, r: R) => void) => void
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
            args.push((e: L, r: R) => (e !== null ? resolve(eitherLeft<L, R>(e)) : resolve(eitherRight<L, R>(r))))
            f.apply(null, args)
          })
      )
    )
  }
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
