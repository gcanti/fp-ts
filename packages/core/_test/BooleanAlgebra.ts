import * as B from '@fp-ts/core/boolean'
import { reverse } from '@fp-ts/core/BooleanAlgebra'
import { pipe } from '@fp-ts/core/Function'
import { deepStrictEqual } from '@fp-ts/core/test/util'

describe('BooleanAlgebra', () => {
  it('reverse', () => {
    const BA = reverse(B.BooleanAlgebra)
    deepStrictEqual(pipe(true, BA.implies(true)), true)
    deepStrictEqual(pipe(true, BA.implies(false)), false)
    deepStrictEqual(pipe(false, BA.implies(true)), true)
    deepStrictEqual(pipe(false, BA.implies(false)), true)

    deepStrictEqual(pipe(true, BA.join(true)), true)
    deepStrictEqual(pipe(true, BA.join(false)), false)
    deepStrictEqual(pipe(false, BA.join(true)), false)
    deepStrictEqual(pipe(false, BA.join(false)), false)

    deepStrictEqual(pipe(true, BA.meet(true)), true)
    deepStrictEqual(pipe(true, BA.meet(false)), true)

    deepStrictEqual(BA.not(true), false)
    deepStrictEqual(BA.not(false), true)

    deepStrictEqual(BA.one, false)
    deepStrictEqual(BA.zero, true)
  })
})
