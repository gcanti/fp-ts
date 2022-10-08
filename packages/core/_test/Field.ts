import * as F from '@fp-ts/core/Field'
import { pipe } from '@fp-ts/core/Function'
import * as N from '@fp-ts/core/number'
import { deepStrictEqual } from '@fp-ts/core/test/util'

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
