import * as U from './util'
import { gcd, lcm } from '../src/Field'
import * as N from '../src/number'

describe('Field', () => {
  it('gcd', () => {
    const gcdNumber = gcd(N.Eq, N.Field)
    U.deepStrictEqual(gcdNumber(10, 5), 5)
    U.deepStrictEqual(gcdNumber(10, 2), 2)
    U.deepStrictEqual(gcdNumber(10, 3), 1)
  })

  it('lcm', () => {
    const lcmNumber = lcm(N.Eq, N.Field)
    U.deepStrictEqual(lcmNumber(4, 6), 12)
    U.deepStrictEqual(lcmNumber(4, 0), 0)
  })
})
