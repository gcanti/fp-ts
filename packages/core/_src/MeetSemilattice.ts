/**
 * A meet-semilattice (or lower semilattice) is a semilattice whose operation is called `meet`, and which can be thought
 * of as a greatest lower bound.
 *
 * A `MeetSemilattice` must satisfy the following laws:
 *
 * - Associativity: `a ∧ (b ∧ c) <-> (a ∧ b) ∧ c`
 * - Commutativity: `a ∧ b <-> b ∧ a`
 * - Idempotency:   `a ∧ a <-> a`
 *
 * @since 3.0.0
 */

/**
 * @category model
 * @since 3.0.0
 */
export interface MeetSemilattice<A> {
  readonly meet: (that: A) => (self: A) => A
}
