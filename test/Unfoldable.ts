import * as assert from 'assert'
import { replicate, empty, singleton, replicateA } from '../src/Unfoldable'
import { array } from '../src/Array'
import { option, some, none } from '../src/Option'

describe('Unfoldable', () => {
  it('replicate', () => {
    assert.deepEqual(replicate(array)('s', 2), ['s', 's'])
  })

  it('empty', () => {
    assert.deepEqual(empty(array), [])
  })

  it('singleton', () => {
    assert.deepEqual(singleton(array)(1), [1])
  })

  it('replicateA', () => {
    assert.deepEqual(replicateA(option, array)(2, some(1)), some([1, 1]))
    assert.deepEqual(replicateA(option, array)(2, none), none)
  })
})
