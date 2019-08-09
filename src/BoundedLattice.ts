/**
 * @file A `BoundedLattice` must satisfy the following in addition to `BoundedMeetSemilattice` and `BoundedJoinSemilattice` laws:
 *
 * - Absorption law for meet: `a ∧ (a ∨ b) == a`
 * - Absorption law for join: `a ∨ (a ∧ b) == a`
 */
import { BoundedJoinSemilattice } from './BoundedJoinSemilattice'
import { BoundedMeetSemilattice } from './BoundedMeetSemilattice'

/**
 * @since 2.0.0
 */
export interface BoundedLattice<A> extends BoundedJoinSemilattice<A>, BoundedMeetSemilattice<A> {}
