import * as assert from 'assert'
import { left, right } from '../src/Either'
import * as F from '../src/Foldable'
import { identity } from '../src/function'
import * as I from '../src/Identity'
import { monoidString, monoidSum, getArrayMonoid } from '../src/Monoid'
import { none, option, Option, some } from '../src/Option'
import { semigroupString } from '../src/Semigroup'
import { setoidNumber, setoidString } from '../src/Setoid'
import * as T from '../src/Traversable'
import {
  failure,
  fromEither,
  fromPredicate,
  getAlt,
  getCompactable,
  getFilterable,
  getMonad,
  getMonoid,
  getSemigroup,
  getSetoid,
  getWitherable,
  isFailure,
  isSuccess,
  success,
  validation,
  tryCatch,
  getMonadThrow,
  getShow
} from '../src/Validation'
import { showString } from '../src/Show'

const p = (n: number): boolean => n > 2

describe('Validation', () => {
  it('getMonad', () => {
    const M = getMonad(monoidString)
    const f = (s: string) => success<string, number>(s.length)
    assert.deepStrictEqual(M.chain(success<string, string>('abc'), f), success(3))
    assert.deepStrictEqual(M.chain(failure<string, string>('a'), f), failure('a'))
    assert.deepStrictEqual(M.chain(failure<string, string>('a'), () => failure('b')), failure('a'))
    assert.deepStrictEqual(M.of(1), success(1))
    const double = (n: number) => n * 2
    assert.deepStrictEqual(M.ap(success(double), success(1)), success(2))
    assert.deepStrictEqual(M.ap(success(double), failure('foo')), failure('foo'))
    assert.deepStrictEqual(M.ap(failure<string, (n: number) => number>('foo'), success(1)), failure('foo'))
    assert.deepStrictEqual(M.ap(failure<string, (n: number) => number>('foo'), failure('bar')), failure('foobar'))
  })

  it('traverse', () => {
    assert.deepStrictEqual(
      validation.traverse(option)(failure('foo'), a => (a >= 2 ? some(a) : none)),
      some(failure('foo'))
    )
    assert.deepStrictEqual(validation.traverse(option)(success(1), a => (a >= 2 ? some(a) : none)), none)
    assert.deepStrictEqual(validation.traverse(option)(success(3), a => (a >= 2 ? some(a) : none)), some(success(3)))
  })

  it('sequence', () => {
    const old = T.sequence(option, validation)
    const sequence = validation.sequence(option)
    const x1 = failure<string, Option<number>>('foo')
    assert.deepStrictEqual(sequence(x1), some(failure('foo')))
    assert.deepStrictEqual(sequence(x1), old(x1))
    const x2 = success<string, Option<number>>(some(1))
    assert.deepStrictEqual(sequence(x2), some(success(1)))
    assert.deepStrictEqual(sequence(x2), old(x2))
    const x3 = success<string, Option<number>>(none)
    assert.deepStrictEqual(sequence(x3), none)
    assert.deepStrictEqual(sequence(x3), old(x3))
  })

  it('fromEither', () => {
    assert.deepStrictEqual(fromEither(right<string, number>(1)), success(1))
    assert.deepStrictEqual(fromEither(left<string, number>('error')), failure('error'))
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
    assert.deepStrictEqual(concat(success('a'), success('b')), success('ab'))
    assert.deepStrictEqual(concat(success('a'), failure('b')), failure('b'))
    assert.deepStrictEqual(concat(failure('b'), success('a')), failure('b'))
    assert.deepStrictEqual(concat(failure('a'), failure('b')), failure('ab'))
  })

  it('getOrElse', () => {
    assert.strictEqual(success(12).getOrElse(17), 12)
    assert.strictEqual(failure<string, number>('a').getOrElse(17), 17)
    assert.strictEqual(failure<string, number>('a').getOrElseL((l: string) => l.length + 1), 2)
  })

  it('getOrElseL', () => {
    assert.strictEqual(success(12).getOrElseL(() => 17), 12)
    assert.strictEqual(failure<string, number>('a').getOrElseL(() => 17), 17)
  })

  it('mapFailure', () => {
    assert.deepStrictEqual(success<string, number>(12).mapFailure(s => s.length), success(12))
    assert.deepStrictEqual(failure<string, number>('foo').mapFailure(s => s.length), failure(3))
  })

  it('getAlt', () => {
    const alt = getAlt(getArrayMonoid<number>())
    assert.deepStrictEqual(alt.alt(failure([1]), success('a')), success('a'))
    assert.deepStrictEqual(alt.alt(success('a'), failure([1])), success('a'))
    assert.deepStrictEqual(alt.alt(failure([1]), failure([2])), failure([1, 2]))
  })

  it('reduce', () => {
    assert.deepStrictEqual(success('bar').reduce('foo', (b, a) => b + a), 'foobar')
    assert.deepStrictEqual(failure('bar').reduce('foo', (b, a) => b + a), 'foo')
    assert.deepStrictEqual(validation.reduce(success('bar'), 'foo', (b, a) => b + a), 'foobar')
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
    assert.deepStrictEqual(success<number, string>('bar').mapFailure(double), success('bar'))
    assert.deepStrictEqual(failure<number, string>(2).mapFailure(double), failure(4))
  })

  it('toString', () => {
    assert.strictEqual(success('bar').toString(), 'success("bar")')
    assert.strictEqual(success('bar').inspect(), 'success("bar")')
    assert.strictEqual(failure('bar').toString(), 'failure("bar")')
    assert.strictEqual(failure('bar').inspect(), 'failure("bar")')
  })

  it('swap', () => {
    assert.deepStrictEqual(success('bar').swap(), failure('bar'))
    assert.deepStrictEqual(failure('bar').swap(), success('bar'))
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
    assert.deepStrictEqual(success<string, number>(1).bimap(f, p), success(false))
    assert.deepStrictEqual(failure<string, number>('foo').bimap(f, p), failure(3))
    assert.deepStrictEqual(validation.bimap(success<string, number>(1), f, p), success(false))
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const handleError = (n: number) => `Invalid number ${n}`
    const gt2 = fromPredicate(predicate, handleError)
    assert.deepStrictEqual(gt2(3), success(3))
    assert.deepStrictEqual(gt2(1), failure('Invalid number 1'))

    // refinements
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const from = fromPredicate(isColor, s => `invalid color ${s}`)
    assert.deepStrictEqual(from('red'), success('red'))
    assert.deepStrictEqual(from('foo'), failure('invalid color foo'))
  })

  it('traverse', () => {
    assert.deepStrictEqual(
      validation.traverse(option)(failure('foo'), a => (a >= 2 ? some(a) : none)),
      some(failure('foo'))
    )
    assert.deepStrictEqual(validation.traverse(option)(success(1), a => (a >= 2 ? some(a) : none)), none)
    assert.deepStrictEqual(validation.traverse(option)(success(3), a => (a >= 2 ? some(a) : none)), some(success(3)))
  })

  it('getMonoid', () => {
    const M = getMonoid(monoidString, monoidSum)
    assert.deepStrictEqual(M.concat(success(1), success(2)), success(3))
    assert.deepStrictEqual(M.concat(success(1), failure('foo')), failure('foo'))
    assert.deepStrictEqual(M.concat(failure('foo'), success(1)), failure('foo'))
    assert.deepStrictEqual(M.concat(failure('foo'), failure('bar')), failure('foobar'))
  })

  describe('getCompactable', () => {
    const C = getCompactable(monoidString)
    it('compact', () => {
      assert.deepStrictEqual(C.compact(failure('1')), failure('1'))
      assert.deepStrictEqual(C.compact(success(none)), failure(monoidString.empty))
      assert.deepStrictEqual(C.compact(success(some(123))), success(123))
    })

    it('separate', () => {
      assert.deepStrictEqual(C.separate(failure('123')), { left: failure('123'), right: failure('123') })
      assert.deepStrictEqual(C.separate(success(left('123'))), {
        left: success('123'),
        right: failure(monoidString.empty)
      })
      assert.deepStrictEqual(C.separate(success(right('123'))), {
        left: failure(monoidString.empty),
        right: success('123')
      })
    })
  })

  describe('getFilterable', () => {
    const F = getFilterable(monoidString)
    it('partition', () => {
      assert.deepStrictEqual(F.partition(failure<string, number>('123'), p), {
        left: failure('123'),
        right: failure('123')
      })
      assert.deepStrictEqual(F.partition(success<string, number>(1), p), {
        left: success(1),
        right: failure(monoidString.empty)
      })
      assert.deepStrictEqual(F.partition(success<string, number>(3), p), {
        left: failure(monoidString.empty),
        right: success(3)
      })
    })
    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(F.partitionMap(failure<string, number>('123'), f), {
        left: failure('123'),
        right: failure('123')
      })
      assert.deepStrictEqual(F.partitionMap(success<string, number>(1), f), {
        left: success(0),
        right: failure(monoidString.empty)
      })
      assert.deepStrictEqual(F.partitionMap(success<string, number>(3), f), {
        left: failure(monoidString.empty),
        right: success(4)
      })
    })
    it('filter', () => {
      assert.deepStrictEqual(F.filter(failure<string, number>('123'), p), failure('123'))
      assert.deepStrictEqual(F.filter(success<string, number>(1), p), failure(monoidString.empty))
      assert.deepStrictEqual(F.filter(success<string, number>(3), p), success(3))
    })
    it('filterMap', () => {
      const f = (n: number) => (p(n) ? some(n + 1) : none)
      assert.deepStrictEqual(F.filterMap(failure<string, number>('123'), f), failure('123'))
      assert.deepStrictEqual(F.filterMap(success<string, number>(1), f), failure(monoidString.empty))
      assert.deepStrictEqual(F.filterMap(success<string, number>(3), f), success(4))
    })
  })
  describe('getWitherable', () => {
    const W = getWitherable(monoidString)
    const p = (n: number) => n > 2
    it('wither', () => {
      const f = (n: number) => new I.Identity(p(n) ? some(n + 1) : none)
      const witherIdentity = W.wither(I.identity)
      assert.deepStrictEqual(witherIdentity(failure<string, number>('foo'), f), new I.Identity(failure('foo')))
      assert.deepStrictEqual(witherIdentity(success<string, number>(1), f), new I.Identity(failure(monoidString.empty)))
      assert.deepStrictEqual(witherIdentity(success<string, number>(3), f), new I.Identity(success(4)))
    })
    it('wilt', () => {
      const wiltIdentity = W.wilt(I.identity)
      const f = (n: number) => new I.Identity(p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(
        wiltIdentity(failure<string, number>('foo'), f),
        new I.Identity({
          left: failure('foo'),
          right: failure('foo')
        })
      )
      assert.deepStrictEqual(
        wiltIdentity(success<string, number>(1), f),
        new I.Identity({
          left: success(0),
          right: failure(monoidString.empty)
        })
      )
      assert.deepStrictEqual(
        wiltIdentity(success<string, number>(3), f),
        new I.Identity({
          left: failure(monoidString.empty),
          right: success(4)
        })
      )
    })
  })

  it('tryCatch', () => {
    const v1 = tryCatch(
      () => {
        throw new Error('foo')
      },
      () => 'error'
    )
    assert.deepStrictEqual(v1, failure('error'))
    const v2 = tryCatch(
      () => {
        return 1
      },
      () => 'error'
    )
    assert.deepStrictEqual(v2, success(1))
  })

  describe('getMonadThrow', () => {
    const M = getMonadThrow(monoidString)

    it('should obey the law', () => {
      assert.deepStrictEqual(M.chain(M.throwError('error'), a => M.of(a)), M.throwError('error'))
    })

    it('fromOption', () => {
      assert.deepStrictEqual(M.fromOption(none, 'error'), failure('error'))
      assert.deepStrictEqual(M.fromOption(some(1), 'error'), success(1))
    })
  })

  it('getShow', () => {
    const S = getShow(showString, showString)
    assert.strictEqual(S.show(failure('a')), `failure("a")`)
    assert.strictEqual(S.show(success('a')), `success("a")`)
  })
})
