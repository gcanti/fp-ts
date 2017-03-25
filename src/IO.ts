import { StaticMonoid } from './Monoid'
import { StaticSemigroup } from './Semigroup'
import { StaticMonad, FantasyMonad } from './Monad'
import { constant, Lazy } from './function'

declare module './HKT' {
  interface HKT<A> {
    IO: IO<A>
  }
}

export const URI = 'IO'

export type URI = typeof URI

export class IO<A> implements FantasyMonad<URI, A> {
  static of = of
  readonly _URI: URI
  constructor(public readonly value: Lazy<A>) {}
  run(): A {
    return this.value()
  }
  map<B>(f: (a: A) => B): IO<B> {
    return new IO(() => f(this.run()))
  }
  of<B>(b: B): IO<B> {
    return of(b)
  }
  ap<B>(fab: IO<(a: A) => B>): IO<B> {
    return new IO(() => fab.run()(this.run()))
  }
  chain<B>(f: (a: A) => IO<B>): IO<B> {
    return new IO(() => f(this.run()).run())
  }
  concat(semigroup: StaticSemigroup<A>, fy: IO<A>): IO<A> {
    return new IO(() => semigroup.concat(this.run(), fy.run()))
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

export function concat<A>(semigroup: StaticSemigroup<A>, fx: IO<A>, fy: IO<A>): IO<A> {
  return fx.concat(semigroup, fy)
}

export function getSemigroup<A>(semigroup: StaticSemigroup<A>): StaticSemigroup<IO<A>> {
  return { concat: (fx, fy) => concat(semigroup, fx, fy) }
}

export function getMonoid<A>(monoid: StaticMonoid<A>): StaticMonoid<IO<A>> {
  const empty = monoid.empty()
  return { empty: constant(of(empty)), concat: getSemigroup(monoid).concat }
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain } as (
    StaticMonad<URI>
  )
)
