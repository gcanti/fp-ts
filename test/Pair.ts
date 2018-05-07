import * as assert from 'assert'
import { none, option, some } from '../src/Option'
import { Pair, pair } from '../src/Pair'
import { traverse } from '../src/Traversable'

describe('Pair', () => {
  it('traverse', () => {
    assert.deepEqual(traverse(option, pair)(new Pair(0, 1), n => (n >= 0 ? some(n) : none)), some(new Pair(0, 1)))
    assert.deepEqual(traverse(option, pair)(new Pair(0, 1), n => (n >= 2 ? some(n) : none)), none)
  })
})
