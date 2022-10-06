import * as E from '../src/Result'
import { flow, identity, pipe } from '../src/Function'
import * as I from '../src/Sync'
import * as IE from '../src/SyncResult'
import * as N from '../src/number'
import * as O from '../src/Option'
import { gt } from '../src/Ord'
import * as RA from '../src/ReadonlyArray'
import * as writer from '../src/Writer'
import * as S from '../src/string'
import * as T from '../src/Async'
import * as _ from '../src/AsyncResult'
import * as TO from '../src/AsyncOption'
import { assertAsync } from './Async'
import * as U from './util'

const a: _.AsyncResult<string, string> = pipe(_.succeed('a'), T.delay(100))
const b: _.AsyncResult<string, string> = _.succeed('b')

const assertSeq = assertAsync(a, b, [E.succeed('a'), E.succeed('b')])

describe('AsyncResult', () => {
  it('flatMapError', async () => {
    const f = _.flatMapError((e: string) => T.succeed(e + '!'))
    U.deepStrictEqual(await pipe(_.succeed(1), f)(), E.succeed(1))
    U.deepStrictEqual(await pipe(_.fail('a'), f)(), E.fail('a!'))
  })

  it('delay', async () => {
    const log: Array<string> = []

    const append = (message: string) =>
      _.fromSync(() => {
        log.push(message)
      })

    await pipe(
      _.Do,
      _.bindRight('a', append('a')),
      _.bindRight('b', pipe(append('b'), _.delay(20))),
      _.bindRight('c', pipe(append('c'), _.delay(10)))
    )()
    U.deepStrictEqual(log, ['a', 'b', 'c'])
  })

  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('orElse', async () => {
    const assertSemigroupKind = async (
      a: _.AsyncResult<string, number>,
      b: _.AsyncResult<string, number>,
      expected: E.Result<string, number>
    ) => {
      U.deepStrictEqual(await pipe(a, _.orElse(b))(), expected)
    }
    await assertSemigroupKind(_.succeed(1), _.succeed(2), E.succeed(1))
    await assertSemigroupKind(_.succeed(1), _.fail('b'), E.succeed(1))
    await assertSemigroupKind(_.fail('a'), _.succeed(2), E.succeed(2))
    await assertSemigroupKind(_.fail('a'), _.fail('b'), E.fail('b'))
  })

  it('map', async () => {
    const assertMap = async (a: _.AsyncResult<string, number>, expected: E.Result<string, number>) => {
      U.deepStrictEqual(await pipe(a, _.map(U.double))(), expected)
    }
    await assertMap(_.succeed(1), E.succeed(2))
    await assertMap(_.fail('a'), E.fail('a'))
  })

  it('ap', async () => {
    const tuple2 =
      <A>(a: A) =>
      <B>(b: B): readonly [A, B] =>
        [a, b]
    const assertAp = async (
      a: _.AsyncResult<string, number>,
      b: _.AsyncResult<string, number>,
      expected: E.Result<string, readonly [number, number]>
    ) => {
      U.deepStrictEqual(await pipe(a, _.map(tuple2), _.ap(b))(), expected)
    }

    await assertAp(_.succeed(1), _.succeed(2), E.succeed([1, 2]))
    await assertAp(_.succeed(1), _.fail('b'), E.fail('b'))
    await assertAp(_.fail('a'), _.succeed(2), E.fail('a'))
    await assertAp(_.fail('a'), _.fail('b'), E.fail('a'))
  })

  it('flatMap', async () => {
    const assertFlattenable = async (
      a: _.AsyncResult<string, number>,
      b: _.AsyncResult<string, number>,
      expected: E.Result<string, number>
    ) => {
      U.deepStrictEqual(
        await pipe(
          a,
          _.flatMap(() => b)
        )(),
        expected
      )
    }

    await assertFlattenable(_.succeed(1), _.succeed(2), E.succeed(2))
    await assertFlattenable(_.succeed(1), _.fail('b'), E.fail('b'))
    await assertFlattenable(_.fail('a'), _.succeed(2), E.fail('a'))
    await assertFlattenable(_.fail('a'), _.fail('b'), E.fail('a'))
  })

  it('tap', async () => {
    const assertFlattenableFirst = async (
      a: _.AsyncResult<string, number>,
      b: _.AsyncResult<string, number>,
      expected: E.Result<string, number>
    ) => {
      U.deepStrictEqual(
        await pipe(
          a,
          _.tap(() => b)
        )(),
        expected
      )
    }

    await assertFlattenableFirst(_.succeed(1), _.succeed(2), E.succeed(1))
    await assertFlattenableFirst(_.succeed(1), _.fail('b'), E.fail('b'))
    await assertFlattenableFirst(_.fail('a'), _.succeed(2), E.fail('a'))
    await assertFlattenableFirst(_.fail('a'), _.fail('b'), E.fail('a'))
  })

  it('flatten', async () => {
    U.deepStrictEqual(await pipe(_.succeed(_.succeed(1)), _.flatten)(), E.succeed(1))
    U.deepStrictEqual(await pipe(_.succeed(_.fail('b')), _.flatten)(), E.fail('b'))
    U.deepStrictEqual(await pipe(_.fail('a'), _.flatten)(), E.fail('a'))
  })

  it('mapBoth', async () => {
    const f = _.mapBoth(S.size, gt(N.Ord)(2))
    U.deepStrictEqual(await pipe(_.succeed(1), f)(), E.succeed(false))
    U.deepStrictEqual(await pipe(_.fail('a'), f)(), E.fail(1))
  })

  it('mapError', async () => {
    const f = _.mapError(S.size)
    U.deepStrictEqual(await pipe(_.succeed(1), f)(), E.succeed(1))
    U.deepStrictEqual(await pipe(_.fail('a'), f)(), E.fail(1))
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getApplicativeAsyncValidation', async () => {
    const tuple2 =
      <A>(a: A) =>
      <B>(b: B): readonly [A, B] =>
        [a, b]
    const A = _.getValidatedApplicative(T.ApplyPar, S.Semigroup)
    const assertAp = async (
      a: _.AsyncResult<string, number>,
      b: _.AsyncResult<string, number>,
      expected: E.Result<string, readonly [number, number]>
    ) => {
      U.deepStrictEqual(await pipe(a, A.map(tuple2), A.ap(b))(), expected)
    }

    await assertAp(_.succeed(1), _.succeed(2), E.succeed([1, 2]))
    await assertAp(_.succeed(1), _.fail('b'), E.fail('b'))
    await assertAp(_.fail('a'), _.succeed(2), E.fail('a'))
    await assertAp(_.fail('a'), _.fail('b'), E.fail('ab'))

    // await assertPar((a, b) => pipe(a, A.map(S.Semigroup.combine), A.ap(b)), E.right('ba'))
  })

  it('getSemigroupKAsyncValidation', async () => {
    const A = _.getValidatedSemigroupKind(S.Semigroup)
    const assertSemigroupKind = async (
      a: _.AsyncResult<string, number>,
      b: _.AsyncResult<string, number>,
      expected: E.Result<string, number>
    ) => {
      U.deepStrictEqual(await pipe(a, A.orElse(b))(), expected)
    }
    await assertSemigroupKind(_.succeed(1), _.succeed(2), E.succeed(1))
    await assertSemigroupKind(_.succeed(1), _.fail('b'), E.succeed(1))
    await assertSemigroupKind(_.fail('a'), _.succeed(2), E.succeed(2))
    await assertSemigroupKind(_.fail('a'), _.fail('b'), E.fail('ab'))
  })

  describe('getCompactable', () => {
    const C = _.getCompactable(() => S.Monoid.empty)

    it('compact', async () => {
      U.deepStrictEqual(await C.compact(_.succeed(O.some(1)))(), E.succeed(1))
    })
  })

  it('separate', async () => {
    const assertSeparate = async (
      a: _.AsyncResult<string, E.Result<string, number>>,
      expectedLeft: E.Result<string, string>,
      expectedRight: E.Result<string, number>
    ) => {
      const s = _.separate(S.Monoid.empty)(a)
      U.deepStrictEqual(await writer.fst(s)(), expectedLeft)
      U.deepStrictEqual(await writer.snd(s)(), expectedRight)
    }

    await assertSeparate(_.succeed(E.succeed(1)), E.fail(''), E.succeed(1))
    await assertSeparate(_.succeed(E.fail('a')), E.succeed('a'), E.fail(S.Monoid.empty))
    await assertSeparate(_.fail('a'), E.fail('a'), E.fail('a'))
  })

  it('partitionMap', async () => {
    const p = (n: number) => n > 2
    const f = (n: number) => (p(n) ? E.succeed(n + 1) : E.fail(n - 1))

    const assertPartition = async <E, B, C>(
      [feb, fec]: readonly [_.AsyncResult<E, B>, _.AsyncResult<E, C>],
      [eb, ec]: readonly [E.Result<E, B>, E.Result<E, C>]
    ) => {
      U.deepStrictEqual(await feb(), eb)
      U.deepStrictEqual(await fec(), ec)
    }

    assertPartition(pipe(_.fail('123'), _.partitionMap(f, S.Monoid.empty)), [E.fail('123'), E.fail('123')])
    assertPartition(pipe(_.succeed(1), _.partitionMap(f, S.Monoid.empty)), [E.succeed(0), E.fail(S.Monoid.empty)])
    assertPartition(pipe(_.succeed(3), _.partitionMap(f, S.Monoid.empty)), [E.fail(S.Monoid.empty), E.succeed(4)])
  })

  describe('getFilterable', () => {
    const F = _.getFilterable(S.Monoid.empty)

    it('filterMap', async () => {
      const p = (n: number) => n > 2
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(await pipe(_.fail('123'), F.filterMap(f))(), E.fail('123'))
      U.deepStrictEqual(await pipe(_.succeed(1), F.filterMap(f))(), E.fail(S.Monoid.empty))
      U.deepStrictEqual(await pipe(_.succeed(3), F.filterMap(f))(), E.succeed(4))
    })
  })

  it('Applicative', async () => {
    await assertSeq((a, b) => pipe(a, _.Apply.map(S.Semigroup.combine), _.Apply.ap(b)), E.succeed('ba'))
    await assertSeq((a, b) => pipe(a, _.Applicative.map(S.Semigroup.combine), _.Applicative.ap(b)), E.succeed('ba'))
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('taskify', async () => {
    const api1 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(null, 'ok')
    }
    const api2 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(undefined, 'ok')
    }
    const api3 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(new Error('ko'))
    }
    U.deepStrictEqual(await _.taskify(api1)('foo')(), E.succeed('ok'))
    U.deepStrictEqual(await _.taskify(api2)('foo')(), E.succeed('ok'))
    U.deepStrictEqual(await _.taskify(api3)('foo')(), E.fail(new Error('ko')))
  })

  it('composed taskify', async () => {
    const api = (callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(null, 'ok')
    }
    const taskApi = _.taskify(api)()

    U.deepStrictEqual(await taskApi(), E.succeed('ok'))
    U.deepStrictEqual(await taskApi(), E.succeed('ok'))
  })

  describe('bracket', () => {
    let log: Array<string> = []

    const acquireFailure = _.fail('acquire failure')
    const acquireSuccess = _.succeed({ res: 'acquire success' })
    const useSuccess = () => _.succeed('use success')
    const useFailure = () => _.fail('use failure')
    const releaseSuccess = () =>
      _.fromSync(() => {
        log.push('release success')
      })
    const releaseFailure = () => _.fail('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', async () => {
      U.deepStrictEqual(await _.bracket(acquireFailure, useSuccess, releaseSuccess)(), E.fail('acquire failure'))
    })

    it('body and release must not be called if acquire fails', async () => {
      await _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      U.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', async () => {
      U.deepStrictEqual(await _.bracket(acquireSuccess, useFailure, releaseSuccess)(), E.fail('use failure'))
    })

    it('should return the release error if both use and release fail', async () => {
      U.deepStrictEqual(await _.bracket(acquireSuccess, useFailure, releaseFailure)(), E.fail('release failure'))
    })

    it('release must be called if the body returns', async () => {
      await _.bracket(acquireSuccess, useSuccess, releaseSuccess)()
      U.deepStrictEqual(log, ['release success'])
    })

    it('release must be called if the body throws', async () => {
      await _.bracket(acquireSuccess, useFailure, releaseSuccess)()
      U.deepStrictEqual(log, ['release success'])
    })

    it('should return the release error if release fails', async () => {
      U.deepStrictEqual(await _.bracket(acquireSuccess, useSuccess, releaseFailure)(), E.fail('release failure'))
    })
  })

  it('do notation', async () => {
    await assertSeq(
      (a, b) =>
        pipe(
          a,
          _.bindTo('a'),
          _.bind('b', () => b)
        ),
      E.succeed({ a: 'a', b: 'b' })
    )
  })

  // TODO
  // it('do notation ensuring proper param passthrough', async () => {
  //   const c = (p: { readonly a: number }) => _.right<number, string>(p.a)
  //   const d = (p: { readonly b: string }) => _.right<string, string>(p.b)
  //   U.deepStrictEqual(
  //     await pipe(
  //       _.right<number, string>(1),
  //       _.bindTo('a'),
  //       _.bind('b', () => _.right('b')),
  //       _.bind('c', c),
  //       _.bind('d', d),
  //       _.bind(
  //         'e',
  //         _.fromOptionK((p: { readonly c: number }) => O.some(p.c), () => 'err')
  //       ),
  //       _.bind(
  //         'f',
  //         _.fromOptionK((p) => O.some(p.b), () => 'err')
  //       )
  //     )(),
  //     E.right({ a: 1, b: 'b', c: 1, d: 'b', e: 1, f: 'b' })
  //   )
  // })

  it('bindPar', async () => {
    await assertSeq((a, b) => pipe(a, _.bindTo('a'), _.bindRight('b', b)), E.succeed({ a: 'a', b: 'b' }))
  })

  it('zipFlatten', async () => {
    await assertSeq((a, b) => pipe(a, _.tupled, _.zipFlatten(b)), E.succeed(['a', 'b'] as const))
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('catchAll', async () => {
    U.deepStrictEqual(
      await pipe(
        _.fail('foo'),
        _.catchAll((l) => _.succeed(l.length))
      )(),
      E.succeed(3)
    )
    U.deepStrictEqual(
      await pipe(
        _.succeed(1),
        _.catchAll(() => _.succeed(2))
      )(),
      E.succeed(1)
    )
  })

  it('swap', async () => {
    U.deepStrictEqual(await _.swap(_.succeed(1))(), E.fail(1))
    U.deepStrictEqual(await _.swap(_.fail('a'))(), E.succeed('a'))
  })

  it('flatMapResult', async () => {
    const f = flow(S.size, E.succeed)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapResult(f))(), E.succeed(1))
  })

  it('flatMapSyncResult', async () => {
    const f = flow(S.size, IE.succeed)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapSyncResult(f))(), E.succeed(1))
  })

  describe('tryCatch', () => {
    test('with a resolving promise', async () => {
      U.deepStrictEqual(await _.fromRejectable(() => Promise.resolve(1), identity)(), E.succeed(1))
    })

    test('with a rejected promise', async () => {
      U.deepStrictEqual(await _.fromRejectable(() => Promise.reject(1), identity)(), E.fail(1))
    })

    test('with a thrown error', async () => {
      U.deepStrictEqual(
        await _.fromRejectable(() => {
          throw new Error('Some error')
        }, identity)(),
        E.fail(new Error('Some error'))
      )
    })
  })

  describe('liftRejectable', () => {
    test('with a resolved promise', async () => {
      const g = _.liftRejectable((a: number) => Promise.resolve(a), identity)
      U.deepStrictEqual(await g(1)(), E.succeed(1))
    })

    test('with a rejected promise', async () => {
      const g = _.liftRejectable((a: number) => Promise.reject(a), identity)
      U.deepStrictEqual(await g(-1)(), E.fail(-1))
    })

    test('with a thrown error', async () => {
      const g = _.liftRejectable((_: number) => {
        throw new Error('Some error')
      }, identity)
      U.deepStrictEqual(await g(-1)(), E.fail(new Error('Some error')))
    })
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('fromSync', async () => {
    const io = () => 1
    const fa = _.fromSync(io)
    U.deepStrictEqual(await fa(), E.succeed(1))
  })

  it('failSync', async () => {
    U.deepStrictEqual(await _.failSync(I.succeed(1))(), E.fail(1))
  })

  it('tryCatch', async () => {
    U.deepStrictEqual(await _.fromRejectable(() => Promise.resolve(1), identity)(), E.succeed(1))
    U.deepStrictEqual(await _.fromRejectable(() => Promise.reject('a'), identity)(), E.fail('a'))
  })

  it('fromSyncResult', async () => {
    U.deepStrictEqual(await _.fromSyncResult(() => E.succeed(1))(), E.succeed(1))
    U.deepStrictEqual(await _.fromSyncResult(() => E.fail('a'))(), E.fail('a'))
  })

  it('fromOption', async () => {
    U.deepStrictEqual(await pipe(O.none, _.fromOption('none'))(), E.fail('none'))
    U.deepStrictEqual(await pipe(O.some(1), _.fromOption('none'))(), E.succeed(1))
  })

  it('fromPredicate', async () => {
    const f = _.liftPredicate((n: number) => n >= 2, 'e')
    U.deepStrictEqual(await f(3)(), E.succeed(3))
    U.deepStrictEqual(await f(1)(), E.fail('e'))
  })

  it('filter', async () => {
    const predicate = (n: number) => n > 10
    U.deepStrictEqual(await pipe(_.succeed(12), _.filter(predicate, -1))(), E.succeed(12))
    U.deepStrictEqual(await pipe(_.succeed(7), _.filter(predicate, -1))(), E.fail(-1))
    U.deepStrictEqual(await pipe(_.fail(12), _.filter(predicate, -1))(), E.fail(12))
  })

  it('flatMapAsyncOption', async () => {
    const f = _.flatMapAsyncOption((n: number) => (n > 0 ? TO.some(n * 2) : TO.none), 'a')
    U.deepStrictEqual(await pipe(_.succeed(1), f)(), E.succeed(2))
    U.deepStrictEqual(await pipe(_.succeed(-1), f)(), E.fail('a'))
    U.deepStrictEqual(await pipe(_.fail('b'), f)(), E.fail('b'))
  })

  it('match', async () => {
    const f = _.match(
      () => 'left',
      () => 'right'
    )
    U.deepStrictEqual(await f(_.succeed(1))(), 'right')
    U.deepStrictEqual(await f(_.fail(''))(), 'left')
  })

  it('matchAsync', async () => {
    const f = _.matchAsync(
      () => T.succeed('left'),
      () => T.succeed('right')
    )
    U.deepStrictEqual(await f(_.succeed(1))(), 'right')
    U.deepStrictEqual(await f(_.fail(''))(), 'left')
  })

  it('getOrElse', async () => {
    const f = _.getOrElse(2)
    U.deepStrictEqual(await f(_.succeed(1))(), 1)
    U.deepStrictEqual(await f(_.fail('a'))(), 2)
  })

  it('getOrElseAsync', async () => {
    const f = _.getOrElseAsync(T.succeed(2))
    U.deepStrictEqual(await f(_.succeed(1))(), 1)
    U.deepStrictEqual(await f(_.fail('a'))(), 2)
  })

  it('fromNullable', async () => {
    const testNullable = _.fromNullable('foo')
    U.deepStrictEqual(await testNullable(1)(), E.succeed(1))
    U.deepStrictEqual(await testNullable(null)(), E.fail('foo'))
    U.deepStrictEqual(await testNullable(undefined)(), E.fail('foo'))
  })

  it('liftNullable', async () => {
    const f = _.liftNullable((n: number) => (n > 0 ? n : n === 0 ? null : undefined), 'foo')
    U.deepStrictEqual(await f(1)(), E.succeed(1))
    U.deepStrictEqual(await f(0)(), E.fail('foo'))
    U.deepStrictEqual(await f(-1)(), E.fail('foo'))
  })

  it('flatMapNullable', async () => {
    const f = _.flatMapNullable((n: number) => (n > 0 ? n : n === 0 ? null : undefined), 'foo')
    U.deepStrictEqual(await f(_.succeed(1))(), E.succeed(1))
    U.deepStrictEqual(await f(_.succeed(0))(), E.fail('foo'))
    U.deepStrictEqual(await f(_.succeed(-1))(), E.fail('foo'))
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  // --- Par ---

  it('traverseReadonlyArrayWithIndexPar', async () => {
    const f = _.traverseReadonlyArrayWithIndexPar((i, a: string) => (a.length > 0 ? _.succeed(a + i) : _.fail('e')))
    U.deepStrictEqual(await pipe(RA.empty, f)(), E.succeed(RA.empty))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), E.succeed(['a0', 'b1']))
    U.deepStrictEqual(await pipe(['a', ''], f)(), E.fail('e'))
  })

  it('traverseReadonlyNonEmptyArrayPar', async () => {
    const f = _.traverseReadonlyNonEmptyArrayPar((a: string) => (a.length > 0 ? _.succeed(a) : _.fail('e')))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), E.succeed(['a', 'b'] as const))
    U.deepStrictEqual(await pipe(['a', ''], f)(), E.fail('e'))
  })

  it('sequenceReadonlyArrayPar', async () => {
    const log: Array<number | string> = []
    const right = (n: number): _.AsyncResult<string, number> =>
      _.fromSync(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.AsyncResult<string, number> =>
      _.failSync(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(await pipe([right(1), right(2)], _.sequenceReadonlyArrayPar)(), E.succeed([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], _.sequenceReadonlyArrayPar)(), E.fail('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], _.sequenceReadonlyArrayPar)(), E.fail('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
  })

  // --- Seq ---

  it('traverseReadonlyArrayWithIndex', async () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.succeed(a + i) : _.fail('e')))
    U.deepStrictEqual(await pipe(RA.empty, f)(), E.succeed(RA.empty))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), E.succeed(['a0', 'b1']))
    U.deepStrictEqual(await pipe(['a', ''], f)(), E.fail('e'))
  })

  it('traverseReadonlyNonEmptyArray', async () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => (a.length > 0 ? _.succeed(a) : _.fail('e')))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), E.succeed(['a', 'b'] as const))
    U.deepStrictEqual(await pipe(['a', ''], f)(), E.fail('e'))
  })

  it('sequenceReadonlyArray', async () => {
    const log: Array<number | string> = []
    const right = (n: number): _.AsyncResult<string, number> =>
      _.fromSync(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.AsyncResult<string, number> =>
      _.failSync(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(await pipe([right(1), right(2)], _.sequenceReadonlyArray)(), E.succeed([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], _.sequenceReadonlyArray)(), E.fail('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], _.sequenceReadonlyArray)(), E.fail('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })
})
