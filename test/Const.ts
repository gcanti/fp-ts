import * as assert from 'assert'
import { Const, getApply, getSetoid, const_, getApplicative } from '../src/Const'
import { semigroupString } from '../src/Semigroup'
import { setoidNumber } from '../src/Setoid'
import { monoidString } from '../src/Monoid'

describe('Const', () => {
  it('map', () => {
    const fa = new Const<string, number>('foo')
    const double = (n: number): number => n * 2
    assert.strictEqual(fa.map(double), fa)
    assert.strictEqual(const_.map(fa, double), fa)
  })

  it('contramap', () => {
    const fa = new Const<string, number>('foo')
    const double = (n: number): number => n * 2
    assert.strictEqual(fa.contramap(double), fa)
    assert.strictEqual(const_.contramap(fa, double), fa)
  })

  it('fold', () => {
    const fa = new Const<string, number>('foo')
    assert.strictEqual(fa.fold(s => s.length), 3)
  })

  it('getApplicative', () => {
    const F = getApplicative(monoidString)
    assert.deepEqual(F.of(1), new Const<string, number>(''))
  })

  it('toString', () => {
    const fa = new Const<string, number>('foo')
    assert.strictEqual(fa.toString(), 'new Const("foo")')
    assert.strictEqual(fa.inspect(), 'new Const("foo")')
  })

  it('getSetoid', () => {
    const S = getSetoid<number, string>(setoidNumber)
    assert.strictEqual(S.equals(new Const(1), new Const(1)), true)
    assert.strictEqual(S.equals(new Const(1), new Const(2)), false)
  })

  it('getApplicative', () => {
    const F = getApply(semigroupString)
    const fa = new Const<string, (n: number) => number>('foo')
    assert.deepEqual(F.ap(fa, new Const('bar')), new Const('foobar'))
  })
})
