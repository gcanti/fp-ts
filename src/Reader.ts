import { Category2 } from './Category'
import { identity } from './function'
import { Monad2 } from './Monad'
import { Profunctor2 } from './Profunctor'
import { Strong2 } from './Strong'
import { Choice2 } from './Choice'
import { Either, left as eitherLeft, right as eitherRight } from './Either'
import { Semigroup } from './Semigroup'
import { Monoid } from './Monoid'
import { pipeable } from './pipeable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Reader: Reader<L, A>
  }
}

export const URI = 'Reader'

export type URI = typeof URI

/**
 * @since 1.0.0
 */
export class Reader<E, A> {
  readonly _A!: A
  readonly _L!: E
  readonly _URI!: URI
  constructor(readonly run: (e: E) => A) {}
  /** @obsolete */
  map<B>(f: (a: A) => B): Reader<E, B> {
    return new Reader((e: E) => f(this.run(e)))
  }
  /** @obsolete */
  ap<B>(fab: Reader<E, (a: A) => B>): Reader<E, B> {
    return new Reader((e: E) => fab.run(e)(this.run(e)))
  }
  /**
   * Flipped version of `ap`
   * @obsolete
   */
  ap_<B, C>(this: Reader<E, (b: B) => C>, fb: Reader<E, B>): Reader<E, C> {
    return fb.ap(this)
  }
  /** @obsolete */
  chain<B>(f: (a: A) => Reader<E, B>): Reader<E, B> {
    return new Reader((e: E) => f(this.run(e)).run(e))
  }
  /**
   * @since 1.6.1
   * @obsolete
   */
  local<E2 = E>(f: (e: E2) => E): Reader<E2, A> {
    return new Reader(e => this.run(f(e)))
  }
}

/**
 * reads the current context
 *
 * @since 1.0.0
 */
export const ask = <E>(): Reader<E, E> => {
  return new Reader(identity)
}

/**
 * Projects a value from the global context in a Reader
 *
 * @since 1.0.0
 */
export const asks = <E, A>(f: (e: E) => A): Reader<E, A> => {
  return new Reader(f)
}

/**
 * changes the value of the local context during the execution of the action `fa`
 *
 * @since 1.0.0
 */
export const local = <E, E2 = E>(f: (e: E2) => E) => <A>(fa: Reader<E, A>): Reader<E2, A> => {
  return fa.local(f)
}

/**
 * @since 1.14.0
 */
export const getSemigroup = <E, A>(S: Semigroup<A>): Semigroup<Reader<E, A>> => {
  return {
    concat: (x, y) => new Reader(e => S.concat(x.run(e), y.run(e)))
  }
}

/**
 * @since 1.14.0
 */
export const getMonoid = <E, A>(M: Monoid<A>): Monoid<Reader<E, A>> => {
  return {
    ...getSemigroup(M),
    empty: reader.of(M.empty)
  }
}

/**
 * @since 1.0.0
 */
export const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI> = {
  URI,
  map: (fa, f) => fa.map(f),
  of: a => new Reader(() => a),
  ap: (fab, fa) => fa.ap(fab),
  chain: (fa, f) => fa.chain(f),
  promap: (fbc, f, g) => new Reader(a => g(fbc.run(f(a)))),
  compose: (ab, la) => new Reader(l => ab.run(la.run(l))),
  id: () => new Reader(identity),
  first: pab => new Reader(([a, c]) => [pab.run(a), c]),
  second: pbc => new Reader(([a, b]) => [a, pbc.run(b)]),
  left: <A, B, C>(pab: Reader<A, B>): Reader<Either<A, C>, Either<B, C>> => {
    return new Reader(e => e.fold<Either<B, C>>(a => eitherLeft(pab.run(a)), eitherRight))
  },
  right: <A, B, C>(pbc: Reader<B, C>): Reader<Either<A, B>, Either<A, C>> => {
    return new Reader(e => e.fold<Either<A, C>>(eitherLeft, b => eitherRight(pbc.run(b))))
  }
}

//
// backporting
//

/**
 * @since 1.19.0
 */
export const of: <A>(a: A) => Reader<unknown, A> = reader.of

const { ap, apFirst, apSecond, chain, chainFirst, compose, flatten, map, promap } = pipeable(reader)

export { ap, apFirst, apSecond, chain, chainFirst, compose, flatten, map, promap }
