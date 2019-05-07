import * as assert from 'assert'
import { identity } from '../src/function'
import { monoidString, monoidSum } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { semigroupString } from '../src/Semigroup'
import { eqNumber } from '../src/Eq'
import { showString } from '../src/Show'
import {
  both,
  fold,
  fromOptions,
  getLeft,
  getLeftOnly,
  getMonad,
  getRight,
  getRightOnly,
  getSemigroup,
  getEq,
  getShow,
  isBoth,
  isLeft,
  isRight,
  left,
  leftOrBoth,
  right,
  rightOrBoth,
  these,
  toTuple
} from '../src/These'

describe('These', () => {
  it('getEq', () => {
    const { equals } = getEq(eqNumber, eqNumber)
    assert.strictEqual(equals(left(2), left(2)), true)
    assert.strictEqual(equals(left(2), left(3)), false)
    assert.strictEqual(equals(left(3), left(2)), false)
    assert.strictEqual(equals(left(2), right(2)), false)
    assert.strictEqual(equals(left(2), both(2, 2)), false)
    assert.strictEqual(equals(right(2), right(2)), true)
    assert.strictEqual(equals(right(2), right(3)), false)
    assert.strictEqual(equals(right(3), right(2)), false)
    assert.strictEqual(equals(right(2), both(2, 2)), false)
    assert.strictEqual(equals(both(2, 2), both(2, 2)), true)
    assert.strictEqual(equals(both(2, 3), both(3, 2)), false)
  })

  it('getSemigroup', () => {
    const { concat } = getSemigroup(monoidString, monoidSum)
    assert.deepStrictEqual(concat(left('a'), left('b')), left('ab'))
    assert.deepStrictEqual(concat(left('a'), right(2)), both('a', 2))
    assert.deepStrictEqual(concat(right(2), left('a')), both('a', 2))
    assert.deepStrictEqual(concat(left('a'), both('b', 2)), both('ab', 2))
    assert.deepStrictEqual(concat(both('b', 2), left('a')), both('ba', 2))
    assert.deepStrictEqual(concat(right(3), right(2)), right(5))
    assert.deepStrictEqual(concat(right(3), both('b', 2)), both('b', 5))
    assert.deepStrictEqual(concat(both('b', 2), right(3)), both('b', 5))
    assert.deepStrictEqual(concat(both('a', 3), both('b', 2)), both('ab', 5))
  })

  it('map', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(these.map(left(2), double), left(2))
    assert.deepStrictEqual(these.map(right(2), double), right(4))
    assert.deepStrictEqual(these.map(both(1, 2), double), both(1, 4))
  })

  it('getMonad', () => {
    const double = (n: number) => n * 2
    const F = getMonad(semigroupString)
    const fab = F.of(double)
    const fa = F.of(1)
    assert.deepStrictEqual(F.ap(fab, fa), F.of(2))
  })

  it('fold', () => {
    const double = (n: number) => n * 2
    const len = (s: string) => s.length
    const f = (s: string, n: number) => len(s) + double(n)
    assert.strictEqual(fold(left('foo'), len, double, f), 3)
    assert.strictEqual(fold(right(1), len, double, f), 2)
    assert.strictEqual(fold(both('foo', 1), len, double, f), 5)
  })

  describe('Bifunctor', () => {
    it('bimap', () => {
      const len = (s: string): number => s.length
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(these.bimap(left('a'), len, double), left(1))
      assert.deepStrictEqual(these.bimap(right(2), len, double), right(4))
      assert.deepStrictEqual(these.bimap(both('foo', 1), len, double), both(3, 2))
    })

    it('mapLeft', () => {
      const len = (s: string): number => s.length
      assert.deepStrictEqual(these.mapLeft(left('a'), len), left(1))
      assert.deepStrictEqual(these.mapLeft(right(2), len), right(2))
      assert.deepStrictEqual(these.mapLeft(both('foo', 1), len), both(3, 1))
    })
  })

  it('toTuple', () => {
    assert.deepStrictEqual(toTuple(left('b'), 'a', 1), ['b', 1])
    assert.deepStrictEqual(toTuple(right(2), 'a', 1), ['a', 2])
    assert.deepStrictEqual(toTuple(both('b', 2), 'a', 1), ['b', 2])
  })

  it('traverse', () => {
    assert.deepStrictEqual(these.traverse(option)(left('a'), n => (n >= 2 ? some(n) : none)), some(left('a')))
    assert.deepStrictEqual(these.traverse(option)(right(2), n => (n >= 2 ? some(n) : none)), some(right(2)))
    assert.deepStrictEqual(these.traverse(option)(right(1), n => (n >= 2 ? some(n) : none)), none)
    assert.deepStrictEqual(these.traverse(option)(both('a', 2), n => (n >= 2 ? some(n) : none)), some(both('a', 2)))
    assert.deepStrictEqual(these.traverse(option)(both('a', 1), n => (n >= 2 ? some(n) : none)), none)
  })

  it('sequence', () => {
    const sequence = these.sequence(option)
    const x1 = left('a')
    assert.deepStrictEqual(sequence(x1), some(left('a')))
    const x2 = right(some(1))
    assert.deepStrictEqual(sequence(x2), some(right(1)))
    const x3 = right(none)
    assert.deepStrictEqual(sequence(x3), none)
    const x4 = both('a', some(1))
    assert.deepStrictEqual(sequence(x4), some(both('a', 1)))
    const x5 = both('a', none)
    assert.deepStrictEqual(sequence(x5), none)
  })

  it('chain', () => {
    const M = getMonad(monoidString)
    const f = (n: number) => (n >= 2 ? (n <= 5 ? right(n * 2) : both('bar', n)) : left('bar'))
    assert.deepStrictEqual(M.chain(left('foo'), f), left('foo'))
    assert.deepStrictEqual(M.chain(right(2), f), right(4))
    assert.deepStrictEqual(M.chain(right(1), f), left('bar'))
    assert.deepStrictEqual(M.chain(right(6), f), both('bar', 6))
    assert.deepStrictEqual(M.chain(both('foo', 2), f), both('foo', 4))
    assert.deepStrictEqual(M.chain(both('foo', 1), f), left('foobar'))
    assert.deepStrictEqual(M.chain(both('foo', 6), f), both('foobar', 6))
  })

  it('getLeft', () => {
    assert.deepStrictEqual(getLeft(left('a')), some('a'))
    assert.deepStrictEqual(getLeft(right(1)), none)
    assert.deepStrictEqual(getLeft(both('a', 1)), some('a'))
  })

  it('getRight', () => {
    assert.deepStrictEqual(getRight(left('a')), none)
    assert.deepStrictEqual(getRight(right(1)), some(1))
    assert.deepStrictEqual(getRight(both('a', 1)), some(1))
  })

  it('leftOrBoth', () => {
    assert.deepStrictEqual(leftOrBoth('a', none), left('a'))
    assert.deepStrictEqual(leftOrBoth('a', some(1)), both('a', 1))
  })

  it('rightOrBoth', () => {
    assert.deepStrictEqual(rightOrBoth(1, none), right(1))
    assert.deepStrictEqual(rightOrBoth(1, some('a')), both('a', 1))
  })

  it('getLeftOnly', () => {
    assert.deepStrictEqual(getLeftOnly(left('a')), some('a'))
    assert.deepStrictEqual(getLeftOnly(right(1)), none)
    assert.deepStrictEqual(getLeftOnly(both('a', 1)), none)
  })

  it('getRightOnly', () => {
    assert.deepStrictEqual(getRightOnly(left('a')), none)
    assert.deepStrictEqual(getRightOnly(right(1)), some(1))
    assert.deepStrictEqual(getRightOnly(both('a', 1)), none)
  })

  it('fromOptions', () => {
    assert.deepStrictEqual(fromOptions(none, none), none)
    assert.deepStrictEqual(fromOptions(some('a'), none), some(left('a')))
    assert.deepStrictEqual(fromOptions(none, some(1)), some(right(1)))
    assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
  })

  it('isLeft', () => {
    assert.strictEqual(isLeft(left(1)), true)
    assert.strictEqual(isLeft(right(1)), false)
    assert.strictEqual(isLeft(both('1', 1)), false)
  })

  it('isRight', () => {
    assert.strictEqual(isRight(left(1)), false)
    assert.strictEqual(isRight(right(1)), true)
    assert.strictEqual(isRight(both('1', 1)), false)
  })

  it('isBoth', () => {
    assert.strictEqual(isBoth(left(1)), false)
    assert.strictEqual(isBoth(right(1)), false)
    assert.strictEqual(isBoth(both('1', 1)), true)
  })

  it('reduce', () => {
    assert.strictEqual(these.reduce(left('b'), 'a', (b, a) => b + a), 'a')
    assert.strictEqual(these.reduce(right('b'), 'a', (b, a) => b + a), 'ab')
    assert.strictEqual(these.reduce(both(1, 'b'), 'a', (b, a) => b + a), 'ab')
  })

  it('foldMap', () => {
    const foldMap = these.foldMap(monoidString)
    const x1 = right('a')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'a')
    const x2 = left(1)
    assert.strictEqual(foldMap(x2, f1), '')
    const x3 = both(1, 'a')
    assert.strictEqual(foldMap(x3, f1), 'a')
  })

  it('reduceRight', () => {
    const reduceRight = these.reduceRight
    const x1 = right('a')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(reduceRight(x1, init1, f1), 'a')
    const x2 = left(1)
    assert.strictEqual(reduceRight(x2, init1, f1), '')
    const x3 = both(1, 'a')
    assert.strictEqual(reduceRight(x3, init1, f1), 'a')
  })

  it('getShow', () => {
    const S = getShow(showString, showString)
    assert.strictEqual(S.show(left('a')), `left("a")`)
    assert.strictEqual(S.show(right('a')), `right("a")`)
    assert.strictEqual(S.show(both('a', 'b')), `both("a", "b")`)
  })
})
