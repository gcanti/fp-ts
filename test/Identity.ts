import * as assert from 'assert'
import { Identity } from '../src/Identity'

describe('Identity', () => {
  it('orElse', () => {
    assert.deepEqual(new Identity(123).orElse(() => new Identity(456)), new Identity(123))
  })
})
