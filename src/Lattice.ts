import { JoinSemilattice } from './JoinSemilattice'
import { MeetSemilattice } from './MeetSemilattice'

/**
 * A `Lattice` must satisfy the following in addition to {@link JoinSemilattice} and {@link MeetSemilattice} laws:
 *
 * - Absorbtion law for meet: `a ∧ (a ∨ b) == a`
 * - Absorbtion law for join: `a ∨ (a ∧ b) == a`
 *
 * @typeclass
 * @since 1.4.0
 */
export interface Lattice<A> extends JoinSemilattice<A>, MeetSemilattice<A> {}
