import * as assert from 'assert'
import * as array from '../src/Array'
import * as validation from '../src/Validation'
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
      validation.failure<string, number>(monoidString, '[fail 1]'),
      validation.failure<string, number>(monoidString, '[fail 2]')
    ]

    const x = sequence(validation.getApplicativeS(monoidString), array)(success)

    if (validation.isSuccess(x)) {
      assert.deepEqual(x.value, [1, 2, 3])
    } else {
      assert.ok(false)
    }

    const y = sequence(validation.getApplicativeS(monoidString), array)(failure)

    if (validation.isFailure(y)) {
      assert.strictEqual(y.value, '[fail 1][fail 2]')
    } else {
      assert.ok(false)
    }
  })

})
