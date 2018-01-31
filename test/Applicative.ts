import * as assert from 'assert'
import { TaskValidation, getApplicative } from '../examples/TaskValidation'
import { task } from '../src/Task'
import { when } from '../src/Applicative'
import { success, failure } from '../src/Validation'
import { sequence } from '../src/Traversable'
import { array } from '../src/Array'
import { IO, io } from '../src/IO'
import { monoidString } from '../src/Monoid'

describe('Applicative', () => {
  it('getApplicativeComposition', () => {
    const allsuccess = [success<string, number>(1), success<string, number>(2), success<string, number>(3)].map(
      a => new TaskValidation(task.of(a))
    )

    const somefailure = [
      success<string, number>(1),
      failure<string, number>('[fail 1]'),
      failure<string, number>('[fail 2]')
    ].map(a => new TaskValidation(task.of(a)))

    const taskValidationApplicative = getApplicative(monoidString)

    const p1 = sequence(taskValidationApplicative, array)(allsuccess).value.run()
    const p2 = sequence(taskValidationApplicative, array)(somefailure).value.run()

    return Promise.all([p1, p2]).then(([s, f]) => {
      if (s.isSuccess()) {
        assert.deepEqual(s.value, [1, 2, 3])
      } else {
        assert.ok(false)
      }
      if (f.isFailure()) {
        assert.deepEqual(f.value, '[fail 1][fail 2]')
      } else {
        assert.ok(false)
      }
    })
  })

  it('when', () => {
    const log: Array<string> = []
    const action = new IO(() => {
      log.push('action called')
    })
    when(io)(false, action).run()
    assert.deepEqual(log, [])
    when(io)(true, action).run()
    assert.deepEqual(log, ['action called'])
  })
})
