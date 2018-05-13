import * as assert from 'assert'
import * as field from '../src/Field'
import * as setoid from '../src/Setoid'
import { fieldNumber } from '../src/Field'

describe('Field', () => {
  it('gcd', () => {
    const gcd = field.gcd(setoid.setoidNumber, field.fieldNumber)
    assert.strictEqual(gcd(10, 5), 5)
    assert.strictEqual(gcd(10, 2), 2)
    assert.strictEqual(gcd(10, 3), 1)
  })

  it('lcm', () => {
    const lcm = field.lcm(setoid.setoidNumber, field.fieldNumber)
    assert.strictEqual(lcm(4, 6), 12)
    assert.strictEqual(lcm(4, 0), 0)
  })

  it('fieldNumber', () => {
    assert.strictEqual(fieldNumber.degree(0), 1)
    assert.strictEqual(fieldNumber.degree(1), 1)
    assert.strictEqual(fieldNumber.degree(2), 1)
  })
})
