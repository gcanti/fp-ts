/**
 * @file This type class is deprecated, please use `Eq` instead.
 */

/**
 * Use `Eq` instead
 * @since 1.0.0
 * @deprecated
 */
export interface Setoid<A> {
  readonly equals: (x: A, y: A) => boolean
}

/**
 * Use `Eq.fromEquals` instead
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
 * Use `Eq.strictEqual` instead
 * @since 1.0.0
 * @deprecated
 */
export const strictEqual = <A>(a: A, b: A): boolean => {
  return a === b
}

// tslint:disable-next-line: deprecation
const setoidStrict = { equals: strictEqual }

/**
 * Use `Eq.eqString` instead
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const setoidString: Setoid<string> = setoidStrict

/**
 * Use `Eq.eqNumber` instead
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const setoidNumber: Setoid<number> = setoidStrict

/**
 * Use `Eq.eqBoolean` instead
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const setoidBoolean: Setoid<boolean> = setoidStrict

/**
 * Use `Array.getMonoid` instead
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const getArraySetoid = <A>(S: Setoid<A>): Setoid<Array<A>> => {
  // tslint:disable-next-line: deprecation
  return fromEquals((xs, ys) => xs.length === ys.length && xs.every((x, i) => S.equals(x, ys[i])))
}

/**
 * Use `Eq.getStructEq` instead
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
 * Use `Eq.getStructEq` instead
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
 * Use `Eq.getTupleEq` instead
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
 * Use `Eq.getTupleEq` instead
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const getProductSetoid = <A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]> => {
  // tslint:disable-next-line: deprecation
  return getTupleSetoid(SA, SB)
}

/**
 * Use `Eq.contramap` instead
 * @since 1.2.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const contramap = <A, B>(f: (b: B) => A, fa: Setoid<A>): Setoid<B> => {
  // tslint:disable-next-line: deprecation
  return fromEquals((x, y) => fa.equals(f(x), f(y)))
}

/**
 * Use `Eq.eqDate` instead
 * @since 1.4.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const setoidDate: Setoid<Date> = contramap(date => date.valueOf(), setoidNumber)
