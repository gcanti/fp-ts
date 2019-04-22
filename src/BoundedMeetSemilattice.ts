/**
 * @file A `BoundedMeetSemilattice` must satisfy the following laws in addition to `MeetSemilattice` laws:
 *
 * - `a ∧ 1 = a`
 */
import { MeetSemilattice } from './MeetSemilattice'

/**
 * @since 2.0.0
 */
export interface BoundedMeetSemilattice<A> extends MeetSemilattice<A> {
  readonly one: A
}
