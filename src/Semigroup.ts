/**
 * @file See [Getting started with fp-ts: Semigroup](https://dev.to/gcanti/getting-started-with-fp-ts-semigroup-2mf7)
 */
import { Ord, max, min } from './Ord'
import { concat, identity } from './function'
import { Magma } from './Magma'

/**
 * A `Semigroup` is a `Magma` where `concat` is associative, that is:
 *
 * Associativiy: `concat(concat(x, y), z) = concat(x, concat(y, z))`
 *
 * @since 1.0.0
 */
export interface Semigroup<A> extends Magma<A> {}

/**
 * @since 1.0.0
 */
export const fold = <A>(S: Semigroup<A>) => (a: A) => (as: Array<A>): A => {
  return as.reduce(S.concat, a)
}

/**
 * @since 1.0.0
 */
export const getFirstSemigroup = <A = never>(): Semigroup<A> => {
  return { concat: identity }
}

/**
 * @since 1.0.0
 */
export const getLastSemigroup = <A = never>(): Semigroup<A> => {
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
 * @since 1.14.0
 */
export const getTupleSemigroup = <T extends Array<Semigroup<any>>>(
  ...semigroups: T
): Semigroup<{ [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never }> => {
  return {
    concat: (x, y) => semigroups.map((s, i) => s.concat(x[i], y[i])) as any
  }
}

/**
 * Use `getTupleSemigroup` instead
 * @since 1.0.0
 * @deprecated
 */
export const getProductSemigroup = <A, B>(SA: Semigroup<A>, SB: Semigroup<B>): Semigroup<[A, B]> => {
  return getTupleSemigroup(SA, SB)
}

/**
 * @since 1.0.0
 */
export const getDualSemigroup = <A>(S: Semigroup<A>): Semigroup<A> => {
  return {
    concat: (x, y) => S.concat(y, x)
  }
}

/**
 * @since 1.0.0
 */
export const getFunctionSemigroup = <S>(S: Semigroup<S>) => <A = never>(): Semigroup<(a: A) => S> => {
  return {
    concat: (f, g) => a => S.concat(f(a), g(a))
  }
}

/**
 * @since 1.14.0
 */
export const getStructSemigroup = <O extends { [key: string]: any }>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O> => {
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
 * Use `getStructSemigroup` instead
 * @since 1.0.0
 * @deprecated
 */
export const getRecordSemigroup = <O extends { [key: string]: any }>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O> => {
  return getStructSemigroup(semigroups)
}

/**
 * @since 1.0.0
 */
export const getMeetSemigroup = <A>(O: Ord<A>): Semigroup<A> => {
  return {
    concat: min(O)
  }
}

/**
 * @since 1.0.0
 */
export const getJoinSemigroup = <A>(O: Ord<A>): Semigroup<A> => {
  return {
    concat: max(O)
  }
}

/**
 * Boolean semigroup under conjunction
 * @since 1.0.0
 */
export const semigroupAll: Semigroup<boolean> = {
  concat: (x, y) => x && y
}

/**
 * Boolean semigroup under disjunction
 * @since 1.0.0
 */
export const semigroupAny: Semigroup<boolean> = {
  concat: (x, y) => x || y
}

/**
 * Use `Monoid`'s `getArrayMonoid` instead
 * @since 1.0.0
 * @deprecated
 */
export const getArraySemigroup = <A = never>(): Semigroup<Array<A>> => {
  return { concat }
}

/**
 * Use `Record`'s `getMonoid`
 * @since 1.4.0
 * @deprecated
 */
export function getDictionarySemigroup<K extends string, A>(S: Semigroup<A>): Semigroup<Record<K, A>>
export function getDictionarySemigroup<A>(S: Semigroup<A>): Semigroup<{ [key: string]: A }>
export function getDictionarySemigroup<A>(S: Semigroup<A>): Semigroup<{ [key: string]: A }> {
  return {
    concat: (x, y) => {
      const r: { [key: string]: A } = { ...x }
      const keys = Object.keys(y)
      const len = keys.length
      for (let i = 0; i < len; i++) {
        const k = keys[i]
        r[k] = x.hasOwnProperty(k) ? S.concat(x[k], y[k]) : y[k]
      }
      return r
    }
  }
}

// tslint:disable-next-line: deprecation
const semigroupAnyDictionary = getDictionarySemigroup(getLastSemigroup())

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
 * @since 1.4.0
 */
export const getObjectSemigroup = <A extends object = never>(): Semigroup<A> => {
  return semigroupAnyDictionary as any
}

/**
 * Number `Semigroup` under addition
 * @since 1.0.0
 */
export const semigroupSum: Semigroup<number> = {
  concat: (x, y) => x + y
}

/**
 * Number `Semigroup` under multiplication
 * @since 1.0.0
 */
export const semigroupProduct: Semigroup<number> = {
  concat: (x, y) => x * y
}

/**
 * @since 1.0.0
 */
export const semigroupString: Semigroup<string> = {
  concat: (x, y) => x + y
}

/**
 * @since 1.0.0
 */
export const semigroupVoid: Semigroup<void> = {
  concat: () => undefined
}
