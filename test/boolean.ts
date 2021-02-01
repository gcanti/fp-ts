import * as assert from 'assert'
import * as _ from '../src/boolean'

describe('boolean', () => {
  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Eq', () => {
    assert.deepStrictEqual(_.Eq.equals(true, true), true)
    assert.deepStrictEqual(_.Eq.equals(false, false), true)
    assert.deepStrictEqual(_.Eq.equals(false, true), false)
  })

  it('Ord', () => {
    assert.deepStrictEqual(_.Ord.compare(false, true), -1)
    assert.deepStrictEqual(_.Ord.compare(true, false), 1)
    assert.deepStrictEqual(_.Ord.compare(true, true), 0)
  })

  it('Show', () => {
    assert.deepStrictEqual(_.Show.show(true), 'true')
    assert.deepStrictEqual(_.Show.show(false), 'false')
  })

  it('BooleanAlgebra', () => {
    const BA = _.BooleanAlgebra
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

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('fold', () => {
    assert.deepStrictEqual(
      _.fold(
        () => 'false',
        () => 'true'
      )(true),
      'true'
    )
    assert.deepStrictEqual(
      _.fold(
        () => 'false',
        () => 'true'
      )(false),
      'false'
    )
  })
})
