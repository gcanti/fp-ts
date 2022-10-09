import * as N from '../src/number'
import { pipe } from '../src/Function'
import * as _ from '../src/Monoid'
import * as U from './util'
import * as B from '../src/boolean'
import * as S from '../src/string'

describe('Monoid', () => {
  it('tuple', () => {
    const M1 = _.tuple(S.Monoid, N.MonoidSum)
    U.deepStrictEqual(pipe(['a', 1], M1.combine(['b', 2])), ['ab', 3])
    const M2 = _.tuple(S.Monoid, N.MonoidSum, B.MonoidAll)
    U.deepStrictEqual(pipe(['a', 1, true], M2.combine(['b', 2, false])), ['ab', 3, false])
  })

  describe('combineAll', () => {
    it('baseline', () => {
      U.deepStrictEqual(_.combineAll(N.MonoidSum)([1, 2, 3]), 6)
    })

    it('should accept an Iterable', () => {
      U.deepStrictEqual(_.combineAll(N.MonoidSum)(new Set([1, 2, 3])), 6)
    })
  })

  it('min', () => {
    const M = _.min(N.Bounded)
    U.deepStrictEqual(_.combineAll(M)([]), +Infinity)
    U.deepStrictEqual(_.combineAll(M)([1]), 1)
    U.deepStrictEqual(_.combineAll(M)([1, -1]), -1)
  })

  it('max', () => {
    const M = _.max(N.Bounded)
    U.deepStrictEqual(_.combineAll(M)([]), -Infinity)
    U.deepStrictEqual(_.combineAll(M)([1]), 1)
    U.deepStrictEqual(_.combineAll(M)([1, -1]), 1)
  })

  it('reverse', () => {
    const M = _.reverse(S.Monoid)
    U.deepStrictEqual(pipe('a', M.combine('b')), 'ba')
    U.deepStrictEqual(pipe('a', M.combine(M.empty)), 'a')
    U.deepStrictEqual(pipe(M.empty, M.combine('a')), 'a')
  })

  it('struct', () => {
    // should ignore non own properties
    const monoids = Object.create({ a: 1 })
    const s = _.struct(monoids)
    U.deepStrictEqual(s.empty, {})
  })
})
