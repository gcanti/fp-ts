import * as assert from 'assert'
import { fieldNumber, gcd, lcm } from '../src/Field'
import * as N from '../src/number'

describe('Field', () => {
  it('gcd', () => {
    const gcdNumber = gcd(N.Eq, fieldNumber)
    assert.deepStrictEqual(gcdNumber(10, 5), 5)
    assert.deepStrictEqual(gcdNumber(10, 2), 2)
    assert.deepStrictEqual(gcdNumber(10, 3), 1)
  })

  it('lcm', () => {
    const lcmNumber = lcm(N.Eq, fieldNumber)
    assert.deepStrictEqual(lcmNumber(4, 6), 12)
    assert.deepStrictEqual(lcmNumber(4, 0), 0)
  })

  it('fieldNumber', () => {
    assert.deepStrictEqual(fieldNumber.degree(0), 1)
    assert.deepStrictEqual(fieldNumber.degree(1), 1)
    assert.deepStrictEqual(fieldNumber.degree(2), 1)
  })
})
