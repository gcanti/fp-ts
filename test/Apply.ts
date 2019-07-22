import * as assert from 'assert'
import { applyFirst, applySecond, liftA2, liftA3, liftA4, sequenceS, sequenceT } from '../src/Apply'
import { array } from '../src/Array'
import { either, left, right } from '../src/Either'
import { none, option, some } from '../src/Option'
import { pipe } from '../src/pipeable'

describe('Apply', () => {
  const r1 = right<string, number>(1)
  const r2 = right<string, number>(2)
  const foo = left<string, number>('foo')
  const bar = left<string, number>('bar')

  it('applyFirst', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(applyFirst(option)(some(5), some(6)), some(5))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(applyFirst(option)(some(5), none), none)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(applyFirst(option)(none, some(6)), none)

    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(applyFirst(either)(r1, r2), r1)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(applyFirst(either)(foo, r1), foo)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(applyFirst(either)(r1, foo), foo)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(applyFirst(either)(foo, bar), foo)
  })

  it('applySecond', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(applySecond(option)(some(5), some(6)), some(6))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(applySecond(option)(some(5), none), none)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(applySecond(option)(none, some(6)), none)

    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(applySecond(either)(r1, r2), r2)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(applySecond(either)(foo, r1), foo)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(applySecond(either)(r1, foo), foo)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(applySecond(either)(foo, bar), foo)
  })

  it('liftA2', () => {
    const f = (a: number) => (b: number) => a + b
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(liftA2(option)(f)(some(2))(some(3)), some(5))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(liftA2(either)(f)(r2)(right(3)), right(5))
  })

  it('liftA3', () => {
    const f = (a: number) => (b: number) => (c: number) => a + b + c
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(liftA3(option)(f)(some(2))(some(3))(some(4)), some(9))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(liftA3(either)(f)(r2)(right(3))(right(4)), right(9))
  })

  it('liftA4', () => {
    const f = (a: number) => (b: number) => (c: number) => (d: number) => a + b + c + d
    // tslint:disable-next-line: deprecation
    const optionf = liftA4(option)(f)
    assert.deepStrictEqual(optionf(some(2))(some(3))(some(4))(some(5)), some(14))
    // tslint:disable-next-line: deprecation
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
    assert.deepStrictEqual(sequenceTOption(some(1)), some([1]))
    assert.deepStrictEqual(sequenceTOption(some(1), some('2')), some([1, '2']))
    assert.deepStrictEqual(sequenceTOption(some(1), some('2'), none), none)

    // #914
    const a1 = [1, 2, 3]
    const a2 = ['a', 'b', 'c']
    const a3 = [true, false]
    assert.deepStrictEqual(
      pipe(
        sequenceT(array)(a1, a2, a3),
        arr => arr.map(([x, y, z]) => `(${x}, ${y}, ${z})`)
      ),
      [
        '(1, a, true)',
        '(1, a, false)',
        '(1, b, true)',
        '(1, b, false)',
        '(1, c, true)',
        '(1, c, false)',
        '(2, a, true)',
        '(2, a, false)',
        '(2, b, true)',
        '(2, b, false)',
        '(2, c, true)',
        '(2, c, false)',
        '(3, a, true)',
        '(3, a, false)',
        '(3, b, true)',
        '(3, b, false)',
        '(3, c, true)',
        '(3, c, false)'
      ]
    )
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

    // #914
    const a1 = [1, 2, 3]
    const a2 = ['a', 'b', 'c']
    const a3 = [true, false]
    assert.deepStrictEqual(
      pipe(
        sequenceS(array)({ a1, a2, a3 }),
        arr => arr.map(({ a1, a2, a3 }) => `(${a1}, ${a2}, ${a3})`)
      ),
      [
        '(1, a, true)',
        '(1, a, false)',
        '(1, b, true)',
        '(1, b, false)',
        '(1, c, true)',
        '(1, c, false)',
        '(2, a, true)',
        '(2, a, false)',
        '(2, b, true)',
        '(2, b, false)',
        '(2, c, true)',
        '(2, c, false)',
        '(3, a, true)',
        '(3, a, false)',
        '(3, b, true)',
        '(3, b, false)',
        '(3, c, true)',
        '(3, c, false)'
      ]
    )
  })
})
