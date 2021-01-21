import { pipe } from '../src/function'
import * as _ from '../src/FunctorWithIndex'
import * as A from '../src/ReadonlyArray'
import * as R from '../src/ReadonlyRecord'
import { deepStrictEqual } from './util'

describe('FunctorWithIndex', () => {
  it('mapWithIndex_', () => {
    const mapWithIndex = _.mapWithIndex_(R.FunctorWithIndex, A.FunctorWithIndex)
    deepStrictEqual(
      pipe(
        { a: [1, 2], b: [3] },
        mapWithIndex((ij, a) => ij[0] + ij[1] + a)
      ),
      { a: ['a01', 'a12'], b: ['b03'] }
    )
  })
})
