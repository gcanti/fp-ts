import * as assert from 'assert'
import { replicate, replicateA } from '../src/Unfoldable'
import * as array from '../src/Array'
import * as option from '../src/Option'

describe('Unfoldable', () => {
  it('replicate', () => {
    assert.deepEqual(replicate(array)(2)('s'), ['s', 's'])
  })

  it('replicateA', () => {
    assert.deepEqual(replicateA(option.option, array)(2)(option.some(1)), option.some([1, 1]))
  })
})
