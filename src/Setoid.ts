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
 * @since 2.0.0
 */
export interface Setoid<A> {
  readonly equals: (x: A, y: A) => boolean
}

/**
 * @since 2.0.0
 */
export const fromEquals = <A>(equals: (x: A, y: A) => boolean): Setoid<A> => {
  return {
    equals: (x, y) => x === y || equals(x, y)
  }
}

/**
 * @since 2.0.0
 */
export const strictEqual = <A>(a: A, b: A): boolean => {
  return a === b
}

const setoidStrict = { equals: strictEqual }

/**
 * @since 2.0.0
 */
export const setoidString: Setoid<string> = setoidStrict

/**
 * @since 2.0.0
 */
export const setoidNumber: Setoid<number> = setoidStrict

/**
 * @since 2.0.0
 */
export const setoidBoolean: Setoid<boolean> = setoidStrict

/**
 * @since 2.0.0
 */
export const getArraySetoid = <A>(S: Setoid<A>): Setoid<Array<A>> => {
  return fromEquals((xs, ys) => xs.length === ys.length && xs.every((x, i) => S.equals(x, ys[i])))
}

/**
 * @since 2.0.0
 */
export const getStructSetoid = <O extends { [key: string]: any }>(
  setoids: { [K in keyof O]: Setoid<O[K]> }
): Setoid<O> => {
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
 * @since 2.0.0
 */
export const getTupleSetoid = <T extends Array<Setoid<any>>>(
  ...setoids: T
): Setoid<{ [K in keyof T]: T[K] extends Setoid<infer A> ? A : never }> => {
  return fromEquals((x, y) => setoids.every((S, i) => S.equals(x[i], y[i])))
}

/**
 * Returns the `Setoid` corresponding to the partitions of `B` induced by `f`
 *
 * @since 2.0.0
 */
export const contramap = <A, B>(S: Setoid<A>, f: (b: B) => A): Setoid<B> => {
  return fromEquals((x, y) => S.equals(f(x), f(y)))
}

/**
 * @since 2.0.0
 */
export const setoidDate: Setoid<Date> = contramap(setoidNumber, date => date.valueOf())
