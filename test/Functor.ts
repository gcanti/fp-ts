import * as option from '../src/Option'
import * as arr from '../src/Arr'
import { compose, lift } from '../src/Functor'
import { from, to } from '../src/HKT'
import { eqOptions as eq } from './helpers'

describe('Functor', () => {

  it('lift', () => {
    const f = (a: number) => a * 2
    const liftedF = lift(option, f)
    const actual = liftedF(option.some(2))
    eq(actual, option.some(4))
  })

  it('compose', () => {
    const optionOfArr = compose(option, arr)
    const fasome = to(option.some(arr.to([1, 2, 3])))
    const fanone = to<'Option', 'Arr', any>(option.none)
    const f = (n: number) => n * 2
    eq(from(optionOfArr.map(f, fasome)), option.some(arr.to([2, 4, 6])))
    eq(from(optionOfArr.map(f, fanone)), option.none)
  })

})
