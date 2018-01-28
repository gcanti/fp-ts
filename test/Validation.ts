import * as assert from 'assert'
import * as array from '../src/Array'
import * as validation from '../src/Validation'
import * as either from '../src/Either'
import { monoidString, monoidSum } from '../src/Monoid'
import { sequence } from '../src/Traversable'
import { setoidNumber, setoidString } from '../src/Setoid'

describe('Validation', () => {
  it('chain', () => {
    const failure = validation.failure(monoidString)
    const f = (s: string) => validation.success<string, number>(s.length)
    assert.deepEqual(validation.chain(validation.success<string, string>('abc'), f), validation.success(3))
    assert.deepEqual(validation.chain(failure<string>('a'), f), failure('a'))
  })

  it('traverse', () => {
    const success = [
      validation.success<string, number>(1),
      validation.success<string, number>(2),
      validation.success<string, number>(3)
    ]

    const failure = [
      validation.success<string, number>(1),
      validation.failure(monoidString)<number>('[fail 1]'),
      validation.failure(monoidString)<number>('[fail 2]')
    ]

    const x = sequence(validation, array)(success)

    if (validation.isSuccess(x)) {
      assert.deepEqual(x.value, [1, 2, 3])
    } else {
      assert.ok(false)
    }

    const y = sequence(validation, array)(failure)

    if (validation.isFailure(y)) {
      assert.strictEqual(y.value, '[fail 1][fail 2]')
    } else {
      assert.ok(false)
    }
  })

  it('fromEither', () => {
    const fromEither = validation.fromEither(monoidString)
    assert.deepEqual(fromEither(either.right<string, number>(1)), validation.success(1))
    assert.deepEqual(fromEither(either.left<string, number>('error')), validation.failure(monoidString)('error'))
  })

  it('equals', () => {
    const failure = validation.failure(monoidString)
    const eq = validation.getSetoid(setoidString, setoidNumber).equals
    assert.strictEqual(eq(validation.success(1), validation.success(1)), true)
    assert.strictEqual(eq(validation.success(1), validation.success(2)), false)
    assert.strictEqual(eq(failure('foo'), failure('foo')), true)
    assert.strictEqual(eq(failure('foo'), failure('bar')), false)
  })

  it('catchFailure', () => {
    const failure = validation.failure(monoidSum)
    assert.equal(validation.catchFailure(validation.success(12), () => 17), 12)
    assert.equal(validation.catchFailure(failure(12), () => 17), 17)
    assert.equal(validation.catchFailure(failure(12), (l: number) => l + 1), 13)
  })

  it('getOrElse', () => {
    const failure = validation.failure(monoidSum)
    assert.equal(validation.success(12).getOrElse(17), 12)
    assert.equal(failure(12).getOrElse(17), 17)
  })
})
