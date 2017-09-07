import * as assert from 'assert'
import { fold, getRecordSemigroup } from '../src/Semigroup'
import { monoidString, monoidAll } from '../src/Monoid'

describe('Semigroup', () => {
  it('fold', () => {
    assert.strictEqual(fold(monoidString)('')(['a', 'b', 'c']), 'abc')
  })

  it('getRecordSemigroup', () => {
    const S = getRecordSemigroup({
      a: monoidAll,
      b: monoidString
    })
    assert.deepEqual(S.concat({ a: true, b: 'foo' })({ a: false, b: 'bar' }), { a: false, b: 'foobar' })
  })
})
