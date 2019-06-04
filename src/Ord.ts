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
import { on } from './function'

/**
 * @since 1.0.0
 */
export interface Ord<A> extends Eq<A> {
  readonly compare: (x: A, y: A) => Ordering
}

/**
 * @since 1.0.0
 * @deprecated
 */
export const unsafeCompare = (x: any, y: any): Ordering => {
  return x < y ? -1 : x > y ? 1 : 0
}

/**
 * @since 1.0.0
 */
export const ordString: Ord<string> = {
  ...eqString,
  // tslint:disable-next-line: deprecation
  compare: unsafeCompare
}

/**
 * @since 1.0.0
 */
export const ordNumber: Ord<number> = {
  ...eqNumber,
  // tslint:disable-next-line: deprecation
  compare: unsafeCompare
}

/**
 * @since 1.0.0
 */
export const ordBoolean: Ord<boolean> = {
  ...eqBoolean,
  // tslint:disable-next-line: deprecation
  compare: unsafeCompare
}

/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 1.19.0
 */
export const lt = <A>(O: Ord<A>) => (x: A, y: A): boolean => {
  return O.compare(x, y) === -1
}

/**
 * Use `lt`
 *
 * @since 1.0.0
 * @deprecated
 */
export const lessThan: <A>(O: Ord<A>) => (x: A, y: A) => boolean = lt

/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 1.19.0
 */
export const gt = <A>(O: Ord<A>) => (x: A, y: A): boolean => {
  return O.compare(x, y) === 1
}

/**
 * Use `gt`
 *
 * @since 1.0.0
 * @deprecated
 */
export const greaterThan: <A>(O: Ord<A>) => (x: A, y: A) => boolean = gt

/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 1.19.0
 */
export const leq = <A>(O: Ord<A>) => (x: A, y: A): boolean => {
  return O.compare(x, y) !== 1
}

/**
 * Use `leq`
 *
 * @since 1.0.0
 * @deprecated
 */
export const lessThanOrEq: <A>(O: Ord<A>) => (x: A, y: A) => boolean = leq

/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 1.19.0
 */
export const geq = <A>(O: Ord<A>) => (x: A, y: A): boolean => {
  return O.compare(x, y) !== -1
}

/**
 * Use `geq`
 *
 * @since 1.0.0
 * @deprecated
 */
export const greaterThanOrEq: <A>(O: Ord<A>) => (x: A, y: A) => boolean = geq

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
  const lessThanO = lt(O)
  const greaterThanO = gt(O)
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

function _contramap<A, B>(f: (b: B) => A, O: Ord<A>): Ord<B> {
  return fromCompare(on(O.compare)(f))
}

/**
 * @since 1.0.0
 */
export function contramap<A, B>(O: Ord<A>, f: (b: B) => A): Ord<B>
/** @deprecated */
export function contramap<A, B>(f: (b: B) => A, O: Ord<A>): Ord<B>
export function contramap(...args: Array<any>): any {
  return typeof args[0] === 'function' ? _contramap(args[0], args[1]) : _contramap(args[1], args[0])
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
 * @since 1.14.3
 */
export const getTupleOrd = <T extends Array<Ord<any>>>(
  ...ords: T
): Ord<{ [K in keyof T]: T[K] extends Ord<infer A> ? A : never }> => {
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
 * Use `getTupleOrd` instead
 * @since 1.0.0
 * @deprecated
 */
export const getProductOrd = <A, B>(OA: Ord<A>, OB: Ord<B>): Ord<[A, B]> => {
  return getTupleOrd(OA, OB)
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
export const ordDate: Ord<Date> = contramap(ordNumber, date => date.valueOf())
