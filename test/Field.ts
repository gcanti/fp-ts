import * as assert from 'assert'
import * as field from '../src/Field'
import * as setoid from '../src/Setoid'

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
  })
})
