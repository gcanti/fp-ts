import { HKT } from './HKT'
import { Monoid } from './Monoid'
import { Monad } from './Monad'
import { Lazy, Function1 } from './function'

export type URI = 'Task'

export type HKTTask<A> = HKT<URI, A>

export class Task<A> {
  static of = of
  __hkt: URI
  __hkta: A
  constructor(private value: Lazy<Promise<A>>) {}
  run(): Promise<A> {
    return this.value()
  }
  map<B>(f: Function1<A, B>): Task<B> {
    return new Task(() => this.run().then(f))
  }
  ap<B>(fab: Task<Function1<A, B>>): Task<B> {
    return new Task(() => Promise.all([fab.run(), this.run()]).then(([f, a]) => f(a)))
  }
  chain<B>(f: Function1<A, Task<B>>): Task<B> {
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

export function map<A, B>(f: Function1<A, B>, fa: HKTTask<A>): Task<B> {
  return (fa as Task<A>).map(f)
}

export function ap<A, B>(fab: Task<Function1<A, B>>, fa: HKTTask<A>): Task<B> {
  return (fa as Task<A>).ap(fab)
}

export function of<A>(a: A): Task<A> {
  return new Task(() => Promise.resolve(a))
}

export function chain<A, B>(f: Function1<A, HKTTask<B>>, fa: HKTTask<A>): Task<B> {
  return (fa as Task<A>).chain(f as Function1<A, Task<B>>)
}

export function concat<A>(fx: HKTTask<A>, fy: HKTTask<A>): Task<A> {
  return (fx as Task<A>).concat(fy as Task<A>)
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
    Monad<URI> &
    Monoid<Task<any>>
  )
)
