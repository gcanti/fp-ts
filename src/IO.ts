import { HKT } from './HKT'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Monad } from './Monad'
import { constant } from './function'

export class IO<A> extends HKT<'IO', A> {
  static of = of
  constructor(private value: () => A){ super() }
  run(): A {
    return this.value()
  }
  map<B>(f: (a: A) => B): IO<B> {
    return new IO(() => f(this.run()))
  }
  ap<B>(fab: IO<(a: A) => B>): IO<B> {
    return new IO(() => fab.run()(this.run()))
  }
  chain<B>(f: (a: A) => IO<B>): IO<B> {
    return new IO(() => f(this.run()).run())
  }
}

export function map<A, B>(f: (a: A) => B, fa: IO<A>): IO<B> {
  return fa.map(f)
}

export function ap<A, B>(fab: IO<(a: A) => B>, fa: IO<A>): IO<B> {
  return fa.ap(fab)
}

export function of<A>(a: A): IO<A> {
  return new IO(() => a)
}

export function chain<A, B>(f: (a: A) => IO<B>, fa: IO<A>): IO<B> {
  return fa.chain(f)
}

export function concat<A>(semigroup: Semigroup<A>, fx: IO<A>, fy: IO<A>): IO<A> {
  return new IO(() => semigroup.concat(fx.run(), fy.run()))
}

export function getSemigroup<A>(semigroup: Semigroup<A>): Semigroup<IO<A>> {
  return { concat: (fx, fy) => concat(semigroup, fx, fy) }
}

export function getMonoid<A>(monoid: Monoid<A>): Monoid<IO<A>> {
  const empty = monoid.empty()
  const { concat } = getSemigroup(monoid)
  return { empty: constant(of(empty)), concat }
}

;(
  { map, of, ap, chain } as (
    Monad<'IO'>
  )
)
