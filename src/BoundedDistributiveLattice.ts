/**
 * @file A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive
 */
import { BoundedLattice } from './BoundedLattice'
import { DistributiveLattice, getMinMaxDistributiveLattice } from './DistributiveLattice'
import { Ord } from './Ord'

/**
 * @since 2.0.0
 */
export interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}

/**
 * @since 2.0.0
 */
export function getMinMaxBoundedDistributiveLattice<A>(O: Ord<A>): (min: A, max: A) => BoundedDistributiveLattice<A> {
  return (min, max) => ({
    ...getMinMaxDistributiveLattice(O),
    zero: min,
    one: max
  })
}
