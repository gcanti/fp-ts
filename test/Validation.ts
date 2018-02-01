import * as assert from 'assert'
import { array } from '../src/Array'
import { failure, success, getMonad, getApplicative, fromEither, getSetoid } from '../src/Validation'
import * as either from '../src/Either'
import { monoidString } from '../src/Monoid'
import { sequence } from '../src/Traversable'
import { setoidNumber, setoidString } from '../src/Setoid'

describe('Validation', () => {
  it('chain', () => {
    const M = getMonad(monoidString)
    const f = (s: string) => success<string, number>(s.length)
    assert.deepEqual(M.chain(success<string, string>('abc'), f), success(3))
    assert.deepEqual(M.chain(failure<string, string>('a'), f), failure('a'))
  })

  it('traverse', () => {
    const asuccess = [success<string, number>(1), success<string, number>(2), success<string, number>(3)]

    const afailure = [
      success<string, number>(1),
      failure<string, number>('[fail 1]'),
      failure<string, number>('[fail 2]')
    ]

    const applicative = getApplicative(monoidString)

    const x = sequence(applicative, array)(asuccess)

    if (x.isSuccess()) {
      assert.deepEqual(x.value, [1, 2, 3])
    } else {
      assert.ok(false)
    }

    const y = sequence(applicative, array)(afailure)

    if (y.isFailure()) {
      assert.strictEqual(y.value, '[fail 1][fail 2]')
    } else {
      assert.ok(false)
    }
  })

  it('fromEither', () => {
    assert.deepEqual(fromEither(either.right<string, number>(1)), success(1))
    assert.deepEqual(fromEither(either.left<string, number>('error')), failure('error'))
  })

  it('equals', () => {
    const eq = getSetoid(setoidString, setoidNumber).equals
    assert.strictEqual(eq(success(1), success(1)), true)
    assert.strictEqual(eq(success(1), success(2)), false)
    assert.strictEqual(eq(failure('foo'), failure('foo')), true)
    assert.strictEqual(eq(failure('foo'), failure('bar')), false)
  })

  it('catchFailure', () => {
    assert.equal(success(12).catchFailure(() => 17), 12)
    assert.equal(failure(12).catchFailure(() => 17), 17)
    assert.equal(failure(12).catchFailure(l => l + 1), 13)
  })

  it('getOrElse', () => {
    assert.equal(success(12).getOrElse(17), 12)
    assert.equal(failure(12).getOrElse(17), 17)
  })

  it('getOrElseL', () => {
    assert.equal(success(12).getOrElseL(() => 17), 12)
    assert.equal(failure(12).getOrElseL(() => 17), 17)
  })
})
