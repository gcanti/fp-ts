import * as assert from 'assert'
import {
  toArray
} from '../src/Foldable'
import * as array from '../src/Array'

describe('Foldable', () => {

  it('toArray', () => {
    assert.deepEqual(toArray(array, [1, 2, 3]), [3, 2, 1])
  })

})
