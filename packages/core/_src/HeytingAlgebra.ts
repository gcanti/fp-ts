/**
 * Heyting algebras are bounded (distributive) lattices that are also equipped with an additional binary operation
 * `implies` (also written as `→`). Heyting algebras also define a complement operation `not` (sometimes written as
 * `¬a`)
 *
 * However, in Heyting algebras this operation is only a pseudo-complement, since Heyting algebras do not necessarily
 * provide the law of the excluded middle. This means that there is no guarantee that `a ∨ ¬a = 1`.
 *
 * Heyting algebras model intuitionistic logic. For a model of classical logic, see the boolean algebra type class
 * implemented as `BooleanAlgebra`.
 *
 * A `HeytingAlgebra` must satisfy the following laws in addition to `BoundedDistributiveLattice` laws:
 *
 * - Implication:
 *   - `a → a <-> 1`
 *   - `a ∧ (a → b) <-> a ∧ b`
 *   - `b ∧ (a → b) <-> b`
 *   - `a → (b ∧ c) <-> (a → b) ∧ (a → c)`
 * - Complemented
 *   - `¬a <-> a → 0`
 *
 * @since 3.0.0
 */
import type { BoundedDistributiveLattice } from '@fp-ts/core/BoundedDistributiveLattice'
import type { Endomorphism } from '@fp-ts/core/Endomorphism'

/**
 * @category model
 * @since 3.0.0
 */
export interface HeytingAlgebra<A> extends BoundedDistributiveLattice<A> {
  readonly implies: (that: A) => (self: A) => A
  readonly not: Endomorphism<A>
}
