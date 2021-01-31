import * as F from '../src/Field'
import { pipe } from '../src/function'
import * as N from '../src/number'
import { deepStrictEqual } from './util'

describe('Field', () => {
  it('gcd', () => {
    const gcd = F.gcd(N.Eq, N.Field)
    deepStrictEqual(pipe(10, gcd(5)), 5)
    deepStrictEqual(pipe(10, gcd(2)), 2)
    deepStrictEqual(pipe(10, gcd(3)), 1)
  })

  it('lcm', () => {
    const lcm = F.lcm(N.Eq, N.Field)
    deepStrictEqual(pipe(4, lcm(6)), 12)
    deepStrictEqual(pipe(4, lcm(0)), 0)
  })

  it('fieldNumber', () => {
    deepStrictEqual(N.Field.degree(0), 1)
    deepStrictEqual(N.Field.degree(1), 1)
    deepStrictEqual(N.Field.degree(2), 1)
  })
})
