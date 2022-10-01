import { reverse } from '../src/BooleanAlgebra'
import { pipe } from '../src/f'
import { deepStrictEqual } from './util'
import * as B from '../src/boolean'

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
