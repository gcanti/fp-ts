import * as assert from 'assert'
import { array } from '../src/Array'
import { getFunctorWithIndexComposition } from '../src/FunctorWithIndex'

describe('FunctorWithIndex', () => {
  it('getFunctorComposition', () => {
    const arrayOfArray = getFunctorWithIndexComposition(array, array)
    const f = ([i, j]: readonly [number, number], a: string) => a + i + j
    assert.deepStrictEqual(
      arrayOfArray.mapWithIndex(
        [
          ['a', 'b'],
          ['c', 'd']
        ],
        f
      ),
      [
        ['a00', 'b01'],
        ['c10', 'd11']
      ]
    )
  })
})
