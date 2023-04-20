import { getCompactableComposition } from '../src/Compactable'
import { left, right } from '../src/Either'
import { none, some } from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import { separated } from '../src/Separated'
import * as U from './util'

describe('Compactable', () => {
  it('getCompactableComposition', () => {
    const C = getCompactableComposition(RA.Functor, { ...RA.Functor, ...RA.Compactable })
    U.deepStrictEqual(
      C.map([[1], [2]], (n) => n * 2),
      [[2], [4]]
    )
    U.deepStrictEqual(
      C.compact([
        [some(1), none],
        [none, some(2)]
      ]),
      [[1], [2]]
    )
    U.deepStrictEqual(
      C.separate([
        [left('a'), right(1)],
        [right(2), left('b')]
      ]),
      separated([['a'], ['b']], [[1], [2]])
    )
  })
})
