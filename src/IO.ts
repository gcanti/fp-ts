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

export class IO<A> implements FantasyMonad<URI, A> {
  readonly _A: A
  readonly _URI: URI
  constructor(readonly run: Lazy<A>) {}
  map<B>(f: (a: A) => B): IO<B> {
    return new IO(() => f(this.run()))
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
    return `new IO(${toString(this.run)})`
  }
}

export const map = <A, B>(f: (a: A) => B, fa: IO<A>): IO<B> => fa.map(f)

export const of = <A>(a: A): IO<A> => new IO(() => a)

export const ap = <A, B>(fab: IO<(a: A) => B>, fa: IO<A>): IO<B> => fa.ap(fab)

export const chain = <A, B>(f: (a: A) => IO<B>, fa: IO<A>): IO<B> => fa.chain(f)

export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<IO<A>> => ({
  concat: x => y => new IO(() => S.concat(x.run())(y.run()))
})

export const getMonoid = <A>(M: Monoid<A>): Monoid<IO<A>> => {
  const empty = of(M.empty())
  return { ...getSemigroup(M), empty: () => empty }
}

export const io: Monad<URI> = { URI, map, of, ap, chain }
