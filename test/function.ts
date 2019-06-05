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
  flow
} from '../src/function'

const f = (n: number) => n + 1
const g = (n: number) => n * 2

describe('function', () => {
  it('flip', () => {
    const f = (a: number, b: string) => a - b.length
    assert.strictEqual(flip(f)('aaa', 2), -1)
  })

  it('not', () => {
    const n = not(Boolean)
    assert.strictEqual(n(false), true)
    assert.strictEqual(n(1), false)
    assert.strictEqual(n(''), true)
  })

  it('unsafeCoerce', () => {
    assert.strictEqual(unsafeCoerce, identity)
  })

  it('constTrue', () => {
    assert.strictEqual(constTrue(), true)
  })

  it('constFalse', () => {
    assert.strictEqual(constFalse(), false)
  })

  it('constNull', () => {
    assert.strictEqual(constNull(), null)
  })

  it('constUndefined', () => {
    assert.strictEqual(constUndefined(), undefined)
  })

  it('constVoid', () => {
    assert.strictEqual(constVoid(), undefined)
  })

  it('increment', () => {
    assert.strictEqual(increment(2), 3)
  })

  it('decrement', () => {
    assert.strictEqual(decrement(2), 1)
  })

  it('absurd', () => {
    assert.throws(() => absurd<string>((null as any) as never))
  })

  it('flow', () => {
    assert.strictEqual(flow(f)(2), 3)
    assert.strictEqual(
      flow(
        f,
        g
      )(2),
      6
    )
    assert.strictEqual(
      flow(
        f,
        g,
        f
      )(2),
      7
    )
    assert.strictEqual(
      flow(
        f,
        g,
        f,
        g
      )(2),
      14
    )
    assert.strictEqual(
      flow(
        f,
        g,
        f,
        g,
        f
      )(2),
      15
    )
    assert.strictEqual(
      flow(
        f,
        g,
        f,
        g,
        f,
        g
      )(2),
      30
    )
    assert.strictEqual(
      flow(
        f,
        g,
        f,
        g,
        f,
        g,
        f
      )(2),
      31
    )
    assert.strictEqual(
      flow(
        f,
        g,
        f,
        g,
        f,
        g,
        f,
        g
      )(2),
      62
    )
    assert.strictEqual(
      flow(
        f,
        g,
        f,
        g,
        f,
        g,
        f,
        g,
        f
      )(2),
      63
    )
  })
})
