import * as assert from 'assert'
import { compose, pipe, curry, flip, on, or, and, apply, applyFlipped } from '../src/function'

const f = (n: number) => n + 1
const g = (n: number) => n * 2
const h = (a: number) => (b: number) => a - b

describe('function', () => {
  it('flip', () => {
    const flippedH = flip(h)
    assert.strictEqual(flippedH(5)(2), -3)
  })

  it('on', () => {
    const stringH = on(h)((s: string) => s.length)
    assert.strictEqual(stringH('abcde')('ab'), 3)
  })

  it('compose', () => {
    assert.strictEqual(compose(f, g)(2), 5)
    assert.strictEqual(compose(f, g, f)(2), 7)
    assert.strictEqual(compose(f, g, f, g)(2), 11)
    assert.strictEqual(compose(f, g, f, g, f)(2), 15)
    assert.strictEqual(compose(f, g, f, g, f, g)(2), 23)
    assert.strictEqual(compose(f, g, f, g, f, g, f)(2), 31)
    assert.strictEqual(compose(f, g, f, g, f, g, f, g)(2), 47)
    assert.strictEqual(compose(f, g, f, g, f, g, f, g, f)(2), 63)
  })

  it('pipe', () => {
    assert.strictEqual(pipe(f, g)(2), 6)
    assert.strictEqual(pipe(f, g, f)(2), 7)
    assert.strictEqual(pipe(f, g, f, g)(2), 14)
    assert.strictEqual(pipe(f, g, f, g, f)(2), 15)
    assert.strictEqual(pipe(f, g, f, g, f, g)(2), 30)
    assert.strictEqual(pipe(f, g, f, g, f, g, f)(2), 31)
    assert.strictEqual(pipe(f, g, f, g, f, g, f, g)(2), 62)
    assert.strictEqual(pipe(f, g, f, g, f, g, f, g, f)(2), 63)
  })

  it('curry', () => {
    const h2 = curry((a: number, b: number): number => a + b)
    assert.strictEqual(h2(1)(2), 3)
    const h3 = curry((a: number, b: number, c: number): number => a + b + c)
    assert.strictEqual(h3(1)(2)(3), 6)
    const h5 = curry((a: number, b: number, c: number, d: number, e: number): number => a + b + c + d + e)
    assert.strictEqual(h5(1)(2)(3)(4)(5), 15)
    const snoc = (as: Array<number>, a: number) => as.concat(a)
    assert.deepEqual(curry(snoc)([1, 2, 3])(4), [1, 2, 3, 4])
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

  it('apply', () => {
    const double = (n: number) => n * 2
    assert.strictEqual(apply(double)(2), 4)
  })

  it('applyFlipped', () => {
    assert.strictEqual(applyFlipped(2)(n => n * 2), 4)
  })
})
