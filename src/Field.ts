/**
 * @since 3.0.0
 */
import type { Ring } from './Ring'
import type { Eq } from './Eq'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (second: A) => (self: A) => A
  readonly mod: (second: A) => (self: A) => A
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * The *greatest common divisor* of two values.
 *
 * @since 3.0.0
 */
export const gcd = <A>(E: Eq<A>, F: Field<A>): ((second: A) => (self: A) => A) => {
  const predicate = E.equals(F.zero)
  const f =
    (second: A) =>
    (self: A): A =>
      predicate(second) ? self : f(F.mod(second)(self))(second)
  return f
}

/**
 * The *least common multiple* of two values.
 *
 * @since 3.0.0
 */
export const lcm = <A>(E: Eq<A>, F: Field<A>): ((second: A) => (self: A) => A) => {
  const zero = F.zero
  const predicate = E.equals(zero)
  const gcdSF = gcd(E, F)
  return (second) => (first) =>
    predicate(first) || predicate(second) ? zero : F.div(gcdSF(second)(first))(F.mul(second)(first))
}
