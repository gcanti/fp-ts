/**
 * @file `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent an asynchronous computation that may fail, please see `TaskEither`.
 */
import { Either, left, right } from './Either'
import { constant, constIdentity, identity, Lazy, toString } from './function'
import { IO } from './IO'
import { Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import { MonadTask1 } from './MonadTask'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { pipeable } from './pipeable'

declare module './HKT' {
  interface URI2HKT<A> {
    Task: Task<A>
  }
}

export const URI = 'Task'

export type URI = typeof URI

/**
 * @since 1.0.0
 */
export class Task<A> {
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly run: Lazy<Promise<A>>) {}
  /** @obsolete */
  map<B>(f: (a: A) => B): Task<B> {
    return new Task(() => this.run().then(f))
  }
  /** @obsolete */
  ap<B>(fab: Task<(a: A) => B>): Task<B> {
    return new Task(() => Promise.all([fab.run(), this.run()]).then(([f, a]) => f(a)))
  }
  /**
   * Flipped version of `ap`
   * @obsolete
   */
  ap_<B, C>(this: Task<(b: B) => C>, fb: Task<B>): Task<C> {
    return fb.ap(this)
  }
  /**
   * Combine two effectful actions, keeping only the result of the first
   * @since 1.6.0
   * @obsolete
   */
  applyFirst<B>(fb: Task<B>): Task<A> {
    return fb.ap(this.map(constant))
  }
  /**
   * Combine two effectful actions, keeping only the result of the second
   * @since 1.5.0
   * @obsolete
   */
  applySecond<B>(fb: Task<B>): Task<B> {
    // tslint:disable-next-line: deprecation
    return fb.ap(this.map(constIdentity as () => (b: B) => B))
  }
  /** @obsolete */
  chain<B>(f: (a: A) => Task<B>): Task<B> {
    return new Task(() => this.run().then(a => f(a).run()))
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    // tslint:disable-next-line: deprecation
    return `new Task(${toString(this.run)})`
  }
}

/**
 * @since 1.0.0
 */
export const getRaceMonoid = <A = never>(): Monoid<Task<A>> => {
  return {
    concat: (x, y) =>
      new Task(
        () =>
          new Promise((resolve, reject) => {
            let running = true
            const resolveFirst = (a: A) => {
              if (running) {
                running = false
                resolve(a)
              }
            }
            const rejectFirst = (e: any) => {
              if (running) {
                running = false
                reject(e)
              }
            }
            x.run().then(resolveFirst, rejectFirst)
            y.run().then(resolveFirst, rejectFirst)
          })
      ),
    empty: never
  }
}

/**
 * @since 1.0.0
 */
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Task<A>> => {
  return {
    concat: (x, y) => new Task(() => x.run().then(rx => y.run().then(ry => S.concat(rx, ry))))
  }
}

/**
 * @since 1.0.0
 */
export const getMonoid = <A>(M: Monoid<A>): Monoid<Task<A>> => {
  return {
    ...getSemigroup(M),
    empty: of(M.empty)
  }
}

/**
 * @since 1.0.0
 */
export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: unknown) => L): Task<Either<L, A>> => {
  return new Task(() => f().then<Either<L, A>, Either<L, A>>(right, reason => left(onrejected(reason))))
}

/**
 * Lifts an IO action into a Task
 *
 * @since 1.0.0
 */
export const fromIO = <A>(io: IO<A>): Task<A> => {
  return new Task(() => Promise.resolve(io.run()))
}

/**
 * Use `delay2v`
 *
 * @since 1.7.0
 * @deprecated
 */
export const delay = <A>(millis: number, a: A): Task<A> => {
  return delay2v(millis, of(a))
}

/**
 * @since 1.0.0
 */
export const task: Monad1<URI> & MonadIO1<URI> & MonadTask1<URI> = {
  URI,
  map: (fa, f) => fa.map(f),
  of,
  ap: (fab, fa) => fa.ap(fab),
  chain: (fa, f) => fa.chain(f),
  fromIO,
  fromTask: identity
}

/**
 * Like `Task` but `ap` is sequential
 *
 * @since 1.10.0
 */
export const taskSeq: typeof task = {
  ...task,
  ap: (fab, fa) => fab.chain(f => fa.map(f))
}

//
// backporting
//

/**
 * @since 1.19.0
 */
export function of<A>(a: A): Task<A> {
  return new Task(() => Promise.resolve(a))
}

/**
 * @since 1.19.0
 */
export const never = new Task(() => new Promise<never>(_ => undefined))

/**
 * @since 1.19.0
 */
export function delay2v<A>(millis: number, ma: Task<A>): Task<A> {
  return new Task(
    () =>
      new Promise(resolve => {
        setTimeout(() => {
          // tslint:disable-next-line: no-floating-promises
          ma.run().then(resolve)
        }, millis)
      })
  )
}

const { ap, apFirst, apSecond, chain, chainFirst, flatten, map } = pipeable(task)

export { ap, apFirst, apSecond, chain, chainFirst, flatten, map }
