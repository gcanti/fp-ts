/**
 * The `Ring` class is for types that support addition, multiplication, and subtraction operations.
 *
 * Instances must satisfy the following law in addition to the `Semiring` laws:
 *
 * - Additive inverse: `a - a <-> (zero - a) + a <-> zero`
 *
 * Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Ring.purs
 *
 * @since 3.0.0
 */
import { Endomorphism } from './function'
import { Semiring, getFunctionSemiring } from './Semiring'

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Ring<A> extends Semiring<A> {
  readonly sub: (second: A) => (first: A) => A
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getFunctionRing = <B, A>(ring: Ring<B>): Ring<(a: A) => B> => {
  const S = getFunctionSemiring<B, A>(ring)
  return {
    add: S.add,
    mul: S.mul,
    one: S.one,
    zero: S.zero,
    sub: (second) => (first) => (x) => ring.sub(second(x))(first(x))
  }
}

/**
 * `negate x` can be used as a shorthand for `zero - x`
 *
 * @since 3.0.0
 */
export const negate = <A>(ring: Ring<A>): Endomorphism<A> => (a) => ring.sub(a)(ring.zero)

/**
 * Given a tuple of `Ring`s returns a `Ring` for the tuple
 *
 * @example
 * import { getTupleRing } from 'fp-ts/Ring'
 * import { fieldNumber } from 'fp-ts/Field'
 * import { pipe } from 'fp-ts/function'
 *
 * const R = getTupleRing(fieldNumber, fieldNumber, fieldNumber)
 * assert.deepStrictEqual(pipe([1, 2, 3], R.add([4, 5, 6])), [5, 7, 9])
 * assert.deepStrictEqual(pipe([1, 2, 3], R.mul([4, 5, 6])), [4, 10, 18])
 * assert.deepStrictEqual(R.one, [1, 1, 1])
 * assert.deepStrictEqual(pipe([1, 2, 3], R.sub([4, 5, 6])), [-3, -3, -3])
 * assert.deepStrictEqual(R.zero, [0, 0, 0])
 *
 * @category instances
 * @since 3.0.0
 */
export const getTupleRing = <A extends ReadonlyArray<unknown>>(...rings: { [K in keyof A]: Ring<A[K]> }): Ring<A> =>
  ({
    add: (second: any) => (first: any) => rings.map((R, i) => R.add(second[i])(first[i])),
    zero: rings.map((R) => R.zero),
    mul: (second: any) => (first: any) => rings.map((R, i) => R.mul(second[i])(first[i])),
    one: rings.map((R) => R.one),
    sub: (second: any) => (first: any) => rings.map((R, i) => R.sub(second[i])(first[i]))
  } as any)
