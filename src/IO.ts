import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Monad, FantasyMonad } from './Monad'
import { constant, Lazy, toString } from './function'

export const URI = 'IO'

export type URI = typeof URI

export class IO<A> implements FantasyMonad<URI, A> {
  static of = of
  readonly _A: A
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
  ap_<B, C>(this: IO<(a: B) => C>, fb: IO<B>): IO<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => IO<B>): IO<B> {
    return new IO(() => f(this.run()).run())
  }
  concat(semigroup: Semigroup<A>, fy: IO<A>): IO<A> {
    return new IO(() => semigroup.concat(this.run(), fy.run()))
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `new IO(${toString(this.value)})`
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
  return fx.concat(semigroup, fy)
}

export function getSemigroup<A>(semigroup: Semigroup<A>): Semigroup<IO<A>> {
  return { concat: (fx, fy) => concat(semigroup, fx, fy) }
}

export function getMonoid<A>(monoid: Monoid<A>): Monoid<IO<A>> {
  const empty = monoid.empty()
  return { empty: constant(of(empty)), concat: getSemigroup(monoid).concat }
}

const proof: Monad<URI> = { URI, map, of, ap, chain }
// tslint:disable-next-line no-unused-expression
proof
