import { pipe } from '../src/function'
import * as S from '../src/string'
import { tuple } from '../src/tuple'
import * as _ from '../src/Writer'
import * as U from './util'

describe('Writer', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', () => {
    const x: _.Writer<string, number> = () => [1, 'a']
    U.deepStrictEqual(pipe(x, _.map(U.double))(), [2, 'a'])
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('tell', () => {
    U.deepStrictEqual(_.tell(1)(), [undefined, 1])
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('listen', () => {
    U.deepStrictEqual(_.listen(() => [1, 'a'])(), [[1, 'a'], 'a'])
  })

  it('pass', () => {
    U.deepStrictEqual(_.pass(() => [tuple(1, (w: string) => w + 'b'), 'a'])(), [1, 'ab'])
  })

  it('listens', () => {
    const fa: _.Writer<string, number> = () => [1, 'a']
    U.deepStrictEqual(
      pipe(
        fa,
        _.listens((w) => w.length)
      )(),
      [[1, 1], 'a']
    )
  })

  it('censor', () => {
    const fa: _.Writer<ReadonlyArray<string>, number> = () => [1, ['a', 'b']]
    U.deepStrictEqual(
      pipe(
        fa,
        _.censor((w) => w.filter((a) => a !== 'a'))
      )(),
      [1, ['b']]
    )
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getApplicative', () => {
    const M = _.getApplicative(S.Monoid)

    U.deepStrictEqual(M.of(1)(), [1, ''])

    const fab: _.Writer<string, (n: number) => number> = () => [(n: number) => n * 2, 'a']
    const fa: _.Writer<string, number> = () => [1, 'b']
    U.deepStrictEqual(pipe(fab, M.ap(fa))(), [2, 'ab'])
  })

  it('getMonad', () => {
    const M = _.getMonad(S.Monoid)

    U.deepStrictEqual(M.of(1)(), [1, ''])

    const fa: _.Writer<string, number> = () => [1, 'a']
    const f = (n: number): _.Writer<string, number> => () => [n * 2, 'b']
    U.deepStrictEqual(pipe(fa, M.chain(f))(), [2, 'ab'])
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('evaluate', () => {
    U.deepStrictEqual(pipe((() => [1, 'a']) as _.Writer<string, number>, _.evaluate), 1)
  })

  it('execute', () => {
    U.deepStrictEqual(pipe((() => [1, 'a']) as _.Writer<string, number>, _.execute), 'a')
  })
})
