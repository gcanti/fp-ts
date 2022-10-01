import { pipe } from '../src/Function'
import * as U from './util'
import * as O from '../src/Option'

describe('Functor', () => {
  it('flap', () => {
    U.deepStrictEqual(pipe(O.some(U.double), O.flap(2)), O.some(4))
    U.deepStrictEqual(pipe(O.none, O.flap(2)), O.none)
  })
})
