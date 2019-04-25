import * as assert from 'assert'
import { filter } from '../src/Array'
import { boundedNumber } from '../src/Bounded'
import {
  fold,
  getArrayMonoid,
  getEndomorphismMonoid,
  getFunctionMonoid,
  getJoinMonoid,
  getMeetMonoid,
  getTupleMonoid,
  monoidAll,
  monoidAny,
  monoidString,
  monoidSum
} from '../src/Monoid'

describe('Monoid', () => {
  it('getTupleMonoid', () => {
    const M1 = getTupleMonoid(monoidString, monoidSum)
    assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
    const M2 = getTupleMonoid(monoidString, monoidSum, monoidAll)
    assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
  })

  it('fold', () => {
    assert.strictEqual(fold(monoidSum)([1, 2, 3]), 6)
  })

  it('getFunctionMonoid', () => {
    const getPredicateMonoidAll = getFunctionMonoid(monoidAll)
    const getPredicateMonoidAny = getFunctionMonoid(monoidAny)

    const isLessThan10 = (n: number) => n <= 10
    const isEven = (n: number) => n % 2 === 0

    assert.deepStrictEqual(filter([1, 2, 3, 40], fold(getPredicateMonoidAll<number>())([isLessThan10, isEven])), [2])
    assert.deepStrictEqual(filter([1, 2, 3, 40, 41], fold(getPredicateMonoidAny<number>())([isLessThan10, isEven])), [
      1,
      2,
      3,
      40
    ])
  })

  it('getArrayMonoid', () => {
    assert.deepStrictEqual(getArrayMonoid<number>().concat([1], [2]), [1, 2])
  })

  it('getEndomorphismMonoid', () => {
    const M = getEndomorphismMonoid<number>()
    const double = (n: number) => n * 2
    const inc = (n: number) => n + 1
    const f = M.concat(double, inc)
    assert.strictEqual(f(3), 8)
  })

  it('getMeetMonoid', () => {
    const M = getMeetMonoid(boundedNumber)
    assert.deepStrictEqual(fold(M)([]), +Infinity)
    assert.deepStrictEqual(fold(M)([1]), 1)
    assert.deepStrictEqual(fold(M)([1, -1]), -1)
  })

  it('getJoinMonoid', () => {
    const M = getJoinMonoid(boundedNumber)
    assert.deepStrictEqual(fold(M)([]), -Infinity)
    assert.deepStrictEqual(fold(M)([1]), 1)
    assert.deepStrictEqual(fold(M)([1, -1]), 1)
  })
})
