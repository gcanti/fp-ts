import * as assert from 'assert'
import * as RA from '../src/ReadonlyArray'
import { getFunctorComposition } from '../src/Functor'
import * as option from '../src/Option'

describe('Functor', () => {
  it('getFunctorComposition', () => {
    // tslint:disable-next-line: deprecation
    const arrayOption = getFunctorComposition(RA.Functor, option.Functor)
    const double = (a: number) => a * 2
    assert.deepStrictEqual(arrayOption.map([option.some(1)], double), [option.some(2)])
  })
})
