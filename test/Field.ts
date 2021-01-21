import * as eq from '../src/Eq'
import * as F from '../src/Field'
import { pipe } from '../src/function'
import { deepStrictEqual } from './util'

describe('Field', () => {
  it('gcd', () => {
    const gcd = F.gcd(eq.eqNumber, F.fieldNumber)
    deepStrictEqual(pipe(10, gcd(5)), 5)
    deepStrictEqual(pipe(10, gcd(2)), 2)
    deepStrictEqual(pipe(10, gcd(3)), 1)
  })

  it('lcm', () => {
    const lcm = F.lcm(eq.eqNumber, F.fieldNumber)
    deepStrictEqual(pipe(4, lcm(6)), 12)
    deepStrictEqual(pipe(4, lcm(0)), 0)
  })

  it('fieldNumber', () => {
    deepStrictEqual(F.fieldNumber.degree(0), 1)
    deepStrictEqual(F.fieldNumber.degree(1), 1)
    deepStrictEqual(F.fieldNumber.degree(2), 1)
  })
})
