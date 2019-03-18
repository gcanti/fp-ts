import * as assert from 'assert'
import { fieldNumber } from '../src/Field'
import { getProductRing, negate, getFunctionRing, getTupleRing } from '../src/Ring'

describe('Ring', () => {
  it('getTupleRing', () => {
    const R = getTupleRing(fieldNumber, fieldNumber, fieldNumber)
    assert.deepStrictEqual(R.add([1, 2, 3], [4, 5, 6]), [5, 7, 9])
    assert.deepStrictEqual(R.mul([1, 2, 3], [4, 5, 6]), [4, 10, 18])
    assert.deepStrictEqual(R.one, [1, 1, 1])
    assert.deepStrictEqual(R.sub([1, 2, 3], [4, 5, 6]), [-3, -3, -3])
    assert.deepStrictEqual(R.zero, [0, 0, 0])
  })

  it('getProductRing', () => {
    // tslint:disable-next-line: deprecation
    const R = getProductRing(fieldNumber, fieldNumber)
    assert.deepStrictEqual(R.add([1, 2], [3, 4]), [4, 6])
    assert.deepStrictEqual(R.mul([1, 2], [3, 4]), [3, 8])
    assert.deepStrictEqual(R.one, [1, 1])
    assert.deepStrictEqual(R.sub([1, 2], [3, 4]), [-2, -2])
    assert.deepStrictEqual(R.zero, [0, 0])
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
