import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup_'
import { Lazy, constIdentity, toString, constant } from './function'

declare module './HKT' {
  interface URI2HKT<A> {
    IO: IO<A>
  }
}

export const URI = 'IO'

export type URI = typeof URI

/**
 * `IO<A>` represents a synchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent a synchronous computation that may fail, please see {@link IOEither}.
 * @data
 * @constructor IO
 * @since 1.0.0
 */
export class IO<A> {
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly run: Lazy<A>) {}
  map<B>(f: (a: A) => B): IO<B> {
    return new IO(() => f(this.run()))
  }
  ap<B>(fab: IO<(a: A) => B>): IO<B> {
    return new IO(() => fab.run()(this.run()))
  }
  /**
   * Flipped version of {@link ap}
   */
  ap_<B, C>(this: IO<(b: B) => C>, fb: IO<B>): IO<C> {
    return fb.ap(this)
  }
  /**
   * Combine two effectful actions, keeping only the result of the first
   * @since 1.6.0
   */
  applyFirst<B>(fb: IO<B>): IO<A> {
    return fb.ap(this.map(constant))
  }
  /**
   * Combine two effectful actions, keeping only the result of the second
   * @since 1.5.0
   */
  applySecond<B>(fb: IO<B>): IO<B> {
    return fb.ap(this.map(constIdentity as () => (b: B) => B))
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

export const map = <A, B>(fa: IO<A>, f: (a: A) => B): IO<B> => {
  return fa.map(f)
}

export const of = <A>(a: A): IO<A> => {
  return new IO(() => a)
}

export const ap = <A, B>(fab: IO<(a: A) => B>, fa: IO<A>): IO<B> => {
  return fa.ap(fab)
}

export const chain = <A, B>(fa: IO<A>, f: (a: A) => IO<B>): IO<B> => {
  return fa.chain(f)
}

/**
 * @since 1.0.0
 */
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<IO<A>> => {
  return {
    concat: (x, y) =>
      new IO(() => {
        const xr = x.run()
        const yr = y.run()
        return S.concat(xr, yr)
      })
  }
}

/**
 * @since 1.0.0
 */
export const getMonoid = <A>(M: Monoid<A>): Monoid<IO<A>> => {
  return { ...getSemigroup(M), empty: of(M.empty) }
}
