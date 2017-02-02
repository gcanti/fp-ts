import { HKT, Monad } from './cats'
import { identity } from './function'

export class Reader<E, A> extends HKT<HKT<'Reader', E>, A> {
  static of = of
  constructor(private value: (e: E) => A){ super() }
  run(e: E): A {
    return this.value(e)
  }
  map<B>(f: (a: A) => B): Reader<E, B> {
    return new Reader((e: E) => f(this.run(e)))
  }
  ap<B>(fab: Reader<E, (a: A) => B>): Reader<E, B> {
    return new Reader((e: E) => fab.run(e)(this.run(e)))
  }
  chain<B>(f: (a: A) => Reader<E, B>): Reader<E, B> {
    return new Reader((e: E) => f(this.run(e)).run(e))
  }
}

export function map<E, A, B>(f: (a: A) => B, fa: Reader<E, A>): Reader<E, B> {
  return fa.map(f)
}

export function ap<E, A, B>(fab: Reader<E, (a: A) => B>, fa: Reader<E, A>): Reader<E, B> {
  return fa.ap(fab)
}

export function of<E, A>(a: A): Reader<E, A> {
  return new Reader((e: E) => a)
}

export function chain<E, A, B>(f: (a: A) => Reader<E, B>, fa: Reader<E, A>): Reader<E, B> {
  return fa.chain(f)
}

//** reads the current context */
export function ask<E>(): Reader<E, E> {
  return new Reader<E, E>(identity)
}

/** Projects a value from the global context in a Reader */
export function asks<E, A>(f: (e: E) => A): Reader<E, A> {
  return new Reader(f)
}

/** changes the value of the local context during the execution of the action `fa` */
export function local<E, A>(f: (e: E) => E, fa: Reader<E, A>): Reader<E, A> {
  return new Reader((e: E) => fa.run(f(e)))
}

;(
  { map, of, ap, chain } as (
    Monad<HKT<'Reader', any>>
  )
)
