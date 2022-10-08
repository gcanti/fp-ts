import * as _ from '@fp-ts/core/Endomorphism'
import { pipe } from '@fp-ts/core/Function'
import * as U from '@fp-ts/core/test/util'

describe('Endomorphism', () => {
  it('getMonoid', () => {
    const M = _.getMonoid<number>()
    const inc = (n: number) => n + 1
    const f = pipe(inc, M.combine(U.double))
    U.deepStrictEqual(f(3), 8)
  })
})
