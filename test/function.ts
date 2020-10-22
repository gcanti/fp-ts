import * as assert from 'assert'
import {
  constFalse,
  constNull,
  constTrue,
  constUndefined,
  constVoid,
  decrement,
  flip,
  identity,
  increment,
  not,
  unsafeCoerce,
  absurd,
  flow,
  tupled,
  untupled,
  pipe
} from '../src/function'

const f = (n: number) => n + 1
const g = (n: number) => n * 2

describe('function', () => {
  it('flip', () => {
    const f = (a: number, b: string) => a - b.length
    assert.deepStrictEqual(flip(f)('aaa', 2), -1)
  })

  it('not', () => {
    const n = not(Boolean)
    assert.deepStrictEqual(n(false), true)
    assert.deepStrictEqual(n(1), false)
    assert.deepStrictEqual(n(''), true)
  })

  it('unsafeCoerce', () => {
    assert.deepStrictEqual(unsafeCoerce, identity)
  })

  it('constTrue', () => {
    assert.deepStrictEqual(constTrue(), true)
  })

  it('constFalse', () => {
    assert.deepStrictEqual(constFalse(), false)
  })

  it('constNull', () => {
    assert.deepStrictEqual(constNull(), null)
  })

  it('constUndefined', () => {
    assert.deepStrictEqual(constUndefined(), undefined)
  })

  it('constVoid', () => {
    assert.deepStrictEqual(constVoid(), undefined)
  })

  it('increment', () => {
    assert.deepStrictEqual(increment(2), 3)
  })

  it('decrement', () => {
    assert.deepStrictEqual(decrement(2), 1)
  })

  it('absurd', () => {
    assert.throws(() => absurd<string>((null as any) as never))
  })

  it('flow', () => {
    assert.deepStrictEqual(flow(f)(2), 3)
    assert.deepStrictEqual(flow(f, g)(2), 6)
    assert.deepStrictEqual(flow(f, g, f)(2), 7)
    assert.deepStrictEqual(flow(f, g, f, g)(2), 14)
    assert.deepStrictEqual(flow(f, g, f, g, f)(2), 15)
    assert.deepStrictEqual(flow(f, g, f, g, f, g)(2), 30)
    assert.deepStrictEqual(flow(f, g, f, g, f, g, f)(2), 31)
    assert.deepStrictEqual(flow(f, g, f, g, f, g, f, g)(2), 62)
    assert.deepStrictEqual(flow(f, g, f, g, f, g, f, g, f)(2), 63)
    // this is just to satisfy noImplicitReturns and 100% coverage
    assert.deepStrictEqual((flow as any)(...[f, g, f, g, f, g, f, g, f, g]), undefined)
  })

  it('tupled', () => {
    const f1 = (a: number): number => a * 2
    const f2 = (a: number, b: number): number => a + b
    const u1 = tupled(f1)
    const u2 = tupled(f2)
    assert.deepStrictEqual(u1([1]), 2)
    assert.deepStrictEqual(u2([1, 2]), 3)
  })

  it('untupled', () => {
    const f1 = (a: readonly [number]): number => a[0] * 2
    const f2 = (a: readonly [number, number]): number => a[0] + a[1]
    const u1 = untupled(f1)
    const u2 = untupled(f2)
    assert.deepStrictEqual(u1(1), 2)
    assert.deepStrictEqual(u2(1, 2), 3)
  })

  it('pipe', () => {
    const f = (n: number) => n + 1
    const g = (n: number) => n * 2
    assert.deepStrictEqual(pipe(2), 2)
    assert.deepStrictEqual(pipe(2, f), 3)
    assert.deepStrictEqual(pipe(2, f, g), 6)
    assert.deepStrictEqual(pipe(2, f, g, f), 7)
    assert.deepStrictEqual(pipe(2, f, g, f, g), 14)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f), 15)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f, g), 30)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f, g, f), 31)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g), 62)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f), 63)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g), 126)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f), 127)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g), 254)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f), 255)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 510)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 511)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 1022)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 1023)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 2046)
    assert.deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 2047)
    // this is just to satisfy noImplicitReturns and 100% coverage
    assert.deepStrictEqual((pipe as any)(...[2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g]), undefined)
  })
})
