import * as B from '../src/boolean'
import { increment } from '../src/function'
import * as _ from '../src/Monoid'
import * as N from '../src/number'
import * as S from '../src/string'
import * as U from './util'

describe('Monoid', () => {
  it('tuple', () => {
    const M1 = _.tuple(S.Monoid, N.MonoidSum)
    U.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
    const M2 = _.tuple(S.Monoid, N.MonoidSum, B.MonoidAll)
    U.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
  })

  it('concatAll', () => {
    U.deepStrictEqual(_.concatAll(N.MonoidSum)([1, 2, 3]), 6)
  })

  it('getEndomorphismMonoid', () => {
    // tslint:disable-next-line: deprecation
    const M = _.getEndomorphismMonoid<number>()
    const f = M.concat(U.double, increment)
    U.deepStrictEqual(f(3), 8)
  })

  it('min', () => {
    const M = _.min(N.Bounded)
    U.deepStrictEqual(_.concatAll(M)([]), +Infinity)
    U.deepStrictEqual(_.concatAll(M)([1]), 1)
    U.deepStrictEqual(_.concatAll(M)([1, -1]), -1)
  })

  it('max', () => {
    const M = _.max(N.Bounded)
    U.deepStrictEqual(_.concatAll(M)([]), -Infinity)
    U.deepStrictEqual(_.concatAll(M)([1]), 1)
    U.deepStrictEqual(_.concatAll(M)([1, -1]), 1)
  })

  it('reverse', () => {
    const M = _.reverse(S.Monoid)
    U.deepStrictEqual(M.concat('a', 'b'), 'ba')
    U.deepStrictEqual(M.concat('a', M.empty), 'a')
    U.deepStrictEqual(M.concat(M.empty, 'a'), 'a')
  })

  it('getStructMonoid', () => {
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.getStructMonoid({ a: S.Monoid }).empty, { a: '' })

    // should ignore non own properties
    const monoids1 = Object.create({ a: 1 })
    // tslint:disable-next-line: deprecation
    const s = _.getStructMonoid(monoids1)
    U.deepStrictEqual(s.empty, {})
  })
})
