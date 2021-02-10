import { pipe } from '../src/function'
import * as U from './util'
import * as O from '../src/Option'

describe('Functor', () => {
  it('flap', () => {
    const double = (n: number) => n * 2
    U.deepStrictEqual(pipe(O.some(double), O.flap(2)), O.some(4))
    U.deepStrictEqual(pipe(O.none, O.flap(2)), O.none)
  })
})
