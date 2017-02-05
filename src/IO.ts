import { HKT } from './HKT'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Monad } from './Monad'
import { constant, Lazy, Function1 } from './function'

export type URI = 'IO';

export type HKTIO<A> = HKT<URI, A>;

export class IO<A> extends HKT<URI, A> {
  static of = of
  constructor(private value: Lazy<A>){ super() }
  run(): A {
    return this.value()
  }
  map<B>(f: Function1<A, B>): IO<B> {
    return new IO(() => f(this.run()))
  }
  ap<B>(fab: IO<Function1<A, B>>): IO<B> {
    return new IO(() => fab.run()(this.run()))
  }
  chain<B>(f: Function1<A, IO<B>>): IO<B> {
    return new IO(() => f(this.run()).run())
  }
  concat(semigroup: Semigroup<A>, fy: IO<A>): IO<A> {
    return new IO(() => semigroup.concat(this.run(), fy.run()))
  }
}

export function map<A, B>(f: Function1<A, B>, fa: HKTIO<A>): IO<B> {
  return (fa as IO<A>).map(f)
}

export function ap<A, B>(fab: IO<Function1<A, B>>, fa: HKTIO<A>): IO<B> {
  return (fa as IO<A>).ap(fab)
}

export function of<A>(a: A): IO<A> {
  return new IO(() => a)
}

export function chain<A, B>(f: Function1<A, HKTIO<B>>, fa: HKTIO<A>): IO<B> {
  return (fa as IO<A>).chain(f as Function1<A, IO<B>>)
}

export function concat<A>(semigroup: Semigroup<A>, fx: HKTIO<A>, fy: HKTIO<A>): IO<A> {
  return (fx as IO<A>).concat(semigroup, fy as IO<A>)
}

export function getSemigroup<A>(semigroup: Semigroup<A>): Semigroup<IO<A>> {
  return { concat: (fx, fy) => concat(semigroup, fx, fy) }
}

export function getMonoid<A>(monoid: Monoid<A>): Monoid<IO<A>> {
  const empty = monoid.empty()
  return { empty: constant(of(empty)), concat: getSemigroup(monoid).concat }
}

;(
  { map, of, ap, chain } as (
    Monad<'IO'>
  )
)
