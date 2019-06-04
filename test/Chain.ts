import * as assert from 'assert'
import { flatten } from '../src/Chain'
import { option, some, none } from '../src/Option'

describe('Chain', () => {
  it('flatten', () => {
    // tslint:disable-next-line: deprecation
    const f = flatten(option)
    assert.deepStrictEqual(f(some(some(1))), some(1))
    assert.deepStrictEqual(f(some(none)), none)
    assert.deepStrictEqual(f(none), none)
  })
})
