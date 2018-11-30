import * as assert from 'assert'
import { array } from '../src/Array'
import { getCompactableComposition } from '../src/Compactable'
import { none, some } from '../src/Option'
import { left, right } from '../src/Either'

describe('Compactable', () => {
  it('getCompactableComposition', () => {
    const C = getCompactableComposition(array, array)
    assert.deepEqual(C.compact([[some(1), none], [none, some(2)]]), [[1], [2]])
    assert.deepEqual(C.separate([[left('a'), right(1)], [right(2), left('b')]]), {
      left: [['a'], ['b']],
      right: [[1], [2]]
    })
  })
})
