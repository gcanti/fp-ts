import * as assert from 'assert'
import { sequenceT } from '../src/Apply'
import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as I from '../src/IO'
import * as IE from '../src/IOEither'
import { monoidSum } from '../src/Monoid'
import { none, some } from '../src/Option'
import * as R from '../src/Reader'
import * as RE from '../src/ReaderEither'
import * as RT from '../src/ReaderTask'
import * as _ from '../src/ReaderTaskEither'
import { semigroupString, semigroupSum } from '../src/Semigroup'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import { assertPar, assertSeq } from './util'

describe('ReaderTaskEither', () => {
  describe('pipeables', () => {
    it('map', async () => {
      const double = (n: number): number => n * 2
      const x = await pipe(_.right(1), _.map(double))({})()
      assert.deepStrictEqual(x, E.right(2))
    })

    it('ap', async () => {
      const double = (n: number): number => n * 2
      const x = await pipe(_.right(double), _.ap(_.right(1)))({})()
      assert.deepStrictEqual(x, E.right(2))
    })

    it('apFirst', async () => {
      const x = await pipe(_.right('a'), _.apFirst(_.right('b')))({})()
      assert.deepStrictEqual(x, E.right('a'))
    })

    it('apSecond', async () => {
      const x = await pipe(_.right('a'), _.apSecond(_.right('b')))({})()
      assert.deepStrictEqual(x, E.right('b'))
    })

    it('chain', async () => {
      const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('b'))
      const e1 = await pipe(_.right('aaa'), _.chain(f))({})()
      assert.deepStrictEqual(e1, E.right(3))
      const e2 = await pipe(_.right('a'), _.chain(f))({})()
      assert.deepStrictEqual(e2, E.left('b'))
    })

    it('chainFirst', async () => {
      const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('b'))
      const e = await pipe(_.right('aaa'), _.chainFirst(f))({})()
      assert.deepStrictEqual(e, E.right('aaa'))
    })

    it('flatten', async () => {
      const e = await pipe(_.right(_.right('a')), _.flatten)({})()
      assert.deepStrictEqual(e, E.right('a'))
    })

    it('bimap', async () => {
      const f = (s: string): number => s.length
      const g = (n: number): boolean => n > 2
      const e1 = await pipe(_.right(1), _.bimap(f, g))({})()
      assert.deepStrictEqual(e1, E.right(false))
      const e2 = await pipe(_.left('error'), _.bimap(f, g))({})()
      assert.deepStrictEqual(e2, E.left(5))
    })

    it('mapLeft', async () => {
      const len = (s: string): number => s.length
      const e1 = await pipe(_.right(1), _.mapLeft(len))({})()
      assert.deepStrictEqual(e1, E.right(1))
      const e2 = await pipe(_.left('err'), _.mapLeft(len))({})()
      assert.deepStrictEqual(e2, E.left(3))
    })

    it('alt', async () => {
      const e1 = await pipe(
        _.right(1),
        _.alt(() => _.right(2))
      )({})()
      assert.deepStrictEqual(e1, E.right(1))
      const e2 = await pipe(
        _.left('a'),
        _.alt(() => _.right(2))
      )({})()
      assert.deepStrictEqual(e2, E.right(2))
      const e3 = await pipe(
        _.left('a'),
        _.alt(() => _.left('b'))
      )({})()
      assert.deepStrictEqual(e3, E.left('b'))
    })

    it('fromPredicate', async () => {
      const predicate = (n: number) => n >= 2
      const gt2 = _.fromPredicate(predicate, (n) => `Invalid number ${n}`)

      const refinement = (u: string | number): u is number => typeof u === 'number'
      const isNumber = _.fromPredicate(refinement, (u) => `Invalid number ${String(u)}`)

      const e1 = await gt2(3)({})()
      const e2 = await gt2(1)({})()
      const e3 = await isNumber(4)({})()
      assert.deepStrictEqual(e1, E.right(3))
      assert.deepStrictEqual(e2, E.left('Invalid number 1'))
      assert.deepStrictEqual(e3, E.right(4))
    })

    it('fromEither', async () => {
      const e1 = await _.fromEither(E.right(1))({})()
      assert.deepStrictEqual(e1, E.right(1))
      const e2 = await _.fromEither(E.left('a'))({})()
      assert.deepStrictEqual(e2, E.left('a'))
    })

    it('fromOption', async () => {
      const e1 = await _.fromOption(() => 'none')(none)({})()
      assert.deepStrictEqual(e1, E.left('none'))
      const e2 = await _.fromOption(() => 'none')(some(1))({})()
      assert.deepStrictEqual(e2, E.right(1))
    })

    it('filterOrElse', async () => {
      const e1 = await pipe(
        _.right(12),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )({})()
      assert.deepStrictEqual(e1, E.right(12))

      const e2 = await pipe(
        _.right(8),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )({})()
      assert.deepStrictEqual(e2, E.left('a'))
    })
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('applicativeReaderTaskEitherSeq', async () => {
    await assertSeq(_.ApplicativeSeq, { fromTask: _.fromTask }, (fa) => fa(null)())
  })

  it('applicativeReaderTaskEitherPar', async () => {
    await assertPar(_.ApplicativePar, { fromTask: _.fromTask }, (fa) => fa(null)())
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('ask', async () => {
    const e = await _.ask<number>()(1)()
    return assert.deepStrictEqual(e, E.right(1))
  })

  it('asks', async () => {
    const e = await _.asks((s: string) => s.length)('foo')()
    return assert.deepStrictEqual(e, E.right(3))
  })

  it('local', async () => {
    const len = (s: string): number => s.length
    const e = await pipe(
      _.asks((n: number) => n + 1),
      _.local(len)
    )('aaa')()
    assert.deepStrictEqual(e, E.right(4))
  })

  it('leftTask', async () => {
    const e = await _.leftTask(T.of(1))({})()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('rightTask', async () => {
    const e = await _.rightTask(T.of(1))({})()
    assert.deepStrictEqual(e, E.right(1))
  })

  it('leftReaderTask', async () => {
    const e = await _.leftReaderTask(RT.of(1))({})()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('rightReaderTask', async () => {
    const e = await _.rightReaderTask(RT.of(1))({})()
    assert.deepStrictEqual(e, E.right(1))
  })

  it('rightReader', async () => {
    const e = await _.rightReader(R.of(1))({})()
    assert.deepStrictEqual(e, E.right(1))
  })

  it('leftReader', async () => {
    const e = await _.leftReader(R.of(1))({})()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromTaskEither', async () => {
    const e = await _.fromTaskEither(TE.of(1))({})()
    assert.deepStrictEqual(e, E.right(1))
  })

  it('leftIO', async () => {
    const e = await _.leftIO(I.of(1))({})()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromIOEither', async () => {
    const e1 = await _.fromIOEither(() => E.right(1))({})()
    assert.deepStrictEqual(e1, E.right(1))
    const e2 = await _.fromIOEither(() => E.left('error'))({})()
    assert.deepStrictEqual(e2, E.left('error'))
  })

  it('fold', async () => {
    const fold = _.fold(
      (l: string) => R.of(T.of(l.length)),
      (a: number) => R.of(T.of(a * 2))
    )
    const e1 = await fold(_.right(1))({})()
    assert.deepStrictEqual(e1, 2)
    const e2 = await fold(_.left('err'))({})()
    assert.deepStrictEqual(e2, 3)
  })

  it('getOrElse', async () => {
    const e1 = await pipe(
      _.right(1),
      _.getOrElse((l: string) => R.of(T.of(l.length)))
    )({})()
    assert.deepStrictEqual(e1, 1)
    const e2 = await pipe(
      _.left('err'),
      _.getOrElse((l: string) => R.of(T.of(l.length)))
    )({})()
    assert.deepStrictEqual(e2, 3)
  })

  it('orElse', async () => {
    const e1 = await pipe(
      _.right(1),
      _.orElse((s: string) => _.right(s.length))
    )({})()
    assert.deepStrictEqual(e1, E.right(1))
    const e2 = await pipe(
      _.left('error'),
      _.orElse((s) => _.right(s.length))
    )({})()
    assert.deepStrictEqual(e2, E.right(5))
  })

  describe('MonadIO', () => {
    it('fromIO', async () => {
      const e = await _.fromIO(() => 1)({})()
      assert.deepStrictEqual(e, E.right(1))
    })
  })

  it('swap', async () => {
    const e1 = await _.swap(_.right(1))({})()
    assert.deepStrictEqual(e1, E.left(1))
    const e2 = await _.swap(_.left('a'))({})()
    assert.deepStrictEqual(e2, E.right('a'))
  })

  describe('getSemigroup', () => {
    it('concat', async () => {
      const S = _.getSemigroup(semigroupSum)
      const e1 = await S.concat(_.left('a'), _.left('b'))({})()
      assert.deepStrictEqual(e1, E.left('a'))

      const e2 = await S.concat(_.left('a'), _.right(2))({})()
      assert.deepStrictEqual(e2, E.right(2))

      const e3 = await S.concat(_.right(1), _.left('b'))({})()
      assert.deepStrictEqual(e3, E.right(1))

      const e4 = await S.concat(_.right(1), _.right(2))({})()
      assert.deepStrictEqual(e4, E.right(3))
    })
  })

  describe('getApplyMonoid', () => {
    const M = _.getApplyMonoid(monoidSum)

    it('concat (right)', async () => {
      const x = await M.concat(_.right(1), _.right(2))({})()
      return assert.deepStrictEqual(x, E.right(3))
    })

    it('concat (left)', async () => {
      const x = await M.concat(_.right(1), _.left('b'))({})()
      return assert.deepStrictEqual(x, E.left('b'))
    })

    it('empty (right)', async () => {
      const x = await M.concat(_.right(1), M.empty)({})()
      return assert.deepStrictEqual(x, E.right(1))
    })

    it('empty (left)', async () => {
      const x = await M.concat(M.empty, _.right(1))({})()
      return assert.deepStrictEqual(x, E.right(1))
    })
  })

  it('fromReaderEither', async () => {
    const e1 = await _.fromReaderEither(RE.left('a'))({})()
    assert.deepStrictEqual(e1, E.left('a'))
    const e2 = await _.fromReaderEither(RE.right(1))({})()
    assert.deepStrictEqual(e2, E.right(1))
  })

  it('getApplicativeReaderTaskValidation', async () => {
    const A = _.getApplicativeReaderTaskValidation(T.ApplicativePar, semigroupString)
    assert.deepStrictEqual(await sequenceT(A)(_.left('a'), _.left('b'))(null)(), E.left('ab'))
    const AV = _.getReaderTaskValidation(semigroupString)
    assert.deepStrictEqual(await sequenceT(AV)(_.left('a'), _.left('b'))(null)(), E.left('ab'))
  })

  it('getAltReaderTaskValidation', async () => {
    const A = _.getAltReaderTaskValidation(semigroupString)
    assert.deepStrictEqual(await A.alt(_.left('a'), () => _.left('b'))(null)(), E.left('ab'))
    const AV = _.getReaderTaskValidation(semigroupString)
    assert.deepStrictEqual(await AV.alt(_.left('a'), () => _.left('b'))(null)(), E.left('ab'))
  })

  describe('bracket', () => {
    // tslint:disable-next-line: readonly-array
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
      const e = await _.bracket(acquireFailure, useSuccess, releaseSuccess)(undefined)()
      assert.deepStrictEqual(e, E.left('acquire failure'))
    })

    it('body and release must not be called if acquire fails', async () => {
      await _.bracket(acquireFailure, useSuccess, releaseSuccess)(undefined)()
      assert.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', async () => {
      const e = await _.bracket(acquireSuccess, useFailure, releaseSuccess)(undefined)()
      assert.deepStrictEqual(e, E.left('use failure'))
    })

    it('should return the release error if both use and release fail', async () => {
      const e = await _.bracket(acquireSuccess, useFailure, releaseFailure)(undefined)()
      assert.deepStrictEqual(e, E.left('release failure'))
    })

    it('release must be called if the body returns', async () => {
      await _.bracket(acquireSuccess, useSuccess, releaseSuccess)(undefined)()
      assert.deepStrictEqual(log, ['release success'])
    })

    it('release must be called if the body throws', async () => {
      await _.bracket(acquireSuccess, useFailure, releaseSuccess)(undefined)()
      assert.deepStrictEqual(log, ['release success'])
    })

    it('should return the release error if release fails', async () => {
      const e = await _.bracket(acquireSuccess, useSuccess, releaseFailure)(undefined)()
      assert.deepStrictEqual(e, E.left('release failure'))
    })
  })

  it('chainEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    const x = await pipe(_.right('a'), _.chainEitherK(f))(undefined)()
    assert.deepStrictEqual(x, E.right(1))
  })

  it('chainIOEitherK', async () => {
    const f = (s: string) => IE.right(s.length)
    const x = await pipe(_.right('a'), _.chainIOEitherK(f))(undefined)()
    assert.deepStrictEqual(x, E.right(1))
  })

  it('chainTaskEitherK', async () => {
    const f = (s: string) => TE.right(s.length)
    const x = await pipe(_.right('a'), _.chainTaskEitherK(f))(undefined)()
    assert.deepStrictEqual(x, E.right(1))
  })
})
