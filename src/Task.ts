import { Monoid } from './Monoid'
import { Monad1 } from './Monad'
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
export class Task<A> {
  readonly '-A': A
  readonly '-URI': URI
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

const map = <A, B>(fa: Task<A>, f: (a: A) => B): Task<B> => {
  return fa.map(f)
}

const of = <A>(a: A): Task<A> => {
  return new Task(() => Promise.resolve(a))
}

const ap = <A, B>(fab: Task<(a: A) => B>, fa: Task<A>): Task<B> => {
  return fa.ap(fab)
}

const chain = <A, B>(fa: Task<A>, f: (a: A) => Task<B>): Task<B> => {
  return fa.chain(f)
}

/** @function */
export const getMonoid = <A = never>(): Monoid<Task<A>> => {
  return {
    concat: (x, y) => x.concat(y),
    empty: never
  }
}

const never = new Task(() => new Promise<never>(resolve => undefined))

/** @function */
export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L): Task<Either<L, A>> => {
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
export const task: Monad1<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
