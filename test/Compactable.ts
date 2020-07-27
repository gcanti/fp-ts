import * as assert from 'assert'
import * as A from '../src/ReadonlyArray'
import { getCompactableComposition } from '../src/Compactable'
import { none, some } from '../src/Option'
import { left, right } from '../src/Either'

describe('Compactable', () => {
  it('getCompactableComposition', () => {
    const C = getCompactableComposition(A.functorArray, { ...A.functorArray, ...A.compactableArray })
    assert.deepStrictEqual(
      C.compact([
        [some(1), none],
        [none, some(2)]
      ]),
      [[1], [2]]
    )
    assert.deepStrictEqual(
      C.separate([
        [left('a'), right(1)],
        [right(2), left('b')]
      ]),
      {
        left: [['a'], ['b']],
        right: [[1], [2]]
      }
    )
  })
})
