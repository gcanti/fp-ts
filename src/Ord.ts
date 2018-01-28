import { Ordering, semigroupOrdering, sign } from './Ordering'
import { Setoid, setoidBoolean, setoidNumber, setoidString, getProductSetoid } from './Setoid'
import { Semigroup } from './Semigroup'
import { on } from './function'

/** @typeclass */
export interface Ord<A> extends Setoid<A> {
  compare: (x: A, y: A) => Ordering
}

/** @function */
export const toNativeComparator = <A>(compare: (x: A, y: A) => Ordering): ((x: A, y: A) => number) => {
  return (x, y) => sign(compare(x, y))
}

/** @function */
export const unsafeCompare = (x: any, y: any): Ordering => {
  return x < y ? -1 : x > y ? 1 : 0
}

/** @instance */
export const ordString: Ord<string> = {
  ...setoidString,
  compare: unsafeCompare
}

/** @instance */
export const ordNumber: Ord<number> = {
  ...setoidNumber,
  compare: unsafeCompare
}

/** @instance */
export const ordBoolean: Ord<boolean> = {
  ...setoidBoolean,
  compare: unsafeCompare
}

/**
 * Test whether one value is _strictly less than_ another
 * @function
 */
export const lessThan = <A>(ord: Ord<A>) => (x: A) => (y: A): boolean => {
  return ord.compare(x, y) === -1
}

/**
 * Test whether one value is _strictly greater than_ another
 * @function
 */
export const greaterThan = <A>(ord: Ord<A>) => (x: A) => (y: A): boolean => {
  return ord.compare(x, y) === 1
}

/**
 * Test whether one value is _non-strictly less than_ another
 * @function
 */
export const lessThanOrEq = <A>(ord: Ord<A>) => (x: A) => (y: A): boolean => {
  return ord.compare(x, y) !== 1
}

/**
 * Test whether one value is _non-strictly greater than_ another
 * @function
 */
export const greaterThanOrEq = <A>(ord: Ord<A>) => (x: A) => (y: A): boolean => {
  return ord.compare(x, y) !== -1
}

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 * @function
 */
export const min = <A>(ord: Ord<A>) => (x: A) => (y: A): A => {
  return ord.compare(x, y) === 1 ? y : x
}

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 * @function
 */
export const max = <A>(ord: Ord<A>) => (x: A) => (y: A): A => {
  return ord.compare(x, y) === -1 ? y : x
}

/**
 * Clamp a value between a minimum and a maximum
 * @function
 */
export const clamp = <A>(ord: Ord<A>) => (low: A) => (hi: A) => (x: A): A => {
  return min(ord)(hi)(max(ord)(low)(x))
}

/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 * @function
 */
export const between = <A>(ord: Ord<A>) => (low: A) => (hi: A) => (x: A): boolean => {
  return lessThan(ord)(x)(low) || greaterThan(ord)(x)(hi) ? false : true
}

/** @function */
export const fromCompare = <A>(compare: (x: A, y: A) => Ordering): Ord<A> => {
  return {
    equals: (x, y) => compare(x, y) === 0,
    compare
  }
}

/** @function */
export const contramap = <A, B>(f: (b: B) => A, fa: Ord<A>): Ord<B> => {
  return fromCompare(on(fa.compare)(f))
}

/** @function */
export const getSemigroup = <A>(): Semigroup<Ord<A>> => {
  return {
    concat: x => y => fromCompare((a, b) => semigroupOrdering.concat(x.compare(a, b))(y.compare(a, b)))
  }
}

/** @function */
export const getProductOrd = <A, B>(OA: Ord<A>, OB: Ord<B>): Ord<[A, B]> => {
  const S = getProductSetoid(OA, OB)
  return {
    ...S,
    compare: ([xa, xb], [ya, yb]) => {
      const r = OA.compare(xa, ya)
      return r === 0 ? OB.compare(xb, yb) : r
    }
  }
}
