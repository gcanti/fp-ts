import * as assert from 'assert'
import { right, left } from '../src/Either'
import { taskEither, fromLeft } from '../src/TaskEither'

describe('TaskEither', () => {
  it('chain', () => {
    const te1 = taskEither.chain(
      taskEither.of<string, string>('foo'),
      a => (a.length > 2 ? taskEither.of<string, number>(a.length) : fromLeft<string, number>('foo'))
    )
    const te2 = taskEither.chain(
      taskEither.of<string, string>('a'),
      a => (a.length > 2 ? taskEither.of<string, number>(a.length) : fromLeft<string, number>('foo'))
    )
    return Promise.all([te1.run(), te2.run()]).then(([e1, e2]) => {
      assert.deepEqual(e1, right(3))
      assert.deepEqual(e2, left('foo'))
    })
  })

  it('fold', () => {
    const f = (s: string): boolean => s.length > 2
    const g = (n: number): boolean => n > 2
    const te1 = taskEither.of<string, number>(1).fold(f, g)
    const te2 = fromLeft<string, number>('foo').fold(f, g)
    return Promise.all([te1.run(), te2.run()]).then(([b1, b2]) => {
      assert.strictEqual(b1, false)
      assert.strictEqual(b2, true)
    })
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    const teRight = taskEither.of<string, number>(1).bimap(f, g)
    const teLeft = fromLeft<string, number>('foo').bimap(f, g)
    return Promise.all([teRight.run(), teLeft.run()]).then(([e1, e2]) => {
      assert.deepEqual(e1, right(false))
      assert.deepEqual(e2, left(3))
    })
  })

  it('orElse', () => {
    const l = fromLeft<string, number>('foo')
    const r = taskEither.of<string, number>(1)
    const tl = l.orElse(l => taskEither.of<number, number>(l.length))
    const tr = r.orElse(() => taskEither.of<number, number>(2))
    return Promise.all([tl.run(), tr.run()]).then(([el, er]) => {
      assert.deepEqual(el, right(3))
      assert.deepEqual(er, right(1))
    })
  })
})
