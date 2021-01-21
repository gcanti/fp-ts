import * as assert from 'assert'
import {
  absurd,
  constFalse,
  constNull,
  constTrue,
  constUndefined,
  constVoid,
  decrement,
  flip,
  flow,
  identity,
  increment,
  not,
  pipe,
  tupled,
  unsafeCoerce,
  untupled
} from '../src/function'
import { deepStrictEqual } from './util'

const f = (n: number) => n + 1
const g = (n: number) => n * 2

describe('function', () => {
  it('flip', () => {
    const f = (a: number, b: string) => a - b.length
    deepStrictEqual(flip(f)('aaa', 2), -1)
  })

  it('not', () => {
    const n = not(Boolean)
    deepStrictEqual(n(false), true)
    deepStrictEqual(n(1), false)
    deepStrictEqual(n(''), true)
  })

  it('unsafeCoerce', () => {
    deepStrictEqual(unsafeCoerce, identity)
  })

  it('constTrue', () => {
    deepStrictEqual(constTrue(), true)
  })

  it('constFalse', () => {
    deepStrictEqual(constFalse(), false)
  })

  it('constNull', () => {
    deepStrictEqual(constNull(), null)
  })

  it('constUndefined', () => {
    deepStrictEqual(constUndefined(), undefined)
  })

  it('constVoid', () => {
    deepStrictEqual(constVoid(), undefined)
  })

  it('increment', () => {
    deepStrictEqual(increment(2), 3)
  })

  it('decrement', () => {
    deepStrictEqual(decrement(2), 1)
  })

  it('absurd', () => {
    assert.throws(() => absurd<string>((null as any) as never))
  })

  it('flow', () => {
    deepStrictEqual(flow(f)(2), 3)
    deepStrictEqual(flow(f, g)(2), 6)
    deepStrictEqual(flow(f, g, f)(2), 7)
    deepStrictEqual(flow(f, g, f, g)(2), 14)
    deepStrictEqual(flow(f, g, f, g, f)(2), 15)
    deepStrictEqual(flow(f, g, f, g, f, g)(2), 30)
    deepStrictEqual(flow(f, g, f, g, f, g, f)(2), 31)
    deepStrictEqual(flow(f, g, f, g, f, g, f, g)(2), 62)
    deepStrictEqual(flow(f, g, f, g, f, g, f, g, f)(2), 63)
    // this is just to satisfy noImplicitReturns and 100% coverage
    deepStrictEqual((flow as any)(...[f, g, f, g, f, g, f, g, f, g]), undefined)
  })

  it('tupled', () => {
    const f1 = (a: number): number => a * 2
    const f2 = (a: number, b: number): number => a + b
    const u1 = tupled(f1)
    const u2 = tupled(f2)
    deepStrictEqual(u1([1]), 2)
    deepStrictEqual(u2([1, 2]), 3)
  })

  it('untupled', () => {
    const f1 = (a: readonly [number]): number => a[0] * 2
    const f2 = (a: readonly [number, number]): number => a[0] + a[1]
    const u1 = untupled(f1)
    const u2 = untupled(f2)
    deepStrictEqual(u1(1), 2)
    deepStrictEqual(u2(1, 2), 3)
  })

  it('pipe', () => {
    const f = (n: number) => n + 1
    const g = (n: number) => n * 2
    deepStrictEqual(pipe(2), 2)
    deepStrictEqual(pipe(2, f), 3)
    deepStrictEqual(pipe(2, f, g), 6)
    deepStrictEqual(pipe(2, f, g, f), 7)
    deepStrictEqual(pipe(2, f, g, f, g), 14)
    deepStrictEqual(pipe(2, f, g, f, g, f), 15)
    deepStrictEqual(pipe(2, f, g, f, g, f, g), 30)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f), 31)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g), 62)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f), 63)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g), 126)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f), 127)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g), 254)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f), 255)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 510)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 511)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 1022)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 1023)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 2046)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 2047)
    // this is just to satisfy noImplicitReturns and 100% coverage
    deepStrictEqual((pipe as any)(...[2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g]), undefined)
  })
})
