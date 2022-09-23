import { pipe } from '../src/function'
import * as I from '../src/IO'
import * as R from '../src/Reader'
import * as _ from '../src/ReaderIO'
import * as RA from '../src/ReadonlyArray'
import { ReadonlyNonEmptyArray } from '../src/ReadonlyNonEmptyArray'
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

  it('apFirst', () => {
    U.deepStrictEqual(pipe(_.of('a'), _.apFirst(_.of('b')))({})(), 'a')
  })

  it('apSecond', () => {
    U.deepStrictEqual(pipe(_.of('a'), _.apSecond(_.of('b')))({})(), 'b')
  })

  it('chain', () => {
    const f = (a: string) => _.of(a.length)
    U.deepStrictEqual(pipe(_.of('foo'), _.chain(f))({})(), 3)
    U.deepStrictEqual(_.Monad.chain(_.of('foo'), f)({})(), 3)
  })

  it('chainFirst', () => {
    const f = (a: string) => _.of(a.length)
    U.deepStrictEqual(pipe(_.of('foo'), _.chainFirst(f))({})(), 'foo')
  })

  it('chainFirstW', () => {
    const f = (a: string) => _.of(a.length)
    U.deepStrictEqual(pipe(_.of<object, string>('foo'), _.chainFirstW(f))({})(), 'foo')
  })

  it('flatten', () => {
    U.deepStrictEqual(pipe(_.of(_.of('a')), _.flatten)({})(), 'a')
  })

  type R1 = { readonly env1: unknown }
  type R2 = { readonly env2: unknown }

  it('flattenW', () => {
    U.deepStrictEqual(pipe(_.of<R1, _.ReaderIO<R2, 'a'>>(_.of('a')), _.flattenW)({ env1: '', env2: '' })(), 'a')
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

  it('chainIOK', () => {
    const f = (s: string) => I.of(s.length)
    U.deepStrictEqual(pipe(_.of('a'), _.chainIOK(f))(undefined)(), 1)
  })

  it('fromIOK', () => {
    const f = _.fromIOK((s: string) => I.of(s.length))
    U.deepStrictEqual(pipe(_.of('a'), _.chain(f))({})(), 1)
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

  describe('array utils', () => {
    const input: ReadonlyNonEmptyArray<string> = ['a', 'b']

    it('traverseReadonlyArrayWithIndex', () => {
      const f = _.traverseReadonlyArrayWithIndex((i, a: string) => _.of(a + i))
      U.deepStrictEqual(pipe(RA.empty, f)(undefined)(), RA.empty)
      U.deepStrictEqual(pipe(input, f)(undefined)(), ['a0', 'b1'])
    })

    // old
    it('sequenceArray', () => {
      // tslint:disable-next-line: readonly-array
      const log: Array<number | string> = []
      const append =
        (n: number): _.ReaderIO<unknown, number> =>
        () =>
        () => {
          log.push(n)
          return n
        }
      // tslint:disable-next-line: deprecation
      U.deepStrictEqual(pipe([append(1), append(2)], _.sequenceArray)(undefined)(), [1, 2])
      U.deepStrictEqual(log, [1, 2])
    })
  })
})
