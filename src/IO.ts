import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Monad } from './Monad'
import { Lazy, toString } from './function'

declare module './HKT' {
  interface URI2HKT<A> {
    IO: IO<A>
  }
}

export const URI = 'IO'

export type URI = typeof URI

/**
 * @data
 * @constructor IO
 */
export class IO<A> {
  readonly '-A': A
  readonly '-URI': URI
  constructor(readonly run: Lazy<A>) {}
  map<B>(f: (a: A) => B): IO<B> {
    return new IO(() => f(this.run()))
  }
  ap<B>(fab: IO<(a: A) => B>): IO<B> {
    return new IO(() => fab.run()(this.run()))
  }
  ap_<B, C>(this: IO<(b: B) => C>, fb: IO<B>): IO<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => IO<B>): IO<B> {
    return new IO(() => f(this.run()).run())
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new IO(${toString(this.run)})`
  }
}

/** @function */
export const map = <A, B>(f: (a: A) => B, fa: IO<A>): IO<B> => {
  return fa.map(f)
}

/** @function */
export const of = <A>(a: A): IO<A> => {
  return new IO(() => a)
}

/** @function */
export const ap = <A, B>(fab: IO<(a: A) => B>, fa: IO<A>): IO<B> => {
  return fa.ap(fab)
}

/** @function */
export const chain = <A, B>(f: (a: A) => IO<B>, fa: IO<A>): IO<B> => {
  return fa.chain(f)
}

/** @function */
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<IO<A>> => {
  return {
    concat: x => y => new IO(() => S.concat(x.run())(y.run()))
  }
}

/** @function */
export const getMonoid = <A>(M: Monoid<A>): Monoid<IO<A>> => {
  const empty = of(M.empty())
  return { ...getSemigroup(M), empty: () => empty }
}

/** @instance */
export const io: Monad<URI> = { URI, map, of, ap, chain }
