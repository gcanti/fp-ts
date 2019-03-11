import * as assert from 'assert'
import { applyFirst, applySecond, liftA2, liftA3, liftA4, sequenceT, sequenceS } from '../src/Apply'
import { either, left, right } from '../src/Either'
import { none, option, some } from '../src/Option'

describe('Apply', () => {
  const r1 = right<string, number>(1)
  const r2 = right<string, number>(2)
  const foo = left<string, number>('foo')
  const bar = left<string, number>('bar')

  it('applyFirst', () => {
    assert.deepStrictEqual(applyFirst(option)(some(5), some(6)), some(5))
    assert.deepStrictEqual(applyFirst(option)(some(5), none), none)
    assert.deepStrictEqual(applyFirst(option)(none, some(6)), none)

    assert.deepStrictEqual(applyFirst(either)(r1, r2), r1)
    assert.deepStrictEqual(applyFirst(either)(foo, r1), foo)
    assert.deepStrictEqual(applyFirst(either)(r1, foo), foo)
    assert.deepStrictEqual(applyFirst(either)(foo, bar), foo)
  })

  it('applySecond', () => {
    assert.deepStrictEqual(applySecond(option)(some(5), some(6)), some(6))
    assert.deepStrictEqual(applySecond(option)(some(5), none), none)
    assert.deepStrictEqual(applySecond(option)(none, some(6)), none)

    assert.deepStrictEqual(applySecond(either)(r1, r2), r2)
    assert.deepStrictEqual(applySecond(either)(foo, r1), foo)
    assert.deepStrictEqual(applySecond(either)(r1, foo), foo)
    assert.deepStrictEqual(applySecond(either)(foo, bar), foo)
  })

  it('liftA2', () => {
    const f = (a: number) => (b: number) => a + b
    assert.deepStrictEqual(liftA2(option)(f)(some(2))(some(3)), some(5))
    assert.deepStrictEqual(liftA2(either)(f)(r2)(right(3)), right(5))
  })

  it('liftA3', () => {
    const f = (a: number) => (b: number) => (c: number) => a + b + c
    assert.deepStrictEqual(liftA3(option)(f)(some(2))(some(3))(some(4)), some(9))
    assert.deepStrictEqual(liftA3(either)(f)(r2)(right(3))(right(4)), right(9))
  })

  it('liftA4', () => {
    const f = (a: number) => (b: number) => (c: number) => (d: number) => a + b + c + d
    const optionf = liftA4(option)(f)
    assert.deepStrictEqual(optionf(some(2))(some(3))(some(4))(some(5)), some(14))
    const eitherf = liftA4(either)(f)
    assert.deepStrictEqual(eitherf(r2)(right(3))(right(4))(right(5)), right(14))
  })

  it('ap_', () => {
    const f = (a: number) => (b: number) => a + b
    assert.deepStrictEqual(
      option
        .of(f)
        .ap_(some(2))
        .ap_(some(3)),
      some(5)
    )
  })

  it('sequenceT', () => {
    const sequenceTOption = sequenceT(option)
    const sequenceTEither = sequenceT(either)
    assert.deepStrictEqual(sequenceTOption(some(1)), some([1]))
    assert.deepStrictEqual(sequenceTOption(some(1), some('2')), some([1, '2']))
    assert.deepStrictEqual(sequenceTOption(some(1), some('2'), none), none)
    assert.deepStrictEqual(sequenceTEither(right(1)), right([1]))
    assert.deepStrictEqual(sequenceTEither(right(1), right('2')), right([1, '2']))
    assert.deepStrictEqual(sequenceTEither(right(1), right('2'), left('foo')), left('foo'))
  })

  it('sequenceS', () => {
    const adoOption = sequenceS(option)
    assert.deepStrictEqual(adoOption({ a: some(1) }), some({ a: 1 }))
    assert.deepStrictEqual(adoOption({ a: some(1), b: some(2) }), some({ a: 1, b: 2 }))
    assert.deepStrictEqual(adoOption({ a: some(1), b: none }), none)

    const adoEither = sequenceS(either)
    assert.deepStrictEqual(adoEither({ a: right(1) }), right({ a: 1 }))
    assert.deepStrictEqual(adoEither({ a: right(1), b: right(2) }), right({ a: 1, b: 2 }))
    assert.deepStrictEqual(adoEither({ a: right(1), b: left('error') }), left('error'))
  })
})
