/**
 * @file The `Ring` class is for types that support addition, multiplication, and subtraction operations.
 *
 * Instances must satisfy the following law in addition to the `Semiring` laws:
 *
 * - Additive inverse: `a - a = (zero - a) + a = zero`
 *
 * Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Ring.purs
 */
import { Semiring, getFunctionSemiring } from './Semiring'

/**
 * @since 1.0.0
 */
export interface Ring<A> extends Semiring<A> {
  readonly sub: (x: A, y: A) => A
}

/**
 * @since 1.0.0
 */
export const getFunctionRing = <A, B>(ring: Ring<B>): Ring<(a: A) => B> => {
  return {
    ...getFunctionSemiring(ring),
    sub: (f, g) => x => ring.sub(f(x), g(x))
  }
}

/**
 * `negate x` can be used as a shorthand for `zero - x`
 *
 * @since 1.0.0
 */
export const negate = <A>(ring: Ring<A>) => (a: A): A => {
  return ring.sub(ring.zero, a)
}

/**
 * @since 1.14.3
 */
export const getTupleRing = <A, B>(RA: Ring<A>, RB: Ring<B>): Ring<[A, B]> => {
  return {
    add: ([a1, b1], [a2, b2]) => [RA.add(a1, a2), RB.add(b1, b2)],
    zero: [RA.zero, RB.zero],
    mul: ([a1, b1], [a2, b2]) => [RA.mul(a1, a2), RB.mul(b1, b2)],
    one: [RA.one, RB.one],
    sub: ([a1, b1], [a2, b2]) => [RA.sub(a1, a2), RB.sub(b1, b2)]
  }
}

/**
 * Use `getTupleRing` instead
 * @since 1.0.0
 * @deprecated
 */
export const getProductRing = <A, B>(RA: Ring<A>, RB: Ring<B>): Ring<[A, B]> => {
  return getTupleRing(RA, RB)
}
