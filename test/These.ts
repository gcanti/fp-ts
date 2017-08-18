import * as assert from 'assert'
import { this_, that, both, fromThese, bimap } from '../src/These'
import { setoidNumber, setoidString } from '../src/Setoid'
import { monoidSum, monoidString } from '../src/Monoid'

describe('These', () => {
  it('equals', () => {
    assert.strictEqual(this_(2).equals(setoidNumber, setoidNumber, this_(2)), true)
    assert.strictEqual(this_(2).equals(setoidNumber, setoidNumber, this_(3)), false)
  })

  it('concat', () => {
    assert.strictEqual(
      this_('a')
        .concat(monoidString, monoidSum, this_('b'))
        .equals(setoidString, setoidNumber, this_<string, number>('ab')),
      true
    )
    assert.strictEqual(
      this_('a')
        .concat(monoidString, monoidSum, that<string, number>(2))
        .equals(setoidString, setoidNumber, both<string, number>('a', 2)),
      true
    )
  })

  it('map', () => {
    const double = (n: number) => n * 2
    assert.strictEqual(this_(2).map(double).equals(setoidNumber, setoidNumber, this_<number, number>(2)), true)
    assert.strictEqual(that(2).map(double).equals(setoidNumber, setoidNumber, that<number, number>(4)), true)
    assert.strictEqual(both(1, 2).map(double).equals(setoidNumber, setoidNumber, both<number, number>(1, 4)), true)
  })

  it('bimap', () => {
    const len = (s: string): number => s.length
    const double = (n: number): number => n * 2
    assert.deepEqual(bimap(len, double)(both('foo', 1)), both(3, 2))
  })

  it('fromThese', () => {
    assert.deepEqual(fromThese('a', 1, this_<string, number>('b')), ['b', 1])
    assert.deepEqual(fromThese('a', 1, that<string, number>(2)), ['a', 2])
    assert.deepEqual(fromThese('a', 1, both('b', 2)), ['b', 2])
  })

  it('bimap', () => {
    const double = (n: number) => n * 2
    const len = (s: string) => s.length
    assert.strictEqual(this_('a').bimap(len, double).equals(setoidNumber, setoidNumber, this_<number, number>(1)), true)
    assert.strictEqual(that(2).bimap(len, double).equals(setoidNumber, setoidNumber, that<number, number>(4)), true)
  })
})
