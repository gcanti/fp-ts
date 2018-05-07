import * as assert from 'assert'
import { sort } from '../src/Array'
import {
  between,
  clamp,
  contramap,
  getDualOrd,
  getProductOrd,
  getSemigroup,
  ordDate,
  ordNumber,
  ordString
} from '../src/Ord'

describe('Ord', () => {
  it('getSemigroup', () => {
    type T = [number, string]
    const tuples: Array<T> = [[2, 'c'], [1, 'b'], [2, 'a'], [1, 'c']]
    const S = getSemigroup<T>()
    const sortByFst = contramap((x: T) => x[0], ordNumber)
    const sortBySnd = contramap((x: T) => x[1], ordString)
    const O1 = S.concat(sortByFst, sortBySnd)
    assert.deepEqual(sort(O1)(tuples), [[1, 'b'], [1, 'c'], [2, 'a'], [2, 'c']])
    const O2 = S.concat(sortBySnd, sortByFst)
    assert.deepEqual(sort(O2)(tuples), [[2, 'a'], [1, 'b'], [1, 'c'], [2, 'c']])
  })

  it('getProductOrd', () => {
    const O = getProductOrd(ordString, ordNumber)
    assert.strictEqual(O.compare(['a', 1], ['b', 2]), -1)
    assert.strictEqual(O.compare(['a', 1], ['a', 2]), -1)
    assert.strictEqual(O.compare(['a', 1], ['a', 1]), 0)
  })

  it('ordNumber', () => {
    assert.strictEqual(ordNumber.compare(1, 2), -1)
    assert.strictEqual(ordNumber.compare(2, 1), 1)
    assert.strictEqual(ordNumber.compare(2, 2), 0)
  })

  it('clamp', () => {
    const clampNumber = clamp(ordNumber)
    assert.strictEqual(clampNumber(1, 10)(2), 2)
    assert.strictEqual(clampNumber(1, 10)(10), 10)
    assert.strictEqual(clampNumber(1, 10)(20), 10)
    assert.strictEqual(clampNumber(1, 10)(1), 1)
    assert.strictEqual(clampNumber(1, 10)(-10), 1)
  })

  it('between', () => {
    const betweenNumber = between(ordNumber)
    assert.strictEqual(betweenNumber(1, 10)(2), true)
    assert.strictEqual(betweenNumber(1, 10)(10), true)
    assert.strictEqual(betweenNumber(1, 10)(20), false)
    assert.strictEqual(betweenNumber(1, 10)(1), true)
    assert.strictEqual(betweenNumber(1, 10)(-10), false)
  })

  it('getDualOrd', () => {
    const O = getDualOrd(ordNumber)
    assert.strictEqual(O.compare(1, 2), 1)
    assert.strictEqual(O.compare(2, 1), -1)
    assert.strictEqual(O.compare(2, 2), 0)
  })

  it('ordDate', () => {
    assert.strictEqual(ordDate.compare(new Date(0), new Date(0)), 0)
    assert.strictEqual(ordDate.compare(new Date(0), new Date(1)), -1)
    assert.strictEqual(ordDate.compare(new Date(1), new Date(0)), 1)
  })
})
