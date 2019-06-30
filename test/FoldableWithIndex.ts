import * as assert from 'assert'
import { array } from '../src/Array'
import { getFoldableWithIndexComposition } from '../src/FoldableWithIndex'
import { monoidString } from '../src/Monoid'

describe('FoldableWithIndex', () => {
  it('getFoldableWithIndexComposition', () => {
    const arrayOfArray = getFoldableWithIndexComposition(array, array)
    const fa = [['a', 'b'], ['c', 'd']]

    assert.deepStrictEqual(
      arrayOfArray.reduceWithIndex(fa, '', ([i, j]: [number, number], b: string, a: string) => b + a + i + j),
      'a00b01c10d11'
    )

    assert.deepStrictEqual(arrayOfArray.foldMapWithIndex(monoidString)(fa, ([i, j], a) => a + i + j), 'a00b01c10d11')

    assert.deepStrictEqual(
      arrayOfArray.reduceRightWithIndex(fa, '', ([i, j]: [number, number], a: string, b: string) => b + a + i + j),
      'd11c10b01a00'
    )
  })
})
