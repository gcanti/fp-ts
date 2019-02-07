import * as assert from 'assert'
import * as F from '../src/Foldable'
import { identity } from '../src/function'
import { monoidString } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { ordNumber } from '../src/Ord'
import { getMonoid, getOrd, getSemigroup, getSetoid, Pair, pair } from '../src/Pair'
import { semigroupString } from '../src/Semigroup'
import { setoidNumber } from '../src/Setoid'
import * as T from '../src/Traversable'

describe('Pair', () => {
  it('first', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(new Pair(1, 2).first(double), new Pair(2, 2))
  })

  it('second', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(new Pair(1, 2).second(double), new Pair(1, 4))
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(new Pair(1, 2).map(double), new Pair(2, 4))
    assert.deepStrictEqual(pair.map(new Pair(1, 2), double), new Pair(2, 4))
  })

  it('of', () => {
    assert.deepStrictEqual(pair.of(1), new Pair(1, 1))
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const inc = (n: number): number => n + 1
    assert.deepStrictEqual(new Pair(1, 2).ap(new Pair(double, inc)), new Pair(2, 3))
    assert.deepStrictEqual(pair.ap(new Pair(double, inc), new Pair(1, 2)), new Pair(2, 3))
    assert.deepStrictEqual(new Pair(double, inc).ap_(new Pair(1, 2)), new Pair(2, 3))
  })

  it('reduce', () => {
    assert.deepStrictEqual(new Pair('a', 'b').reduce('', (b, a) => b + a), 'ab')
    assert.deepStrictEqual(pair.reduce(new Pair('a', 'b'), '', (b, a) => b + a), 'ab')
  })

  it('foldMap', () => {
    const old = F.foldMap(pair, monoidString)
    const foldMap = pair.foldMap(monoidString)
    const x1 = new Pair('a', 'b')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'ab')
    assert.strictEqual(foldMap(x1, f1), old(x1, f1))
  })

  it('foldr', () => {
    const old = F.foldr(pair)
    const foldr = pair.foldr
    const x1 = new Pair('a', 'b')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'ba')
    assert.strictEqual(foldr(x1, init1, f1), old(x1, init1, f1))
  })

  it('extract', () => {
    assert.deepStrictEqual(new Pair('a', 'b').extract(), 'a')
    assert.deepStrictEqual(pair.extract(new Pair('a', 'b')), 'a')
  })

  it('extend', () => {
    const f = (p: Pair<string>) => p.fst + p.snd
    assert.deepStrictEqual(new Pair('a', 'b').extend(f), new Pair('ab', 'ba'))
    assert.deepStrictEqual(pair.extend(new Pair('a', 'b'), f), new Pair('ab', 'ba'))
  })

  it('traverse', () => {
    assert.deepStrictEqual(pair.traverse(option)(new Pair(0, 1), n => (n >= 0 ? some(n) : none)), some(new Pair(0, 1)))
    assert.deepStrictEqual(pair.traverse(option)(new Pair(0, 1), n => (n >= 2 ? some(n) : none)), none)
  })

  it('sequence', () => {
    const old = T.sequence(option, pair)
    const sequence = pair.sequence(option)
    const x1 = new Pair(some(0), some(1))
    assert.deepStrictEqual(sequence(x1), some(new Pair(0, 1)))
    assert.deepStrictEqual(sequence(x1), old(x1))
    const x2 = new Pair(none, some(1))
    assert.deepStrictEqual(sequence(x2), none)
    assert.deepStrictEqual(sequence(x2), old(x2))
  })

  it('getSetoid', () => {
    const S = getSetoid(setoidNumber)
    assert.strictEqual(S.equals(new Pair(1, 2), new Pair(1, 2)), true)
    assert.strictEqual(S.equals(new Pair(1, 2), new Pair(1, 3)), false)
    assert.strictEqual(S.equals(new Pair(1, 2), new Pair(2, 2)), false)
  })

  it('getOrd', () => {
    const O = getOrd(ordNumber)
    assert.strictEqual(O.compare(new Pair(0, 2), new Pair(1, 2)), -1)
    assert.strictEqual(O.compare(new Pair(1, 2), new Pair(1, 2)), 0)
    assert.strictEqual(O.compare(new Pair(2, 2), new Pair(1, 2)), 1)
    assert.strictEqual(O.compare(new Pair(1, 2), new Pair(1, 3)), -1)
    assert.strictEqual(O.compare(new Pair(1, 2), new Pair(1, 1)), 1)
  })

  it('getSemigroup', () => {
    const S = getSemigroup(semigroupString)
    assert.deepStrictEqual(S.concat(new Pair('a', 'b'), new Pair('c', 'd')), new Pair('ac', 'bd'))
  })

  it('getMonoid', () => {
    const S = getMonoid(monoidString)
    assert.deepStrictEqual(S.concat(new Pair('a', 'b'), new Pair('', '')), new Pair('a', 'b'))
    assert.deepStrictEqual(S.concat(new Pair('', ''), new Pair('a', 'b')), new Pair('a', 'b'))
  })
})
