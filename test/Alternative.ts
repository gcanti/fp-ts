import * as _ from '../src/MonoidKind'
import * as O from '../src/Option'
import * as U from './util'

describe('MonoidK', () => {
  it('combineKindAll', () => {
    const combineKindAll = _.combineKindAll(O.MonoidKind)
    U.deepStrictEqual(combineKindAll([]), O.none)
    U.deepStrictEqual(combineKindAll([O.none]), O.none)
    U.deepStrictEqual(combineKindAll([O.none, O.some(1)]), O.some(1))
  })
})
