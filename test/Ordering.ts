import * as assert from 'assert'
import { sign, eqOrdering, monoidOrdering, invert } from '../src/Ordering'

describe('Ordering', () => {
  it('sign', () => {
    assert.deepStrictEqual(sign(10), 1)
    assert.deepStrictEqual(sign(0), 0)
    assert.deepStrictEqual(sign(-10), -1)
  })

  it('eqOrdering', () => {
    assert.deepStrictEqual(eqOrdering.equals(-1, -1), true)
    assert.deepStrictEqual(eqOrdering.equals(-1, 0), false)
    assert.deepStrictEqual(eqOrdering.equals(-1, 1), false)
    assert.deepStrictEqual(eqOrdering.equals(0, -1), false)
    assert.deepStrictEqual(eqOrdering.equals(0, 0), true)
    assert.deepStrictEqual(eqOrdering.equals(0, 1), false)
    assert.deepStrictEqual(eqOrdering.equals(1, -1), false)
    assert.deepStrictEqual(eqOrdering.equals(1, 0), false)
    assert.deepStrictEqual(eqOrdering.equals(1, 1), true)
  })

  it('monoidOrdering', () => {
    // concat
    assert.deepStrictEqual(monoidOrdering.concat(-1, -1), -1)
    assert.deepStrictEqual(monoidOrdering.concat(-1, 0), -1)
    assert.deepStrictEqual(monoidOrdering.concat(-1, 1), -1)
    assert.deepStrictEqual(monoidOrdering.concat(0, -1), -1)
    assert.deepStrictEqual(monoidOrdering.concat(0, 0), 0)
    assert.deepStrictEqual(monoidOrdering.concat(0, 1), 1)
    assert.deepStrictEqual(monoidOrdering.concat(1, -1), 1)
    assert.deepStrictEqual(monoidOrdering.concat(1, 0), 1)
    assert.deepStrictEqual(monoidOrdering.concat(1, 1), 1)

    // empty
    assert.deepStrictEqual(monoidOrdering.concat(1, monoidOrdering.empty), 1)
    assert.deepStrictEqual(monoidOrdering.concat(monoidOrdering.empty, 1), 1)
    assert.deepStrictEqual(monoidOrdering.concat(-1, monoidOrdering.empty), -1)
    assert.deepStrictEqual(monoidOrdering.concat(monoidOrdering.empty, -1), -1)
    assert.deepStrictEqual(monoidOrdering.concat(0, monoidOrdering.empty), 0)
    assert.deepStrictEqual(monoidOrdering.concat(monoidOrdering.empty, 0), 0)
  })

  it('invert', () => {
    assert.deepStrictEqual(invert(-1), 1)
    assert.deepStrictEqual(invert(0), 0)
    assert.deepStrictEqual(invert(1), -1)
  })
})
