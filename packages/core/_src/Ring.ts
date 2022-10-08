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
import type { Endomorphism } from '@fp-ts/core/Endomorphism'
import type { Semiring } from '@fp-ts/core/Semiring'

/**
 * @category model
 * @since 3.0.0
 */
export interface Ring<A> extends Semiring<A> {
  readonly sub: (that: A) => (self: A) => A
}

/**
 * Given a tuple of `Ring`s returns a `Ring` for the tuple
 *
 * @example
 * import { tuple } from '@fp-ts/core/Ring'
 * import * as N from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const R = tuple(N.Field, N.Field, N.Field)
 * assert.deepStrictEqual(pipe([1, 2, 3], R.add([4, 5, 6])), [5, 7, 9])
 * assert.deepStrictEqual(pipe([1, 2, 3], R.mul([4, 5, 6])), [4, 10, 18])
 * assert.deepStrictEqual(R.one, [1, 1, 1])
 * assert.deepStrictEqual(pipe([1, 2, 3], R.sub([4, 5, 6])), [-3, -3, -3])
 * assert.deepStrictEqual(R.zero, [0, 0, 0])
 *
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...rings: { [K in keyof A]: Ring<A[K]> }
): Ring<Readonly<A>> => ({
  add: (that: any) => (self: any) => rings.map((R, i) => R.add(that[i])(self[i])),
  zero: rings.map((R) => R.zero),
  mul: (that: any) => (self: any) => rings.map((R, i) => R.mul(that[i])(self[i])),
  one: rings.map((R) => R.one),
  sub: (that: any) => (self: any) => rings.map((R, i) => R.sub(that[i])(self[i]))
} as any)

/**
 * `negate x` can be used as a shorthand for `zero - x`
 *
 * @since 3.0.0
 */
export const negate = <A>(ring: Ring<A>): Endomorphism<A> => (a) => ring.sub(a)(ring.zero)
