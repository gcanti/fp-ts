/**
 * @file The `Setoid` type class represents types which support decidable equality.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Reflexivity: `S.equals(a, a) === true`
 * 2. Symmetry: `S.equals(a, b) === S.equals(b, a)`
 * 3. Transitivity: if `S.equals(a, b) === true` and `S.equals(b, c) === true`, then `S.equals(a, c) === true`
 *
 * See [Getting started with fp-ts: Setoid](https://dev.to/gcanti/getting-started-with-fp-ts-setoid-39f3)
 */

/**
 * @since 1.0.0
 * @deprecated
 */
export interface Setoid<A> {
  readonly equals: (x: A, y: A) => boolean
}

/**
 * @since 1.14.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const fromEquals = <A>(equals: (x: A, y: A) => boolean): Setoid<A> => {
  return {
    equals: (x, y) => x === y || equals(x, y)
  }
}

/**
 * @since 1.0.0
 * @deprecated
 */
export const strictEqual = <A>(a: A, b: A): boolean => {
  return a === b
}

// tslint:disable-next-line: deprecation
const setoidStrict = { equals: strictEqual }

/**
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const setoidString: Setoid<string> = setoidStrict

/**
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const setoidNumber: Setoid<number> = setoidStrict

/**
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const setoidBoolean: Setoid<boolean> = setoidStrict

/**
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const getArraySetoid = <A>(S: Setoid<A>): Setoid<Array<A>> => {
  // tslint:disable-next-line: deprecation
  return fromEquals((xs, ys) => xs.length === ys.length && xs.every((x, i) => S.equals(x, ys[i])))
}

/**
 * @since 1.14.2
 * @deprecated
 */
export const getStructSetoid = <O extends { [key: string]: any }>(
  // tslint:disable-next-line: deprecation
  setoids: { [K in keyof O]: Setoid<O[K]> }
  // tslint:disable-next-line: deprecation
): Setoid<O> => {
  // tslint:disable-next-line: deprecation
  return fromEquals((x, y) => {
    for (const k in setoids) {
      if (!setoids[k].equals(x[k], y[k])) {
        return false
      }
    }
    return true
  })
}

/**
 * Use `getStructSetoid` instead
 * @since 1.0.0
 * @deprecated
 */
export const getRecordSetoid = <O extends { [key: string]: any }>(
  // tslint:disable-next-line: deprecation
  setoids: { [K in keyof O]: Setoid<O[K]> }
  // tslint:disable-next-line: deprecation
): Setoid<O> => {
  // tslint:disable-next-line: deprecation
  return getStructSetoid(setoids)
}

/**
 * Given a tuple of `Setoid`s returns a `Setoid` for the tuple
 *
 * @example
 * import { getTupleSetoid, setoidString, setoidNumber, setoidBoolean } from 'fp-ts/lib/Setoid'
 *
 * const S = getTupleSetoid(setoidString, setoidNumber, setoidBoolean)
 * assert.strictEqual(S.equals(['a', 1, true], ['a', 1, true]), true)
 * assert.strictEqual(S.equals(['a', 1, true], ['b', 1, true]), false)
 * assert.strictEqual(S.equals(['a', 1, true], ['a', 2, true]), false)
 * assert.strictEqual(S.equals(['a', 1, true], ['a', 1, false]), false)
 *
 * @since 1.14.2
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const getTupleSetoid = <T extends Array<Setoid<any>>>(
  ...setoids: T
): // tslint:disable-next-line: deprecation
Setoid<{ [K in keyof T]: T[K] extends Setoid<infer A> ? A : never }> => {
  // tslint:disable-next-line: deprecation
  return fromEquals((x, y) => setoids.every((S, i) => S.equals(x[i], y[i])))
}

/**
 * Use `getTupleSetoid` instead
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const getProductSetoid = <A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]> => {
  // tslint:disable-next-line: deprecation
  return getTupleSetoid(SA, SB)
}

/**
 * Returns the `Setoid` corresponding to the partitions of `B` induced by `f`
 *
 * @since 1.2.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const contramap = <A, B>(f: (b: B) => A, fa: Setoid<A>): Setoid<B> => {
  // tslint:disable-next-line: deprecation
  return fromEquals((x, y) => fa.equals(f(x), f(y)))
}

/**
 * @since 1.4.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const setoidDate: Setoid<Date> = contramap(date => date.valueOf(), setoidNumber)
