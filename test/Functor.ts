import { pipe } from '../src/function'
import * as U from './util'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/Functor'

describe('Functor', () => {
  it('map', () => {
    const map = _.map(RA.Functor, O.Functor)
  })

  it('flap', () => {
    U.deepStrictEqual(pipe(O.some(U.double), O.flap(2)), O.some(4))
    U.deepStrictEqual(pipe(O.none, O.flap(2)), O.none)
  })
})
