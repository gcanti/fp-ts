import * as assert from 'assert'
import { pipe, tuple } from '../src/function'
import { monoidString } from '../src/Monoid'
import * as _ from '../src/Writer'

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
      // tslint:disable-next-line: deprecation
      _.evalWriter(() => [1, 'a']),
      1
    )
  })

  it('execWriter', () => {
    assert.deepStrictEqual(
      // tslint:disable-next-line: deprecation
      _.execWriter(() => [1, 'a']),
      'a'
    )
  })

  it('evaluate', () => {
    assert.deepStrictEqual(pipe((() => [1, 'a']) as _.Writer<string, number>, _.evaluate), 1)
  })

  it('execute', () => {
    assert.deepStrictEqual(pipe((() => [1, 'a']) as _.Writer<string, number>, _.execute), 'a')
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

  describe('getMonad', () => {
    const M = _.getMonad(monoidString)

    it('of', () => {
      assert.deepStrictEqual(M.of(1)(), [1, ''])
    })

    it('ap', () => {
      const fab: _.Writer<string, (n: number) => number> = () => [(n: number) => n * 2, 'a']
      const fa: _.Writer<string, number> = () => [1, 'b']
      assert.deepStrictEqual(M.ap(fab, fa)(), [2, 'ab'])
    })

    it('chain', () => {
      const fa: _.Writer<string, number> = () => [1, 'a']
      const f = (n: number): _.Writer<string, number> => () => [n * 2, 'b']
      assert.deepStrictEqual(M.chain(fa, f)(), [2, 'ab'])
    })
  })
})
