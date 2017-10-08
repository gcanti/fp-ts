import { liftA2, liftA3, liftA4, applyFirst, applySecond } from '../src/Apply'
import * as option from '../src/Option'
import * as either from '../src/Either'
import { eqOptions, eqEithers } from './helpers'

describe('Apply', () => {
  const r1 = either.right<string, number>(1)
  const r2 = either.right<string, number>(2)
  const foo = either.left<string, number>('foo')
  const bar = either.left<string, number>('bar')

  it('applyFirst', () => {
    eqOptions(applyFirst(option)(option.some(5))(option.some(6)), option.some(5))
    eqOptions(applyFirst(option)(option.some(5))(option.empty()), option.empty())
    eqOptions(applyFirst(option)(option.empty())(option.some(6)), option.empty())

    eqEithers(applyFirst(either)(r1)(r2), r1)
    eqEithers(applyFirst(either)(foo)(r1), foo)
    eqEithers(applyFirst(either)(r1)(foo), foo)
    eqEithers(applyFirst(either)(foo)(bar), foo)
  })

  it('applySecond', () => {
    eqOptions(applySecond(option)(option.some(5))(option.some(6)), option.some(6))
    eqOptions(applySecond(option)(option.some(5))(option.empty()), option.empty())
    eqOptions(applySecond(option)(option.empty())(option.some(6)), option.empty())

    eqEithers(applySecond(either)(r1)(r2), r2)
    eqEithers(applySecond(either)(foo)(r1), foo)
    eqEithers(applySecond(either)(r1)(foo), foo)
    eqEithers(applySecond(either)(foo)(bar), foo)
  })

  it('liftA2', () => {
    const f = (a: number) => (b: number) => a + b
    eqOptions(liftA2(option)(f)(option.some(2))(option.some(3)), option.some(5))
    eqEithers(liftA2(either)(f)(r2)(either.right(3)), either.right(5))
  })

  it('liftA3', () => {
    const f = (a: number) => (b: number) => (c: number) => a + b + c
    eqOptions(liftA3(option)(f)(option.some(2))(option.some(3))(option.some(4)), option.some(9))
    eqEithers(liftA3(either)(f)(r2)(either.right(3))(either.right(4)), either.right(9))
  })

  it('liftA4', () => {
    const f = (a: number) => (b: number) => (c: number) => (d: number) => a + b + c + d
    const optionf = liftA4(option)(f)
    eqOptions(optionf(option.some(2))(option.some(3))(option.some(4))(option.some(5)), option.some(14))
    const eitherf = liftA4(either)(f)
    eqEithers(eitherf(r2)(either.right(3))(either.right(4))(either.right(5)), either.right(14))
  })

  it('ap_', () => {
    const f = (a: number) => (b: number) => a + b
    eqOptions(
      option
        .of(f)
        .ap_(option.some(2))
        .ap_(option.some(3)),
      option.some(5)
    )
  })
})
