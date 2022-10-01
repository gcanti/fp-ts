import { pipe } from '../src/f'
import * as _ from '../src/FunctorWithIndex'
import * as RA from '../src/ReadonlyArray'
import * as R from '../src/ReadonlyRecord'
import { deepStrictEqual } from './util'

describe('FunctorWithIndex', () => {
  it('mapWithIndex', () => {
    const mapWithIndex = _.getMapWithIndexComposition(R.FunctorWithIndex, RA.FunctorWithIndex)
    deepStrictEqual(
      pipe(
        { a: [1, 2], b: [3] },
        mapWithIndex((ij, a) => ij[0] + ij[1] + a)
      ),
      { a: ['a01', 'a12'], b: ['b03'] }
    )
  })
})
