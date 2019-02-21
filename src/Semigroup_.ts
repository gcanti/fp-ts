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
 * @since 1.14.0
 */
export const getTupleSemigroup = <A, B>(SA: Semigroup<A>, SB: Semigroup<B>): Semigroup<[A, B]> => {
  return {
    concat: ([xa, xb], [ya, yb]) => [SA.concat(xa, ya), SB.concat(xb, yb)]
  }
}

/**
 * Use {@link getTupleSemigroup} instead
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
 * Use {@link getStructSemigroup} instead
 * @since 1.0.0
 * @deprecated
 */
export const getRecordSemigroup = <O extends { [key: string]: any }>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O> => {
  return getStructSemigroup(semigroups)
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
 * Use {@link Monoid}'s `getArrayMonoid` instead
 * @since 1.0.0
 * @deprecated
 */
export const getArraySemigroup = <A = never>(): Semigroup<Array<A>> => {
  return { concat }
}

/**
 * Use {@link Record}'s `getMonoid`
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
 * Returns a {@link Semigroup} instance for objects preserving their type
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
