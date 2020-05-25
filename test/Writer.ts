import * as assert from 'assert'
import * as _ from '../src/Writer'
import { tuple } from '../src/function'
import { monoidString } from '../src/Monoid'
import { pipe } from '../src/pipeable'

describe('Writer', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      const x: _.Writer<string, number> = () => [1, 'a']
      assert.deepStrictEqual(pipe(x, _.map(double))(), [2, 'a'])
    })
  })

  it('evalWriter', () => {
    assert.deepStrictEqual(
      _.evalWriter(() => [1, 'a']),
      1
    )
  })

  it('execWriter', () => {
    assert.deepStrictEqual(
      _.execWriter(() => [1, 'a']),
      'a'
    )
  })

  it('tell', () => {
    assert.deepStrictEqual(_.tell(1)(), [undefined, 1])
  })

  it('listen', () => {
    assert.deepStrictEqual(_.listen(() => [1, 'a'])(), [[1, 'a'], 'a'])
  })

  it('pass', () => {
    assert.deepStrictEqual(_.pass(() => [tuple(1, (w: string) => w + 'b'), 'a'])(), [1, 'ab'])
  })

  it('listens', () => {
    const fa: _.Writer<string, number> = () => [1, 'a']
    assert.deepStrictEqual(
      pipe(
        fa,
        _.listens((w) => w.length)
      )(),
      [[1, 1], 'a']
    )
  })

  it('censor', () => {
    const fa: _.Writer<ReadonlyArray<string>, number> = () => [1, ['a', 'b']]
    assert.deepStrictEqual(
      pipe(
        fa,
        _.censor((w) => w.filter((a) => a !== 'a'))
      )(),
      [1, ['b']]
    )
  })

  it('getMonad', () => {
    const M = _.getMonad(monoidString)
    assert.deepStrictEqual(M.of(1)(), [1, ''])
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(M.ap(M.of(double), M.of(1))(), [2, ''])
    const f = (n: number) => M.of(n * 2)
    assert.deepStrictEqual(M.chain(M.of(1), f)(), [2, ''])
  })
})
