import * as _ from '../src/Field'
import * as N from '../src/number'
import * as U from './util'

describe.concurrent('Field', () => {
  it('gcd', () => {
    const gcdNumber = _.gcd(N.Eq, N.Field)
    U.deepStrictEqual(gcdNumber(10, 5), 5)
    U.deepStrictEqual(gcdNumber(10, 2), 2)
    U.deepStrictEqual(gcdNumber(10, 3), 1)
  })

  it('lcm', () => {
    const lcmNumber = _.lcm(N.Eq, N.Field)
    U.deepStrictEqual(lcmNumber(4, 6), 12)
    U.deepStrictEqual(lcmNumber(4, 0), 0)
  })

  it('fieldNumber', () => {
    const F = _.fieldNumber
    U.deepStrictEqual(F.add(1, 2), 3)
    U.deepStrictEqual(F.div(4, 2), 2)
    U.deepStrictEqual(F.mod(4, 2), 0)
    U.deepStrictEqual(F.mul(4, 2), 8)
    U.deepStrictEqual(F.sub(3, 2), 1)
    U.deepStrictEqual(F.degree(0), 1)
    U.deepStrictEqual(F.degree(1), 1)
    U.deepStrictEqual(F.degree(2), 1)
  })
})
