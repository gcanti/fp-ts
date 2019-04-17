import * as assert from 'assert'
import { left, right } from '../src/Either'
import { identity } from '../src/function'
import { monoidString, monoidSum } from '../src/Monoid'
import { none, option, Option, some } from '../src/Option'
import { semigroupString } from '../src/Semigroup'
import { setoidNumber } from '../src/Setoid'
import { showString } from '../src/Show'
import {
  both,
  fromEither,
  fromOptions,
  fromThese,
  getMonad,
  getSemigroup,
  getSetoid,
  getShow,
  isBoth,
  isThat,
  isThis,
  that,
  thatOrBoth,
  these,
  theseLeft,
  theseRight,
  theseThat,
  theseThis,
  thisOrBoth,
  this_
} from '../src/These'

describe('These', () => {
  it('getSetoid', () => {
    const { equals } = getSetoid(setoidNumber, setoidNumber)
    assert.strictEqual(equals(this_(2), this_(2)), true)
    assert.strictEqual(equals(this_(2), this_(3)), false)
    assert.strictEqual(equals(this_(3), this_(2)), false)
    assert.strictEqual(equals(this_(2), that(2)), false)
    assert.strictEqual(equals(this_(2), both(2, 2)), false)
    assert.strictEqual(equals(that(2), that(2)), true)
    assert.strictEqual(equals(that(2), that(3)), false)
    assert.strictEqual(equals(that(3), that(2)), false)
    assert.strictEqual(equals(that(2), both(2, 2)), false)
    assert.strictEqual(equals(both(2, 2), both(2, 2)), true)
    assert.strictEqual(equals(both(2, 3), both(3, 2)), false)
  })

  it('getSemigroup', () => {
    const { concat } = getSemigroup(monoidString, monoidSum)
    assert.deepStrictEqual(concat(this_('a'), this_('b')), this_('ab'))
    assert.deepStrictEqual(concat(this_('a'), that(2)), both('a', 2))
    assert.deepStrictEqual(concat(that(2), this_('a')), both('a', 2))
    assert.deepStrictEqual(concat(this_('a'), both('b', 2)), both('ab', 2))
    assert.deepStrictEqual(concat(both('b', 2), this_('a')), both('ba', 2))
    assert.deepStrictEqual(concat(that(3), that(2)), that(5))
    assert.deepStrictEqual(concat(that(3), both('b', 2)), both('b', 5))
    assert.deepStrictEqual(concat(both('b', 2), that(3)), both('b', 5))
    assert.deepStrictEqual(concat(both('a', 3), both('b', 2)), both('ab', 5))
  })

  it('map', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(this_<number, number>(2).map(double), this_(2))
    assert.deepStrictEqual(that<number, number>(2).map(double), that(4))
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
    assert.strictEqual(this_<string, number>('foo').fold(len, double, f), 3)
    assert.strictEqual(that<string, number>(1).fold(len, double, f), 2)
    assert.strictEqual(both<string, number>('foo', 1).fold(len, double, f), 5)
  })

  it('bimap', () => {
    const len = (s: string): number => s.length
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(both('foo', 1).bimap(len, double), both(3, 2))
    assert.deepStrictEqual(these.bimap(both('foo', 1), len, double), both(3, 2))
  })

  it('fromThese', () => {
    const from = fromThese('a', 1)
    assert.deepStrictEqual(from(this_('b')), ['b', 1])
    assert.deepStrictEqual(from(that(2)), ['a', 2])
    assert.deepStrictEqual(from(both('b', 2)), ['b', 2])
  })

  it('bimap', () => {
    const { equals } = getSetoid(setoidNumber, setoidNumber)
    const double = (n: number) => n * 2
    const len = (s: string) => s.length
    assert.strictEqual(equals(this_<string, number>('a').bimap(len, double), this_(1)), true)
    assert.strictEqual(equals(that<string, number>(2).bimap(len, double), that(4)), true)
  })

  it('traverse', () => {
    assert.deepStrictEqual(these.traverse(option)(this_('a'), n => (n >= 2 ? some(n) : none)), some(this_('a')))
    assert.deepStrictEqual(these.traverse(option)(that(2), n => (n >= 2 ? some(n) : none)), some(that(2)))
    assert.deepStrictEqual(these.traverse(option)(that(1), n => (n >= 2 ? some(n) : none)), none)
    assert.deepStrictEqual(these.traverse(option)(both('a', 2), n => (n >= 2 ? some(n) : none)), some(both('a', 2)))
    assert.deepStrictEqual(these.traverse(option)(both('a', 1), n => (n >= 2 ? some(n) : none)), none)
  })

  it('sequence', () => {
    const sequence = these.sequence(option)
    const x1 = this_<string, Option<number>>('a')
    assert.deepStrictEqual(sequence(x1), some(this_('a')))
    const x2 = that<string, Option<number>>(some(1))
    assert.deepStrictEqual(sequence(x2), some(that(1)))
    const x3 = that<string, Option<number>>(none)
    assert.deepStrictEqual(sequence(x3), none)
    const x4 = both<string, Option<number>>('a', some(1))
    assert.deepStrictEqual(sequence(x4), some(both('a', 1)))
    const x5 = both<string, Option<number>>('a', none)
    assert.deepStrictEqual(sequence(x5), none)
  })

  it('chain', () => {
    const M = getMonad(monoidString)
    const f = (n: number) =>
      n >= 2 ? (n <= 5 ? that<string, number>(n * 2) : both('bar', n)) : this_<string, number>('bar')
    assert.deepStrictEqual(M.chain(this_<string, number>('foo'), f), this_('foo'))
    assert.deepStrictEqual(M.chain(that<string, number>(2), f), that(4))
    assert.deepStrictEqual(M.chain(that<string, number>(1), f), this_('bar'))
    assert.deepStrictEqual(M.chain(that<string, number>(6), f), both('bar', 6))
    assert.deepStrictEqual(M.chain(both<string, number>('foo', 2), f), both('foo', 4))
    assert.deepStrictEqual(M.chain(both<string, number>('foo', 1), f), this_('foobar'))
    assert.deepStrictEqual(M.chain(both<string, number>('foo', 6), f), both('foobar', 6))
  })

  it('theseLeft', () => {
    assert.deepStrictEqual(theseLeft(this_('a')), some('a'))
    assert.deepStrictEqual(theseLeft(that(1)), none)
    assert.deepStrictEqual(theseLeft(both('a', 1)), some('a'))
  })

  it('theseRight', () => {
    assert.deepStrictEqual(theseRight(this_('a')), none)
    assert.deepStrictEqual(theseRight(that(1)), some(1))
    assert.deepStrictEqual(theseRight(both('a', 1)), some(1))
  })

  it('thisOrBoth', () => {
    assert.deepStrictEqual(thisOrBoth('a', none), this_('a'))
    assert.deepStrictEqual(thisOrBoth('a', some(1)), both('a', 1))
  })

  it('thatOrBoth', () => {
    assert.deepStrictEqual(thatOrBoth(1, none), that(1))
    assert.deepStrictEqual(thatOrBoth(1, some('a')), both('a', 1))
  })

  it('theseThis', () => {
    assert.deepStrictEqual(theseThis(this_('a')), some('a'))
    assert.deepStrictEqual(theseThis(that(1)), none)
    assert.deepStrictEqual(theseThis(both('a', 1)), none)
  })

  it('theseThat', () => {
    assert.deepStrictEqual(theseThat(this_('a')), none)
    assert.deepStrictEqual(theseThat(that(1)), some(1))
    assert.deepStrictEqual(theseThat(both('a', 1)), none)
  })

  it('fromOptions', () => {
    assert.deepStrictEqual(fromOptions(none, none), none)
    assert.deepStrictEqual(fromOptions(some('a'), none), some(this_('a')))
    assert.deepStrictEqual(fromOptions(none, some(1)), some(that(1)))
    assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
  })

  it('fromEither', () => {
    assert.deepStrictEqual(fromEither(left('a')), this_('a'))
    assert.deepStrictEqual(fromEither(right(1)), that(1))
  })

  it('isThis', () => {
    assert.strictEqual(this_(1).isThis(), true)
    assert.strictEqual(that(1).isThis(), false)
    assert.strictEqual(both('1', 1).isThis(), false)
    assert.strictEqual(isThis(this_(1)), true)
    assert.strictEqual(isThis(that(1)), false)
    assert.strictEqual(isThis(both('1', 1)), false)
  })

  it('isThat', () => {
    assert.strictEqual(this_(1).isThat(), false)
    assert.strictEqual(that(1).isThat(), true)
    assert.strictEqual(both('1', 1).isThat(), false)
    assert.strictEqual(isThat(this_(1)), false)
    assert.strictEqual(isThat(that(1)), true)
    assert.strictEqual(isThat(both('1', 1)), false)
  })

  it('isBoth', () => {
    assert.strictEqual(this_(1).isBoth(), false)
    assert.strictEqual(that(1).isBoth(), false)
    assert.strictEqual(both('1', 1).isBoth(), true)
    assert.strictEqual(isBoth(this_(1)), false)
    assert.strictEqual(isBoth(that(1)), false)
    assert.strictEqual(isBoth(both('1', 1)), true)
  })

  it('reduce', () => {
    assert.strictEqual(this_('b').reduce('a', (b, a) => b + a), 'a')
    assert.strictEqual(these.reduce(this_('b'), 'a', (b, a) => b + a), 'a')
    assert.strictEqual(that('b').reduce('a', (b, a) => b + a), 'ab')
    assert.strictEqual(these.reduce(that('b'), 'a', (b, a) => b + a), 'ab')
    assert.strictEqual(both(1, 'b').reduce('a', (b, a) => b + a), 'ab')
    assert.strictEqual(these.reduce(both(1, 'b'), 'a', (b, a) => b + a), 'ab')
  })

  it('foldMap', () => {
    const foldMap = these.foldMap(monoidString)
    const x1 = that<number, string>('a')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'a')
    const x2 = this_<number, string>(1)
    assert.strictEqual(foldMap(x2, f1), '')
    const x3 = both<number, string>(1, 'a')
    assert.strictEqual(foldMap(x3, f1), 'a')
  })

  it('foldr', () => {
    const foldr = these.foldr
    const x1 = that<number, string>('a')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'a')
    const x2 = this_<number, string>(1)
    assert.strictEqual(foldr(x2, init1, f1), '')
    const x3 = both<number, string>(1, 'a')
    assert.strictEqual(foldr(x3, init1, f1), 'a')
  })

  it('getShow', () => {
    const S = getShow(showString, showString)
    assert.strictEqual(S.show(this_('a')), `this_("a")`)
    assert.strictEqual(S.show(that('a')), `that("a")`)
    assert.strictEqual(S.show(both('a', 'b')), `both("a", "b")`)
  })
})
