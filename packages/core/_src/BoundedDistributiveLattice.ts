/**
 * A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive
 *
 * @since 3.0.0
 */
import type { BoundedLattice } from '@fp-ts/core/BoundedLattice'
import type { DistributiveLattice } from '@fp-ts/core/DistributiveLattice'
import * as distributiveLattice from '@fp-ts/core/DistributiveLattice'
import type { Ord } from '@fp-ts/core/Ord'

/**
 * @category model
 * @since 3.0.0
 */
export interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}

/**
 * @since 3.0.0
 */
export const getMinMaxBoundedDistributiveLattice = <A>(
  O: Ord<A>
): ((min: A, max: A) => BoundedDistributiveLattice<A>) => {
  const L = distributiveLattice.getMinMaxDistributiveLattice(O)
  return (min, max) => ({
    join: L.join,
    meet: L.meet,
    zero: min,
    one: max
  })
}
