import * as assert from 'assert'
import { fieldNumber } from '../src/Field'
import { getProductRing, negate, getFunctionRing } from '../src/Ring'

describe('Ring', () => {
  it('getProductRing', () => {
    const R = getProductRing(fieldNumber, fieldNumber)
    assert.deepEqual(R.add([1, 2], [3, 4]), [4, 6])
    assert.deepEqual(R.mul([1, 2], [3, 4]), [3, 8])
    assert.deepEqual(R.one, [1, 1])
    assert.deepEqual(R.sub([1, 2], [3, 4]), [-2, -2])
    assert.deepEqual(R.zero, [0, 0])
  })

  it('negate', () => {
    assert.strictEqual(negate(fieldNumber)(1), -1)
  })

  it('getFunctionRing', () => {
    const R = getFunctionRing<string, number>(fieldNumber)
    const f1 = (s: string): number => s.length
    const f2 = (s: string): number => s.indexOf('a')
    assert.strictEqual(R.sub(f1, f2)('foo'), 4)
    assert.strictEqual(R.sub(f1, f2)('fooa'), 1)
  })
})
