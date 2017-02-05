import * as option from '../src/Option'
import { lift } from '../src/Functor'
import { eqOptions as eq } from './helpers'

describe('Functor', () => {

  it('lift', () => {
    const f = (a: number) => a * 2
    const liftedF = lift(option, f)
    const actual = liftedF(option.some(2))
    eq(actual, option.some(4))
  })

})
