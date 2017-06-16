import * as assert from 'assert'
import * as option from '../src/Option'
import * as array from '../src/Array'
import { lift, getCompositionFunctor, voidRight, voidLeft } from '../src/Functor'
import { eqOptions as eq } from './helpers'

declare module '../src/HKT' {
  interface HKT<A> {
    'Array<Option>': Array<option.Option<A>>
  }
}

describe('Functor', () => {
  it('lift', () => {
    const double = (a: number) => a * 2
    const f = lift(option, double)
    const actual = f(option.some(2))
    eq(actual, option.some(4))
  })

  it('getCompositionFunctor', () => {
    const arrayOption = getCompositionFunctor('Array<Option>', array, option)
    const double = (a: number) => a * 2
    assert.deepEqual(arrayOption.map(double, [option.some(1)]), [option.some(2)])
  })

  it('voidRight', () => {
    assert.deepEqual(voidRight(option, 1, option.some('a')), option.some(1))
  })

  it('voidLeft', () => {
    assert.deepEqual(voidLeft(option, option.some(1), 'a'), option.some('a'))
  })
})
