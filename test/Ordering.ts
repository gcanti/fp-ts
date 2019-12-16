import * as assert from 'assert'
import { sign, eqOrdering, monoidOrdering, invert } from '../src/Ordering'

describe('Ordering', () => {
  it('sign', () => {
    assert.strictEqual(sign(10), 1)
    assert.strictEqual(sign(0), 0)
    assert.strictEqual(sign(-10), -1)
  })

  it('eqOrdering', () => {
    assert.strictEqual(eqOrdering.equals(-1, -1), true)
    assert.strictEqual(eqOrdering.equals(-1, 0), false)
    assert.strictEqual(eqOrdering.equals(-1, 1), false)
    assert.strictEqual(eqOrdering.equals(0, -1), false)
    assert.strictEqual(eqOrdering.equals(0, 0), true)
    assert.strictEqual(eqOrdering.equals(0, 1), false)
    assert.strictEqual(eqOrdering.equals(1, -1), false)
    assert.strictEqual(eqOrdering.equals(1, 0), false)
    assert.strictEqual(eqOrdering.equals(1, 1), true)
  })

  it('monoidOrdering', () => {
    // concat
    assert.strictEqual(monoidOrdering.concat(-1, -1), -1)
    assert.strictEqual(monoidOrdering.concat(-1, 0), -1)
    assert.strictEqual(monoidOrdering.concat(-1, 1), -1)
    assert.strictEqual(monoidOrdering.concat(0, -1), -1)
    assert.strictEqual(monoidOrdering.concat(0, 0), 0)
    assert.strictEqual(monoidOrdering.concat(0, 1), 1)
    assert.strictEqual(monoidOrdering.concat(1, -1), 1)
    assert.strictEqual(monoidOrdering.concat(1, 0), 1)
    assert.strictEqual(monoidOrdering.concat(1, 1), 1)

    // empty
    assert.strictEqual(monoidOrdering.concat(1, monoidOrdering.empty), 1)
    assert.strictEqual(monoidOrdering.concat(monoidOrdering.empty, 1), 1)
    assert.strictEqual(monoidOrdering.concat(-1, monoidOrdering.empty), -1)
    assert.strictEqual(monoidOrdering.concat(monoidOrdering.empty, -1), -1)
    assert.strictEqual(monoidOrdering.concat(0, monoidOrdering.empty), 0)
    assert.strictEqual(monoidOrdering.concat(monoidOrdering.empty, 0), 0)
  })

  it('invert', () => {
    assert.strictEqual(invert(-1), 1)
    assert.strictEqual(invert(0), 0)
    assert.strictEqual(invert(1), -1)
  })
})
