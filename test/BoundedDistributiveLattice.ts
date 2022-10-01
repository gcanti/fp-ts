import { getMinMaxBoundedDistributiveLattice } from '../src/BoundedDistributiveLattice'
import { pipe } from '../src/f'
import * as N from '../src/number'
import { deepStrictEqual } from './util'

describe('BoundedDistributiveLattice', () => {
  it('getMinMaxBoundedDistributiveLattice', () => {
    const BDL = getMinMaxBoundedDistributiveLattice(N.Ord)(0, 1)
    deepStrictEqual(pipe(0.2, BDL.join(0.4)), 0.4)
    deepStrictEqual(pipe(0.2, BDL.meet(0.4)), 0.2)
    deepStrictEqual(BDL.one, 1)
    deepStrictEqual(BDL.zero, 0)
  })
})
