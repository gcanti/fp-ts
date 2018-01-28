import * as assert from 'assert'
import { liftA2, liftA3, liftA4, applyFirst, applySecond } from '../src/Apply'
import * as option from '../src/Option'
import * as either from '../src/Either'

describe('Apply', () => {
  const r1 = either.right<string, number>(1)
  const r2 = either.right<string, number>(2)
  const foo = either.left<string, number>('foo')
  const bar = either.left<string, number>('bar')

  it('applyFirst', () => {
    assert.deepEqual(applyFirst(option)(option.some(5), option.some(6)), option.some(5))
    assert.deepEqual(applyFirst(option)(option.some(5), option.empty()), option.empty())
    assert.deepEqual(applyFirst(option)(option.empty(), option.some(6)), option.empty())

    assert.deepEqual(applyFirst(either)(r1, r2), r1)
    assert.deepEqual(applyFirst(either)(foo, r1), foo)
    assert.deepEqual(applyFirst(either)(r1, foo), foo)
    assert.deepEqual(applyFirst(either)(foo, bar), foo)
  })

  it('applySecond', () => {
    assert.deepEqual(applySecond(option)(option.some(5))(option.some(6)), option.some(6))
    assert.deepEqual(applySecond(option)(option.some(5))(option.empty()), option.empty())
    assert.deepEqual(applySecond(option)(option.empty())(option.some(6)), option.empty())

    assert.deepEqual(applySecond(either)(r1)(r2), r2)
    assert.deepEqual(applySecond(either)(foo)(r1), foo)
    assert.deepEqual(applySecond(either)(r1)(foo), foo)
    assert.deepEqual(applySecond(either)(foo)(bar), foo)
  })

  it('liftA2', () => {
    const f = (a: number) => (b: number) => a + b
    assert.deepEqual(liftA2(option)(f)(option.some(2))(option.some(3)), option.some(5))
    assert.deepEqual(liftA2(either)(f)(r2)(either.right(3)), either.right(5))
  })

  it('liftA3', () => {
    const f = (a: number) => (b: number) => (c: number) => a + b + c
    assert.deepEqual(liftA3(option)(f)(option.some(2))(option.some(3))(option.some(4)), option.some(9))
    assert.deepEqual(liftA3(either)(f)(r2)(either.right(3))(either.right(4)), either.right(9))
  })

  it('liftA4', () => {
    const f = (a: number) => (b: number) => (c: number) => (d: number) => a + b + c + d
    const optionf = liftA4(option)(f)
    assert.deepEqual(optionf(option.some(2))(option.some(3))(option.some(4))(option.some(5)), option.some(14))
    const eitherf = liftA4(either)(f)
    assert.deepEqual(eitherf(r2)(either.right(3))(either.right(4))(either.right(5)), either.right(14))
  })

  it('ap_', () => {
    const f = (a: number) => (b: number) => a + b
    assert.deepEqual(
      option
        .of(f)
        .ap_(option.some(2))
        .ap_(option.some(3)),
      option.some(5)
    )
  })
})
