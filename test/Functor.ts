import * as option from '../src/Option'
import { lift } from '../src/Functor'
import { eqOptions as eq } from './helpers'

describe('Functor', () => {

  it('lift', () => {
    const double = (a: number) => a * 2
    const f = lift(option, double)
    const actual = f(option.some(2))
    eq(actual, option.some(4))
  })

})
