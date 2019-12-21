import * as assert from 'assert'
import * as B from '../src/boolean'

describe('boolean', () => {
  it('fold', () => {
    assert.deepStrictEqual(
      B.fold(
        () => 'false',
        () => 'true'
      )(true),
      'true'
    )
    assert.deepStrictEqual(
      B.fold(
        () => 'false',
        () => 'true'
      )(false),
      'false'
    )
  })
})
