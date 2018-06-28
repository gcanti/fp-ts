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
 * @function
 * @since 1.0.0
 */
export const fold = <A>(S: Semigroup<A>) => (a: A) => (as: Array<A>): A => {
  return as.reduce(S.concat, a)
}

/**
 * @function
 * @since 1.0.0
 */
export const getFirstSemigroup = <A = never>(): Semigroup<A> => {
  return { concat: identity }
}

/**
 * @function
 * @since 1.0.0
 */
export const getLastSemigroup = <A = never>(): Semigroup<A> => {
  return { concat: (_, y) => y }
}

/**
 * @function
 * @since 1.0.0
 */
export const getProductSemigroup = <A, B>(SA: Semigroup<A>, SB: Semigroup<B>): Semigroup<[A, B]> => {
  return {
    concat: ([xa, xb], [ya, yb]) => [SA.concat(xa, ya), SB.concat(xb, yb)]
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const getDualSemigroup = <A>(S: Semigroup<A>): Semigroup<A> => {
  return {
    concat: (x, y) => S.concat(y, x)
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const getFunctionSemigroup = <S>(S: Semigroup<S>) => <A = never>(): Semigroup<(a: A) => S> => {
  return {
    concat: (f, g) => a => S.concat(f(a), g(a))
  }
}

/**
 * @function
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
 * @function
 * @since 1.0.0
 */
export const getMeetSemigroup = <A>(O: Ord<A>): Semigroup<A> => {
  return {
    concat: min(O)
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const getJoinSemigroup = <A>(O: Ord<A>): Semigroup<A> => {
  return {
    concat: max(O)
  }
}

/**
 * Boolean semigroup under conjunction
 * @instance
 * @since 1.0.0
 */
export const semigroupAll: Semigroup<boolean> = {
  concat: (x, y) => x && y
}

/**
 * Boolean semigroup under disjunction
 * @instance
 * @since 1.0.0
 */
export const semigroupAny: Semigroup<boolean> = {
  concat: (x, y) => x || y
}

/**
 * Semigroup under array concatenation
 * @function
 * @since 1.0.0
 */
export const getArraySemigroup = <A = never>(): Semigroup<Array<A>> => {
  return {
    concat: (x, y) => concat(x, y)
  }
}

/**
 * Gets {@link Semigroup} instance for dictionaries given {@link Semigroup} instance for their values
 * @function
 * @since 1.4.0
 * @example
 * const S = getDictionarySemigroup(semigroupSum)
 * const result = S.concat({ foo: 123 }, { foo: 456 }) // { foo: 123 + 456 }
 * @param S - {@link Semigroup} instance for dictionary values
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
 * @function
 * @since 1.4.0
 * @example
 * const S = getObjectSemigroup<{ foo: number }>()
 * const result = S.concat({ foo: 123 }, { foo: 456 }) // { foo: 456 }
 */
export const getObjectSemigroup = <A extends object = never>(): Semigroup<A> => semigroupAnyDictionary as any

/**
 * Number Semigroup under addition
 * @instance
 * @since 1.0.0
 */
export const semigroupSum: Semigroup<number> = {
  concat: (x, y) => x + y
}

/**
 * Number Semigroup under multiplication
 * @instance
 * @since 1.0.0
 */
export const semigroupProduct: Semigroup<number> = {
  concat: (x, y) => x * y
}

/**
 * @instance
 * @since 1.0.0
 */
export const semigroupString: Semigroup<string> = {
  concat: (x, y) => x + y
}

/**
 * @instance
 * @since 1.0.0
 */
export const semigroupVoid: Semigroup<void> = {
  concat: () => undefined
}
