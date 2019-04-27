import * as assert from 'assert'
import * as E from '../src/Either'
import * as SRTE from '../src/StateReaderTaskEither'
import { State } from '../src/State'
import * as RTE from '../src/ReaderTaskEither'

describe('StateReaderTaskEither', () => {
  it('map', () => {
    const len = (s: string): number => s.length
    const ma = SRTE.fromRight('aaa')
    return SRTE.evalState(SRTE.stateReaderTaskEither.map(ma, len), {}, {}).then(e => {
      assert.deepStrictEqual(e, E.right(3))
    })
  })

  it('ap', () => {
    const len = (s: string): number => s.length
    const mab = SRTE.fromRight(len)
    const ma = SRTE.fromRight('aaa')
    return SRTE.evalState(SRTE.stateReaderTaskEither.ap(mab, ma), {}, {}).then(e => {
      assert.deepStrictEqual(e, E.right(3))
    })
  })

  it('ap (seq)', () => {
    const len = (s: string): number => s.length
    const mab = SRTE.fromRight(len)
    const ma = SRTE.fromRight('aaa')
    return SRTE.evalState(SRTE.stateReaderTaskEitherSeq.ap(mab, ma), {}, {}).then(e => {
      assert.deepStrictEqual(e, E.right(3))
    })
  })

  it('chain', () => {
    const f = (s: string) => (s.length > 2 ? SRTE.fromRight(s.length) : SRTE.fromRight(0))
    const ma = SRTE.fromRight('aaa')
    return SRTE.evalState(SRTE.stateReaderTaskEither.chain(ma, f), {}, {}).then(e => {
      assert.deepStrictEqual(e, E.right(3))
    })
  })

  it('execState', () => {
    const ma = SRTE.fromRight('aaa')
    const s = {}
    return SRTE.execState(ma, s, {}).then(e => {
      assert.deepStrictEqual(e, E.right(s))
    })
  })

  it('fromState', () => {
    const state: State<{}, number> = s => [1, s]
    return SRTE.evalState(SRTE.fromState(state), {}, {}).then(e => {
      assert.deepStrictEqual(e, E.right(1))
    })
  })

  it('fromReaderTaskEither', () => {
    const rte: RTE.ReaderTaskEither<{}, string, number> = RTE.fromRight(1)
    return SRTE.evalState(SRTE.fromReaderTaskEither(rte), {}, {}).then(e => {
      assert.deepStrictEqual(e, E.right(1))
    })
  })
})
