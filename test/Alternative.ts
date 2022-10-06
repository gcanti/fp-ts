import * as _ from '../src/Alternative'
import * as O from '../src/Option'
import * as U from './util'
import { readonlyArray } from '../src'

describe('Alternative', () => {
  it('firstSuccessOf', () => {
    const firstSuccessOf = _.firstSuccessOf(readonlyArray.Foldable)(O.Alternative)
    U.deepStrictEqual(firstSuccessOf([]), O.none)
    U.deepStrictEqual(firstSuccessOf([O.none]), O.none)
    U.deepStrictEqual(firstSuccessOf([O.none, O.some(1)]), O.some(1))
  })
})
