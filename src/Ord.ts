import { Ordering, semigroupOrdering } from './Ordering'
import { Semigroup } from './Semigroup_'
import { Setoid, setoidBoolean, setoidNumber, setoidString } from './Setoid'
import { on } from './function'

/**
 * The `Ord` type class represents types which support comparisons with a _total order_.
 *
 * Instances should satisfy the laws of total orderings:
 *
 * 1. Reflexivity: `S.compare(a, a) <= 0`
 * 2. Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
 * 3. Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`
 *
 * @typeclass
 * @since 1.0.0
 */
export interface Ord<A> extends Setoid<A> {
  readonly compare: (x: A, y: A) => Ordering
}

/**
 * @since 1.0.0
 */
export const unsafeCompare = (x: any, y: any): Ordering => {
  return x < y ? -1 : x > y ? 1 : 0
}

/**
 * @since 1.0.0
 */
export const ordString: Ord<string> = {
  ...setoidString,
  compare: unsafeCompare
}

/**
 * @since 1.0.0
 */
export const ordNumber: Ord<number> = {
  ...setoidNumber,
  compare: unsafeCompare
}

/**
 * @since 1.0.0
 */
export const ordBoolean: Ord<boolean> = {
  ...setoidBoolean,
  compare: unsafeCompare
}

/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 1.0.0
 */
export const lessThan = <A>(O: Ord<A>) => (x: A, y: A): boolean => {
  return O.compare(x, y) === -1
}

/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 1.0.0
 */
export const greaterThan = <A>(O: Ord<A>) => (x: A, y: A): boolean => {
  return O.compare(x, y) === 1
}

/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 1.0.0
 */
export const lessThanOrEq = <A>(O: Ord<A>) => (x: A, y: A): boolean => {
  return O.compare(x, y) !== 1
}

/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 1.0.0
 */
export const greaterThanOrEq = <A>(O: Ord<A>) => (x: A, y: A): boolean => {
  return O.compare(x, y) !== -1
}

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 1.0.0
 */
export const min = <A>(O: Ord<A>) => (x: A, y: A): A => {
  return O.compare(x, y) === 1 ? y : x
}

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 1.0.0
 */
export const max = <A>(O: Ord<A>) => (x: A, y: A): A => {
  return O.compare(x, y) === -1 ? y : x
}

/**
 * Clamp a value between a minimum and a maximum
 *
 * @since 1.0.0
 */
export const clamp = <A>(O: Ord<A>): ((low: A, hi: A) => (x: A) => A) => {
  const minO = min(O)
  const maxO = max(O)
  return (low, hi) => x => maxO(minO(x, hi), low)
}

/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @since 1.0.0
 */
export const between = <A>(O: Ord<A>): ((low: A, hi: A) => (x: A) => boolean) => {
  const lessThanO = lessThan(O)
  const greaterThanO = greaterThan(O)
  return (low, hi) => x => (lessThanO(x, low) || greaterThanO(x, hi) ? false : true)
}

/**
 * @since 1.0.0
 */
export const fromCompare = <A>(compare: (x: A, y: A) => Ordering): Ord<A> => {
  const optimizedCompare = (x: A, y: A): Ordering => (x === y ? 0 : compare(x, y))
  return {
    equals: (x, y) => optimizedCompare(x, y) === 0,
    compare: optimizedCompare
  }
}

/**
 * @since 1.0.0
 */
export const contramap = <A, B>(f: (b: B) => A, fa: Ord<A>): Ord<B> => {
  return fromCompare(on(fa.compare)(f))
}

/**
 * @since 1.0.0
 */
export const getSemigroup = <A = never>(): Semigroup<Ord<A>> => {
  return {
    concat: (x, y) => fromCompare((a, b) => semigroupOrdering.concat(x.compare(a, b), y.compare(a, b)))
  }
}

/**
 * @since 1.0.0
 */
export const getProductOrd = <A, B>(OA: Ord<A>, OB: Ord<B>): Ord<[A, B]> => {
  return fromCompare(([xa, xb], [ya, yb]) => {
    const r = OA.compare(xa, ya)
    return r === 0 ? OB.compare(xb, yb) : r
  })
}

/**
 * @since 1.3.0
 */
export const getDualOrd = <A>(O: Ord<A>): Ord<A> => {
  return fromCompare((x, y) => O.compare(y, x))
}

/**
 * @since 1.4.0
 */
export const ordDate: Ord<Date> = contramap(date => date.valueOf(), ordNumber)
