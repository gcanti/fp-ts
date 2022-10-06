import * as _ from '../src/Alternative'
import * as O from '../src/Option'
import * as U from './util'

describe('Alternative', () => {
  it('firstSuccessOf', () => {
    const firstSuccessOf = _.firstSuccessOf(O.Alternative)
    U.deepStrictEqual(firstSuccessOf([]), O.none)
    U.deepStrictEqual(firstSuccessOf([O.none]), O.none)
    U.deepStrictEqual(firstSuccessOf([O.none, O.some(1)]), O.some(1))
  })
})
