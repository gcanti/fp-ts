/**
 * A `DistributiveLattice` must satisfy the following laws in addition to `Lattice` laws:
 *
 * - Distributivity for meet: `a ∨ (b ∧ c) <-> (a ∨ b) ∧ (a ∨ c)`
 * - Distributivity for join: `a ∧ (b ∨ c) <-> (a ∧ b) ∨ (a ∧ c)`
 *
 * @since 2.0.0
 */
import { Lattice } from './Lattice'
import { Ord, max, min } from './Ord'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface DistributiveLattice<A> extends Lattice<A> {}

/**
 * @category instances
 * @since 2.0.0
 */
export function getMinMaxDistributiveLattice<A>(O: Ord<A>): DistributiveLattice<A> {
  return {
    meet: min(O),
    join: max(O)
  }
}
