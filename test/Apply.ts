import * as assert from 'assert'
import { applyFirst, applySecond, liftA2, liftA3, liftA4 } from '../src/Apply'
import { either, left, right } from '../src/Either'
import { none, option, some } from '../src/Option'

describe('Apply', () => {
  const r1 = right<string, number>(1)
  const r2 = right<string, number>(2)
  const foo = left<string, number>('foo')
  const bar = left<string, number>('bar')

  it('applyFirst', () => {
    assert.deepEqual(applyFirst(option)(some(5), some(6)), some(5))
    assert.deepEqual(applyFirst(option)(some(5), none), none)
    assert.deepEqual(applyFirst(option)(none, some(6)), none)

    assert.deepEqual(applyFirst(either)(r1, r2), r1)
    assert.deepEqual(applyFirst(either)(foo, r1), foo)
    assert.deepEqual(applyFirst(either)(r1, foo), foo)
    assert.deepEqual(applyFirst(either)(foo, bar), foo)
  })

  it('applySecond', () => {
    assert.deepEqual(applySecond(option)(some(5), some(6)), some(6))
    assert.deepEqual(applySecond(option)(some(5), none), none)
    assert.deepEqual(applySecond(option)(none, some(6)), none)

    assert.deepEqual(applySecond(either)(r1, r2), r2)
    assert.deepEqual(applySecond(either)(foo, r1), foo)
    assert.deepEqual(applySecond(either)(r1, foo), foo)
    assert.deepEqual(applySecond(either)(foo, bar), foo)
  })

  it('liftA2', () => {
    const f = (a: number) => (b: number) => a + b
    assert.deepEqual(liftA2(option)(f)(some(2))(some(3)), some(5))
    assert.deepEqual(liftA2(either)(f)(r2)(right(3)), right(5))
  })

  it('liftA3', () => {
    const f = (a: number) => (b: number) => (c: number) => a + b + c
    assert.deepEqual(liftA3(option)(f)(some(2))(some(3))(some(4)), some(9))
    assert.deepEqual(liftA3(either)(f)(r2)(right(3))(right(4)), right(9))
  })

  it('liftA4', () => {
    const f = (a: number) => (b: number) => (c: number) => (d: number) => a + b + c + d
    const optionf = liftA4(option)(f)
    assert.deepEqual(optionf(some(2))(some(3))(some(4))(some(5)), some(14))
    const eitherf = liftA4(either)(f)
    assert.deepEqual(eitherf(r2)(right(3))(right(4))(right(5)), right(14))
  })

  it('ap_', () => {
    const f = (a: number) => (b: number) => a + b
    assert.deepEqual(
      option
        .of(f)
        .ap_(some(2))
        .ap_(some(3)),
      some(5)
    )
  })
})
