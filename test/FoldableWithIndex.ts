import * as _ from '../src/FoldableWithIndex'
import { pipe } from '../src/function'
import { monoidString } from '../src/Monoid'
import * as A from '../src/ReadonlyArray'
import * as R from '../src/ReadonlyRecord'
import { deepStrictEqual } from './util'

describe('FoldableWithIndex', () => {
  it('reduceWithIndex_', () => {
    const reduce = _.reduceWithIndex_(R.FoldableWithIndex, A.FoldableWithIndex)
    deepStrictEqual(
      pipe(
        { a: [1, 2], b: [3] },
        reduce('', (ij, b, a) => ij[0] + ij[1] + b + a)
      ),
      'b0a1a0123'
    )
  })

  it('foldMapWithIndex_', () => {
    const foldMap = _.foldMapWithIndex_(R.FoldableWithIndex, A.FoldableWithIndex)
    deepStrictEqual(
      pipe(
        { a: [1, 2], b: [3] },
        foldMap(monoidString)((ij, a) => ij[0] + ij[1] + a)
      ),
      'a01a12b03'
    )
  })

  it('reduceRightWithIndex_', () => {
    const reduce = _.reduceRightWithIndex_(R.FoldableWithIndex, A.FoldableWithIndex)
    deepStrictEqual(
      pipe(
        { a: [1, 2], b: [3] },
        reduce('', (ij, b, a) => ij[0] + ij[1] + b + a)
      ),
      'a01a12b03'
    )
  })
})
