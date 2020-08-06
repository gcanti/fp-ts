/**
 * @since 2.0.0
 */
import { Bounded } from './Bounded'
import { Endomorphism, identity } from './function'
import { ReadonlyRecord } from './ReadonlyRecord'
import {
  fold as foldSemigroup,
  getDualSemigroup,
  getFunctionSemigroup,
  getJoinSemigroup,
  getMeetSemigroup,
  getStructSemigroup,
  getTupleSemigroup,
  Semigroup,
  semigroupAll,
  semigroupAny,
  semigroupProduct,
  semigroupString,
  semigroupSum,
  semigroupVoid
} from './Semigroup'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}

/**
 * Boolean monoid under conjunction
 *
 * @category instances
 * @since 2.0.0
 */
export const monoidAll: Monoid<boolean> = {
  concat: semigroupAll.concat,
  empty: true
}

/**
 * Boolean monoid under disjunction
 *
 * @category instances
 * @since 2.0.0
 */
export const monoidAny: Monoid<boolean> = {
  concat: semigroupAny.concat,
  empty: false
}

/**
 * Number monoid under addition
 *
 * @category instances
 * @since 2.0.0
 */
export const monoidSum: Monoid<number> = {
  concat: semigroupSum.concat,
  empty: 0
}

/**
 * Number monoid under multiplication
 *
 * @category instances
 * @since 2.0.0
 */
export const monoidProduct: Monoid<number> = {
  concat: semigroupProduct.concat,
  empty: 1
}

/**
 * @category instances
 * @since 2.0.0
 */
export const monoidString: Monoid<string> = {
  concat: semigroupString.concat,
  empty: ''
}

/**
 * @category instances
 * @since 2.0.0
 */
export const monoidVoid: Monoid<void> = {
  concat: semigroupVoid.concat,
  empty: undefined
}

/**
 * @since 2.0.0
 */
export function fold<A>(M: Monoid<A>): (as: ReadonlyArray<A>) => A {
  const foldM = foldSemigroup(M)
  return (as) => foldM(M.empty, as)
}

/**
 * Given a tuple of monoids returns a monoid for the tuple
 *
 * @example
 * import { getTupleMonoid, monoidString, monoidSum, monoidAll } from 'fp-ts/Monoid'
 *
 * const M1 = getTupleMonoid(monoidString, monoidSum)
 * assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const M2 = getTupleMonoid(monoidString, monoidSum, monoidAll)
 * assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @category instances
 * @since 2.0.0
 */
export function getTupleMonoid<T extends ReadonlyArray<Monoid<any>>>(
  ...monoids: T
): Monoid<{ [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never }> {
  return {
    concat: getTupleSemigroup(...monoids).concat,
    empty: monoids.map((m) => m.empty)
  } as any
}

/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { getDualMonoid, monoidString } from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(getDualMonoid(monoidString).concat('a', 'b'), 'ba')
 *
 * @category combinators
 * @since 2.0.0
 */
export function getDualMonoid<A>(M: Monoid<A>): Monoid<A> {
  return {
    concat: getDualSemigroup(M).concat,
    empty: M.empty
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getFunctionMonoid<M>(M: Monoid<M>): <A = never>() => Monoid<(a: A) => M> {
  return () => ({
    concat: getFunctionSemigroup(M)<any>().concat,
    empty: () => M.empty
  })
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getEndomorphismMonoid<A = never>(): Monoid<Endomorphism<A>> {
  return {
    concat: (x, y) => (a) => x(y(a)),
    empty: identity
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getStructMonoid<O extends ReadonlyRecord<string, any>>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O> {
  const empty: any = {}
  for (const key of Object.keys(monoids)) {
    empty[key] = monoids[key].empty
  }
  return {
    concat: getStructSemigroup(monoids).concat,
    empty
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getMeetMonoid<A>(B: Bounded<A>): Monoid<A> {
  return {
    concat: getMeetSemigroup(B).concat,
    empty: B.top
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getJoinMonoid<A>(B: Bounded<A>): Monoid<A> {
  return {
    concat: getJoinSemigroup(B).concat,
    empty: B.bottom
  }
}
