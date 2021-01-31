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

  it('BooleanAlgebra', () => {
    const BA = B.BooleanAlgebra
    assert.deepStrictEqual(BA.implies(true, true), true)
    assert.deepStrictEqual(BA.implies(true, false), false)
    assert.deepStrictEqual(BA.implies(false, true), true)
    assert.deepStrictEqual(BA.implies(false, false), true)

    assert.deepStrictEqual(BA.join(true, true), true)
    assert.deepStrictEqual(BA.join(true, false), true)
    assert.deepStrictEqual(BA.join(false, true), true)
    assert.deepStrictEqual(BA.join(false, false), false)

    assert.deepStrictEqual(BA.meet(true, true), true)
    assert.deepStrictEqual(BA.meet(true, false), false)

    assert.deepStrictEqual(BA.not(true), false)
    assert.deepStrictEqual(BA.not(false), true)

    assert.deepStrictEqual(BA.one, true)
    assert.deepStrictEqual(BA.zero, false)
  })
})
