import * as _ from '@fp-ts/core/Alternative'
import * as O from '@fp-ts/core/Option'
import * as U from '@fp-ts/core/test/util'

describe('Alternative', () => {
  it('firstSuccessOf', () => {
    const firstSuccessOfOptions = _.firstSuccessOf(O.Alternative)
    U.deepStrictEqual(firstSuccessOfOptions([]), O.none)
    U.deepStrictEqual(firstSuccessOfOptions([O.none]), O.none)
    U.deepStrictEqual(firstSuccessOfOptions([O.none, O.some(1)]), O.some(1))
  })
})
