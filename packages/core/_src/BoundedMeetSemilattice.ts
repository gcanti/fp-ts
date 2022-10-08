/**
 * A `BoundedMeetSemilattice` must satisfy the following laws in addition to `MeetSemilattice` laws:
 *
 * - `a ∧ 1 <-> a`
 *
 * @since 3.0.0
 */
import type { MeetSemilattice } from '@fp-ts/core/MeetSemilattice'

/**
 * @category model
 * @since 3.0.0
 */
export interface BoundedMeetSemilattice<A> extends MeetSemilattice<A> {
  readonly one: A
}
