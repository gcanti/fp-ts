import { pipe } from '../src/Function'
import * as I from '../src/Sync'
import * as R from '../src/Reader'
import * as _ from '../src/ReaderSync'
import * as RA from '../src/ReadonlyArray'
import * as S from '../src/string'
import * as U from './util'

describe('ReaderSync', () => {
  // -------------------------------------------------------------------------------------
  // pipeables
  // -------------------------------------------------------------------------------------

  it('map', () => {
    U.deepStrictEqual(pipe(_.succeed(1), _.map(U.double))({})(), 2)
  })

  it('ap', () => {
    U.deepStrictEqual(pipe(_.succeed(U.double), _.ap(_.succeed(1)))({})(), 2)
  })

  it('flatMap', () => {
    const f = (a: string) => _.succeed(a.length)
    U.deepStrictEqual(pipe(_.succeed('foo'), _.flatMap(f))({})(), 3)
  })

  it('tap', () => {
    const f = (a: string) => _.succeed(a.length)
    U.deepStrictEqual(pipe(_.succeed('foo'), _.tap(f))({})(), 'foo')
  })

  it('flatten', () => {
    U.deepStrictEqual(pipe(_.succeed(_.succeed('a')), _.flatten)({ env1: '', env2: '' })(), 'a')
  })

  it('succeed', () => {
    U.deepStrictEqual(_.fromReader(R.succeed(1))({})(), 1)
  })

  it('fromSync', async () => {
    U.deepStrictEqual(_.fromSync(() => 1)({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('ask', () => {
    return U.deepStrictEqual(_.ask<number>()(1)(), 1)
  })

  it('asks', () => {
    return U.deepStrictEqual(_.asks((s: string) => s.length)('foo')(), 3)
  })

  it('fromReader', () => {
    U.deepStrictEqual(_.fromReader(R.succeed(1))({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('local', () => {
    U.deepStrictEqual(
      pipe(
        _.asks((n: number) => n + 1),
        _.local(S.size)
      )('aaa')(),
      4
    )
  })

  it('flatMapIO', () => {
    const f = (s: string) => I.succeed(s.length)
    U.deepStrictEqual(pipe(_.succeed('a'), _.flatMapSync(f))(undefined)(), 1)
  })

  it('liftIO', () => {
    const f = _.liftSync((s: string) => I.succeed(s.length))
    U.deepStrictEqual(pipe(_.succeed('a'), _.flatMap(f))({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.succeed(1),
        _.bindTo('a'),
        _.bind('b', () => _.succeed('b'))
      )(undefined)(),
      { a: 1, b: 'b' }
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.succeed(1), _.bindTo('a'), _.bindRight('b', _.succeed('b')))(undefined)(), {
      a: 1,
      b: 'b'
    })
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseNonEmptyReadonlyArray', () => {
    const f = _.traverseNonEmptyReadonlyArray((a: string) => _.succeed(a))
    U.deepStrictEqual(pipe(['a', 'b'], f)(null)(), ['a', 'b'])
  })

  it('traverseReadonlyArrayWithIndex', () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => _.succeed(a + i))
    U.deepStrictEqual(pipe(RA.empty, f)(null)(), RA.empty)
    U.deepStrictEqual(pipe(['a', 'b'], f)(null)(), ['a0', 'b1'])
  })

  it('sequenceReadonlyArray', () => {
    U.deepStrictEqual(pipe([_.succeed('a'), _.succeed('b')], _.sequenceReadonlyArray)(null)(), ['a', 'b'])
  })
})
