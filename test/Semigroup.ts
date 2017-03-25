import * as assert from 'assert'
import {
  fold
} from '../src/Semigroup'
import { monoidString } from '../src/Monoid'

describe('Semigroup', () => {

  it('fold', () => {
    assert.strictEqual(fold(monoidString, '' , ['a', 'b', 'c']), 'abc')
  })

})
