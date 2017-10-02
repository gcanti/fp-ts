import * as assert from 'assert'
import * as array from '../src/Array'
import * as validation from '../src/Validation'
import * as either from '../src/Either'
import { monoidString } from '../src/Monoid'
import { sequence } from '../src/Traversable'

describe('Validation', () => {
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
})
