import { HKT } from './HKT'
import { Monad } from './Monad'
import { identity, Function1, Endomorphism } from './function'

export type URI = 'Reader';

export type HKTReader<E, A> = HKT<HKT<URI, E>, A>;

export class Reader<E, A> implements HKTReader<E, A> {
  __hkt: HKT<URI, E>;
  __hkta: A;
  static of = of
  constructor(private value: Function1<E, A>){}
  run(e: E): A {
    return this.value(e)
  }
  map<B>(f: Function1<A, B>): Reader<E, B> {
    return new Reader((e: E) => f(this.run(e)))
  }
  ap<B>(fab: Reader<E, Function1<A, B>>): Reader<E, B> {
    return new Reader((e: E) => fab.run(e)(this.run(e)))
  }
  chain<B>(f: Function1<A, Reader<E, B>>): Reader<E, B> {
    return new Reader((e: E) => f(this.run(e)).run(e))
  }
}

export function map<E, A, B>(f: Function1<A, B>, fa: HKTReader<E, A>): Reader<E, B> {
  return (fa as Reader<E, A>).map(f)
}

export function ap<E, A, B>(fab: HKTReader<E, Function1<A, B>>, fa: HKTReader<E, A>): Reader<E, B> {
  return (fa as Reader<E, A>).ap(fab as Reader<E, Function1<A, B>>)
}

export function of<E, A>(a: A): Reader<E, A> {
  return new Reader((e: E) => a)
}

export function chain<E, A, B>(f: Function1<A, HKTReader<E, B>>, fa: HKTReader<E, A>): Reader<E, B> {
  return (fa as Reader<E, A>).chain(f as Function1<A, Reader<E, B>>)
}

/** reads the current context */
export function ask<E>(): Reader<E, E> {
  return new Reader<E, E>(identity)
}

/** Projects a value from the global context in a Reader */
export function asks<E, A>(f: Function1<E, A>): Reader<E, A> {
  return new Reader(f)
}

/** changes the value of the local context during the execution of the action `fa` */
export function local<E, A>(f: Endomorphism<E>, fa: HKTReader<E, A>): Reader<E, A> {
  return new Reader((e: E) => (fa as Reader<E, A>).run(f(e)))
}

;(
  { map, of, ap, chain } as (
    Monad<HKT<URI, any>>
  )
)
