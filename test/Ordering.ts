import * as assert from 'assert'
import * as _ from '../src/Ordering'

describe('Ordering', () => {
  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Eq', () => {
    assert.deepStrictEqual(_.Eq.equals(-1, -1), true)
    assert.deepStrictEqual(_.Eq.equals(-1, 0), false)
    assert.deepStrictEqual(_.Eq.equals(-1, 1), false)
    assert.deepStrictEqual(_.Eq.equals(0, -1), false)
    assert.deepStrictEqual(_.Eq.equals(0, 0), true)
    assert.deepStrictEqual(_.Eq.equals(0, 1), false)
    assert.deepStrictEqual(_.Eq.equals(1, -1), false)
    assert.deepStrictEqual(_.Eq.equals(1, 0), false)
    assert.deepStrictEqual(_.Eq.equals(1, 1), true)
  })

  it('Monoid', () => {
    // concat
    assert.deepStrictEqual(_.Monoid.concat(-1, -1), -1)
    assert.deepStrictEqual(_.Monoid.concat(-1, 0), -1)
    assert.deepStrictEqual(_.Monoid.concat(-1, 1), -1)
    assert.deepStrictEqual(_.Monoid.concat(0, -1), -1)
    assert.deepStrictEqual(_.Monoid.concat(0, 0), 0)
    assert.deepStrictEqual(_.Monoid.concat(0, 1), 1)
    assert.deepStrictEqual(_.Monoid.concat(1, -1), 1)
    assert.deepStrictEqual(_.Monoid.concat(1, 0), 1)
    assert.deepStrictEqual(_.Monoid.concat(1, 1), 1)

    // empty
    assert.deepStrictEqual(_.Monoid.concat(1, _.Monoid.empty), 1)
    assert.deepStrictEqual(_.Monoid.concat(_.Monoid.empty, 1), 1)
    assert.deepStrictEqual(_.Monoid.concat(-1, _.Monoid.empty), -1)
    assert.deepStrictEqual(_.Monoid.concat(_.Monoid.empty, -1), -1)
    assert.deepStrictEqual(_.Monoid.concat(0, _.Monoid.empty), 0)
    assert.deepStrictEqual(_.Monoid.concat(_.Monoid.empty, 0), 0)
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('sign', () => {
    assert.deepStrictEqual(_.sign(10), 1)
    assert.deepStrictEqual(_.sign(0), 0)
    assert.deepStrictEqual(_.sign(-10), -1)
  })

  it('invert', () => {
    assert.deepStrictEqual(_.invert(-1), 1)
    assert.deepStrictEqual(_.invert(0), 0)
    assert.deepStrictEqual(_.invert(1), -1)
  })
})
