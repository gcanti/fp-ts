import * as assert from 'assert'
import { array } from '../src/Array'
import { none, option, some } from '../src/Option'
import { empty, replicate, replicateA, singleton } from '../src/Unfoldable'

describe('Unfoldable', () => {
  it('replicate', () => {
    assert.deepStrictEqual(replicate(array)('s', 2), ['s', 's'])
  })

  it('empty', () => {
    assert.deepStrictEqual(empty(array), [])
  })

  it('singleton', () => {
    assert.deepStrictEqual(singleton(array)(1), [1])
  })

  it('replicateA', () => {
    assert.deepStrictEqual(replicateA(option, array)(2, some(1)), some([1, 1]))
    assert.deepStrictEqual(replicateA(option, array)(2, none), none)
  })
})
