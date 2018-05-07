import * as assert from 'assert'
import { fieldNumber } from '../src/Field'
import { getProductRing } from '../src/Ring'

describe('Ring', () => {
  it('getProductRing', () => {
    const ring = getProductRing(fieldNumber, fieldNumber)
    assert.deepEqual(ring.add([1, 2], [3, 4]), [4, 6])
    assert.deepEqual(ring.mul([1, 2], [3, 4]), [3, 8])
    assert.deepEqual(ring.one, [1, 1])
    assert.deepEqual(ring.sub([1, 2], [3, 4]), [-2, -2])
    assert.deepEqual(ring.zero, [0, 0])
  })
})
