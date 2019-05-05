import * as assert from 'assert'
import * as E from '../src/Either'
import * as IE from '../src/IOEither'
import * as O from '../src/Option'
import { reader } from '../src/Reader'
import * as RTE from '../src/ReaderTaskEither'
import { State } from '../src/State'
import * as _ from '../src/StateReaderTaskEither'
import { task } from '../src/Task'
import { taskEither } from '../src/TaskEither'
import { io } from '../src/IO'

describe('StateReaderTaskEither', () => {
  it('run', async () => {
    const ma = _.right('aaa')
    const e = await _.run(ma, {}, {})
    assert.deepStrictEqual(e, E.right(['aaa', {}]))
  })

  describe('Monad', () => {
    it('map', async () => {
      const len = (s: string): number => s.length
      const ma = _.right('aaa')
      const e = await RTE.run(_.evalState(_.stateReaderTaskEither.map(ma, len), {}), {})
      assert.deepStrictEqual(e, E.right(3))
    })

    it('ap', async () => {
      const len = (s: string): number => s.length
      const mab = _.right(len)
      const ma = _.right('aaa')
      const e = await RTE.run(_.evalState(_.stateReaderTaskEither.ap(mab, ma), {}), {})
      assert.deepStrictEqual(e, E.right(3))
    })

    it('ap (seq)', async () => {
      const len = (s: string): number => s.length
      const mab = _.right(len)
      const ma = _.right('aaa')
      const e = await RTE.run(_.evalState(_.stateReaderTaskEitherSeq.ap(mab, ma), {}), {})
      assert.deepStrictEqual(e, E.right(3))
    })

    it('chain', async () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      const ma = _.right('aaa')
      const e = await RTE.run(_.evalState(_.stateReaderTaskEither.chain(ma, f), {}), {})
      assert.deepStrictEqual(e, E.right(3))
    })
  })

  it('execState', async () => {
    const ma = _.right('aaa')
    const s = {}
    const e = await RTE.run(_.execState(ma, s), {})
    assert.deepStrictEqual(e, E.right(s))
  })

  it('rightState', async () => {
    const state: State<{}, number> = s => [1, s]
    const e = await RTE.run(_.evalState(_.rightState(state), {}), {})
    assert.deepStrictEqual(e, E.right(1))
  })

  it('leftState', async () => {
    const state: State<{}, number> = s => [1, s]
    const e = await RTE.run(_.evalState(_.leftState(state), {}), {})
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromReaderTaskEither', async () => {
    const rte: RTE.ReaderTaskEither<{}, string, number> = RTE.right(1)
    const e = await RTE.run(_.evalState(_.fromReaderTaskEither(rte), {}), {})
    assert.deepStrictEqual(e, E.right(1))
  })

  it('left', async () => {
    const e = await _.run(_.left(1), {}, {})
    assert.deepStrictEqual(e, E.left(1))
  })

  it('rightTask', async () => {
    const e = await _.run(_.rightTask(task.of(1)), {}, {})
    assert.deepStrictEqual(e, E.right([1, {}]))
  })

  it('leftTask', async () => {
    const e = await _.run(_.leftTask(task.of(1)), {}, {})
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromTaskEither', async () => {
    const e = await _.run(_.fromTaskEither(taskEither.of(1)), {}, {})
    assert.deepStrictEqual(e, E.right([1, {}]))
  })

  it('rightReader', async () => {
    const e = await _.run(_.rightReader(reader.of(1)), {}, {})
    assert.deepStrictEqual(e, E.right([1, {}]))
  })

  it('leftReader', async () => {
    const e = await _.run(_.leftReader(reader.of(1)), {}, {})
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromIOEither', async () => {
    const e1 = await _.run(_.fromIOEither(IE.right(1)), {}, {})
    assert.deepStrictEqual(e1, E.right([1, {}]))
    const e2 = await _.run(_.fromIOEither(IE.left(1)), {}, {})
    assert.deepStrictEqual(e2, E.left(1))
  })

  it('fromEither', async () => {
    const e1 = await _.run(_.fromEither(E.right(1)), {}, {})
    assert.deepStrictEqual(e1, E.right([1, {}]))
    const e2 = await _.run(_.fromEither(E.left(1)), {}, {})
    assert.deepStrictEqual(e2, E.left(1))
  })

  it('fromOption', async () => {
    const e1 = await _.run(_.fromOption(O.some(1), () => 'err'), {}, {})
    assert.deepStrictEqual(e1, E.right([1, {}]))
    const e2 = await _.run(_.fromOption(O.none, () => 'err'), {}, {})
    assert.deepStrictEqual(e2, E.left('err'))
  })

  it('rightIO', async () => {
    const e = await _.run(_.rightIO(io.of(1)), {}, {})
    assert.deepStrictEqual(e, E.right([1, {}]))
  })

  it('leftIO', async () => {
    const e = await _.run(_.leftIO(io.of(1)), {}, {})
    assert.deepStrictEqual(e, E.left(1))
  })
})
