import * as _ from '../src/Alternative'
import * as O from '../src/Option'
import * as U from './util'

describe('Alternative', () => {
  it('altAll', () => {
    const altAll = _.altAll(O.Alternative)
    U.deepStrictEqual(altAll([]), O.none)
    U.deepStrictEqual(altAll([O.none]), O.none)
    U.deepStrictEqual(altAll([O.none, O.some(1)]), O.some(1))
  })
})
