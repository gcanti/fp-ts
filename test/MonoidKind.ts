import * as _ from '../src/MonoidKind'
import * as O from '../src/Option'
import * as U from './util'

describe('MonoidKind', () => {
  it('orElseAll', () => {
    const orElseAll = _.orElseAll(O.MonoidKind)
    U.deepStrictEqual(orElseAll([]), O.none)
    U.deepStrictEqual(orElseAll([O.none]), O.none)
    U.deepStrictEqual(orElseAll([O.none, O.some(1)]), O.some(1))
  })
})
