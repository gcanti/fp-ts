/**
 * A `Lattice` must satisfy the following in addition to `JoinSemilattice` and `MeetSemilattice` laws:
 *
 * - Absorbtion law for meet: `a ∧ (a ∨ b) <-> a`
 * - Absorbtion law for join: `a ∨ (a ∧ b) <-> a`
 *
 * @since 3.0.0
 */
import type { JoinSemilattice } from './JoinSemilattice'
import type { MeetSemilattice } from './MeetSemilattice'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Lattice<A> extends JoinSemilattice<A>, MeetSemilattice<A> {}
