import * as assert from 'assert'
import * as B from '../src/boolean'

describe('boolean', () => {
  it('fold', () => {
    assert.strictEqual(B.fold(() => 'false', () => 'true')(true), 'true')
    assert.strictEqual(B.fold(() => 'false', () => 'true')(false), 'false')
  })
})
