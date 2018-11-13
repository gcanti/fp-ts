import { BoundedJoinSemilattice } from './BoundedJoinSemilattice'
import { BoundedMeetSemilattice } from './BoundedMeetSemilattice'

/**
 * A `BoundedLattice` must satisfy the following in addition to {@link BoundedMeetSemilattice} and {@link BoundedJoinSemilattice} laws:
 *
 * - Absorbtion law for meet: `a ∧ (a ∨ b) == a`
 * - Absorbtion law for join: `a ∨ (a ∧ b) == a`
 *
 * @typeclass
 * @since 1.4.0
 */
export interface BoundedLattice<A> extends BoundedJoinSemilattice<A>, BoundedMeetSemilattice<A> {}
