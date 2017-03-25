import { StaticMonoid } from './Monoid'
import { StaticMonad, FantasyMonad } from './Monad'
import { Lazy } from './function'

declare module './HKT' {
  interface HKT<A> {
    Task: Task<A>
  }
}

export const URI = 'Task'

export type URI = typeof URI

export class Task<A> implements FantasyMonad<URI, A> {
  static of = of
  static empty = empty
  readonly _URI: URI
  constructor(public readonly value: Lazy<Promise<A>>) {}
  run(): Promise<A> {
    return this.value()
  }
  map<B>(f: (a: A) => B): Task<B> {
    return new Task(() => this.run().then(f))
  }
  of<B>(b: B): Task<B> {
    return of(b)
  }
  ap<B>(fab: Task<(a: A) => B>): Task<B> {
    return new Task(() => Promise.all([fab.run(), this.run()]).then(([f, a]) => f(a)))
  }
  chain<B>(f: (a: A) => Task<B>): Task<B> {
    return new Task(() => this.run().then(a => f(a).run()))
  }
  concat(fy: Task<A>): Task<A> {
    return new Task(() => {
      return new Promise<A>(r => {
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
}

export function map<A, B>(f: (a: A) => B, fa: Task<A>): Task<B> {
  return fa.map(f)
}

export function of<A>(a: A): Task<A> {
  return new Task(() => Promise.resolve(a))
}

export function ap<A, B>(fab: Task<(a: A) => B>, fa: Task<A>): Task<B> {
  return fa.ap(fab)
}

export function chain<A, B>(f: (a: A) => Task<B>, fa: Task<A>): Task<B> {
  return fa.chain(f)
}

export function concat<A>(fx: Task<A>, fy: Task<A>): Task<A> {
  return fx.concat(fy)
}

const neverPromise = new Promise(resolve => undefined)
const neverLazyPromise = () => neverPromise
const never = new Task(neverLazyPromise)

/** returns a task that never completes */
export function empty<A>(): Task<A> {
  return never as Task<A>
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain, concat, empty } as (
    StaticMonad<URI> &
    StaticMonoid<Task<any>>
  )
)
