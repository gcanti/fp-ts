import * as assert from 'assert'
import { Const, getApply, getEq, const_, getApplicative, getShow, make } from '../src/Const'
import { semigroupString } from '../src/Semigroup'
import { eqNumber } from '../src/Eq'
import { monoidString } from '../src/Monoid'
import { showString } from '../src/Show'

describe('Const', () => {
  it('map', () => {
    const fa = make('foo')
    const double = (n: number): number => n * 2
    assert.strictEqual(const_.map(fa, double), fa)
  })

  it('contramap', () => {
    const fa: Const<string, number> = make('foo')
    const double = (n: number): number => n * 2
    assert.strictEqual(const_.contramap(fa, double), fa)
  })

  it('getApplicative', () => {
    const F = getApplicative(monoidString)
    assert.deepStrictEqual(F.of(1), make(''))
  })

  it('getEq', () => {
    const S = getEq(eqNumber)
    assert.strictEqual(S.equals(make(1), make(1)), true)
    assert.strictEqual(S.equals(make(1), make(2)), false)
  })

  it('getApplicative', () => {
    const F = getApply(semigroupString)
    const fa = make('foo')
    assert.deepStrictEqual(F.ap(fa, make('bar')), make('foobar'))
  })

  it('getShow', () => {
    const S = getShow(showString)
    const x: Const<string, number> = make('a')
    assert.strictEqual(S.show(x), `make("a")`)
  })
})
