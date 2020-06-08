/**
 * A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive
 *
 * @since 2.0.0
 */
import { BoundedLattice } from './BoundedLattice'
import { DistributiveLattice, getMinMaxDistributiveLattice } from './DistributiveLattice'
import { Ord } from './Ord'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}

/**
 * @category instances
 * @since 2.0.0
 */
export function getMinMaxBoundedDistributiveLattice<A>(O: Ord<A>): (min: A, max: A) => BoundedDistributiveLattice<A> {
  const L = getMinMaxDistributiveLattice(O)
  return (min, max) => ({
    join: L.join,
    meet: L.meet,
    zero: min,
    one: max
  })
}
