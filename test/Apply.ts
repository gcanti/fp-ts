import {
  ops
} from '../src/Apply'
import * as option from '../src/Option'
import * as either from '../src/Either'
import { eqOptions, eqEithers } from './helpers'

describe('Apply', () => {

  it('liftA2', () => {
    const f = (a: number) => (b: number) => a + b
    eqOptions(ops.liftA2(option, f)(option.some(2), option.some(3)), option.some(5))
    eqEithers(ops.liftA2(either, f)(either.right(2), either.right(3)), either.right(5))
  })
})
