/**
 * A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive
 *
 * @since 3.0.0
 */
import type { BoundedLattice } from './BoundedLattice'
import * as DistributiveLatticeModule from './DistributiveLattice'
import type { Ord } from './Ord'

import DistributiveLattice = DistributiveLatticeModule.DistributiveLattice

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const getMinMaxBoundedDistributiveLattice = <A>(
  O: Ord<A>
): ((min: A, max: A) => BoundedDistributiveLattice<A>) => {
  const L = DistributiveLatticeModule.getMinMaxDistributiveLattice(O)
  return (min, max) => ({
    join: L.join,
    meet: L.meet,
    zero: min,
    one: max
  })
}
