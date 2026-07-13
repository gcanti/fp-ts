import { increment, pipe } from '../src/function'
import * as _ from '../src/Quasigroup'
import * as N from '../src/number'
import * as U from './util'

describe('Quasigroup', () => {
  it('reverse', () => {
    const sumAll = _.concatAll(_.reverse(N.Quasigroup))(0)
    const subAll = _.leftInvAll(_.reverse(N.Quasigroup))(0)
    const diffAll = _.rightInvAll(_.reverse(N.Quasigroup))(0)

    U.deepStrictEqual(sumAll([1, 2, 3]), 6)
    U.deepStrictEqual(subAll([1, 2, 3]), -6)
    U.deepStrictEqual(diffAll([1, 2, 3]), 2)
  })

  it('filterFirst', () => {
    const M = pipe(
      N.Quasigroup,
      _.filterFirst((n) => n >= 0)
    )
    const sum = _.concatAll(M)(0)
    U.deepStrictEqual(sum([1, -2, 3]), 3)
  })

  it('filterSecond', () => {
    const M = pipe(
      N.Quasigroup,
      _.filterSecond((n) => n >= 0)
    )
    const sum = _.concatAll(M)(0)
    U.deepStrictEqual(sum([1, -2, 3]), 4)
  })

  it('endo', () => {
    const Q = pipe(N.Quasigroup, _.endo(increment))
    const sum = _.concatAll(Q)(0)
    U.deepStrictEqual(sum([1, -2, 3]), 8)
  })

  it('concatAll', () => {
    const sumAll = _.concatAll(N.Quasigroup)(0)
    U.deepStrictEqual(sumAll([1, 2, 3]), 6)
  })

  it('leftInvAll', () => {
    const diffAll = _.leftInvAll(N.Quasigroup)(0)
    U.deepStrictEqual(diffAll([1, 2, 3, 4]), 2)
  })

  it('rightInvAll', () => {
    const subAll = _.rightInvAll(N.Quasigroup)(0)
    U.deepStrictEqual(subAll([1, 2, 3]), -6)
  })
})
