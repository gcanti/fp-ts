import * as assert from 'assert'
import { left, right } from '../src/Either'
import * as I from '../src/Identity'
import { getArrayMonoid, monoidString, monoidSum } from '../src/Monoid'
import { none, some } from '../src/Option'
import { semigroupString } from '../src/Semigroup'
import {
  getAlt,
  getCompactable,
  getFilterable,
  getMonad,
  getMonadThrow,
  getMonoid,
  getSemigroup,
  getWitherable
} from '../src/Validation'

const p = (n: number): boolean => n > 2

describe('Validation', () => {
  it('getMonad', () => {
    const M = getMonad(monoidString)
    const f = (s: string) => right(s.length)
    assert.deepStrictEqual(M.chain(right('abc'), f), right(3))
    assert.deepStrictEqual(M.chain(left('a'), f), left('a'))
    assert.deepStrictEqual(M.chain(left('a'), () => left('b')), left('a'))
    assert.deepStrictEqual(M.of(1), right(1))
    const double = (n: number) => n * 2
    assert.deepStrictEqual(M.ap(right(double), right(1)), right(2))
    assert.deepStrictEqual(M.ap(right(double), left('foo')), left('foo'))
    assert.deepStrictEqual(M.ap(left('foo'), right(1)), left('foo'))
    assert.deepStrictEqual(M.ap(left('foo'), left('bar')), left('foobar'))
  })

  it('getSemigroup', () => {
    const { concat } = getSemigroup(semigroupString, semigroupString)
    assert.deepStrictEqual(concat(right('a'), right('b')), right('ab'))
    assert.deepStrictEqual(concat(right('a'), left('b')), left('b'))
    assert.deepStrictEqual(concat(left('b'), right('a')), left('b'))
    assert.deepStrictEqual(concat(left('a'), left('b')), left('ab'))
  })

  it('getAlt', () => {
    const alt = getAlt(getArrayMonoid<number>())
    assert.deepStrictEqual(alt.alt(left([1]), right('a')), right('a'))
    assert.deepStrictEqual(alt.alt(right('a'), left([1])), right('a'))
    assert.deepStrictEqual(alt.alt(left([1]), left([2])), left([1, 2]))
  })

  it('getMonoid', () => {
    const M = getMonoid(monoidString, monoidSum)
    assert.deepStrictEqual(M.concat(right(1), right(2)), right(3))
    assert.deepStrictEqual(M.concat(right(1), left('foo')), left('foo'))
    assert.deepStrictEqual(M.concat(left('foo'), right(1)), left('foo'))
    assert.deepStrictEqual(M.concat(left('foo'), left('bar')), left('foobar'))
  })

  describe('getCompactable', () => {
    const C = getCompactable(monoidString)

    it('compact', () => {
      assert.deepStrictEqual(C.compact(left('1')), left('1'))
      assert.deepStrictEqual(C.compact(right(none)), left(monoidString.empty))
      assert.deepStrictEqual(C.compact(right(some(123))), right(123))
    })

    it('separate', () => {
      assert.deepStrictEqual(C.separate(left('123')), { left: left('123'), right: left('123') })
      assert.deepStrictEqual(C.separate(right(left('123'))), {
        left: right('123'),
        right: left(monoidString.empty)
      })
      assert.deepStrictEqual(C.separate(right(right('123'))), {
        left: left(monoidString.empty),
        right: right('123')
      })
    })
  })

  describe('getFilterable', () => {
    const F = getFilterable(monoidString)

    it('partition', () => {
      assert.deepStrictEqual(F.partition(left('123'), p), {
        left: left('123'),
        right: left('123')
      })
      assert.deepStrictEqual(F.partition(right(1), p), {
        left: right(1),
        right: left(monoidString.empty)
      })
      assert.deepStrictEqual(F.partition(right(3), p), {
        left: left(monoidString.empty),
        right: right(3)
      })
    })

    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(F.partitionMap(left('123'), f), {
        left: left('123'),
        right: left('123')
      })
      assert.deepStrictEqual(F.partitionMap(right(1), f), {
        left: right(0),
        right: left(monoidString.empty)
      })
      assert.deepStrictEqual(F.partitionMap(right(3), f), {
        left: left(monoidString.empty),
        right: right(4)
      })
    })

    it('filter', () => {
      assert.deepStrictEqual(F.filter(left('123'), p), left('123'))
      assert.deepStrictEqual(F.filter(right(1), p), left(monoidString.empty))
      assert.deepStrictEqual(F.filter(right(3), p), right(3))
    })

    it('filterMap', () => {
      const f = (n: number) => (p(n) ? some(n + 1) : none)
      assert.deepStrictEqual(F.filterMap(left('123'), f), left('123'))
      assert.deepStrictEqual(F.filterMap(right(1), f), left(monoidString.empty))
      assert.deepStrictEqual(F.filterMap(right(3), f), right(4))
    })
  })

  describe('getWitherable', () => {
    const W = getWitherable(monoidString)
    const p = (n: number) => n > 2

    it('wither', () => {
      const f = (n: number) => I.identity.of(p(n) ? some(n + 1) : none)
      const witherIdentity = W.wither(I.identity)
      assert.deepStrictEqual(witherIdentity(left('foo'), f), I.identity.of(left('foo')))
      assert.deepStrictEqual(witherIdentity(right(1), f), I.identity.of(left(monoidString.empty)))
      assert.deepStrictEqual(witherIdentity(right(3), f), I.identity.of(right(4)))
    })

    it('wilt', () => {
      const wiltIdentity = W.wilt(I.identity)
      const f = (n: number) => I.identity.of(p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(
        wiltIdentity(left('foo'), f),
        I.identity.of({
          left: left('foo'),
          right: left('foo')
        })
      )
      assert.deepStrictEqual(
        wiltIdentity(right(1), f),
        I.identity.of({
          left: right(0),
          right: left(monoidString.empty)
        })
      )
      assert.deepStrictEqual(
        wiltIdentity(right(3), f),
        I.identity.of({
          left: left(monoidString.empty),
          right: right(4)
        })
      )
    })
  })

  describe('getMonadThrow', () => {
    const M = getMonadThrow(monoidString)

    it('should obey the law', () => {
      assert.deepStrictEqual(M.chain(M.throwError('error'), a => M.of(a)), M.throwError('error'))
    })

    it('fromOption', () => {
      assert.deepStrictEqual(M.fromOption(none, 'error'), left('error'))
      assert.deepStrictEqual(M.fromOption(some(1), 'error'), right(1))
    })
  })
})
