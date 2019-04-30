/**
 * @file `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent an asynchronous computation that may fail, please see `TaskEither`.
 */
import { Either, left, right } from './Either'
import { identity, Lazy } from './function'
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
 * @since 2.0.0
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
 * @since 2.0.0
 */
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Task<A>> => {
  return {
    concat: (x, y) => () => x().then(rx => y().then(ry => S.concat(rx, ry)))
  }
}

/**
 * @since 2.0.0
 */
export const getMonoid = <A>(M: Monoid<A>): Monoid<Task<A>> => {
  return {
    ...getSemigroup(M),
    empty: of(M.empty)
  }
}

/**
 * @since 2.0.0
 */
export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: unknown) => L): Task<Either<L, A>> => {
  return () => f().then<Either<L, A>, Either<L, A>>(right, reason => left(onrejected(reason)))
}

/**
 * @since 2.0.0
 */
export function delay<A>(millis: number, ma: Task<A>): Task<A> {
  return () =>
    new Promise(resolve => {
      setTimeout(() => {
        // tslint:disable-next-line: no-floating-promises
        ma().then(resolve)
      }, millis)
    })
}

/**
 * @since 2.0.0
 */
export const task: Monad1<URI> & MonadIO1<URI> & MonadTask1<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  fromIO: ma => () => Promise.resolve(ma()),
  fromTask: identity
}

/**
 * Like `Task` but `ap` is sequential
 *
 * @since 2.0.0
 */
export const taskSeq: typeof task = {
  ...task,
  ap: (fab, fa) => chain(fab, f => map(fa, f))
}
