import * as assert from 'assert'
import { sort } from '../src/Array'
import {
  between,
  clamp,
  contramap,
  getDualOrd,
  getSemigroup,
  ordDate,
  ordNumber,
  ordString,
  leq,
  geq,
  fromCompare,
  getTupleOrd,
  ordBoolean
} from '../src/Ord'

describe('Ord', () => {
  it('getTupleOrd', () => {
    const O = getTupleOrd(ordString, ordNumber, ordBoolean)
    assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
    assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
    assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
  })

  it('getSemigroup', () => {
    type T = [number, string]
    const tuples: Array<T> = [[2, 'c'], [1, 'b'], [2, 'a'], [1, 'c']]
    const S = getSemigroup<T>()
    const sortByFst = contramap(ordNumber, (x: T) => x[0])
    const sortBySnd = contramap(ordString, (x: T) => x[1])
    const O1 = S.concat(sortByFst, sortBySnd)
    assert.deepStrictEqual(sort(O1)(tuples), [[1, 'b'], [1, 'c'], [2, 'a'], [2, 'c']])
    const O2 = S.concat(sortBySnd, sortByFst)
    assert.deepStrictEqual(sort(O2)(tuples), [[2, 'a'], [1, 'b'], [1, 'c'], [2, 'c']])
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

  it('leq', () => {
    assert.strictEqual(leq(ordNumber)(0, 1), true)
    assert.strictEqual(leq(ordNumber)(1, 1), true)
    assert.strictEqual(leq(ordNumber)(2, 1), false)
  })

  it('greaterThanOrEq', () => {
    assert.strictEqual(geq(ordNumber)(0, 1), false)
    assert.strictEqual(geq(ordNumber)(1, 1), true)
    assert.strictEqual(geq(ordNumber)(2, 1), true)
  })

  it('fromCompare', () => {
    const O1 = fromCompare(ordNumber.compare)
    assert.strictEqual(O1.equals(0, 1), false)
    assert.strictEqual(O1.equals(1, 1), true)
    interface A {
      x: number
    }
    let nbCall = 0
    const O2 = fromCompare<A>((a, b) => {
      nbCall += 1
      return ordNumber.compare(a.x, b.x)
    })
    const a1 = { x: 1 }
    const a2 = { x: 1 }
    assert.strictEqual(O2.equals(a1, a1), true)
    assert.strictEqual(nbCall, 0)
    assert.strictEqual(O2.equals(a1, a2), true)
    assert.strictEqual(nbCall, 1)
    assert.strictEqual(O2.compare(a1, a1), 0)
    assert.strictEqual(nbCall, 1)
    assert.strictEqual(O2.compare(a1, a2), 0)
    assert.strictEqual(nbCall, 2)
  })
})
