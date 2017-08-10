import * as assert from 'assert'
import { compose, map, bimap, getSemigroup, Tuple, getApplicative } from '../src/Tuple'
import { monoidString, monoidSum } from '../src/Monoid'

describe('Tuple', () => {
  it('compose', () => {
    assert.deepEqual(compose(new Tuple([1, 's']), new Tuple([true, 2])), new Tuple([true, 's']))
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    assert.deepEqual(map(double, new Tuple(['s', 1])), new Tuple(['s', 2]))
  })

  it('bimap', () => {
    const double = (n: number): number => n * 2
    const len = (s: string): number => s.length
    assert.deepEqual(bimap(len, double, new Tuple(['s', 1])), new Tuple([1, 2]))
  })

  it('getSemigroup', () => {
    const semigroup = getSemigroup(monoidString, monoidSum)
    assert.deepEqual(semigroup.concat(new Tuple(['a', 1]), new Tuple(['b', 2])), new Tuple(['ab', 3]))
  })

  it('toString', () => {
    assert.strictEqual(new Tuple(['a', 1]).toString(), `new Tuple(["a", 1])`)
  })

  it('getApplicative', () => {
    const applicative = getApplicative(monoidString)
    assert.strictEqual(applicative.of(1).toString(), `new Tuple(["", 1])`)
  })
})
