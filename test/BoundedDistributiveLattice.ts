import * as assert from 'assert'
import { getMinMaxBoundedDistributiveLattice } from '../src/BoundedDistributiveLattice'
import { ordNumber } from '../src/Ord'

describe('BoundedDistributiveLattice', () => {
  it('getMinMaxBoundedDistributiveLattice', () => {
    const BDL = getMinMaxBoundedDistributiveLattice(ordNumber)(0, 1)
    assert.strictEqual(BDL.join(0.2, 0.4), 0.4)
    assert.strictEqual(BDL.meet(0.2, 0.4), 0.2)
    assert.strictEqual(BDL.one, 1)
    assert.strictEqual(BDL.zero, 0)
  })
})
