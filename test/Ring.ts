import * as assert from 'assert'
import { fieldNumber } from '../src/Field'
import { negate, getFunctionRing, getTupleRing } from '../src/Ring'
import { pipe } from '../src/function'

describe('Ring', () => {
  it('getTupleRing', () => {
    const R = getTupleRing(fieldNumber, fieldNumber, fieldNumber)
    assert.deepStrictEqual(pipe([1, 2, 3], R.add([4, 5, 6])), [5, 7, 9])
    assert.deepStrictEqual(pipe([1, 2, 3], R.mul([4, 5, 6])), [4, 10, 18])
    assert.deepStrictEqual(R.one, [1, 1, 1])
    assert.deepStrictEqual(pipe([1, 2, 3], R.sub([4, 5, 6])), [-3, -3, -3])
    assert.deepStrictEqual(R.zero, [0, 0, 0])
  })

  it('negate', () => {
    assert.deepStrictEqual(negate(fieldNumber)(1), -1)
  })

  it('getFunctionRing', () => {
    const R = getFunctionRing<string, number>(fieldNumber)
    const f1 = (s: string): number => s.length
    const f2 = (s: string): number => s.indexOf('a')
    assert.deepStrictEqual(pipe(f1, R.sub(f2))('foo'), 4)
    assert.deepStrictEqual(pipe(f1, R.sub(f2))('fooa'), 1)
  })
})
