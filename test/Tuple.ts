import * as assert from 'assert'
import * as _ from '../src/Tuple'

describe('Tuple', () => {
  it('swap', () => {
    assert.deepStrictEqual(_.swap([1, 'a']), ['a', 1])
  })
})
