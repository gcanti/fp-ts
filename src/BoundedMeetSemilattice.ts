import { MeetSemilattice } from './MeetSemilattice'

/**
 * A `BoundedMeetSemilattice` must satisfy the following laws in addition to `MeetSemilattice` laws:
 *
 * - Top (Unitary Element): `a ∧ 1 = a, forall a`
 *
 * @typeclass
 * @since 1.4.0
 */
export interface BoundedMeetSemilattice<A> extends MeetSemilattice<A> {
  one: A
}
