import * as assert from 'assert'
import * as F from '../src/Foldable'
import { identity } from '../src/function'
import { monoidString, monoidSum } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { semigroupString } from '../src/Semigroup'
import { eqNumber } from '../src/Eq'
import {
  both,
  getMonad,
  getSemigroup,
  getEq,
  isBoth,
  right,
  these,
  left,
  fromOptions,
  fromEither,
  getShow,
  isLeft,
  isRight,
  fold,
  toTuple,
  getLeft,
  getRight,
  leftOrBoth,
  rightOrBoth,
  getLeftOnly,
  getRightOnly
} from '../src/These'
import * as T from '../src/Traversable'
import * as E from '../src/Either'
import { showString } from '../src/Show'
import { pipe } from '../src/pipeable'

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
    assert.deepStrictEqual(left(2).map(double), left(2))
    assert.deepStrictEqual(right(2).map(double), right(4))
    assert.deepStrictEqual(both(1, 2).map(double), both(1, 4))
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
    assert.strictEqual(
      pipe(
        left('foo'),
        fold(len, double, f)
      ),
      3
    )
    assert.strictEqual(
      pipe(
        right(1),
        fold(len, double, f)
      ),
      2
    )
    assert.strictEqual(
      pipe(
        both('foo', 1),
        fold(len, double, f)
      ),
      5
    )
  })

  it('bimap', () => {
    const len = (s: string): number => s.length
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(both('foo', 1).bimap(len, double), both(3, 2))
    assert.deepStrictEqual(these.bimap(both('foo', 1), len, double), both(3, 2))
  })

  it('toTuple', () => {
    const from = toTuple('a', 1)
    assert.deepStrictEqual(from(left('b')), ['b', 1])
    assert.deepStrictEqual(from(right(2)), ['a', 2])
    assert.deepStrictEqual(from(both('b', 2)), ['b', 2])
  })

  it('bimap', () => {
    const { equals } = getEq(eqNumber, eqNumber)
    const double = (n: number) => n * 2
    const len = (s: string) => s.length
    assert.strictEqual(equals(left('a').bimap(len, double), left(1)), true)
    assert.strictEqual(equals(right(2).bimap(len, double), right(4)), true)
  })

  it('traverse', () => {
    const f = (n: number) => (n >= 2 ? some(n) : none)
    assert.deepStrictEqual(these.traverse(option)(left('a'), f), some(left('a')))
    assert.deepStrictEqual(these.traverse(option)(right(2), f), some(right(2)))
    assert.deepStrictEqual(these.traverse(option)(right(1), f), none)
    assert.deepStrictEqual(these.traverse(option)(both('a', 2), f), some(both('a', 2)))
    assert.deepStrictEqual(these.traverse(option)(both('a', 1), f), none)
  })

  it('sequence', () => {
    const old = T.sequence(option, these)
    const sequence = these.sequence(option)
    const x1 = left('a')
    assert.deepStrictEqual(sequence(x1), some(left('a')))
    assert.deepStrictEqual(sequence(x1), old(x1))
    const x2 = right(some(1))
    assert.deepStrictEqual(sequence(x2), some(right(1)))
    assert.deepStrictEqual(sequence(x2), old(x2))
    const x3 = right(none)
    assert.deepStrictEqual(sequence(x3), none)
    assert.deepStrictEqual(sequence(x3), old(x3))
    const x4 = both('a', some(1))
    assert.deepStrictEqual(sequence(x4), some(both('a', 1)))
    assert.deepStrictEqual(sequence(x4), old(x4))
    const x5 = both('a', none)
    assert.deepStrictEqual(sequence(x5), none)
    assert.deepStrictEqual(sequence(x5), old(x5))
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
    assert.deepStrictEqual(leftOrBoth('a')(none), left('a'))
    assert.deepStrictEqual(leftOrBoth('a')(some(1)), both('a', 1))
  })

  it('rightOrBoth', () => {
    assert.deepStrictEqual(rightOrBoth(1)(none), right(1))
    assert.deepStrictEqual(rightOrBoth(1)(some('a')), both('a', 1))
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

  it('fromEither', () => {
    assert.deepStrictEqual(fromEither(E.left('a')), left('a'))
    assert.deepStrictEqual(fromEither(E.right(1)), right(1))
  })

  it('toString', () => {
    assert.strictEqual(left(1).toString(), 'left(1)')
    assert.strictEqual(left(1).inspect(), 'left(1)')
    assert.strictEqual(right(1).toString(), 'right(1)')
    assert.strictEqual(right(1).inspect(), 'right(1)')
    assert.strictEqual(both('a', 1).toString(), 'both("a", 1)')
    assert.strictEqual(both('a', 1).inspect(), 'both("a", 1)')
  })

  it('isLeft', () => {
    assert.strictEqual(left(1).isThis(), true)
    assert.strictEqual(right(1).isThis(), false)
    assert.strictEqual(both('1', 1).isThis(), false)
    assert.strictEqual(isLeft(left(1)), true)
    assert.strictEqual(isLeft(right(1)), false)
    assert.strictEqual(isLeft(both('1', 1)), false)
  })

  it('isRight', () => {
    assert.strictEqual(left(1).isThat(), false)
    assert.strictEqual(right(1).isThat(), true)
    assert.strictEqual(both('1', 1).isThat(), false)
    assert.strictEqual(isRight(left(1)), false)
    assert.strictEqual(isRight(right(1)), true)
    assert.strictEqual(isRight(both('1', 1)), false)
  })

  it('isBoth', () => {
    assert.strictEqual(left(1).isBoth(), false)
    assert.strictEqual(right(1).isBoth(), false)
    assert.strictEqual(both('1', 1).isBoth(), true)
    assert.strictEqual(isBoth(left(1)), false)
    assert.strictEqual(isBoth(right(1)), false)
    assert.strictEqual(isBoth(both('1', 1)), true)
  })

  it('reduce', () => {
    assert.strictEqual(left('b').reduce('a', (b, a) => b + a), 'a')
    assert.strictEqual(these.reduce(left('b'), 'a', (b, a) => b + a), 'a')
    assert.strictEqual(right('b').reduce('a', (b, a) => b + a), 'ab')
    assert.strictEqual(these.reduce(right('b'), 'a', (b, a) => b + a), 'ab')
    assert.strictEqual(both(1, 'b').reduce('a', (b, a) => b + a), 'ab')
    assert.strictEqual(these.reduce(both(1, 'b'), 'a', (b, a) => b + a), 'ab')
  })

  it('foldMap', () => {
    const old = F.foldMap(these, monoidString)
    const foldMap = these.foldMap(monoidString)
    const x1 = right('a')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'a')
    assert.strictEqual(foldMap(x1, f1), old(x1, f1))
    const x2 = left(1)
    assert.strictEqual(foldMap(x2, f1), '')
    assert.strictEqual(foldMap(x2, f1), old(x2, f1))
    const x3 = both(1, 'a')
    assert.strictEqual(foldMap(x3, f1), 'a')
    assert.strictEqual(foldMap(x3, f1), old(x3, f1))
  })

  it('foldr', () => {
    const old = F.foldr(these)
    const foldr = these.foldr
    const x1 = right('a')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'a')
    assert.strictEqual(foldr(x1, init1, f1), old(x1, init1, f1))
    const x2 = left(1)
    assert.strictEqual(foldr(x2, init1, f1), '')
    assert.strictEqual(foldr(x2, init1, f1), old(x2, init1, f1))
    const x3 = both(1, 'a')
    assert.strictEqual(foldr(x3, init1, f1), 'a')
    assert.strictEqual(foldr(x3, init1, f1), old(x3, init1, f1))
  })

  it('getShow', () => {
    const S = getShow(showString, showString)
    assert.strictEqual(S.show(left('a')), `left("a")`)
    assert.strictEqual(S.show(right('a')), `right("a")`)
    assert.strictEqual(S.show(both('a', 'b')), `both("a", "b")`)
  })
})
