import { getFunctorWithIndexComposition } from '../src/FunctorWithIndex'
import * as RA from '../src/ReadonlyArray'
import * as U from './util'

describe('FunctorWithIndex', () => {
  it('getFunctorComposition', () => {
    const FWI = getFunctorWithIndexComposition(RA.FunctorWithIndex, RA.FunctorWithIndex)
    const f = ([i, j]: readonly [number, number], a: string) => a + i + j
    U.deepStrictEqual(
      FWI.map([[1], [2]], (n) => n * 2),
      [[2], [4]]
    )
    U.deepStrictEqual(
      FWI.mapWithIndex(
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
