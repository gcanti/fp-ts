import * as _ from '../src/Alternative'
import * as O from '../src/Option'
import * as U from './util'

describe('Alternative', () => {
  it('firstSuccessOf', () => {
    const firstSuccessOfOptions = _.firstSuccessOf(O.Alternative)
    U.deepStrictEqual(firstSuccessOfOptions([]), O.none)
    U.deepStrictEqual(firstSuccessOfOptions([O.none]), O.none)
    U.deepStrictEqual(firstSuccessOfOptions([O.none, O.some(1)]), O.some(1))
  })
})
