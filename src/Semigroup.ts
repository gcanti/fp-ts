import { Ord, max, min } from './Ord'
import { concat, identity } from './function'

/**
 * @typeclass
 * @since 1.0.0
 */
export interface Semigroup<A> {
  readonly concat: (x: A, y: A) => A
}

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
 * @since 1.0.0
 */
export const getProductSemigroup = <A, B>(SA: Semigroup<A>, SB: Semigroup<B>): Semigroup<[A, B]> => {
  return {
    concat: ([xa, xb], [ya, yb]) => [SA.concat(xa, ya), SB.concat(xb, yb)]
  }
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
 * @since 1.0.0
 */
export const getRecordSemigroup = <O extends { [key: string]: any }>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O> => {
  return {
    concat: (x, y) => {
      const r: any = {}
      const keys = Object.keys(semigroups)
      for (const key of keys) {
        r[key] = semigroups[key].concat(x[key], y[key])
      }
      return r
    }
  }
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
 * Semigroup under array concatenation
 *
 * @since 1.0.0
 */
export const getArraySemigroup = <A = never>(): Semigroup<Array<A>> => {
  return {
    concat: (x, y) => concat(x, y)
  }
}

/**
 * Gets {@link Semigroup} instance for dictionaries given {@link Semigroup} instance for their values
 *
 * @example
 * import { getDictionarySemigroup, semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getDictionarySemigroup(semigroupSum)
 * assert.deepEqual(S.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
 *
 *
 * @since 1.4.0
 */
export const getDictionarySemigroup = <A>(S: Semigroup<A>): Semigroup<{ [key: string]: A }> => {
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

const semigroupAnyDictionary = getDictionarySemigroup(getLastSemigroup())

/**
 * Gets {@link Semigroup} instance for objects of given type preserving their type
 *
 * @example
 * import { getObjectSemigroup } from 'fp-ts/lib/Semigroup'
 *
 * const S = getObjectSemigroup<{ foo: number }>()
 * assert.deepEqual(S.concat({ foo: 123 }, { foo: 456 }), { foo: 456 })
 *
 *
 * @since 1.4.0
 */
export const getObjectSemigroup = <A extends object = never>(): Semigroup<A> => {
  return semigroupAnyDictionary as any
}

/**
 * Number Semigroup under addition
 * @since 1.0.0
 */
export const semigroupSum: Semigroup<number> = {
  concat: (x, y) => x + y
}

/**
 * Number Semigroup under multiplication
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
