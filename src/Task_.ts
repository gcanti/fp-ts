import { Either, left, right } from './Either_'
import { constant, constIdentity, identity, Lazy, toString } from './function'
import { IO } from './IO_'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup_'

declare module './HKT' {
  interface URI2HKT<A> {
    Task: Task<A>
  }
}

export const URI = 'Task'

export type URI = typeof URI

/**
 * `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent an asynchronous computation that may fail, please see {@link TaskEither}.
 * @data
 * @constructor Task
 * @since 1.0.0
 */
export class Task<A> {
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly run: Lazy<Promise<A>>) {}
  map<B>(f: (a: A) => B): Task<B> {
    return new Task(() => this.run().then(f))
  }
  ap<B>(fab: Task<(a: A) => B>): Task<B> {
    return new Task(() => Promise.all([fab.run(), this.run()]).then(([f, a]) => f(a)))
  }
  /**
   * Flipped version of {@link ap}
   */
  ap_<B, C>(this: Task<(b: B) => C>, fb: Task<B>): Task<C> {
    return fb.ap(this)
  }
  /**
   * Combine two effectful actions, keeping only the result of the first
   * @since 1.6.0
   */
  applyFirst<B>(fb: Task<B>): Task<A> {
    return fb.ap(this.map(constant))
  }
  /**
   * Combine two effectful actions, keeping only the result of the second
   * @since 1.5.0
   */
  applySecond<B>(fb: Task<B>): Task<B> {
    return fb.ap(this.map(constIdentity as () => (b: B) => B))
  }
  chain<B>(f: (a: A) => Task<B>): Task<B> {
    return new Task(() => this.run().then(a => f(a).run()))
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new Task(${toString(this.run)})`
  }
}

export const map = <A, B>(fa: Task<A>, f: (a: A) => B): Task<B> => {
  return fa.map(f)
}

export const of = <A>(a: A): Task<A> => {
  return new Task(() => Promise.resolve(a))
}

export const ap = <A, B>(fab: Task<(a: A) => B>, fa: Task<A>): Task<B> => {
  return fa.ap(fab)
}

export const chain = <A, B>(fa: Task<A>, f: (a: A) => Task<B>): Task<B> => {
  return fa.chain(f)
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

const never = new Task(() => new Promise<never>(_ => undefined))

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
  return new Task(() => f().then(a => right<L, A>(a), reason => left<L, A>(onrejected(reason))))
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
 * @since 1.7.0
 */
export const delay = <A>(millis: number, a: A): Task<A> => {
  return new Task(
    () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(a)
        }, millis)
      })
  )
}

export const fromTask = identity
