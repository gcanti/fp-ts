import * as U from './util'
import * as B from '../src/boolean'
import { fold, getDualMonoid, getEndomorphismMonoid, getJoinMonoid, getMeetMonoid, getTupleMonoid } from '../src/Monoid'
import * as N from '../src/number'
import * as S from '../src/string'

describe('Monoid', () => {
  it('getTupleMonoid', () => {
    const M1 = getTupleMonoid(S.Monoid, N.MonoidSum)
    U.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
    const M2 = getTupleMonoid(S.Monoid, N.MonoidSum, B.MonoidAll)
    U.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
  })

  it('fold', () => {
    U.deepStrictEqual(fold(N.MonoidSum)([1, 2, 3]), 6)
  })

  it('getEndomorphismMonoid', () => {
    // tslint:disable-next-line: deprecation
    const M = getEndomorphismMonoid<number>()
    const double = (n: number) => n * 2
    const inc = (n: number) => n + 1
    const f = M.concat(double, inc)
    U.deepStrictEqual(f(3), 8)
  })

  it('getMeetMonoid', () => {
    const M = getMeetMonoid(N.Bounded)
    U.deepStrictEqual(fold(M)([]), +Infinity)
    U.deepStrictEqual(fold(M)([1]), 1)
    U.deepStrictEqual(fold(M)([1, -1]), -1)
  })

  it('getJoinMonoid', () => {
    const M = getJoinMonoid(N.Bounded)
    U.deepStrictEqual(fold(M)([]), -Infinity)
    U.deepStrictEqual(fold(M)([1]), 1)
    U.deepStrictEqual(fold(M)([1, -1]), 1)
  })

  it('getDualMonoid', () => {
    const M = getDualMonoid(S.Monoid)
    U.deepStrictEqual(M.concat('a', 'b'), 'ba')
    U.deepStrictEqual(M.concat('a', M.empty), 'a')
    U.deepStrictEqual(M.concat(M.empty, 'a'), 'a')
  })
})
