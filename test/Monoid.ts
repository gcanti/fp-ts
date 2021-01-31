import { boundedNumber } from '../src/Bounded'
import { pipe } from '../src/function'
import * as _ from '../src/Monoid'
import * as U from './util'
import * as B from '../src/boolean'
import * as S from '../src/string'

describe('Monoid', () => {
  it('getTupleMonoid', () => {
    const M1 = _.getTupleMonoid(S.Monoid, _.monoidSum)
    U.deepStrictEqual(pipe(['a', 1], M1.concat(['b', 2])), ['ab', 3])
    const M2 = _.getTupleMonoid(S.Monoid, _.monoidSum, B.MonoidAll)
    U.deepStrictEqual(pipe(['a', 1, true], M2.concat(['b', 2, false])), ['ab', 3, false])
  })

  it('fold', () => {
    U.deepStrictEqual(_.fold(_.monoidSum)([1, 2, 3]), 6)
  })

  it('getMeetMonoid', () => {
    const M = _.getMeetMonoid(boundedNumber)
    U.deepStrictEqual(_.fold(M)([]), +Infinity)
    U.deepStrictEqual(_.fold(M)([1]), 1)
    U.deepStrictEqual(_.fold(M)([1, -1]), -1)
  })

  it('getJoinMonoid', () => {
    const M = _.getJoinMonoid(boundedNumber)
    U.deepStrictEqual(_.fold(M)([]), -Infinity)
    U.deepStrictEqual(_.fold(M)([1]), 1)
    U.deepStrictEqual(_.fold(M)([1, -1]), 1)
  })

  it('getDual', () => {
    const M = _.getDual(S.Monoid)
    U.deepStrictEqual(pipe('a', M.concat('b')), 'ba')
    U.deepStrictEqual(pipe('a', M.concat(M.empty)), 'a')
    U.deepStrictEqual(pipe(M.empty, M.concat('a')), 'a')
  })

  it('getUnitMonoid', () => {
    const M = _.getUnitMonoid('a')
    U.deepStrictEqual(M.concat(M.empty)(M.empty), 'a')
  })
})
