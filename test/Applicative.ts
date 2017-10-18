import * as assert from 'assert'
import * as taskValidation from '../examples/TaskValidation'
import * as task from '../src/Task'
import { when } from '../src/Applicative'
import * as validation from '../src/Validation'
import { monoidString } from '../src/Monoid'
import { sequence } from '../src/Traversable'
import * as array from '../src/Array'
import * as io from '../src/IO'

describe('Applicative', () => {
  it('getApplicativeComposition', () => {
    const allsuccess = [
      validation.success<string, number>(1),
      validation.success<string, number>(2),
      validation.success<string, number>(3)
    ].map(a => new taskValidation.TaskValidation(task.of(a)))

    const somefailure = [
      validation.success<string, number>(1),
      validation.failure(monoidString)<number>('[fail 1]'),
      validation.failure(monoidString)<number>('[fail 2]')
    ].map(a => new taskValidation.TaskValidation(task.of(a)))

    const p1 = sequence(taskValidation, array)(allsuccess).value.run()
    const p2 = sequence(taskValidation, array)(somefailure).value.run()

    return Promise.all([p1, p2]).then(([s, f]) => {
      if (validation.isSuccess(s)) {
        assert.deepEqual(s.value, [1, 2, 3])
      } else {
        assert.ok(false)
      }
      if (validation.isFailure(f)) {
        assert.deepEqual(f.value, '[fail 1][fail 2]')
      } else {
        assert.ok(false)
      }
    })
  })

  it('when', () => {
    const log: Array<string> = []
    const action = new io.IO(() => {
      log.push('action called')
    })
    when(io)(false, action).run()
    assert.deepEqual(log, [])
    when(io)(true, action).run()
    assert.deepEqual(log, ['action called'])
  })
})
