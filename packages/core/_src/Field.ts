/**
 * @since 3.0.0
 */
import type { Eq } from '@fp-ts/core/Eq'
import type { Ring } from '@fp-ts/core/Ring'

/**
 * @category model
 * @since 3.0.0
 */
export interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (that: A) => (self: A) => A
  readonly mod: (that: A) => (self: A) => A
}

/**
 * The *greatest common divisor* of two values.
 *
 * @since 3.0.0
 */
export const gcd = <A>(E: Eq<A>, F: Field<A>): ((that: A) => (self: A) => A) => {
  const predicate = E.equals(F.zero)
  const f = (that: A) => (self: A): A => predicate(that) ? self : f(F.mod(that)(self))(that)
  return f
}

/**
 * The *least common multiple* of two values.
 *
 * @since 3.0.0
 */
export const lcm = <A>(E: Eq<A>, F: Field<A>): ((that: A) => (self: A) => A) => {
  const zero = F.zero
  const predicate = E.equals(zero)
  const gcdSF = gcd(E, F)
  return (that) => (self) => predicate(self) || predicate(that) ? zero : F.div(gcdSF(that)(self))(F.mul(that)(self))
}
