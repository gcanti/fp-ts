import { HKT } from './HKT'
import { StaticMonoid } from './Monoid'
import { StaticMonad, FantasyMonad } from './Monad'
import { Lazy, Function1, Function2, Function3, Function4, Curried2, Curried3, Curried4, Kleisli } from './function'

export type URI = 'Task'

export type HKTTask<A> = HKT<URI, A>

export class Task<A> implements FantasyMonad<URI, A> {
  static of = of
  static empty = empty
  readonly __hkt: URI
  readonly __hkta: A
  constructor(public readonly value: Lazy<Promise<A>>) {}
  run(): Promise<A> {
    return this.value()
  }
  map<B>(f: Function1<A, B>): Task<B> {
    return new Task(() => this.run().then(f))
  }
  of<B>(b: B): Task<B> {
    return of(b)
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

export function to<A>(fa: HKTTask<A>): Task<A> {
  return fa as Task<A>
}

export function map<A, B>(f: Function1<A, B>, fa: HKTTask<A>): Task<B> {
  return (fa as Task<A>).map(f)
}

export function of<A>(a: A): Task<A> {
  return new Task(() => Promise.resolve(a))
}

export function ap<A, B>(fab: HKTTask<Function1<A, B>>, fa: HKTTask<A>): Task<B> {
  return (fa as Task<A>).ap(fab as Task<Function1<A, B>>)
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

declare module './Functor' {
  interface FunctorOps {
    map<A, B>(f: Function1<A, B>, fa: FantasyFunctor<URI, A>): Task<B>
    lift<A, B>(functor: StaticFunctor<URI>, f: Function1<A, B>): Function1<Task<A>, Task<B>>
  }
}

declare module './Apply' {
  interface ApplyOps {
    ap<A, B>(fab: Task<Function1<A, B>>, fa: FantasyApply<URI, A>): Task<B>
    liftA2<A, B, C>(apply: StaticApply<URI>, f: Curried2<A, B, C>): Function2<Task<A>, Task<B>, Task<C>>
    liftA3<A, B, C, D>(apply: StaticApply<URI>, f: Curried3<A, B, C, D>): Function3<Task<A>, Task<B>, Task<C>, Task<D>>
    liftA4<A, B, C, D, E>(apply: StaticApply<URI>, f: Curried4<A, B, C, D, E>): Function4<Task<A>, Task<B>, Task<C>, Task<D>, Task<E>>
  }
}

declare module './Chain' {
  interface MonadOps {
    chain<A, B>(f: Kleisli<URI, A, B>, fa: FantasyMonad<URI, A>): Task<B>
    flatten<A>(mma: FantasyMonad<URI, FantasyMonad<URI, A>>): Task<A>
  }
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain, concat, empty } as (
    StaticMonad<URI> &
    StaticMonoid<Task<any>>
  )
)
