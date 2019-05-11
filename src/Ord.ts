/**
 * @file The `Ord` type class represents types which support comparisons with a _total order_.
 *
 * Instances should satisfy the laws of total orderings:
 *
 * 1. Reflexivity: `S.compare(a, a) <= 0`
 * 2. Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
 * 3. Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`
 *
 * See [Getting started with fp-ts: Ord](https://dev.to/gcanti/getting-started-with-fp-ts-ord-5f1e)
 */
import { Ordering, semigroupOrdering } from './Ordering'
import { Semigroup } from './Semigroup'
import { Eq, eqBoolean, eqNumber, eqString } from './Eq'

/**
 * @since 2.0.0
 */
export interface Ord<A> extends Eq<A> {
  readonly compare: (x: A, y: A) => Ordering
}

// default compare for primitive types
const compare = (x: any, y: any): Ordering => {
  return x < y ? -1 : x > y ? 1 : 0
}

/**
 * @since 2.0.0
 */
export const ordString: Ord<string> = {
  equals: eqString.equals,
  compare
}

/**
 * @since 2.0.0
 */
export const ordNumber: Ord<number> = {
  equals: eqNumber.equals,
  compare
}

/**
 * @since 2.0.0
 */
export const ordBoolean: Ord<boolean> = {
  equals: eqBoolean.equals,
  compare
}

/**
 * @since 2.0.0
 */
export const ordDate: Ord<Date> = contramap(ordNumber, date => date.valueOf())

/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 2.0.0
 */
export function lt<A>(O: Ord<A>): (x: A, y: A) => boolean {
  return (x, y) => O.compare(x, y) === -1
}

/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 2.0.0
 */
export function gt<A>(O: Ord<A>): (x: A, y: A) => boolean {
  return (x, y) => O.compare(x, y) === 1
}

/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 2.0.0
 */
export function leq<A>(O: Ord<A>): (x: A, y: A) => boolean {
  return (x, y) => O.compare(x, y) !== 1
}

/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 2.0.0
 */
export function geq<A>(O: Ord<A>): (x: A, y: A) => boolean {
  return (x, y) => O.compare(x, y) !== -1
}

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
export function min<A>(O: Ord<A>): (x: A, y: A) => A {
  return (x, y) => (O.compare(x, y) === 1 ? y : x)
}

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
export function max<A>(O: Ord<A>): (x: A, y: A) => A {
  return (x, y) => (O.compare(x, y) === -1 ? y : x)
}

/**
 * Clamp a value between a minimum and a maximum
 *
 * @since 2.0.0
 */
export function clamp<A>(O: Ord<A>): (low: A, hi: A) => (x: A) => A {
  const minO = min(O)
  const maxO = max(O)
  return (low, hi) => x => maxO(minO(x, hi), low)
}

/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @since 2.0.0
 */
export function between<A>(O: Ord<A>): (low: A, hi: A) => (x: A) => boolean {
  const lessThanO = lt(O)
  const greaterThanO = gt(O)
  return (low, hi) => x => (lessThanO(x, low) || greaterThanO(x, hi) ? false : true)
}

/**
 * @since 2.0.0
 */
export function fromCompare<A>(compare: (x: A, y: A) => Ordering): Ord<A> {
  const optimizedCompare = (x: A, y: A): Ordering => (x === y ? 0 : compare(x, y))
  return {
    equals: (x, y) => optimizedCompare(x, y) === 0,
    compare: optimizedCompare
  }
}

/**
 * @since 2.0.0
 */
export function contramap<A, B>(O: Ord<A>, f: (b: B) => A): Ord<B> {
  return fromCompare((x, y) => O.compare(f(x), f(y)))
}

/**
 * @since 2.0.0
 */
export function getSemigroup<A = never>(): Semigroup<Ord<A>> {
  return {
    concat: (x, y) => fromCompare((a, b) => semigroupOrdering.concat(x.compare(a, b), y.compare(a, b)))
  }
}

/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple
 *
 * @example
 * import { getTupleOrd, ordString, ordNumber, ordBoolean } from 'fp-ts/lib/Ord'
 *
 * const O = getTupleOrd(ordString, ordNumber, ordBoolean)
 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
 *
 * @since 2.0.0
 */
export function getTupleOrd<T extends Array<Ord<any>>>(
  ...ords: T
): Ord<{ [K in keyof T]: T[K] extends Ord<infer A> ? A : never }> {
  const len = ords.length
  return fromCompare((x, y) => {
    let i = 0
    for (; i < len - 1; i++) {
      const r = ords[i].compare(x[i], y[i])
      if (r !== 0) {
        return r
      }
    }
    return ords[i].compare(x[i], y[i])
  })
}

/**
 * @since 2.0.0
 */
export function getDualOrd<A>(O: Ord<A>): Ord<A> {
  return fromCompare((x, y) => O.compare(y, x))
}
