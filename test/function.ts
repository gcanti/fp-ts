import * as assert from 'assert'
import * as _ from '../src/function'
import * as B from '../src/boolean'

const f = (n: number) => n + 1
const g = (n: number) => n * 2

describe('function', () => {
  it('flip', () => {
    const f = (a: number, b: string) => a - b.length
    assert.deepStrictEqual(_.flip(f)('aaa', 2), -1)
  })

  it('not', () => {
    const n = _.not(Boolean)
    assert.deepStrictEqual(n(false), true)
    assert.deepStrictEqual(n(1), false)
    assert.deepStrictEqual(n(''), true)
  })

  it('unsafeCoerce', () => {
    assert.deepStrictEqual(_.unsafeCoerce, _.identity)
  })

  it('constTrue', () => {
    assert.deepStrictEqual(_.constTrue(), true)
  })

  it('constFalse', () => {
    assert.deepStrictEqual(_.constFalse(), false)
  })

  it('constNull', () => {
    assert.deepStrictEqual(_.constNull(), null)
  })

  it('constUndefined', () => {
    assert.deepStrictEqual(_.constUndefined(), undefined)
  })

  it('constVoid', () => {
    assert.deepStrictEqual(_.constVoid(), undefined)
  })

  it('increment', () => {
    assert.deepStrictEqual(_.increment(2), 3)
  })

  it('decrement', () => {
    assert.deepStrictEqual(_.decrement(2), 1)
  })

  it('absurd', () => {
    assert.throws(() => _.absurd<string>((null as any) as never))
  })

  it('flow', () => {
    assert.deepStrictEqual(_.flow(f)(2), 3)
    assert.deepStrictEqual(_.flow(f, g)(2), 6)
    assert.deepStrictEqual(_.flow(f, g, f)(2), 7)
    assert.deepStrictEqual(_.flow(f, g, f, g)(2), 14)
    assert.deepStrictEqual(_.flow(f, g, f, g, f)(2), 15)
    assert.deepStrictEqual(_.flow(f, g, f, g, f, g)(2), 30)
    assert.deepStrictEqual(_.flow(f, g, f, g, f, g, f)(2), 31)
    assert.deepStrictEqual(_.flow(f, g, f, g, f, g, f, g)(2), 62)
    assert.deepStrictEqual(_.flow(f, g, f, g, f, g, f, g, f)(2), 63)
    // this is just to satisfy noImplicitReturns and 100% coverage
    assert.deepStrictEqual((_.flow as any)(...[f, g, f, g, f, g, f, g, f, g]), undefined)
  })

  it('tupled', () => {
    const f1 = (a: number): number => a * 2
    const f2 = (a: number, b: number): number => a + b
    const u1 = _.tupled(f1)
    const u2 = _.tupled(f2)
    assert.deepStrictEqual(u1([1]), 2)
    assert.deepStrictEqual(u2([1, 2]), 3)
  })

  it('untupled', () => {
    const f1 = (a: readonly [number]): number => a[0] * 2
    const f2 = (a: readonly [number, number]): number => a[0] + a[1]
    const u1 = _.untupled(f1)
    const u2 = _.untupled(f2)
    assert.deepStrictEqual(u1(1), 2)
    assert.deepStrictEqual(u2(1, 2), 3)
  })

  it('pipe', () => {
    const f = (n: number) => n + 1
    const g = (n: number) => n * 2
    assert.deepStrictEqual(_.pipe(2), 2)
    assert.deepStrictEqual(_.pipe(2, f), 3)
    assert.deepStrictEqual(_.pipe(2, f, g), 6)
    assert.deepStrictEqual(_.pipe(2, f, g, f), 7)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g), 14)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f), 15)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f, g), 30)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f), 31)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g), 62)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f), 63)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g), 126)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f), 127)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g), 254)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f), 255)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 510)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 511)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 1022)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 1023)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 2046)
    assert.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 2047)
    // this is just to satisfy noImplicitReturns and 100% coverage
    assert.deepStrictEqual(
      (_.pipe as any)(...[2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g]),
      undefined
    )
  })

  it('getBooleanAlgebra', () => {
    const BA = _.getBooleanAlgebra(B.BooleanAlgebra)<number>()
    const f = (n: number) => n >= 0
    const g = (n: number) => n < 2
    assert.deepStrictEqual(BA.implies(f, g)(1), true)
    assert.deepStrictEqual(BA.implies(f, g)(-1), true)

    assert.deepStrictEqual(BA.join(f, g)(1), true)
    assert.deepStrictEqual(BA.join(f, g)(-1), true)

    assert.deepStrictEqual(BA.meet(f, g)(1), true)
    assert.deepStrictEqual(BA.meet(f, g)(-1), false)

    assert.deepStrictEqual(BA.not(f)(1), false)
    assert.deepStrictEqual(BA.not(f)(-1), true)

    assert.deepStrictEqual(BA.one(1), true)
    assert.deepStrictEqual(BA.one(-1), true)
    assert.deepStrictEqual(BA.zero(1), false)
    assert.deepStrictEqual(BA.zero(-1), false)
  })
})
