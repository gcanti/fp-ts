import * as E from '../src/Either'
import { flow, pipe, SK } from '../src/function'
import * as I from '../src/IO'
import * as IE from '../src/IOEither'
import * as N from '../src/number'
import * as O from '../src/Option'
import { gt } from '../src/Ord'
import * as R from '../src/Reader'
import * as RE from '../src/ReaderEither'
import * as RT from '../src/ReaderTask'
import * as _ from '../src/ReaderTaskEither'
import * as RA from '../src/ReadonlyArray'
import { ReadonlyNonEmptyArray } from '../src/ReadonlyNonEmptyArray'
import * as Sep from '../src/Separated'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import * as U from './util'

describe('ReaderTaskEither', () => {
  describe('pipeables', () => {
    it('map', async () => {
      U.deepStrictEqual(await pipe(_.right(1), _.map(U.double))({})(), E.right(2))
    })

    it('ap', async () => {
      U.deepStrictEqual(await pipe(_.right(U.double), _.ap(_.right(1)))({})(), E.right(2))
    })

    it('apFirst', async () => {
      U.deepStrictEqual(await pipe(_.right('a'), _.apFirst(_.right('b')))({})(), E.right('a'))
    })

    it('apSecond', async () => {
      U.deepStrictEqual(await pipe(_.right('a'), _.apSecond(_.right('b')))({})(), E.right('b'))
    })

    it('chain', async () => {
      const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('b'))
      U.deepStrictEqual(await pipe(_.right('aaa'), _.chain(f))({})(), E.right(3))
      U.deepStrictEqual(await pipe(_.right('a'), _.chain(f))({})(), E.left('b'))
    })

    it('chainFirst', async () => {
      const f = (a: string): _.ReaderTaskEither<unknown, string, number> =>
        a.length > 2 ? _.right(a.length) : _.left('b')
      U.deepStrictEqual(await pipe(_.right<string, object, number>('aaa'), _.chainFirst(f))({})(), E.right('aaa'))
    })

    it('flatten', async () => {
      U.deepStrictEqual(await pipe(_.right(_.right('a')), _.flatten)({})(), E.right('a'))
    })

    it('bimap', async () => {
      const f = _.bimap(S.size, gt(N.Ord)(2))
      U.deepStrictEqual(await pipe(_.right(1), f)({})(), E.right(false))
      U.deepStrictEqual(await pipe(_.left('error'), f)({})(), E.left(5))
    })

    it('mapLeft', async () => {
      const f = _.mapLeft(S.size)
      U.deepStrictEqual(await pipe(_.right(1), f)({})(), E.right(1))
      U.deepStrictEqual(await pipe(_.left('err'), f)({})(), E.left(3))
    })

    it('alt', async () => {
      const assertAlt = async (
        a: _.ReaderTaskEither<null, string, number>,
        b: _.ReaderTaskEither<null, string, number>,
        expected: E.Either<string, number>
      ) => {
        U.deepStrictEqual(
          await pipe(
            a,
            _.alt(() => b)
          )(null)(),
          expected
        )
      }
      await assertAlt(_.right(1), _.right(2), E.right(1))
      await assertAlt(_.right(1), _.left('b'), E.right(1))
      await assertAlt(_.left('a'), _.right(2), E.right(2))
      await assertAlt(_.left('a'), _.left('b'), E.left('b'))
    })

    it('fromPredicate', async () => {
      const f = _.fromPredicate((n: number) => n >= 2)
      U.deepStrictEqual(await f(3)({})(), E.right(3))
      U.deepStrictEqual(await f(1)({})(), E.left(1))
    })

    it('fromEither', async () => {
      U.deepStrictEqual(await _.fromEither(E.right(1))({})(), E.right(1))
      U.deepStrictEqual(await _.fromEither(E.left('a'))({})(), E.left('a'))
    })

    it('fromOption', async () => {
      U.deepStrictEqual(await _.fromOption(() => 'none')(O.none)({})(), E.left('none'))
      U.deepStrictEqual(await _.fromOption(() => 'none')(O.some(1))({})(), E.right(1))
    })

    it('filterOrElse', async () => {
      U.deepStrictEqual(
        await pipe(
          _.right(12),
          _.filterOrElse(
            (n) => n > 10,
            () => 'a'
          )
        )({})(),
        E.right(12)
      )
      U.deepStrictEqual(
        await pipe(
          _.right(8),
          _.filterOrElse(
            (n) => n > 10,
            () => 'a'
          )
        )({})(),
        E.left('a')
      )
    })
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('ApplicativeSeq', async () => {
    await U.assertSeq(_.ApplySeq, _.FromTask, (fa) => fa(null)())
    await U.assertSeq(_.ApplicativeSeq, _.FromTask, (fa) => fa(null)())
  })

  it('ApplicativePar', async () => {
    await U.assertPar(_.ApplyPar, _.FromTask, (fa) => fa(null)())
    await U.assertPar(_.ApplicativePar, _.FromTask, (fa) => fa(null)())
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('ask', async () => {
    return U.deepStrictEqual(await _.ask<number>()(1)(), E.right(1))
  })

  it('asks', async () => {
    return U.deepStrictEqual(await _.asks((s: string) => s.length)('foo')(), E.right(3))
  })

  it('leftTask', async () => {
    U.deepStrictEqual(await _.leftTask(T.of(1))({})(), E.left(1))
  })

  it('rightTask', async () => {
    U.deepStrictEqual(await _.rightTask(T.of(1))({})(), E.right(1))
  })

  it('leftReaderTask', async () => {
    U.deepStrictEqual(await _.leftReaderTask(RT.of(1))({})(), E.left(1))
  })

  it('rightReaderTask', async () => {
    U.deepStrictEqual(await _.rightReaderTask(RT.of(1))({})(), E.right(1))
  })

  it('rightReader', async () => {
    U.deepStrictEqual(await _.rightReader(R.of(1))({})(), E.right(1))
  })

  it('leftReader', async () => {
    U.deepStrictEqual(await _.leftReader(R.of(1))({})(), E.left(1))
  })

  it('fromTaskEither', async () => {
    U.deepStrictEqual(await _.fromTaskEither(TE.of(1))({})(), E.right(1))
  })

  it('leftIO', async () => {
    U.deepStrictEqual(await _.leftIO(I.of(1))({})(), E.left(1))
  })

  it('fromIOEither', async () => {
    U.deepStrictEqual(await _.fromIOEither(() => E.right(1))({})(), E.right(1))
    U.deepStrictEqual(await _.fromIOEither(() => E.left('error'))({})(), E.left('error'))
  })

  it('match', async () => {
    const f = _.match(
      () => 'left',
      () => 'right'
    )
    U.deepStrictEqual(await f(_.right(1))({})(), 'right')
    U.deepStrictEqual(await f(_.left(''))({})(), 'left')
  })

  it('matchE', async () => {
    const f = _.matchE(
      () => RT.of('left'),
      () => RT.of('right')
    )
    U.deepStrictEqual(await f(_.right(1))({})(), 'right')
    U.deepStrictEqual(await f(_.left(''))({})(), 'left')
  })

  it('getOrElse', async () => {
    const f = _.getOrElse(() => 2)
    U.deepStrictEqual(await f(_.right(1))({})(), 1)
    U.deepStrictEqual(await f(_.left('a'))({})(), 2)
  })

  it('getOrElseE', async () => {
    const f = _.getOrElseE(() => RT.of(2))
    U.deepStrictEqual(await f(_.right(1))({})(), 1)
    U.deepStrictEqual(await f(_.left('a'))({})(), 2)
  })

  it('orElse', async () => {
    U.deepStrictEqual(
      await pipe(
        _.right(1),
        _.orElse((s: string) => _.right(s.length))
      )({})(),
      E.right(1)
    )
    U.deepStrictEqual(
      await pipe(
        _.left('error'),
        _.orElse((s) => _.right(s.length))
      )({})(),
      E.right(5)
    )
  })

  describe('MonadIO', () => {
    it('fromIO', async () => {
      U.deepStrictEqual(await _.fromIO(() => 1)({})(), E.right(1))
    })
  })

  it('swap', async () => {
    U.deepStrictEqual(await _.swap(_.right(1))({})(), E.left(1))
    U.deepStrictEqual(await _.swap(_.left('a'))({})(), E.right('a'))
  })

  it('fromReaderEither', async () => {
    U.deepStrictEqual(await _.fromReaderEither(RE.left('a'))({})(), E.left('a'))
    U.deepStrictEqual(await _.fromReaderEither(RE.right(1))({})(), E.right(1))
  })

  it('getApplicativeReaderTaskValidation', async () => {
    const A = _.getApplicativeReaderTaskValidation(T.ApplicativePar, S.Semigroup)
    const tuple = <A>(a: A) => <B>(b: B): readonly [A, B] => [a, b]
    U.deepStrictEqual(await pipe(_.left('a'), A.map(tuple), A.ap(_.left('b')))(null)(), E.left('ab'))
  })

  it('getAltReaderTaskValidation', async () => {
    const A = _.getAltReaderTaskValidation(S.Semigroup)
    U.deepStrictEqual(
      await pipe(
        _.left('a'),
        A.alt(() => _.left('b'))
      )(null)(),
      E.left('ab')
    )
  })

  describe('bracket', () => {
    let log: Array<string> = []

    const acquireFailure = _.left('acquire failure')
    const acquireSuccess = _.right({ res: 'acquire success' })
    const useSuccess = () => _.right('use success')
    const useFailure = () => _.left('use failure')
    const releaseSuccess = () =>
      _.fromIO(() => {
        log.push('release success')
      })
    const releaseFailure = () => _.left('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', async () => {
      U.deepStrictEqual(
        await _.bracket(acquireFailure, useSuccess, releaseSuccess)(undefined)(),
        E.left('acquire failure')
      )
    })

    it('body and release must not be called if acquire fails', async () => {
      await _.bracket(acquireFailure, useSuccess, releaseSuccess)(undefined)()
      U.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', async () => {
      U.deepStrictEqual(await _.bracket(acquireSuccess, useFailure, releaseSuccess)(undefined)(), E.left('use failure'))
    })

    it('should return the release error if both use and release fail', async () => {
      U.deepStrictEqual(
        await _.bracket(acquireSuccess, useFailure, releaseFailure)(undefined)(),
        E.left('release failure')
      )
    })

    it('release must be called if the body returns', async () => {
      await _.bracket(acquireSuccess, useSuccess, releaseSuccess)(undefined)()
      U.deepStrictEqual(log, ['release success'])
    })

    it('release must be called if the body throws', async () => {
      await _.bracket(acquireSuccess, useFailure, releaseSuccess)(undefined)()
      U.deepStrictEqual(log, ['release success'])
    })

    it('should return the release error if release fails', async () => {
      U.deepStrictEqual(
        await _.bracket(acquireSuccess, useSuccess, releaseFailure)(undefined)(),
        E.left('release failure')
      )
    })
  })

  it('chainEitherK', async () => {
    const f = flow(S.size, E.of)
    U.deepStrictEqual(await pipe(_.right('a'), _.chainEitherK(f))(undefined)(), E.right(1))
  })

  it('chainFirstEitherK', async () => {
    const f = (s: string) => E.right<number, string>(s.length)
    U.deepStrictEqual(await pipe(_.right<string, {}, number>('a'), _.chainFirstEitherK(f))({})(), E.right('a'))
  })

  it('chainIOEitherK', async () => {
    const f = flow(S.size, IE.of)
    U.deepStrictEqual(await pipe(_.right('a'), _.chainIOEitherK(f))(undefined)(), E.right(1))
  })

  it('chainTaskEitherK', async () => {
    const f = flow(S.size, TE.of)
    U.deepStrictEqual(await pipe(_.right('a'), _.chainTaskEitherK(f))(undefined)(), E.right(1))
  })

  it('chainFirstTaskEitherK', async () => {
    const f = (s: string) => TE.right<number, string>(s.length)
    U.deepStrictEqual(await pipe(_.right<string, {}, number>('a'), _.chainFirstTaskEitherK(f))({})(), E.right('a'))
  })

  it('chainReaderTaskK', async () => {
    const f = flow(S.size, RT.of)
    U.deepStrictEqual(await pipe(_.right('a'), _.chainReaderTaskK(f))(undefined)(), E.right(1))
  })

  it('chainReaderTaskK', async () => {
    const f = flow(S.size, RT.of)
    U.deepStrictEqual(await pipe(_.right<string, {}, never>('a'), _.chainReaderTaskK(f))({})(), E.right(1))
  })

  it('chainFirstReaderTaskK', async () => {
    const f = flow(S.size, RT.of)
    U.deepStrictEqual(await pipe(_.right<string, {}, never>('a'), _.chainFirstReaderTaskK(f))({})(), E.right('a'))
  })

  it('chainReaderEitherK', async () => {
    const f = (s: string) => RE.right(s.length)
    U.deepStrictEqual(await pipe(_.right<string, {}, never>('a'), _.chainReaderEitherK(f))({})(), E.right(1))
  })

  it('chainFirstReaderEitherK', async () => {
    const f = (s: string) => RE.right(s.length)
    U.deepStrictEqual(await pipe(_.right<string, {}, never>('a'), _.chainFirstReaderEitherK(f))({})(), E.right('a'))
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('do notation', async () => {
    U.deepStrictEqual(
      await pipe(
        _.right<number, void, string>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(undefined)(),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apS', async () => {
    U.deepStrictEqual(
      await pipe(_.right<number, void, string>(1), _.bindTo('a'), _.apS('b', _.right('b')))(undefined)(),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apT', async () => {
    U.deepStrictEqual(
      await pipe(_.right<number, {}, string>(1), _.tupled, _.apT(_.right('b')))({})(),
      E.right([1, 'b'] as const)
    )
  })

  it('getCompactable', async () => {
    const C = _.getCompactable(S.Monoid)
    U.deepStrictEqual(await C.compact(_.of(O.some('a')))({})(), E.right('a'))
  })

  it('getFilterable', async () => {
    const F = _.getFilterable(S.Monoid)
    const fa: _.ReaderTaskEither<unknown, string, string> = _.of('a')
    U.deepStrictEqual(
      await pipe(
        fa,
        F.filter((s) => s.length > 0)
      )({})(),
      E.right('a')
    )
    U.deepStrictEqual(
      await pipe(
        fa,
        F.filterMap((s) => (s.length > 0 ? O.some(s.length) : O.none))
      )({})(),
      E.right(1)
    )
    const s1 = pipe(
      fa,
      F.partition((s) => s.length > 0)
    )
    U.deepStrictEqual(await Sep.left(s1)({})(), E.left(''))
    U.deepStrictEqual(await Sep.right(s1)({})(), E.right('a'))
    const s2 = pipe(
      fa,
      F.partitionMap((s) => (s.length > 0 ? E.right(s.length) : E.left(s)))
    )
    U.deepStrictEqual(await Sep.left(s2)({})(), E.left(''))
    U.deepStrictEqual(await Sep.right(s2)({})(), E.right(1))
  })

  describe('array utils', () => {
    const input: ReadonlyNonEmptyArray<string> = ['a', 'b']

    it('traverseReadonlyArrayWithIndex', async () => {
      const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.right(a + i) : _.left('e')))
      U.deepStrictEqual(await pipe(RA.empty, f)(undefined)(), E.right(RA.empty))
      U.deepStrictEqual(await pipe(input, f)(undefined)(), E.right(['a0', 'b1']))
      U.deepStrictEqual(await pipe(['a', ''], f)(undefined)(), E.left('e'))
    })

    it('traverseReadonlyArrayWithIndexSeq', async () => {
      const f = _.traverseReadonlyArrayWithIndexSeq((i, a: string) => (a.length > 0 ? _.right(a + i) : _.left('e')))
      U.deepStrictEqual(await pipe(RA.empty, f)(undefined)(), E.right(RA.empty))
      U.deepStrictEqual(await pipe(input, f)(undefined)(), E.right(['a0', 'b1']))
      U.deepStrictEqual(await pipe(['a', ''], f)(undefined)(), E.left('e'))
    })

    it('sequenceReadonlyArray', async () => {
      const log: Array<number | string> = []
      const right = (n: number): _.ReaderTaskEither<undefined, string, number> =>
        _.rightIO(() => {
          log.push(n)
          return n
        })
      const left = (s: string): _.ReaderTaskEither<undefined, string, number> =>
        _.leftIO(() => {
          log.push(s)
          return s
        })
      U.deepStrictEqual(
        await pipe([right(1), right(2)], _.traverseReadonlyArrayWithIndex(SK))(undefined)(),
        E.right([1, 2])
      )
      U.deepStrictEqual(
        await pipe([right(3), left('a')], _.traverseReadonlyArrayWithIndex(SK))(undefined)(),
        E.left('a')
      )
      U.deepStrictEqual(
        await pipe([left('b'), right(4)], _.traverseReadonlyArrayWithIndex(SK))(undefined)(),
        E.left('b')
      )
      U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
    })

    it('sequenceReadonlyArraySeq', async () => {
      const log: Array<number | string> = []
      const right = (n: number): _.ReaderTaskEither<undefined, string, number> =>
        _.rightIO(() => {
          log.push(n)
          return n
        })
      const left = (s: string): _.ReaderTaskEither<undefined, string, number> =>
        _.leftIO(() => {
          log.push(s)
          return s
        })
      U.deepStrictEqual(
        await pipe([right(1), right(2)], _.traverseReadonlyArrayWithIndexSeq(SK))(undefined)(),
        E.right([1, 2])
      )
      U.deepStrictEqual(
        await pipe([right(3), left('a')], _.traverseReadonlyArrayWithIndexSeq(SK))(undefined)(),
        E.left('a')
      )
      U.deepStrictEqual(
        await pipe([left('b'), right(4)], _.traverseReadonlyArrayWithIndexSeq(SK))(undefined)(),
        E.left('b')
      )
      U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
    })
  })

  it('bracketW', async () => {
    const acquire = _.right<string, { readonly a: string }, string>('string')
    const use = (_a: string) => _.right<string, { readonly b: number }, number>('test')
    const release = (_a: string, _e: E.Either<number, string>) =>
      _.right<void, { readonly c: boolean }, Error>(undefined)
    const res = await _.bracketW(
      acquire,
      use,
      release
    )({
      a: 'string',
      b: 5,
      c: true
    })()
    U.deepStrictEqual(res, E.right('test'))
  })
})
