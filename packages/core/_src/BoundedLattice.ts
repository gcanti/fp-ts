/**
 * A `BoundedLattice` must satisfy the following in addition to `BoundedMeetSemilattice` and `BoundedJoinSemilattice` laws:
 *
 * - Absorption law for meet: `a ∧ (a ∨ b) <-> a`
 * - Absorption law for join: `a ∨ (a ∧ b) <-> a`
 *
 * @since 3.0.0
 */
import type { BoundedJoinSemilattice } from '@fp-ts/core/BoundedJoinSemilattice'
import type { BoundedMeetSemilattice } from '@fp-ts/core/BoundedMeetSemilattice'

/**
 * @category model
 * @since 3.0.0
 */
export interface BoundedLattice<A> extends BoundedJoinSemilattice<A>, BoundedMeetSemilattice<A> {}
