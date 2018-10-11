import * as assert from 'assert'
import { array } from '../src/Array'
import { monoidString, monoidSum } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { getArraySemigroup, semigroupString } from '../src/Semigroup'
import { setoidNumber, setoidString } from '../src/Setoid'
import { sequence } from '../src/Traversable'
import {
  failure,
  fromEither,
  fromPredicate,
  getAlt,
  getApplicative,
  getMonad,
  getSemigroup,
  getSetoid,
  isFailure,
  isSuccess,
  success,
  validation,
  getMonoid,
  getCompactable,
  getFilterable,
  getWitherable
} from '../src/Validation'
import { left, right } from '../src/Either'
import * as I from '../src/Identity'
import * as F from '../src/Foldable'
import { identity } from '../src/function'

const p = (n: number): boolean => n > 2

describe('Validation', () => {
  it('getMonad', () => {
    const M = getMonad(monoidString)
    const f = (s: string) => success<string, number>(s.length)
    assert.deepEqual(M.chain(success<string, string>('abc'), f), success(3))
    assert.deepEqual(M.chain(failure<string, string>('a'), f), failure('a'))
    assert.deepEqual(M.chain(failure<string, string>('a'), () => failure('b')), failure('a'))
    assert.deepEqual(M.of(1), success(1))
    const double = (n: number) => n * 2
    assert.deepEqual(M.ap(success(double), success(1)), success(2))
    assert.deepEqual(M.ap(success(double), failure('foo')), failure('foo'))
    assert.deepEqual(M.ap(failure<string, (n: number) => number>('foo'), success(1)), failure('foo'))
    assert.deepEqual(M.ap(failure<string, (n: number) => number>('foo'), failure('bar')), failure('foobar'))
  })

  it('traverse', () => {
    const asuccess = [success<string, number>(1), success<string, number>(2), success<string, number>(3)]

    const afailure = [
      success<string, number>(1),
      failure<string, number>('[fail 1]'),
      failure<string, number>('[fail 2]')
    ]

    const applicative = getApplicative(monoidString)

    assert.deepEqual(sequence(applicative, array)(asuccess), success([1, 2, 3]))
    assert.deepEqual(sequence(applicative, array)(afailure), failure('[fail 1][fail 2]'))
  })

  it('fromEither', () => {
    assert.deepEqual(fromEither(right<string, number>(1)), success(1))
    assert.deepEqual(fromEither(left<string, number>('error')), failure('error'))
  })

  it('getSetoid', () => {
    const { equals } = getSetoid(setoidString, setoidNumber)
    assert.strictEqual(equals(success(1), success(1)), true)
    assert.strictEqual(equals(success(1), success(2)), false)
    assert.strictEqual(equals(success(2), success(1)), false)
    assert.strictEqual(equals(success(1), failure('foo')), false)
    assert.strictEqual(equals(failure('foo'), success(1)), false)
    assert.strictEqual(equals(failure('foo'), failure('foo')), true)
    assert.strictEqual(equals(failure('foo'), failure('bar')), false)
    assert.strictEqual(equals(failure('bar'), failure('foo')), false)
  })

  it('getSemigroup', () => {
    const { concat } = getSemigroup(semigroupString, semigroupString)
    assert.deepEqual(concat(success('a'), success('b')), success('ab'))
    assert.deepEqual(concat(success('a'), failure('b')), failure('b'))
    assert.deepEqual(concat(failure('b'), success('a')), failure('b'))
    assert.deepEqual(concat(failure('a'), failure('b')), failure('ab'))
  })

  it('getOrElse', () => {
    assert.equal(success(12).getOrElse(17), 12)
    assert.equal(failure(12).getOrElse(17), 17)
    assert.equal(failure(12).getOrElseL((l: number) => l + 1), 13)
  })

  it('getOrElseL', () => {
    assert.equal(success(12).getOrElseL(() => 17), 12)
    assert.equal(failure(12).getOrElseL(() => 17), 17)
  })

  it('mapFailure', () => {
    assert.deepEqual(success<string, number>(12).mapFailure(s => s.length), success(12))
    assert.deepEqual(failure<string, number>('foo').mapFailure(s => s.length), failure(3))
  })

  it('getAlt', () => {
    const alt = getAlt(getArraySemigroup<number>())
    assert.deepEqual(alt.alt(failure([1]), success('a')), success('a'))
    assert.deepEqual(alt.alt(success('a'), failure([1])), success('a'))
    assert.deepEqual(alt.alt(failure([1]), failure([2])), failure([1, 2]))
  })

  it('reduce', () => {
    assert.deepEqual(success('bar').reduce('foo', (b, a) => b + a), 'foobar')
    assert.deepEqual(failure('bar').reduce('foo', (b, a) => b + a), 'foo')
    assert.deepEqual(validation.reduce(success('bar'), 'foo', (b, a) => b + a), 'foobar')
  })

  it('foldMap', () => {
    const old = F.foldMap(validation, monoidString)
    const foldMap = validation.foldMap(monoidString)
    const x1 = success<number, string>('a')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'a')
    assert.strictEqual(foldMap(x1, f1), old(x1, f1))
    const x2 = failure<number, string>(1)
    assert.strictEqual(foldMap(x2, f1), '')
    assert.strictEqual(foldMap(x2, f1), old(x2, f1))
  })

  it('foldr', () => {
    const old = F.foldr(validation)
    const foldr = validation.foldr
    const x1 = success<number, string>('a')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'a')
    assert.strictEqual(foldr(x1, init1, f1), old(x1, init1, f1))
    const x2 = failure<number, string>(1)
    assert.strictEqual(foldr(x2, init1, f1), '')
    assert.strictEqual(foldr(x2, init1, f1), old(x2, init1, f1))
  })

  it('mapFailure', () => {
    const double = (n: number): number => n * 2
    assert.deepEqual(success<number, string>('bar').mapFailure(double), success('bar'))
    assert.deepEqual(failure<number, string>(2).mapFailure(double), failure(4))
  })

  it('toString', () => {
    assert.strictEqual(success('bar').toString(), 'success("bar")')
    assert.strictEqual(success('bar').inspect(), 'success("bar")')
    assert.strictEqual(failure('bar').toString(), 'failure("bar")')
    assert.strictEqual(failure('bar').inspect(), 'failure("bar")')
  })

  it('swap', () => {
    assert.deepEqual(success('bar').swap(), failure('bar'))
    assert.deepEqual(failure('bar').swap(), success('bar'))
  })

  it('isFailure', () => {
    assert.strictEqual(success(1).isFailure(), false)
    assert.strictEqual(failure(1).isFailure(), true)
    assert.strictEqual(isFailure(success(1)), false)
    assert.strictEqual(isFailure(failure(1)), true)
  })

  it('isSuccess', () => {
    assert.strictEqual(success(1).isSuccess(), true)
    assert.strictEqual(failure(1).isSuccess(), false)
    assert.strictEqual(isSuccess(success(1)), true)
    assert.strictEqual(isSuccess(failure(1)), false)
  })

  it('fold', () => {
    const f = (s: string) => `failure${s.length}`
    const g = (s: string) => `success${s.length}`
    assert.strictEqual(failure<string, string>('abc').fold(f, g), 'failure3')
    assert.strictEqual(success<string, string>('abc').fold(f, g), 'success3')
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    assert.deepEqual(success<string, number>(1).bimap(f, p), success(false))
    assert.deepEqual(failure<string, number>('foo').bimap(f, p), failure(3))
    assert.deepEqual(validation.bimap(success<string, number>(1), f, p), success(false))
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const handleError = (n: number) => `Invalid number ${n}`
    const gt2 = fromPredicate(predicate, handleError)
    assert.deepEqual(gt2(3), success(3))
    assert.deepEqual(gt2(1), failure('Invalid number 1'))
  })

  it('traverse', () => {
    assert.deepEqual(validation.traverse(option)(failure('foo'), a => (a >= 2 ? some(a) : none)), some(failure('foo')))
    assert.deepEqual(validation.traverse(option)(success(1), a => (a >= 2 ? some(a) : none)), none)
    assert.deepEqual(validation.traverse(option)(success(3), a => (a >= 2 ? some(a) : none)), some(success(3)))
  })

  it('getMonoid', () => {
    const M = getMonoid(monoidString, monoidSum)
    assert.deepEqual(M.concat(success(1), success(2)), success(3))
    assert.deepEqual(M.concat(success(1), failure('foo')), failure('foo'))
    assert.deepEqual(M.concat(failure('foo'), success(1)), failure('foo'))
    assert.deepEqual(M.concat(failure('foo'), failure('bar')), failure('foobar'))
  })

  describe('getCompactable', () => {
    const C = getCompactable(monoidString)
    it('compact', () => {
      assert.deepEqual(C.compact(failure('1')), failure('1'))
      assert.deepEqual(C.compact(success(none)), failure(monoidString.empty))
      assert.deepEqual(C.compact(success(some(123))), success(123))
    })

    it('separate', () => {
      assert.deepEqual(C.separate(failure('123')), { left: failure('123'), right: failure('123') })
      assert.deepEqual(C.separate(success(left('123'))), { left: success('123'), right: failure(monoidString.empty) })
      assert.deepEqual(C.separate(success(right('123'))), { left: failure(monoidString.empty), right: success('123') })
    })
  })

  describe('getFilterable', () => {
    const F = getFilterable(monoidString)
    it('partition', () => {
      assert.deepEqual(F.partition(failure<string, number>('123'), p), {
        left: failure('123'),
        right: failure('123')
      })
      assert.deepEqual(F.partition(success<string, number>(1), p), {
        left: success(1),
        right: failure(monoidString.empty)
      })
      assert.deepEqual(F.partition(success<string, number>(3), p), {
        left: failure(monoidString.empty),
        right: success(3)
      })
    })
    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
      assert.deepEqual(F.partitionMap(failure<string, number>('123'), f), {
        left: failure('123'),
        right: failure('123')
      })
      assert.deepEqual(F.partitionMap(success<string, number>(1), f), {
        left: success(0),
        right: failure(monoidString.empty)
      })
      assert.deepEqual(F.partitionMap(success<string, number>(3), f), {
        left: failure(monoidString.empty),
        right: success(4)
      })
    })
    it('filter', () => {
      assert.deepEqual(F.filter(failure<string, number>('123'), p), failure('123'))
      assert.deepEqual(F.filter(success<string, number>(1), p), failure(monoidString.empty))
      assert.deepEqual(F.filter(success<string, number>(3), p), success(3))
    })
    it('filterMap', () => {
      const f = (n: number) => (p(n) ? some(n + 1) : none)
      assert.deepEqual(F.filterMap(failure<string, number>('123'), f), failure('123'))
      assert.deepEqual(F.filterMap(success<string, number>(1), f), failure(monoidString.empty))
      assert.deepEqual(F.filterMap(success<string, number>(3), f), success(4))
    })
  })
  describe('getWitherable', () => {
    const W = getWitherable(monoidString)
    const p = (n: number) => n > 2
    it('wither', () => {
      const f = (n: number) => new I.Identity(p(n) ? some(n + 1) : none)
      const witherIdentity = W.wither(I.identity)
      assert.deepEqual(witherIdentity(failure<string, number>('foo'), f), new I.Identity(failure('foo')))
      assert.deepEqual(witherIdentity(success<string, number>(1), f), new I.Identity(failure(monoidString.empty)))
      assert.deepEqual(witherIdentity(success<string, number>(3), f), new I.Identity(success(4)))
    })
    it('wilt', () => {
      const wiltIdentity = W.wilt(I.identity)
      const f = (n: number) => new I.Identity(p(n) ? right(n + 1) : left(n - 1))
      assert.deepEqual(
        wiltIdentity(failure<string, number>('foo'), f),
        new I.Identity({
          left: failure('foo'),
          right: failure('foo')
        })
      )
      assert.deepEqual(
        wiltIdentity(success<string, number>(1), f),
        new I.Identity({
          left: success(0),
          right: failure(monoidString.empty)
        })
      )
      assert.deepEqual(
        wiltIdentity(success<string, number>(3), f),
        new I.Identity({
          left: failure(monoidString.empty),
          right: success(4)
        })
      )
    })
  })
})
