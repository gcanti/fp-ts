import { pipe } from '../src/function'
import * as I from '../src/IO'
import * as R from '../src/Reader'
import * as _ from '../src/ReaderIO'
import * as RA from '../src/ReadonlyArray'
import * as S from '../src/string'
import * as U from './util'

describe('ReaderIO', () => {
  // -------------------------------------------------------------------------------------
  // pipeables
  // -------------------------------------------------------------------------------------

  it('map', () => {
    U.deepStrictEqual(pipe(_.of(1), _.map(U.double))({})(), 2)
  })

  it('ap', () => {
    U.deepStrictEqual(pipe(_.of(U.double), _.ap(_.of(1)))({})(), 2)
  })

  it('zipLeftPar', () => {
    U.deepStrictEqual(pipe(_.of('a'), _.zipLeftPar(_.of('b')))({})(), 'a')
  })

  it('zipRightPar', () => {
    U.deepStrictEqual(pipe(_.of('a'), _.zipRightPar(_.of('b')))({})(), 'b')
  })

  it('flatMap', () => {
    const f = (a: string) => _.of(a.length)
    U.deepStrictEqual(pipe(_.of('foo'), _.flatMap(f))({})(), 3)
  })

  it('tap', () => {
    const f = (a: string) => _.of(a.length)
    U.deepStrictEqual(pipe(_.of<string, object>('foo'), _.tap(f))({})(), 'foo')
  })

  type R1 = { readonly env1: unknown }
  type R2 = { readonly env2: unknown }

  it('flatten', () => {
    U.deepStrictEqual(pipe(_.of<_.ReaderIO<R2, 'a'>, R1>(_.of('a')), _.flatten)({ env1: '', env2: '' })(), 'a')
  })

  it('of', () => {
    U.deepStrictEqual(_.fromReader(R.of(1))({})(), 1)
  })

  it('fromIO', async () => {
    U.deepStrictEqual(_.fromIO(() => 1)({})(), 1)
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
    U.deepStrictEqual(_.fromReader(R.of(1))({})(), 1)
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

  it('flatMapIOK', () => {
    const f = (s: string) => I.of(s.length)
    U.deepStrictEqual(pipe(_.of('a'), _.flatMapIOK(f))(undefined)(), 1)
  })

  it('fromIOK', () => {
    const f = _.fromIOK((s: string) => I.of(s.length))
    U.deepStrictEqual(pipe(_.of('a'), _.flatMap(f))({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )(undefined)(),
      { a: 1, b: 'b' }
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(undefined)(), { a: 1, b: 'b' })
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyNonEmptyArray', () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => _.of(a))
    U.deepStrictEqual(pipe(['a', 'b'], f)(null)(), ['a', 'b'])
  })

  it('traverseReadonlyArrayWithIndex', () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => _.of(a + i))
    U.deepStrictEqual(pipe(RA.empty, f)(null)(), RA.empty)
    U.deepStrictEqual(pipe(['a', 'b'], f)(null)(), ['a0', 'b1'])
  })

  it('sequenceReadonlyArray', () => {
    U.deepStrictEqual(pipe([_.of('a'), _.of('b')], _.sequenceReadonlyArray)(null)(), ['a', 'b'])
  })
})
