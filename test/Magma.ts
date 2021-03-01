import * as _ from '../src/Magma'
import * as N from '../src/number'
import * as U from './util'

describe('Magma', () => {
  it('reverse', () => {
    const subAll = _.concatAll(_.reverse(N.MagmaSub))(0)
    U.deepStrictEqual(subAll([1, 2, 3]), 2)
  })

  it('concatAll', () => {
    const subAll = _.concatAll(N.MagmaSub)(0)
    U.deepStrictEqual(subAll([1, 2, 3]), -6)
  })
})
