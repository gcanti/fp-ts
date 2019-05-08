import * as assert from 'assert'
import {
  and,
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
  on,
  or,
  pipe,
  unsafeCoerce,
  absurd
} from '../src/function'

const f = (n: number) => n + 1
const g = (n: number) => n * 2

describe('function', () => {
  it('flip', () => {
    const f = (a: number, b: string) => a - b.length
    assert.strictEqual(flip(f)('aaa', 2), -1)
  })

  it('on', () => {
    const sub = on((a: number, b: number) => a - b, (s: string) => s.length)
    assert.strictEqual(sub('abcde', 'ab'), 3)
  })

  it('pipe', () => {
    assert.strictEqual(
      pipe(
        f,
        g
      )(2),
      6
    )
    assert.strictEqual(
      pipe(
        f,
        g,
        f
      )(2),
      7
    )
    assert.strictEqual(
      pipe(
        f,
        g,
        f,
        g
      )(2),
      14
    )
    assert.strictEqual(
      pipe(
        f,
        g,
        f,
        g,
        f
      )(2),
      15
    )
    assert.strictEqual(
      pipe(
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
      pipe(
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
      pipe(
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
      pipe(
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

  it('not', () => {
    const n = not(Boolean)
    assert.strictEqual(n(false), true)
    assert.strictEqual(n(1), false)
    assert.strictEqual(n(''), true)
  })

  it('or', () => {
    // as predicate
    const gt3 = (n: number) => n > 3
    const lt2 = (n: number) => n < 2
    const outside2and3 = or(lt2, gt3)
    assert.strictEqual(outside2and3(1), true)
    assert.strictEqual(outside2and3(4), true)
    assert.strictEqual(outside2and3(2.5), false)

    // as custom guard
    class A {}
    class B extends A {
      _tag = 'B' as 'B'
    }
    class C extends A {
      _tag = 'C' as 'C'
    }
    const isB = (a: A): a is B => a instanceof B
    const isC = (a: A): a is C => a instanceof C
    const isBOrC = or(isB, isC)
    function f(a: any): 'B' | 'C' | 'else' {
      if (isBOrC(a)) {
        return a._tag
      }
      return 'else'
    }
    assert.strictEqual(f(new A()), 'else')
    assert.strictEqual(f(new B()), 'B')
    assert.strictEqual(f(new C()), 'C')
  })

  it('and', () => {
    // as predicate
    const lt3 = (n: number) => n < 3
    const gt2 = (n: number) => n > 2
    const between2and3 = and(gt2, lt3)
    assert.strictEqual(between2and3(1), false)
    assert.strictEqual(between2and3(4), false)
    assert.strictEqual(between2and3(2.5), true)
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
})
