import * as option from '../src/Option'
import * as arr from '../src/Arr'
import { compose } from '../src/Functor'
import { from, to } from '../src/HKT'
import { eqOptions as eq } from './helpers'

describe('Functor', () => {

  it('compose', () => {
    const optionOfArr = compose(option, arr)
    const fasome = to(option.some(arr.to([1, 2, 3])))
    const fanone = to<'Option', 'Arr', any>(option.none)
    const f = (n: number) => n * 2
    eq(option.as(from(optionOfArr.map(f, fasome))), option.some(arr.to([2, 4, 6])))
    eq(option.as(from(optionOfArr.map(f, fanone))), option.none)
  })

})
