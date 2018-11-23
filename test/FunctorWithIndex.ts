import * as assert from 'assert'
import { array } from '../src/Array'
import { getFunctorWithIndexComposition } from '../src/FunctorWithIndex'

describe('FunctorWithIndex', () => {
  it('getFunctorComposition', () => {
    const arrayOfArray = getFunctorWithIndexComposition(array, array)
    const double = (i: [number, number], a: number) => a * 2
    assert.deepEqual(arrayOfArray.mapWithIndex([[1]], double), [[2]])
  })
})
