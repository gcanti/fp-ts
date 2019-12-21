import * as assert from 'assert'
import { fieldNumber, gcd, lcm } from '../src/Field'
import * as eq from '../src/Eq'

describe('Field', () => {
  it('gcd', () => {
    const gcdNumber = gcd(eq.eqNumber, fieldNumber)
    assert.deepStrictEqual(gcdNumber(10, 5), 5)
    assert.deepStrictEqual(gcdNumber(10, 2), 2)
    assert.deepStrictEqual(gcdNumber(10, 3), 1)
  })

  it('lcm', () => {
    const lcmNumber = lcm(eq.eqNumber, fieldNumber)
    assert.deepStrictEqual(lcmNumber(4, 6), 12)
    assert.deepStrictEqual(lcmNumber(4, 0), 0)
  })

  it('fieldNumber', () => {
    assert.deepStrictEqual(fieldNumber.degree(0), 1)
    assert.deepStrictEqual(fieldNumber.degree(1), 1)
    assert.deepStrictEqual(fieldNumber.degree(2), 1)
  })
})
