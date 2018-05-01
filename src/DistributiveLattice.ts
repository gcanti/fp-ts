import { Lattice } from './Lattice'
import { Ord, min, max } from './Ord'

/**
 * A `DistributiveLattice` must satisfy the following laws in addition to `Lattice` laws:
 *
 * - Distributivity for meet: `a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c)`
 * - Distributivity for join: `a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c)`
 *
 * @typeclass
 * @since 1.4.0
 */
export interface DistributiveLattice<A> extends Lattice<A> {}

/**
 * @function
 * @since 1.4.0
 */
export const getMinMaxDistributiveLattice = <A>(O: Ord<A>): DistributiveLattice<A> => {
  const minO = min(O)
  const maxO = max(O)
  return {
    meet: minO,
    join: maxO
  }
}
