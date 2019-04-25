/**
 * @file `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent an asynchronous computation that may fail, please see `TaskEither`.
 */
import { Either, left, right } from './Either'
import { identity, Lazy } from './function'
import { IO } from './IO'
import { Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import { MonadTask1 } from './MonadTask'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'

declare module './HKT' {
  interface URI2HKT<A> {
    Task: Task<A>
  }
}

export const URI = 'Task'

export type URI = typeof URI

export interface Task<A> {
  (): Promise<A>
}

// /**
//  * @since 1.0.0
//  */
// export class Task<A> {
//   constructor(readonly run: Lazy<Promise<A>>) {}
//   map<B>(f: (a: A) => B): Task<B> {
//     return new Task(() => this.run().then(f))
//   }
//   ap<B>(fab: Task<(a: A) => B>): Task<B> {
//     return new Task(() => Promise.all([fab.run(), this.run()]).then(([f, a]) => f(a)))
//   }
//   /**
//    * Flipped version of `ap`
//    */
//   ap_<B, C>(this: Task<(b: B) => C>, fb: Task<B>): Task<C> {
//     return fb.ap(this)
//   }
//   /**
//    * Combine two effectful actions, keeping only the result of the first
//    * @since 1.6.0
//    */
//   applyFirst<B>(fb: Task<B>): Task<A> {
//     return fb.ap(this.map(constant))
//   }
//   /**
//    * Combine two effectful actions, keeping only the result of the second
//    * @since 1.5.0
//    */
//   applySecond<B>(fb: Task<B>): Task<B> {
//     return fb.ap(this.map(constIdentity as () => (b: B) => B))
//   }
//   chain<B>(f: (a: A) => Task<B>): Task<B> {
//     return new Task(() => this.run().then(a => f(a).run()))
//   }
// }

const map = <A, B>(fa: Task<A>, f: (a: A) => B): Task<B> => {
  return () => fa().then(f)
}

const of = <A>(a: A): Task<A> => {
  return () => Promise.resolve(a)
}

const ap = <A, B>(fab: Task<(a: A) => B>, fa: Task<A>): Task<B> => {
  return () => Promise.all([fab(), fa()]).then(([f, a]) => f(a))
}

const chain = <A, B>(fa: Task<A>, f: (a: A) => Task<B>): Task<B> => {
  return () => fa().then(a => f(a)())
}

/**
 * @since 1.0.0
 */
export const getRaceMonoid = <A = never>(): Monoid<Task<A>> => {
  return {
    concat: (x, y) => () =>
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
        x().then(resolveFirst, rejectFirst)
        y().then(resolveFirst, rejectFirst)
      }),
    empty: never
  }
}

const never: Task<never> = () => new Promise(_ => undefined)

/**
 * @since 1.0.0
 */
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Task<A>> => {
  return {
    concat: (x, y) => () => x().then(rx => y().then(ry => S.concat(rx, ry)))
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
  return () => f().then<Either<L, A>, Either<L, A>>(right, reason => left(onrejected(reason)))
}

/**
 * Lifts an IO action into a Task
 *
 * @since 1.0.0
 */
export const fromIO = <A>(io: IO<A>): Task<A> => {
  return () => Promise.resolve(io.run())
}

/**
 * @since 1.7.0
 */
export const delay = <A>(millis: number, a: A): Task<A> => {
  return () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(a)
      }, millis)
    })
}

const fromTask = identity

/**
 * @since 1.0.0
 */
export const task: Monad1<URI> & MonadIO1<URI> & MonadTask1<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  fromIO,
  fromTask
}

/**
 * Like `Task` but `ap` is sequential
 *
 * @since 1.10.0
 */
export const taskSeq: typeof task = {
  ...task,
  ap: (fab, fa) => chain(fab, f => map(fa, f))
}
