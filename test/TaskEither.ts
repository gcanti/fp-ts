import * as assert from 'assert'
import { right, left } from '../src/Either'
import { fromEither } from '../src/TaskEither'

describe('TaskEither', () => {
  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    const teRight = fromEither(right<string, number>(1)).bimap(f, g)
    const teLeft = fromEither(left<string, number>('foo')).bimap(f, g)
    return Promise.all([teRight.run(), teLeft.run()]).then(([e1, e2]) => {
      assert.deepEqual(e1, right(false))
      assert.deepEqual(e2, left(3))
    })
  })

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
