import * as assert from 'assert'
import { duplicate } from '../src/Extend'
import { option, some, none } from '../src/Option'

describe('Extend', () => {
  it('duplicate', () => {
    const f = duplicate(option)
    assert.deepEqual(f(none), none)
    assert.deepEqual(f(some(1)), some(some(1)))
  })
})
