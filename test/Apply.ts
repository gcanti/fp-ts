import {
  liftA2,
  liftA3,
  liftA4,
  applyFirst,
  applySecond
} from '../src/Apply'
import * as option from '../src/Option'
import * as either from '../src/Either'
import { eqOptions, eqEithers } from './helpers'

describe('Apply', () => {

  it('applyFirst', () => {
    eqOptions(applyFirst(option)(option.some(5), option.some(6)), option.some(5))
  })

  it('applySecond', () => {
    eqOptions(applySecond(option)(option.some(5), option.some(6)), option.some(6))
  })

  it('liftA2', () => {
    const f = (a: number) => (b: number) => a + b
    eqOptions(liftA2(option, f)(option.some(2), option.some(3)), option.some(5))
    eqEithers(liftA2(either, f)(either.right(2), either.right(3)), either.right(5))
  })

  it('liftA3', () => {
    const f = (a: number) => (b: number) => (c: number) => a + b + c
    eqOptions(liftA3(option, f)(option.some(2), option.some(3), option.some(4)), option.some(9))
    eqEithers(liftA3(either, f)(either.right(2), either.right(3), either.right(4)), either.right(9))
  })

  it('liftA4', () => {
    const f = (a: number) => (b: number) => (c: number) => (d: number) => a + b + c + d
    eqOptions(liftA4(option, f)(option.some(2), option.some(3), option.some(4), option.some(5)), option.some(14))
    eqEithers(liftA4(either, f)(either.right(2), either.right(3), either.right(4), either.right(5)), either.right(14))
  })

})
