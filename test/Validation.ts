import * as assert from 'assert'
import { array } from '../src/Array'
import * as either from '../src/Either'
import { monoidString, monoidSum } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { getArraySemigroup, semigroupString } from '../src/Semigroup'
import { setoidNumber, setoidString } from '../src/Setoid'
import { sequence, traverse } from '../src/Traversable'
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
  getMonoid
} from '../src/Validation'

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
    assert.deepEqual(fromEither(either.right<string, number>(1)), success(1))
    assert.deepEqual(fromEither(either.left<string, number>('error')), failure('error'))
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
    const g = (n: number): boolean => n > 2
    assert.deepEqual(success<string, number>(1).bimap(f, g), success(false))
    assert.deepEqual(failure<string, number>('foo').bimap(f, g), failure(3))
    assert.deepEqual(validation.bimap(success<string, number>(1), f, g), success(false))
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const handleError = (n: number) => `Invalid number ${n}`
    const gt2 = fromPredicate(predicate, handleError)
    assert.deepEqual(gt2(3), success(3))
    assert.deepEqual(gt2(1), failure('Invalid number 1'))
  })

  it('traverse', () => {
    assert.deepEqual(traverse(option, validation)(failure('foo'), a => (a >= 2 ? some(a) : none)), some(failure('foo')))
    assert.deepEqual(traverse(option, validation)(success(1), a => (a >= 2 ? some(a) : none)), none)
    assert.deepEqual(traverse(option, validation)(success(3), a => (a >= 2 ? some(a) : none)), some(success(3)))
  })

  it('getMonoid', () => {
    const M = getMonoid(monoidString, monoidSum)
    assert.deepEqual(M.concat(success(1), success(2)), success(3))
    assert.deepEqual(M.concat(success(1), failure('foo')), failure('foo'))
    assert.deepEqual(M.concat(failure('foo'), success(1)), failure('foo'))
    assert.deepEqual(M.concat(failure('foo'), failure('bar')), failure('foobar'))
  })
})
