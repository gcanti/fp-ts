import { pipe } from '@fp-ts/core/Function'
import * as O from '@fp-ts/core/Option'
import * as U from '@fp-ts/core/test/util'

describe('Functor', () => {
  it('flap', () => {
    U.deepStrictEqual(pipe(O.some(U.double), O.flap(2)), O.some(4))
    U.deepStrictEqual(pipe(O.none, O.flap(2)), O.none)
  })
})
