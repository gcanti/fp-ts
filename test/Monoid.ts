import * as assert from 'assert'
import * as B from '../src/boolean'
import { fold, getDualMonoid, getEndomorphismMonoid, getJoinMonoid, getMeetMonoid, getTupleMonoid } from '../src/Monoid'
import * as N from '../src/number'
import * as S from '../src/string'

describe('Monoid', () => {
  it('getTupleMonoid', () => {
    const M1 = getTupleMonoid(S.Monoid, N.MonoidSum)
    assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
    const M2 = getTupleMonoid(S.Monoid, N.MonoidSum, B.MonoidAll)
    assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
  })

  it('fold', () => {
    assert.deepStrictEqual(fold(N.MonoidSum)([1, 2, 3]), 6)
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
    const M = getMeetMonoid(N.Bounded)
    assert.deepStrictEqual(fold(M)([]), +Infinity)
    assert.deepStrictEqual(fold(M)([1]), 1)
    assert.deepStrictEqual(fold(M)([1, -1]), -1)
  })

  it('getJoinMonoid', () => {
    const M = getJoinMonoid(N.Bounded)
    assert.deepStrictEqual(fold(M)([]), -Infinity)
    assert.deepStrictEqual(fold(M)([1]), 1)
    assert.deepStrictEqual(fold(M)([1, -1]), 1)
  })

  it('getDualMonoid', () => {
    const M = getDualMonoid(S.Monoid)
    assert.deepStrictEqual(M.concat('a', 'b'), 'ba')
    assert.deepStrictEqual(M.concat('a', M.empty), 'a')
    assert.deepStrictEqual(M.concat(M.empty, 'a'), 'a')
  })
})
