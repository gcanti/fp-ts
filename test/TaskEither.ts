import * as assert from 'assert'
import { right, left } from '../src/Either'
import { fromEither } from '../src/TaskEither'

describe('TaskEither', () => {
  it('orElse', () => {
    const l = fromEither<string, number>(left('foo'))
    const r = fromEither<string, number>(right(1))
    const tl = l.orElse(l => fromEither<number, number>(right(l.length)))
    const tr = r.orElse(() => fromEither<number, number>(right(2)))
    return Promise.all([tl.run(), tr.run()]).then(([el, er]) => {
      assert.deepEqual(el, right(3))
      assert.deepEqual(er, right(1))
    })
  })
})
