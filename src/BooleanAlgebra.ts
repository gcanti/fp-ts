/**
 * Boolean algebras are Heyting algebras with the additional constraint that the law of the excluded middle is true
 * (equivalently, double-negation is true).
 *
 * Instances should satisfy the following laws in addition to the `HeytingAlgebra` laws:
 *
 * - Excluded middle: `a ∨ ¬a <-> 1`
 *
 * Boolean algebras generalize classical logic: one is equivalent to "true" and zero is equivalent to "false".
 *
 * @since 3.0.0
 */
import { HeytingAlgebra } from './HeytingAlgebra'

/**
 * @category type classes
 * @since 3.0.0
 */
export interface BooleanAlgebra<A> extends HeytingAlgebra<A> {}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFunctionBooleanAlgebra = <BA>(BA: BooleanAlgebra<BA>) => <A = never>(): BooleanAlgebra<
  (a: A) => BA
> => ({
  meet: (second) => (first) => (a) => BA.meet(second(a))(first(a)),
  join: (second) => (first) => (a) => BA.join(second(a))(first(a)),
  zero: () => BA.zero,
  one: () => BA.one,
  implies: (second) => (first) => (a) => BA.implies(second(a))(first(a)),
  not: (x) => (a) => BA.not(x(a))
})

/**
 * Every boolean algebras has a dual algebra, which involves reversing one/zero as well as join/meet.
 *
 * @category combinators
 * @since 3.0.0
 */
export const getDual = <A>(BA: BooleanAlgebra<A>): BooleanAlgebra<A> => ({
  meet: BA.join,
  join: BA.meet,
  zero: BA.one,
  one: BA.zero,
  implies: (second) => (first) => BA.join(second)(BA.not(first)),
  not: BA.not
})
