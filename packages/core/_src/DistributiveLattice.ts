/**
 * A `DistributiveLattice` must satisfy the following laws in addition to `Lattice` laws:
 *
 * - Distributivity for meet: `a ∨ (b ∧ c) <-> (a ∨ b) ∧ (a ∨ c)`
 * - Distributivity for join: `a ∧ (b ∨ c) <-> (a ∧ b) ∨ (a ∧ c)`
 *
 * @since 3.0.0
 */
import type { Lattice } from '@fp-ts/core/Lattice'
import type { Ord } from '@fp-ts/core/Ord'
import * as ord from '@fp-ts/core/Ord'

/**
 * @category model
 * @since 3.0.0
 */
export interface DistributiveLattice<A> extends Lattice<A> {}

/**
 * @category constructors
 * @since 3.0.0
 */
export const getMinMaxDistributiveLattice = <A>(O: Ord<A>): DistributiveLattice<A> => ({
  meet: ord.min(O),
  join: ord.max(O)
})
