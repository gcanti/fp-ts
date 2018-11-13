import { JoinSemilattice } from './JoinSemilattice'

/**
 * A `BoundedJoinSemilattice` must satisfy the following laws in addition to {@link JoinSemilattice} laws:
 *
 * - `a ∨ 0 == a`
 *
 * @typeclass
 * @since 1.4.0
 */
export interface BoundedJoinSemilattice<A> extends JoinSemilattice<A> {
  readonly zero: A
}
