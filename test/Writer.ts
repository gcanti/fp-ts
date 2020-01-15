import * as assert from 'assert'
import * as W from '../src/Writer'
import { tuple } from '../src/function'
import { monoidString } from '../src/Monoid'
import { pipe } from '../src/pipeable'

describe('Writer', () => {
  it('evalWriter', () => {
    assert.deepStrictEqual(
      W.evalWriter(() => [1, 'a']),
      1
    )
  })

  it('execWriter', () => {
    assert.deepStrictEqual(
      W.execWriter(() => [1, 'a']),
      'a'
    )
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(W.writer.map(() => [1, 'a'], double)(), [2, 'a'])
  })

  it('tell', () => {
    assert.deepStrictEqual(W.tell(1)(), [undefined, 1])
  })

  it('listen', () => {
    assert.deepStrictEqual(W.listen(() => [1, 'a'])(), [[1, 'a'], 'a'])
  })

  it('pass', () => {
    assert.deepStrictEqual(W.pass(() => [tuple(1, (w: string) => w + 'b'), 'a'])(), [1, 'ab'])
  })

  it('listens', () => {
    const fa: W.Writer<string, number> = () => [1, 'a']
    assert.deepStrictEqual(
      pipe(
        fa,
        W.listens(w => w.length)
      )(),
      [[1, 1], 'a']
    )
  })

  it('censor', () => {
    const fa: W.Writer<ReadonlyArray<string>, number> = () => [1, ['a', 'b']]
    assert.deepStrictEqual(
      pipe(
        fa,
        W.censor(w => w.filter(a => a !== 'a'))
      )(),
      [1, ['b']]
    )
  })

  it('getMonad', () => {
    const M = W.getMonad(monoidString)
    assert.deepStrictEqual(M.of(1)(), [1, ''])
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(M.ap(M.of(double), M.of(1))(), [2, ''])
    const f = (n: number) => M.of(n * 2)
    assert.deepStrictEqual(M.chain(M.of(1), f)(), [2, ''])
  })
})
