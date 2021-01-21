import { boundedNumber } from '../src/Bounded'
import { pipe } from '../src/function'
import {
  fold,
  getDualMonoid,
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
import * as A from '../src/ReadonlyArray'
import { deepStrictEqual } from './util'

describe('Monoid', () => {
  it('getTupleMonoid', () => {
    const M1 = getTupleMonoid(monoidString, monoidSum)
    deepStrictEqual(pipe(['a', 1], M1.concat(['b', 2])), ['ab', 3])
    const M2 = getTupleMonoid(monoidString, monoidSum, monoidAll)
    deepStrictEqual(pipe(['a', 1, true], M2.concat(['b', 2, false])), ['ab', 3, false])
  })

  it('fold', () => {
    deepStrictEqual(fold(monoidSum)([1, 2, 3]), 6)
  })

  it('getFunctionMonoid', () => {
    const getPredicateMonoidAll = getFunctionMonoid(monoidAll)
    const getPredicateMonoidAny = getFunctionMonoid(monoidAny)

    const isLessThan10 = (n: number) => n <= 10
    const isEven = (n: number) => n % 2 === 0

    deepStrictEqual(pipe([1, 2, 3, 40], A.filter(fold(getPredicateMonoidAll<number>())([isLessThan10, isEven]))), [2])
    deepStrictEqual(pipe([1, 2, 3, 40, 41], A.filter(fold(getPredicateMonoidAny<number>())([isLessThan10, isEven]))), [
      1,
      2,
      3,
      40
    ])
  })

  it('getEndomorphismMonoid', () => {
    const M = getEndomorphismMonoid<number>()
    const inc = (n: number) => n + 1
    const double = (n: number) => n * 2
    const f = pipe(inc, M.concat(double))
    deepStrictEqual(f(3), 8)
  })

  it('getMeetMonoid', () => {
    const M = getMeetMonoid(boundedNumber)
    deepStrictEqual(fold(M)([]), +Infinity)
    deepStrictEqual(fold(M)([1]), 1)
    deepStrictEqual(fold(M)([1, -1]), -1)
  })

  it('getJoinMonoid', () => {
    const M = getJoinMonoid(boundedNumber)
    deepStrictEqual(fold(M)([]), -Infinity)
    deepStrictEqual(fold(M)([1]), 1)
    deepStrictEqual(fold(M)([1, -1]), 1)
  })

  it('getDualMonoid', () => {
    const M = getDualMonoid(monoidString)
    deepStrictEqual(pipe('a', M.concat('b')), 'ba')
    deepStrictEqual(pipe('a', M.concat(M.empty)), 'a')
    deepStrictEqual(pipe(M.empty, M.concat('a')), 'a')
  })
})
