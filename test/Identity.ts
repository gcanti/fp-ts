import * as assert from 'assert'
import * as array from '../src/Array'
import { Identity, distribute } from '../src/Identity'

describe('Identity', () => {
  it('distribute', () => {
    assert.deepEqual(distribute(array)([new Identity(1), new Identity(2)]), new Identity([1, 2]))
  })
})
