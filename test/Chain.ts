import * as assert from 'assert'
import { head } from '../src/Array'
import { flatMap } from '../src/Chain'
import { option, some, none } from '../src/Option'

describe('Functor', () => {
  it('flatMap', () => {
    const f = flatMap(option)(head)
    assert.deepStrictEqual(f(some([1, 2, 3])), some(1))
    assert.deepStrictEqual(f(some([])), none)
  })
})
