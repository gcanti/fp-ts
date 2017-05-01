import * as assert from 'assert'

import {
  getApplicativeComposition
} from '../src/Applicative'
import * as validation from '../src/Validation'
import * as task from '../src/Task'
import { monoidString } from '../src/Monoid'
import { sequence } from '../src/Traversable'
import * as array from '../src/Array'

export const TaskValidationURI = 'TaskValidation'

export type TaskValidationURI = typeof TaskValidationURI

declare module '../src/HKT' {
  interface HKT<A> {
    TaskValidation: task.Task<validation.Validation<any, A>>
  }
  interface HKT2<A, B> {
    TaskValidation: task.Task<validation.Validation<A, B>>
  }
}

describe('Applicative', () => {

  it('getApplicativeComposition', () => {

    const taskValidationApplicative = getApplicativeComposition(TaskValidationURI)(task, validation)

    const allsuccess = [
      validation.success<string, number>(1),
      validation.success<string, number>(2),
      validation.success<string, number>(3)
    ].map(task.of)

    const somefailure = [
      validation.success<string, number>(1),
      validation.failure<string, number>(monoidString, '[fail 1]'),
      validation.failure<string, number>(monoidString, '[fail 2]')
    ].map(task.of)

    const p1 = sequence(taskValidationApplicative, array)(allsuccess).run()
    const p2 = sequence(taskValidationApplicative, array)(somefailure).run()

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

})
