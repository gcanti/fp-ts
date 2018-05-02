import { MeetSemilattice } from './MeetSemilattice'

/**
 * A `BoundedMeetSemilattice` must satisfy the following laws in addition to `MeetSemilattice` laws:
 *
 * - `a ∧ 1 = a`
 *
 * @typeclass
 * @since 1.4.0
 */
export interface BoundedMeetSemilattice<A> extends MeetSemilattice<A> {
  one: A
}
