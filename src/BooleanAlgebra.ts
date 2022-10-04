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
import type { HeytingAlgebra } from './HeytingAlgebra'

/**
 * @category model
 * @since 3.0.0
 */
export interface BooleanAlgebra<A> extends HeytingAlgebra<A> {}

/**
 * Every boolean algebras has a dual algebra, which involves reversing one/zero as well as join/meet.
 *
 * @since 3.0.0
 */
export const reverse = <A>(BA: BooleanAlgebra<A>): BooleanAlgebra<A> => ({
  meet: BA.join,
  join: BA.meet,
  zero: BA.one,
  one: BA.zero,
  implies: (that) => (self) => BA.join(that)(BA.not(self)),
  not: BA.not
})
