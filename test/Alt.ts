import * as _ from '../src/Alt'
import type { NonEmptyReadonlyArray } from '../src/NonEmptyReadonlyArray'
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

  describe('firstSuccessOfNonEmpty', () => {
    it('baseline', () => {
      const firstSuccessOfNonEmpty = _.firstSuccessOfNonEmpty(O.Alt)
      U.deepStrictEqual(firstSuccessOfNonEmpty(O.none), O.none)
      U.deepStrictEqual(firstSuccessOfNonEmpty(O.none, O.none), O.none)
      U.deepStrictEqual(firstSuccessOfNonEmpty(O.none, O.none, O.some(1)), O.some(1))
    })

    it('should accept a NonEmptyReadonlyArray', () => {
      const firstSuccessOfNonEmpty = _.firstSuccessOfNonEmpty(O.Alt)
      const input: NonEmptyReadonlyArray<O.Option<number>> = [O.none, O.none, O.some(1)]
      U.deepStrictEqual(firstSuccessOfNonEmpty(...input), O.some(1))
    })
  })
})
