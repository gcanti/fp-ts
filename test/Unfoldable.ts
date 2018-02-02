import * as assert from 'assert'
import { replicate, replicateA } from '../src/Unfoldable'
import { array } from '../src/Array'
import { option, some } from '../src/Option'

describe('Unfoldable', () => {
  it('replicate', () => {
    assert.deepEqual(replicate(array)('s', 2), ['s', 's'])
  })

  it('replicateA', () => {
    assert.deepEqual(replicateA(option, array)(2, some(1)), some([1, 1]))
  })
})
