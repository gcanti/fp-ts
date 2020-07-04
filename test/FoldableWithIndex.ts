import * as assert from 'assert'
import * as A from '../src/ReadonlyArray'
import { getFoldableWithIndexComposition } from '../src/FoldableWithIndex'
import { monoidString } from '../src/Monoid'

describe('FoldableWithIndex', () => {
  it('getFoldableWithIndexComposition', () => {
    const arrayOfArray = getFoldableWithIndexComposition(A.FoldableWithIndex, A.FoldableWithIndex)
    const fa: ReadonlyArray<ReadonlyArray<string>> = [
      ['a', 'b'],
      ['c', 'd']
    ]

    assert.deepStrictEqual(
      arrayOfArray.reduceWithIndex(fa, '', ([i, j], b: string, a: string) => b + a + i + j),
      'a00b01c10d11'
    )

    assert.deepStrictEqual(
      arrayOfArray.foldMapWithIndex(monoidString)(fa, ([i, j], a) => a + i + j),
      'a00b01c10d11'
    )

    assert.deepStrictEqual(
      arrayOfArray.reduceRightWithIndex(fa, '', ([i, j], a: string, b: string) => b + a + i + j),
      'd11c10b01a00'
    )
  })
})
