import * as assert from 'assert'
import * as F from '../src/Field'
import * as eq from '../src/Eq'
import { pipe } from '../src/function'

describe('Field', () => {
  it('gcd', () => {
    const gcd = F.gcd(eq.eqNumber, F.fieldNumber)
    assert.deepStrictEqual(pipe(10, gcd(5)), 5)
    assert.deepStrictEqual(pipe(10, gcd(2)), 2)
    assert.deepStrictEqual(pipe(10, gcd(3)), 1)
  })

  it('lcm', () => {
    const lcm = F.lcm(eq.eqNumber, F.fieldNumber)
    assert.deepStrictEqual(pipe(4, lcm(6)), 12)
    assert.deepStrictEqual(pipe(4, lcm(0)), 0)
  })

  it('fieldNumber', () => {
    assert.deepStrictEqual(F.fieldNumber.degree(0), 1)
    assert.deepStrictEqual(F.fieldNumber.degree(1), 1)
    assert.deepStrictEqual(F.fieldNumber.degree(2), 1)
  })
})
