import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Monad, FantasyMonad } from './Monad'
import { Lazy, toString } from './function'

declare module './HKT' {
  interface URI2HKT<A> {
    IO: IO<A>
  }
}

export const URI = 'IO'

export type URI = typeof URI

export const of = <A>(a: A): IO<A> => new IO(() => a)

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
  inspect() {
    return this.toString()
  }
  toString() {
    return `new IO(${toString(this.value)})`
  }
}

export const map = <A, B>(f: (a: A) => B, fa: IO<A>): IO<B> => fa.map(f)

export const ap = <A, B>(fab: IO<(a: A) => B>, fa: IO<A>): IO<B> => fa.ap(fab)

export const chain = <A, B>(f: (a: A) => IO<B>, fa: IO<A>): IO<B> => fa.chain(f)

export const concat = <A>(S: Semigroup<A>) => (fx: IO<A>) => (fy: IO<A>): IO<A> =>
  new IO(() => S.concat(fx.run())(fy.run()))

export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<IO<A>> => ({
  concat: concat(S)
})

export const getMonoid = <A>(M: Monoid<A>): Monoid<IO<A>> => {
  const empty = of(M.empty())
  return { ...getSemigroup(M), empty: () => empty }
}

export const io: Monad<URI> = { URI, map, of, ap, chain }
