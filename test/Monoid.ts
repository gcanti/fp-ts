import * as B from '../src/boolean'
import { concatAll, getEndomorphismMonoid, tuple, max, min, reverse } from '../src/Monoid'
import * as N from '../src/number'
import * as S from '../src/string'
import * as U from './util'

describe('Monoid', () => {
  it('tuple', () => {
    const M1 = tuple(S.Monoid, N.MonoidSum)
    U.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
    const M2 = tuple(S.Monoid, N.MonoidSum, B.MonoidAll)
    U.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
  })

  it('concatAll', () => {
    U.deepStrictEqual(concatAll(N.MonoidSum)([1, 2, 3]), 6)
  })

  it('getEndomorphismMonoid', () => {
    // tslint:disable-next-line: deprecation
    const M = getEndomorphismMonoid<number>()
    const double = (n: number) => n * 2
    const inc = (n: number) => n + 1
    const f = M.concat(double, inc)
    U.deepStrictEqual(f(3), 8)
  })

  it('min', () => {
    const M = min(N.Bounded)
    U.deepStrictEqual(concatAll(M)([]), +Infinity)
    U.deepStrictEqual(concatAll(M)([1]), 1)
    U.deepStrictEqual(concatAll(M)([1, -1]), -1)
  })

  it('max', () => {
    const M = max(N.Bounded)
    U.deepStrictEqual(concatAll(M)([]), -Infinity)
    U.deepStrictEqual(concatAll(M)([1]), 1)
    U.deepStrictEqual(concatAll(M)([1, -1]), 1)
  })

  it('reverse', () => {
    const M = reverse(S.Monoid)
    U.deepStrictEqual(M.concat('a', 'b'), 'ba')
    U.deepStrictEqual(M.concat('a', M.empty), 'a')
    U.deepStrictEqual(M.concat(M.empty, 'a'), 'a')
  })
})
