import { boundedNumber } from '../src/Bounded'
import { pipe } from '../src/function'
import * as _ from '../src/Monoid'
import * as RA from '../src/ReadonlyArray'
import * as U from './util'

describe('Monoid', () => {
  it('getTupleMonoid', () => {
    const M1 = _.getTupleMonoid(_.monoidString, _.monoidSum)
    U.deepStrictEqual(pipe(['a', 1], M1.concat(['b', 2])), ['ab', 3])
    const M2 = _.getTupleMonoid(_.monoidString, _.monoidSum, _.monoidAll)
    U.deepStrictEqual(pipe(['a', 1, true], M2.concat(['b', 2, false])), ['ab', 3, false])
  })

  it('fold', () => {
    U.deepStrictEqual(_.fold(_.monoidSum)([1, 2, 3]), 6)
  })

  it('getFunctionMonoid', () => {
    const getPredicateMonoidAll = _.getFunctionMonoid(_.monoidAll)
    const getPredicateMonoidAny = _.getFunctionMonoid(_.monoidAny)

    const isLessThan10 = (n: number) => n <= 10
    const isEven = (n: number) => n % 2 === 0

    U.deepStrictEqual(pipe([1, 2, 3, 40], RA.filter(_.fold(getPredicateMonoidAll<number>())([isLessThan10, isEven]))), [
      2
    ])
    U.deepStrictEqual(
      pipe([1, 2, 3, 40, 41], RA.filter(_.fold(getPredicateMonoidAny<number>())([isLessThan10, isEven]))),
      [1, 2, 3, 40]
    )
  })

  it('getEndomorphismMonoid', () => {
    const M = _.getEndomorphismMonoid<number>()
    const inc = (n: number) => n + 1
    const f = pipe(inc, M.concat(U.double))
    U.deepStrictEqual(f(3), 8)
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
    const M = _.getDual(_.monoidString)
    U.deepStrictEqual(pipe('a', M.concat('b')), 'ba')
    U.deepStrictEqual(pipe('a', M.concat(M.empty)), 'a')
    U.deepStrictEqual(pipe(M.empty, M.concat('a')), 'a')
  })

  it('getUnitMonoid', () => {
    const M = _.getUnitMonoid('a')
    U.deepStrictEqual(M.concat(M.empty)(M.empty), 'a')
  })
})
