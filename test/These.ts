import * as assert from 'assert'
import { this_, that, both, fromThese, bimap, getSetoid, getSemigroup } from '../src/These'
import { setoidNumber, setoidString } from '../src/Setoid'
import { monoidSum, monoidString } from '../src/Monoid'

describe('These', () => {
  it('equals', () => {
    const { equals } = getSetoid(setoidNumber, setoidNumber)
    assert.strictEqual(equals(this_(2))(this_(2)), true)
    assert.strictEqual(equals(this_(2))(this_(3)), false)
  })

  it('concat', () => {
    const { equals } = getSetoid(setoidString, setoidNumber)
    const { concat } = getSemigroup(monoidString, monoidSum)
    assert.strictEqual(equals(concat(this_('a'))(this_('b')))(this_('ab')), true)
    assert.strictEqual(equals(concat(this_('a'))(that(2)))(both('a', 2)), true)
  })

  it('map', () => {
    const { equals } = getSetoid(setoidNumber, setoidNumber)
    const double = (n: number) => n * 2
    assert.strictEqual(equals(this_<number, number>(2).map(double))(this_(2)), true)
    assert.strictEqual(equals(that<number, number>(2).map(double))(that(4)), true)
    assert.strictEqual(equals(both(1, 2).map(double))(both(1, 4)), true)
  })

  it('bimap', () => {
    const len = (s: string): number => s.length
    const double = (n: number): number => n * 2
    assert.deepEqual(bimap(len, double, both('foo', 1)), both(3, 2))
  })

  it('fromThese', () => {
    const fromThese_ = fromThese('a', 1)
    assert.deepEqual(fromThese_(this_<string, number>('b')), ['b', 1])
    assert.deepEqual(fromThese_(that<string, number>(2)), ['a', 2])
    assert.deepEqual(fromThese_(both('b', 2)), ['b', 2])
  })

  it('bimap', () => {
    const { equals } = getSetoid(setoidNumber, setoidNumber)
    const double = (n: number) => n * 2
    const len = (s: string) => s.length
    assert.strictEqual(equals(this_<string, number>('a').bimap(len, double))(this_(1)), true)
    assert.strictEqual(equals(that<string, number>(2).bimap(len, double))(that(4)), true)
  })
})
