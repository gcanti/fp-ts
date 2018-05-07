import * as assert from 'assert'
import { array } from '../src/Array'
import { none, option, some } from '../src/Option'
import { empty, replicate, replicateA, singleton } from '../src/Unfoldable'

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
