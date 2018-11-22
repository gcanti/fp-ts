import * as assert from 'assert'
import { array } from '../src/Array'
import { getFunctorWithIndexComposition } from '../src/FunctorWithIndex'
import * as option from '../src/Option'

describe('Functor', () => {
  it('getFunctorWithIndexComposition', () => {
    const arrayOption = getFunctorWithIndexComposition(array, option.option)
    const double = (a: number) => a * 2
    assert.deepEqual(arrayOption.map([option.some(1)], double), [option.some(2)])
  })
})
