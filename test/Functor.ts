import { getFunctorComposition } from '../src/Functor'
import * as option from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as U from './util'

describe.concurrent('Functor', () => {
  it('getFunctorComposition', () => {
    const arrayOption = getFunctorComposition(RA.Functor, option.Functor)
    U.deepStrictEqual(arrayOption.map([option.some(1)], U.double), [option.some(2)])
  })
})
