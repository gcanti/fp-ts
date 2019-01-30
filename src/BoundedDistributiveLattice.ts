import { BoundedLattice } from './BoundedLattice'
import { DistributiveLattice, getMinMaxDistributiveLattice } from './DistributiveLattice'
import { Ord } from './Ord'

/**
 * A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive
 *
 * @typeclass
 * @since 1.4.0
 */
export interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}

/**
 * @since 1.4.0
 */
export const getMinMaxBoundedDistributiveLattice = <A>(O: Ord<A>) => (
  min: A,
  max: A
): BoundedDistributiveLattice<A> => {
  return {
    ...getMinMaxDistributiveLattice(O),
    zero: min,
    one: max
  }
}
