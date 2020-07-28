/**
 * The `Ring` class is for types that support addition, multiplication, and subtraction operations.
 *
 * Instances must satisfy the following law in addition to the `Semiring` laws:
 *
 * - Additive inverse: `a - a <-> (zero - a) + a <-> zero`
 *
 * Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Ring.purs
 *
 * @since 2.0.0
 */
import { Semiring, getFunctionSemiring } from './Semiring'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Ring<A> extends Semiring<A> {
  readonly sub: (x: A, y: A) => A
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getFunctionRing<A, B>(ring: Ring<B>): Ring<(a: A) => B> {
  const S = getFunctionSemiring<A, B>(ring)
  return {
    add: S.add,
    mul: S.mul,
    one: S.one,
    zero: S.zero,
    sub: (f, g) => (x) => ring.sub(f(x), g(x))
  }
}

/**
 * `negate x` can be used as a shorthand for `zero - x`
 *
 * @since 2.0.0
 */
export function negate<A>(ring: Ring<A>): (a: A) => A {
  return (a) => ring.sub(ring.zero, a)
}

/**
 * Given a tuple of `Ring`s returns a `Ring` for the tuple
 *
 * @example
 * import { getTupleRing } from 'fp-ts/Ring'
 * import { fieldNumber } from 'fp-ts/Field'
 *
 * const R = getTupleRing(fieldNumber, fieldNumber, fieldNumber)
 * assert.deepStrictEqual(R.add([1, 2, 3], [4, 5, 6]), [5, 7, 9])
 * assert.deepStrictEqual(R.mul([1, 2, 3], [4, 5, 6]), [4, 10, 18])
 * assert.deepStrictEqual(R.one, [1, 1, 1])
 * assert.deepStrictEqual(R.sub([1, 2, 3], [4, 5, 6]), [-3, -3, -3])
 * assert.deepStrictEqual(R.zero, [0, 0, 0])
 *
 * @category instances
 * @since 2.0.0
 */
export function getTupleRing<T extends ReadonlyArray<Ring<any>>>(
  ...rings: T
): Ring<{ [K in keyof T]: T[K] extends Ring<infer A> ? A : never }> {
  return {
    add: (x: any, y: any) => rings.map((R, i) => R.add(x[i], y[i])),
    zero: rings.map((R) => R.zero),
    mul: (x: any, y: any) => rings.map((R, i) => R.mul(x[i], y[i])),
    one: rings.map((R) => R.one),
    sub: (x: any, y: any) => rings.map((R, i) => R.sub(x[i], y[i]))
  } as any
}
