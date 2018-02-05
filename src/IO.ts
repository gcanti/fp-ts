import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Monad1 } from './Monad'
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

const map = <A, B>(fa: IO<A>, f: (a: A) => B): IO<B> => {
  return fa.map(f)
}

const of = <A>(a: A): IO<A> => {
  return new IO(() => a)
}

const ap = <A, B>(fab: IO<(a: A) => B>, fa: IO<A>): IO<B> => {
  return fa.ap(fab)
}

const chain = <A, B>(fa: IO<A>, f: (a: A) => IO<B>): IO<B> => {
  return fa.chain(f)
}

/** @function */
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<IO<A>> => {
  return {
    concat: (x, y) => x.chain(xr => y.chain(yr => of(S.concat(xr, yr))))
  }
}

/** @function */
export const getMonoid = <A>(M: Monoid<A>): Monoid<IO<A>> => {
  return { ...getSemigroup(M), empty: of(M.empty) }
}

/** @instance */
export const io: Monad1<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
