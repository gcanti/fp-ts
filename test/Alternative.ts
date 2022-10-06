import * as _ from '../src/Alternative'
import * as O from '../src/Option'
import * as U from './util'

describe('Alternative', () => {
  it('orElseAll', () => {
    const orElseAll = _.orElseAll(O.Alternative)
    U.deepStrictEqual(orElseAll([]), O.none)
    U.deepStrictEqual(orElseAll([O.none]), O.none)
    U.deepStrictEqual(orElseAll([O.none, O.some(1)]), O.some(1))
  })
})
