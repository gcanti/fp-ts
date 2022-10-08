import { pipe } from '../src/Function'
import * as _ from '../src/FunctorWithIndex'
import * as RA from '../src/ReadonlyArray'
import { deepStrictEqual } from './util'

describe('FunctorWithIndex', () => {
  it('mapWithIndex', () => {
    const mapWithIndex = _.mapWithIndexComposition(RA.FunctorWithIndex, RA.FunctorWithIndex)
    deepStrictEqual(
      pipe(
        [['a', 'b'], ['c']],
        mapWithIndex(([i, j], a) => String(i) + String(j) + a)
      ),
      [['00a', '01b'], ['10c']]
    )
  })
})
