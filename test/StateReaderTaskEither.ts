import * as assert from 'assert'
import * as E from '../src/Either'
import * as SRTE from '../src/StateReaderTaskEither'

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
})
