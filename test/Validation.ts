import * as assert from 'assert'
import { array } from '../src/Array'
import { failure, success, getMonad, getApplicative, fromEither, getSetoid, getSemigroup } from '../src/Validation'
import * as either from '../src/Either'
import { monoidString } from '../src/Monoid'
import { sequence } from '../src/Traversable'
import { setoidNumber, setoidString } from '../src/Setoid'
import { semigroupString } from '../src/Semigroup'

describe('Validation', () => {
  it('chain', () => {
    const M = getMonad(monoidString)
    const f = (s: string) => success<string, number>(s.length)
    assert.deepEqual(M.chain(success<string, string>('abc'), f), success(3))
    assert.deepEqual(M.chain(failure<string, string>('a'), f), failure('a'))
    assert.deepEqual(M.chain(failure<string, string>('a'), () => failure('b')), failure('a'))
  })

  it('of', () => {
    const { of } = getApplicative(monoidString)
    assert.deepEqual(of(1), success(1))
  })

  it('ap', () => {
    const { ap } = getApplicative(monoidString)
    const double = (n: number) => n * 2
    assert.deepEqual(ap(success(double), success(1)), success(2))
    assert.deepEqual(ap(success(double), failure('foo')), failure('foo'))
    assert.deepEqual(ap(failure<string, (n: number) => number>('foo'), success(1)), failure('foo'))
    assert.deepEqual(ap(failure<string, (n: number) => number>('foo'), failure('bar')), failure('foobar'))
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
})
