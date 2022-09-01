import * as U from './util'
import * as RA from '../src/ReadonlyArray'
import { getFunctorComposition } from '../src/Functor'
import * as option from '../src/Option'

describe('Functor', () => {
  it('getFunctorComposition', () => {
    const arrayOption = getFunctorComposition(RA.Functor, option.Functor)
    U.deepStrictEqual(arrayOption.map([option.some(1)], U.double), [option.some(2)])
  })
})
