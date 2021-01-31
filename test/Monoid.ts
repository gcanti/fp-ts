import * as assert from 'assert'
import * as B from '../src/boolean'
import { boundedNumber } from '../src/Bounded'
import {
  fold,
  getDualMonoid,
  getEndomorphismMonoid,
  getJoinMonoid,
  getMeetMonoid,
  getTupleMonoid,
  monoidString,
  monoidSum
} from '../src/Monoid'

describe('Monoid', () => {
  it('getTupleMonoid', () => {
    const M1 = getTupleMonoid(monoidString, monoidSum)
    assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
    const M2 = getTupleMonoid(monoidString, monoidSum, B.MonoidAll)
    assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
  })

  it('fold', () => {
    assert.deepStrictEqual(fold(monoidSum)([1, 2, 3]), 6)
  })

  it('getEndomorphismMonoid', () => {
    // tslint:disable-next-line: deprecation
    const M = getEndomorphismMonoid<number>()
    const double = (n: number) => n * 2
    const inc = (n: number) => n + 1
    const f = M.concat(double, inc)
    assert.deepStrictEqual(f(3), 8)
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

  it('getDualMonoid', () => {
    const M = getDualMonoid(monoidString)
    assert.deepStrictEqual(M.concat('a', 'b'), 'ba')
    assert.deepStrictEqual(M.concat('a', M.empty), 'a')
    assert.deepStrictEqual(M.concat(M.empty, 'a'), 'a')
  })
})
