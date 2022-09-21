import * as _ from '../src/MonoidK'
import * as O from '../src/Option'
import * as U from './util'

describe('MonoidK', () => {
  it('altAll', () => {
    const altAll = _.altAll(O.MonoidK)
    U.deepStrictEqual(altAll([]), O.none)
    U.deepStrictEqual(altAll([O.none]), O.none)
    U.deepStrictEqual(altAll([O.none, O.some(1)]), O.some(1))
  })
})
