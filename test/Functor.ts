import * as option from '../src/Option'
import { ops } from '../src/Functor'
import { eqOptions as eq } from './helpers'

describe('Functor', () => {

  it('lift', () => {
    const f = (a: number) => a * 2
    const liftedF = ops.lift(option, f)
    const actual = liftedF(option.some(2))
    eq(actual, option.some(4))
  })

})
