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
  ap_<B, C>(this: Task<(a: B) => C>, fb: Task<B>): Task<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Task<B>): Task<B> {
    return new Task(() => this.run().then(a => f(a).run()))
  }
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
  inspect() {
    return this.toString()
  }
  toString() {
    return `new Task(${toString(this.run)})`
  }
}

export const map = <A, B>(f: (a: A) => B, fa: Task<A>): Task<B> => fa.map(f)

export const of = <A>(a: A): Task<A> => new Task(() => Promise.resolve(a))

export const ap = <A, B>(fab: Task<(a: A) => B>, fa: Task<A>): Task<B> => fa.ap(fab)

export const chain = <A, B>(f: (a: A) => Task<B>, fa: Task<A>): Task<B> => fa.chain(f)

/** returns a task that never completes */
export const empty = <A>(): Task<A> => never as Task<A>

export const concat = <A>(fx: Task<A>) => (fy: Task<A>): Task<A> => fx.concat(fy)

const neverPromise = new Promise(resolve => undefined)
const neverLazyPromise = () => neverPromise
const never = new Task(neverLazyPromise)

export const tryCatch = <A>(f: Lazy<Promise<A>>) => <L>(onrejected: (reason: {}) => L): Task<Either<L, A>> =>
  new Task(() => f().then(a => right<L, A>(a), reason => left<L, A>(onrejected(reason))))

/** Lifts an IO action into a Task */
export const fromIO = <A>(io: IO<A>): Task<A> => new Task(() => Promise.resolve(io.run()))

export const task: Monad<URI> & Monoid<Task<any>> = {
  URI,
  map,
  of,
  ap,
  chain,
  concat,
  empty
}
