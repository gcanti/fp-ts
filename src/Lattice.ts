/**
 * A `Lattice` must satisfy the following in addition to `JoinSemilattice` and `MeetSemilattice` laws:
 *
 * - Absorbtion law for meet: `a ∧ (a ∨ b) <-> a`
 * - Absorbtion law for join: `a ∨ (a ∧ b) <-> a`
 *
 * @since 3.0.0
 */
import { JoinSemilattice } from './JoinSemilattice'
import { MeetSemilattice } from './MeetSemilattice'

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Lattice<A> extends JoinSemilattice<A>, MeetSemilattice<A> {}
