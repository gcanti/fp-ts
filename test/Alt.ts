import * as _ from '../src/Alt'
import * as O from '../src/Option'
import * as U from './util'

describe('Alt', () => {
  describe('firstSuccessOf', () => {
    it('baseline', () => {
      const firstSuccessOf = _.firstSuccessOf(O.Alt)(O.none as O.Option<number>)
      U.deepStrictEqual(firstSuccessOf([]), O.none)
      U.deepStrictEqual(firstSuccessOf([O.none]), O.none)
      U.deepStrictEqual(firstSuccessOf([O.none, O.some(1)]), O.some(1))
    })

    it('should accept an Iterable', () => {
      const firstSuccessOf = _.firstSuccessOf(O.Alt)(O.none as O.Option<number>)
      U.deepStrictEqual(firstSuccessOf(new Set([O.none, O.some(1)])), O.some(1))
    })
  })
})
