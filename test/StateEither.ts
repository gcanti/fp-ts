import * as assert from 'assert'
import * as E from '../src/Either'
import { pipe } from '../src/pipeable'
import { State } from '../src/State'
import * as _ from '../src/StateEither'

describe('StateEither', () => {
  it('run', () => {
    const ma = _.right('aaa')
    const e = _.run(ma, {})
    assert.deepStrictEqual(e, E.right(['aaa', {}]))
  })

  describe('Monad', () => {
    it('map', async () => {
      const len = (s: string): number => s.length
      const ma = _.right('aaa')
      const e = _.evalState(_.stateEither.map(ma, len), {})
      assert.deepStrictEqual(e, E.right(3))
    })

    it('ap', async () => {
      const len = (s: string): number => s.length
      const mab = _.right(len)
      const ma = _.right('aaa')
      const e = _.evalState(_.stateEither.ap(mab, ma), {})
      assert.deepStrictEqual(e, E.right(3))
    })

    it('ap (seq)', async () => {
      const len = (s: string): number => s.length
      const mab = _.right(len)
      const ma = _.right('aaa')
      const e = _.evalState(_.stateEitherSeq.ap(mab, ma), {})
      assert.deepStrictEqual(e, E.right(3))
    })

    it('chain', async () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      const ma = _.right('aaa')
      const e = _.evalState(_.stateEither.chain(ma, f), {})
      assert.deepStrictEqual(e, E.right(3))
    })
  })

  it('evalState', () => {
    const ma = _.right('aaa')
    const s = {}
    const e = _.evalState(ma, s)
    assert.deepStrictEqual(e, E.right('aaa'))
  })

  it('execState Right', () => {
    const ma = _.right('aaa')
    const s = {}
    const e = _.execState(ma, s)
    assert.deepStrictEqual(e, E.right(s))
  })

  it('execState Left', () => {
    const ma = _.left('aaa')
    const s = {}
    const e = _.execState(ma, s)
    assert.deepStrictEqual(e, E.left('aaa'))
  })

  it('rightState', () => {
    const state: State<{}, number> = s => [1, s]
    const e = _.evalState(_.rightState(state), {})
    assert.deepStrictEqual(e, E.right(1))
  })

  it('leftState', () => {
    const state: State<{}, number> = s => [1, s]
    const e = _.evalState(_.leftState(state), {})
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromEither', async () => {
    const ei: E.Either<{}, number> = E.right(1)
    const e = _.evalState(_.fromEither(ei), {})
    assert.deepStrictEqual(e, E.right(1))
  })

  it('chainEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    const x = _.evalState(pipe(_.right('aa'), _.chainEitherK(f)), {})
    assert.deepStrictEqual(x, E.right(2))
  })

  it('StateEitherK', async () => {
    const f = (s: Array<string>) => E.right(s.length)
    const x = _.evalState(_.StateEitherK(f)(['a', 'b']), {})
    assert.deepStrictEqual(x, E.right(2))
  })

  it('StatekEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    const x = _.evalState(_.StatekEitherK(f)(_.right('e')), {})
    assert.deepStrictEqual(x, E.right(1))
  })

  it('stateEitherSeq', async () => {
    const f = (s: Array<string>) => E.right(s.length)
    const x = _.evalState(_.StateEitherK(f)(['a', 'b']), {})
    assert.deepStrictEqual(x, E.right(2))
  })
})
