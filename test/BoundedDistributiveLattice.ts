import * as assert from 'assert'
import { getMinMaxBoundedDistributiveLattice } from '../src/BoundedDistributiveLattice'
import { ordNumber } from '../src/Ord'

describe('BoundedDistributiveLattice', () => {
  it('getMinMaxBoundedDistributiveLattice', () => {
    const BDL = getMinMaxBoundedDistributiveLattice(ordNumber)(0, 1)
    assert.deepStrictEqual(BDL.join(0.2, 0.4), 0.4)
    assert.deepStrictEqual(BDL.meet(0.2, 0.4), 0.2)
    assert.deepStrictEqual(BDL.one, 1)
    assert.deepStrictEqual(BDL.zero, 0)
  })
})
