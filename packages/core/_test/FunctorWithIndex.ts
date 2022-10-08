import { pipe } from '@fp-ts/core/Function'
import * as _ from '@fp-ts/core/FunctorWithIndex'
import * as RA from '@fp-ts/core/ReadonlyArray'
import * as R from '@fp-ts/core/ReadonlyRecord'
import { deepStrictEqual } from '@fp-ts/core/test/util'

describe('FunctorWithIndex', () => {
  it('mapWithIndex', () => {
    const mapWithIndex = _.mapWithIndexComposition(R.FunctorWithIndex, RA.FunctorWithIndex)
    deepStrictEqual(
      pipe(
        { a: [1, 2], b: [3] },
        mapWithIndex((ij, a) => ij[0] + ij[1] + a)
      ),
      { a: ['a01', 'a12'], b: ['b03'] }
    )
  })
})
