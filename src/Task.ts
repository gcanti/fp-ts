import { Monoid } from './Monoid'
import { Monad, FantasyMonad } from './Monad'
import { Lazy, toString } from './function'
import { Either, left, right } from './Either'
import { IO } from './IO'

declare module './HKT' {
  interface URI2HKT<A> {
    Task: Task<A>
  }
}

export const URI = 'Task'

export type URI = typeof URI

/**
 * @data
 * @constructor Task
 */
export class Task<A> implements FantasyMonad<URI, A> {
  readonly _A: A
  readonly _URI: URI
  constructor(readonly run: Lazy<Promise<A>>) {}
  map<B>(f: (a: A) => B): Task<B> {
    return new Task(() => this.run().then(f))
  }
  ap<B>(fab: Task<(a: A) => B>): Task<B> {
    return new Task(() => Promise.all([fab.run(), this.run()]).then(([f, a]) => f(a)))
  }
  ap_<B, C>(this: Task<(b: B) => C>, fb: Task<B>): Task<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Task<B>): Task<B> {
    return new Task(() => this.run().then(a => f(a).run()))
  }
  /** Selects the earlier of two Tasks */
  concat(fy: Task<A>): Task<A> {
    return new Task(() => {
      return new Promise(r => {
        let running = true
        const resolve = (a: A) => {
          if (running) {
            running = false
            r(a)
          }
        }
        this.run().then(resolve)
        fy.run().then(resolve)
      })
    })
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new Task(${toString(this.run)})`
  }
}

/** @function */
export const map = <A, B>(f: (a: A) => B, fa: Task<A>): Task<B> => {
  return fa.map(f)
}

/** @function */
export const of = <A>(a: A): Task<A> => {
  return new Task(() => Promise.resolve(a))
}

/** @function */
export const ap = <A, B>(fab: Task<(a: A) => B>, fa: Task<A>): Task<B> => {
  return fa.ap(fab)
}

/** @function */
export const chain = <A, B>(f: (a: A) => Task<B>, fa: Task<A>): Task<B> => {
  return fa.chain(f)
}

/**
 * Returns a task that never completes
 * @function
 */
export const empty = <A>(): Task<A> => {
  return never as Task<A>
}

/**
 * Selects the earlier of two Tasks
 * @function
 */
export const concat = <A>(fx: Task<A>) => (fy: Task<A>): Task<A> => {
  return fx.concat(fy)
}

/** @function */
export const getMonoid = <A>(): Monoid<Task<A>> => {
  return { empty, concat }
}

const neverPromise = new Promise(resolve => undefined)
const neverLazyPromise = () => neverPromise
const never = new Task(neverLazyPromise)

/** @function */
export const tryCatch = <A>(f: Lazy<Promise<A>>) => <L>(onrejected: (reason: {}) => L): Task<Either<L, A>> => {
  return new Task(() => f().then(a => right<L, A>(a), reason => left<L, A>(onrejected(reason))))
}

/**
 * Lifts an IO action into a Task
 * @function
 */
export const fromIO = <A>(io: IO<A>): Task<A> => {
  return new Task(() => Promise.resolve(io.run()))
}

/** @instance */
export const task: Monad<URI> & Monoid<Task<any>> = {
  URI,
  map,
  of,
  ap,
  chain,
  concat,
  empty
}
