/**
 * @since 2.0.0
 */
import { identity } from './function'
import { Magma } from './Magma'
import { max, min, Ord } from './Ord'
import { ReadonlyRecord } from './ReadonlyRecord'

/**
 * A `Semigroup` is a `Magma` where `concat` is associative, that is:
 *
 * Associativiy: `concat(concat(x, y), z) = concat(x, concat(y, z))`
 *
 * @since 2.0.0
 */
export interface Semigroup<A> extends Magma<A> {}

/**
 * @since 2.0.0
 */
export function fold<A>(S: Semigroup<A>): (a: A, as: ReadonlyArray<A>) => A {
  return (a, as) => as.reduce(S.concat, a)
}

/**
 * @since 2.0.0
 */
export function getFirstSemigroup<A = never>(): Semigroup<A> {
  return { concat: identity }
}

/**
 * @since 2.0.0
 */
export function getLastSemigroup<A = never>(): Semigroup<A> {
  return { concat: (_, y) => y }
}

/**
 * Given a tuple of semigroups returns a semigroup for the tuple
 *
 * @example
 * import { getTupleSemigroup, semigroupString, semigroupSum, semigroupAll } from 'fp-ts/lib/Semigroup'
 *
 * const S1 = getTupleSemigroup(semigroupString, semigroupSum)
 * assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const S2 = getTupleSemigroup(semigroupString, semigroupSum, semigroupAll)
 * assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @since 2.0.0
 */
export function getTupleSemigroup<T extends ReadonlyArray<Semigroup<any>>>(
  ...semigroups: T
): Semigroup<{ [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never }> {
  return {
    concat: (x, y) => semigroups.map((s, i) => s.concat(x[i], y[i])) as any
  }
}

/**
 * @since 2.0.0
 */
export function getDualSemigroup<A>(S: Semigroup<A>): Semigroup<A> {
  return {
    concat: (x, y) => S.concat(y, x)
  }
}

/**
 * @since 2.0.0
 */
export function getFunctionSemigroup<S>(S: Semigroup<S>): <A = never>() => Semigroup<(a: A) => S> {
  return () => ({
    concat: (f, g) => a => S.concat(f(a), g(a))
  })
}

/**
 * @since 2.0.0
 */
export function getStructSemigroup<O extends ReadonlyRecord<string, any>>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O> {
  return {
    concat: (x, y) => {
      const r: any = {}
      for (const key of Object.keys(semigroups)) {
        r[key] = semigroups[key].concat(x[key], y[key])
      }
      return r
    }
  }
}

/**
 * @since 2.0.0
 */
export function getMeetSemigroup<A>(O: Ord<A>): Semigroup<A> {
  return {
    concat: min(O)
  }
}

/**
 * @since 2.0.0
 */
export function getJoinSemigroup<A>(O: Ord<A>): Semigroup<A> {
  return {
    concat: max(O)
  }
}

/**
 * Returns a `Semigroup` instance for objects preserving their type
 *
 * @example
 * import { getObjectSemigroup } from 'fp-ts/lib/Semigroup'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * const S = getObjectSemigroup<Person>()
 * assert.deepStrictEqual(S.concat({ name: 'name', age: 23 }, { name: 'name', age: 24 }), { name: 'name', age: 24 })
 *
 * @since 2.0.0
 */
export function getObjectSemigroup<A extends object = never>(): Semigroup<A> {
  return {
    concat: (x, y) => Object.assign({}, x, y)
  }
}

/**
 * Boolean semigroup under conjunction
 * @since 2.0.0
 */
export const semigroupAll: Semigroup<boolean> = {
  concat: (x, y) => x && y
}

/**
 * Boolean semigroup under disjunction
 * @since 2.0.0
 */
export const semigroupAny: Semigroup<boolean> = {
  concat: (x, y) => x || y
}

/**
 * Number `Semigroup` under addition
 * @since 2.0.0
 */
export const semigroupSum: Semigroup<number> = {
  concat: (x, y) => x + y
}

/**
 * Number `Semigroup` under multiplication
 * @since 2.0.0
 */
export const semigroupProduct: Semigroup<number> = {
  concat: (x, y) => x * y
}

/**
 * @since 2.0.0
 */
export const semigroupString: Semigroup<string> = {
  concat: (x, y) => x + y
}

/**
 * @since 2.0.0
 */
export const semigroupVoid: Semigroup<void> = {
  concat: () => undefined
}

/**
 * You can glue items between and stay associative
 *
 * @example
 * import { getIntercalateSemigroup, semigroupString } from 'fp-ts/lib/Semigroup'
 *
 * const S = getIntercalateSemigroup(' ')(semigroupString)
 *
 * assert.strictEqual(S.concat('a', 'b'), 'a b')
 * assert.strictEqual(S.concat(S.concat('a', 'b'), 'c'), S.concat('a', S.concat('b', 'c')))
 *
 * @since 2.5.0
 */
export function getIntercalateSemigroup<A>(a: A): (S: Semigroup<A>) => Semigroup<A> {
  return S => ({
    concat: (x, y) => S.concat(x, S.concat(a, y))
  })
}
