import * as _ from '../src/MonoidK'
import * as O from '../src/Option'
import * as U from './util'

describe('MonoidK', () => {
  it('combineKAll', () => {
    const combineKAll = _.combineKAll(O.MonoidK)
    U.deepStrictEqual(combineKAll([]), O.none)
    U.deepStrictEqual(combineKAll([O.none]), O.none)
    U.deepStrictEqual(combineKAll([O.none, O.some(1)]), O.some(1))
  })
})
