import * as assert from 'assert'
import { compose, map, bimap, extract, extend, getSemigroup } from '../src/Tuple'
import { monoidString, monoidSum } from '../src/Monoid'

describe('Tuple', () => {
  it('compose', () => {
    assert.deepEqual(compose([1, 's'], [true, 2]), [true, 's'])
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    assert.deepEqual(map(double, ['s', 1]), ['s', 2])
  })

  it('bimap', () => {
    const double = (n: number): number => n * 2
    const len = (s: string): number => s.length
    assert.deepEqual(bimap(len, double, ['s', 1]), [1, 2])
  })

  it('extract', () => {
    assert.deepEqual(extract(['s', 1]), 1)
  })

  it('extend', () => {
    assert.deepEqual(extend((t: [string, number]): number => t[0].length + t[1], ['s', 1]), ['s', 2])
  })

  it('getSemigroup', () => {
    const semigroup = getSemigroup(monoidString, monoidSum)
    assert.deepEqual(semigroup.concat(['a', 1], ['b', 2]), ['ab', 3])
  })
})
