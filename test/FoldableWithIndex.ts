import * as _ from '../src/FoldableWithIndex'
import { pipe } from '../src/Function'
import * as S from '../src/string'
import * as RA from '../src/ReadonlyArray'
import * as R from '../src/ReadonlyRecord'
import { deepStrictEqual } from './util'

describe('FoldableWithIndex', () => {
  it('reduceWithIndex', () => {
    const reduce = _.getReduceWithIndexComposition(R.getFoldableWithIndex(S.Ord), RA.FoldableWithIndex)
    deepStrictEqual(
      pipe(
        { a: [1, 2], b: [3] },
        reduce('', (ij, b, a) => ij[0] + ij[1] + b + a)
      ),
      'b0a1a0123'
    )
  })

  it('foldMapWithIndex', () => {
    const foldMap = _.getFoldMapWithIndexComposition(R.getFoldableWithIndex(S.Ord), RA.FoldableWithIndex)
    deepStrictEqual(
      pipe(
        { a: [1, 2], b: [3] },
        foldMap(S.Monoid)((ij, a) => ij[0] + ij[1] + a)
      ),
      'a01a12b03'
    )
  })

  it('reduceRightWithIndex', () => {
    const reduce = _.getReduceRightWithIndexComposition(R.getFoldableWithIndex(S.Ord), RA.FoldableWithIndex)
    deepStrictEqual(
      pipe(
        { a: [1, 2], b: [3] },
        reduce('', (ij, b, a) => ij[0] + ij[1] + b + a)
      ),
      'a01a12b03'
    )
  })
})
