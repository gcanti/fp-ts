import * as U from './util'
import * as RA from '../src/ReadonlyArray'
import { getFoldableWithIndexComposition } from '../src/FoldableWithIndex'
import * as S from '../src/string'

describe('FoldableWithIndex', () => {
  it('getFoldableWithIndexComposition', () => {
    // tslint:disable-next-line: deprecation
    const arrayOfArray = getFoldableWithIndexComposition(RA.FoldableWithIndex, RA.FoldableWithIndex)
    const fa: ReadonlyArray<ReadonlyArray<string>> = [
      ['a', 'b'],
      ['c', 'd']
    ]

    U.deepStrictEqual(
      arrayOfArray.reduceWithIndex(fa, '', ([i, j], b: string, a: string) => b + a + i + j),
      'a00b01c10d11'
    )

    U.deepStrictEqual(
      arrayOfArray.foldMapWithIndex(S.Monoid)(fa, ([i, j], a) => a + i + j),
      'a00b01c10d11'
    )

    U.deepStrictEqual(
      arrayOfArray.reduceRightWithIndex(fa, '', ([i, j], a: string, b: string) => b + a + i + j),
      'd11c10b01a00'
    )
  })
})
