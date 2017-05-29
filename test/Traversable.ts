import {
  getCompositionStaticTraversable
} from '../src/Traversable'
import * as array from '../src/Array'
import * as option from '../src/Option'
import { eqOptions as eq } from './helpers'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

declare module '../src/HKT' {
  interface HKT<A> {
    ArrayOption: Array<option.Option<A>>
  }
}

describe('Traversable', () => {

  it('getStaticTraversableComposition', () => {
    const arrayOptionTraversable = getCompositionStaticTraversable(ArrayOptionURI, array, option)
    eq(arrayOptionTraversable.traverse(option)(n => n <= 2 ? option.some(n * 2) : option.none, [option.some(1), option.some(2)]), option.some([option.some(2), option.some(4)]))
    eq(arrayOptionTraversable.traverse(option)(n => n <= 2 ? option.some(n * 2) : option.none, [option.some(1), option.some(3)]), option.none)
  })

})
