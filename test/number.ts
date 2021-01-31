import * as assert from 'assert'
import * as _ from '../src/number'

describe('string', () => {
  it('Ord', () => {
    assert.deepStrictEqual(_.Ord.compare(1, 2), -1)
    assert.deepStrictEqual(_.Ord.compare(2, 1), 1)
    assert.deepStrictEqual(_.Ord.compare(2, 2), 0)
  })
})
