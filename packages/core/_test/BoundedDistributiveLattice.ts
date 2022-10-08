import { getMinMaxBoundedDistributiveLattice } from '@fp-ts/core/BoundedDistributiveLattice'
import { pipe } from '@fp-ts/core/Function'
import * as N from '@fp-ts/core/number'
import { deepStrictEqual } from '@fp-ts/core/test/util'

describe('BoundedDistributiveLattice', () => {
  it('getMinMaxBoundedDistributiveLattice', () => {
    const BDL = getMinMaxBoundedDistributiveLattice(N.Ord)(0, 1)
    deepStrictEqual(pipe(0.2, BDL.join(0.4)), 0.4)
    deepStrictEqual(pipe(0.2, BDL.meet(0.4)), 0.2)
    deepStrictEqual(BDL.one, 1)
    deepStrictEqual(BDL.zero, 0)
  })
})
