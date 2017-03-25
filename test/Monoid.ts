import * as assert from 'assert'
import {
  fold,
  monoidSum
} from '../src/Monoid'

describe('Monoid', () => {

  it('fold', () => {
    assert.strictEqual(fold(monoidSum, [1, 2, 3]), 6)
  })

})
