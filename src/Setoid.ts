/**
 * The `Setoid` type class represents types which support decidable equality.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Reflexivity: `S.equals(a, a) === true`
 * 2. Symmetry: `S.equals(a, b) === S.equals(b, a)`
 * 3. Transitivity: if `S.equals(a, b) === true` and `S.equals(b, c) === true`, then `S.equals(a, c) === true`
 *
 * @typeclass
 * @since 1.0.0
 */
export interface Setoid<A> {
  readonly equals: (x: A, y: A) => boolean
}

/**
 * @since 1.14.0
 */
export const fromEquals = <A>(equals: (x: A, y: A) => boolean): Setoid<A> => {
  return {
    equals: (x, y) => x === y || equals(x, y)
  }
}

/**
 * @since 1.0.0
 */
export const strictEqual = <A>(a: A, b: A): boolean => {
  return a === b
}

const setoidStrict = { equals: strictEqual }

/**
 * @since 1.0.0
 */
export const setoidString: Setoid<string> = setoidStrict

/**
 * @since 1.0.0
 */
export const setoidNumber: Setoid<number> = setoidStrict

/**
 * @since 1.0.0
 */
export const setoidBoolean: Setoid<boolean> = setoidStrict

/**
 * @since 1.0.0
 */
export const getArraySetoid = <A>(S: Setoid<A>): Setoid<Array<A>> => {
  return fromEquals((xs, ys) => xs.length === ys.length && xs.every((x, i) => S.equals(x, ys[i])))
}

/**
 * @since 1.14.2
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
 * Use {@link getStructSetoid} instead
 * @since 1.0.0
 * @deprecated
 */
export const getRecordSetoid = <O extends { [key: string]: any }>(
  setoids: { [K in keyof O]: Setoid<O[K]> }
): Setoid<O> => {
  return getStructSetoid(setoids)
}

/**
 * @since 1.14.2
 */
export const getTupleSetoid = <A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]> => {
  return fromEquals((a, b) => SA.equals(a[0], b[0]) && SB.equals(a[1], b[1]))
}

/**
 * Use {@link getTupleSetoid} instead
 * @since 1.0.0
 * @deprecated
 */
export const getProductSetoid = <A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]> => {
  return getTupleSetoid(SA, SB)
}

/**
 * Returns the `Setoid` corresponding to the partitions of `B` induced by `f`
 *
 * @since 1.2.0
 */
export const contramap = <A, B>(f: (b: B) => A, fa: Setoid<A>): Setoid<B> => {
  return fromEquals((x, y) => fa.equals(f(x), f(y)))
}

/**
 * @since 1.4.0
 */
export const setoidDate: Setoid<Date> = contramap(date => date.valueOf(), setoidNumber)
