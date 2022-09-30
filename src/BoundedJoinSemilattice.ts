/**
 * A `BoundedJoinSemilattice` must satisfy the following laws in addition to `JoinSemilattice` laws:
 *
 * - `a ∨ 0 <-> a`
 *
 * @since 3.0.0
 */
import type { JoinSemilattice } from './JoinSemilattice'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface BoundedJoinSemilattice<A> extends JoinSemilattice<A> {
  readonly zero: A
}
