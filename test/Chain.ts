import * as assert from 'assert'
import { flatten } from '../src/Chain'
import { option, some, none } from '../src/Option'

describe('Chain', () => {
  it('flatten', () => {
    const f = flatten(option)
    assert.deepEqual(f(some(some(1))), some(1))
    assert.deepEqual(f(some(none)), none)
    assert.deepEqual(f(none), none)
  })
})
