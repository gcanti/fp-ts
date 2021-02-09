import * as U from './util'
import * as RA from '../src/ReadonlyArray'
import { getFilterableComposition } from '../src/Filterable'
import { some, none } from '../src/Option'
import { right, left } from '../src/Either'
import { increment } from '../src/function'
import { separated } from '../src/Separated'

describe('Filterable', () => {
  it('getFilterableComposition', () => {
    // tslint:disable-next-line: deprecation
    const F = getFilterableComposition(RA.Functor, RA.Filterable)

    U.deepStrictEqual(F.map([[1]], increment), [[2]])

    U.deepStrictEqual(
      F.filter(
        [
          [1, 2],
          [3, 4]
        ],
        (a) => a > 1
      ),
      [[2], [3, 4]]
    )

    U.deepStrictEqual(
      F.filterMap(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        (a) => (a.length > 1 ? some(a.length) : none)
      ),
      [[2], [3, 4]]
    )

    U.deepStrictEqual(
      F.partition(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        (a) => a.length % 2 === 0
      ),
      separated([['a'], ['ccc']], [['bb'], ['dddd']])
    )

    U.deepStrictEqual(
      F.partitionMap(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        (a) => (a.length % 2 === 0 ? right(a.length) : left(a))
      ),
      separated([['a'], ['ccc']], [[2], [4]])
    )
  })
})
