import * as assert from 'assert'
import { array } from '../src/Array'
import { getFunctorComposition } from '../src/Functor'
import * as option from '../src/Option'

describe('Functor', () => {
  it('getFunctorComposition', () => {
    const arrayOption = getFunctorComposition(array, option.option)
    const double = (a: number) => a * 2
    assert.deepStrictEqual(arrayOption.map([option.some(1)], double), [option.some(2)])
  })
})
