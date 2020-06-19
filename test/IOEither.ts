import * as assert from 'assert'
import { sequenceT } from '../src/Apply'
import { getMonoid } from '../src/Array'
import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as I from '../src/IO'
import * as _ from '../src/IOEither'
import { monoidString } from '../src/Monoid'
import { none, some } from '../src/Option'
import { pipeable } from '../src/pipeable'
import { semigroupSum } from '../src/Semigroup'

describe('IOEither', () => {
  describe('pipeables', () => {
    it('alt', () => {
      const r1 = _.right<string, number>(1)
      const r2 = _.right<string, number>(2)
      const l1 = _.left<string, number>('foo')
      const l2 = _.left<string, number>('bar')

      assert.deepStrictEqual(
        pipe(
          l1,
          _.alt(() => l2)
        )(),
        E.left('bar')
      )
      assert.deepStrictEqual(
        pipe(
          l1,
          _.alt(() => r1)
        )(),
        E.right(1)
      )
      assert.deepStrictEqual(
        pipe(
          r1,
          _.alt(() => l1)
        )(),
        E.right(1)
      )
      assert.deepStrictEqual(
        pipe(
          r1,
          _.alt(() => r2)
        )(),
        E.right(1)
      )
    })

    it('map', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe(_.right(1), _.map(double))(), E.right(2))
    })

    it('ap', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe(_.right(double), _.ap(_.right(1)))(), E.right(2))
    })

    it('apFirst', () => {
      assert.deepStrictEqual(pipe(_.right('a'), _.apFirst(_.right('b')))(), E.right('a'))
    })

    it('apSecond', () => {
      assert.deepStrictEqual(pipe(_.right('a'), _.apSecond(_.right('b')))(), E.right('b'))
    })

    it('chain', () => {
      const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('foo'))
      assert.deepStrictEqual(pipe(_.right('foo'), _.chain(f))(), E.right(3))
      assert.deepStrictEqual(pipe(_.right('a'), _.chain(f))(), E.left('foo'))
    })

    it('chainFirst', () => {
      const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('foo'))
      assert.deepStrictEqual(pipe(_.right('foo'), _.chainFirst(f))(), E.right('foo'))
      assert.deepStrictEqual(pipe(_.right('a'), _.chainFirst(f))(), E.left('foo'))
    })

    it('flatten', () => {
      assert.deepStrictEqual(pipe(_.right(_.right('a')), _.flatten)(), E.right('a'))
    })

    it('bimap', () => {
      const f = (s: string): number => s.length
      const g = (n: number): boolean => n > 2
      assert.deepStrictEqual(pipe(_.right(1), _.bimap(f, g))(), E.right(false))
      assert.deepStrictEqual(pipe(_.left('foo'), _.bimap(f, g))(), E.left(3))
    })

    it('mapLeft', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe(_.left(1), _.mapLeft(double))(), E.left(2))
    })

    it('filterOrElse', () => {
      const isNumber = (u: string | number): u is number => typeof u === 'number'

      assert.deepStrictEqual(
        pipe(
          _.right(12),
          _.filterOrElse(
            (n) => n > 10,
            () => 'bar'
          )
        )(),
        E.right(12)
      )
      assert.deepStrictEqual(
        pipe(
          _.right(7),
          _.filterOrElse(
            (n) => n > 10,
            () => 'bar'
          )
        )(),
        E.left('bar')
      )
      assert.deepStrictEqual(
        pipe(
          _.left('foo'),
          _.filterOrElse(
            (n) => n > 10,
            () => 'bar'
          )
        )(),
        E.left('foo')
      )
      assert.deepStrictEqual(
        pipe(
          _.right(7),
          _.filterOrElse(
            (n) => n > 10,
            (n) => `invalid ${n}`
          )
        )(),
        E.left('invalid 7')
      )
      assert.deepStrictEqual(
        pipe(
          _.right(12),
          _.filterOrElse(isNumber, () => 'not a number')
        )(),
        E.right(12)
      )
    })

    it('fromOption', () => {
      assert.deepStrictEqual(_.fromOption(() => 'err')(none)(), E.left('err'))
      assert.deepStrictEqual(_.fromOption(() => 'err')(some(1))(), E.right(1))
    })

    it('fromEither', () => {
      assert.deepStrictEqual(_.fromEither(E.right('a'))(), E.right('a'))
      assert.deepStrictEqual(_.fromEither(E.left('a'))(), E.left('a'))
    })

    it('fromPredicate', () => {
      const gt2 = _.fromPredicate(
        (n: number) => n >= 2,
        (n) => `Invalid number ${n}`
      )
      assert.deepStrictEqual(gt2(3)(), E.right(3))
      assert.deepStrictEqual(gt2(1)(), E.left('Invalid number 1'))

      // refinements
      const isNumber = (u: string | number): u is number => typeof u === 'number'
      const from = _.fromPredicate(isNumber, () => 'not a number')
      assert.deepStrictEqual(from(4)(), E.right(4))
    })
  })

  it('fold', () => {
    assert.deepStrictEqual(
      _.fold(
        () => I.of('left'),
        () => I.of('right')
      )(_.right(1))(),
      'right'
    )
    assert.deepStrictEqual(
      _.fold(
        () => I.of('left'),
        () => I.of('right')
      )(_.left(1))(),
      'left'
    )
  })

  it('getOrElse', () => {
    assert.deepStrictEqual(_.getOrElse(() => I.of(2))(_.right(1))(), 1)
    assert.deepStrictEqual(_.getOrElse(() => I.of(2))(_.left(1))(), 2)
  })

  it('orElse', () => {
    assert.deepStrictEqual(_.orElse(() => _.right(2))(_.right(1))(), E.right(1))
  })

  it('tryCatch', () => {
    assert.deepStrictEqual(_.tryCatch(() => 1, E.toError)(), E.right(1))
    assert.deepStrictEqual(
      _.tryCatch(() => {
        throw new Error('error')
      }, E.toError)(),
      E.left(new Error('error'))
    )
  })

  describe('getSemigroup', () => {
    it('concat', () => {
      const S = _.getSemigroup<string, number>(semigroupSum)
      assert.deepStrictEqual(S.concat(_.leftIO(I.of('a')), _.leftIO(I.of('b')))(), E.left('a'))
      assert.deepStrictEqual(S.concat(_.leftIO(I.of('a')), _.rightIO(I.of(2)))(), E.right(2))
      assert.deepStrictEqual(S.concat(_.rightIO(I.of(1)), _.leftIO(I.of('b')))(), E.right(1))
      assert.deepStrictEqual(S.concat(_.rightIO(I.of(1)), _.rightIO(I.of(2)))(), E.right(3))
    })
  })

  describe('getApplyMonoid', () => {
    it('concat', () => {
      const M = _.getApplyMonoid(monoidString)
      assert.deepStrictEqual(M.concat(_.rightIO(I.of('a')), _.rightIO(I.of('b')))(), E.right('ab'))
      assert.deepStrictEqual(M.concat(_.rightIO(I.of('a')), _.leftIO(I.of('b')))(), E.left('b'))
      assert.deepStrictEqual(M.concat(_.rightIO(I.of('a')), M.empty)(), E.right('a'))
      assert.deepStrictEqual(M.concat(M.empty, _.rightIO(I.of('a')))(), E.right('a'))
    })
  })

  describe('bracket', () => {
    // tslint:disable-next-line: readonly-array
    let log: Array<string> = []

    const acquireFailure = _.left('acquire failure')
    const acquireSuccess = _.right({ res: 'acquire success' })
    const useSuccess = () => _.right('use success')
    const useFailure = () => _.left('use failure')
    const releaseSuccess = () =>
      _.rightIO(() => {
        log.push('release success')
      })
    const releaseFailure = () => _.left('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', () => {
      const e = _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      assert.deepStrictEqual(e, E.left('acquire failure'))
    })

    it('body and release must not be called if acquire fails', () => {
      _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      assert.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', () => {
      const e = _.bracket(acquireSuccess, useFailure, releaseSuccess)()
      assert.deepStrictEqual(e, E.left('use failure'))
    })

    it('should return the release error if both use and release fail', () => {
      const e = _.bracket(acquireSuccess, useFailure, releaseFailure)()
      assert.deepStrictEqual(e, E.left('release failure'))
    })

    it('release must be called if the body returns', () => {
      _.bracket(acquireSuccess, useSuccess, releaseSuccess)()
      assert.deepStrictEqual(log, ['release success'])
    })

    it('release must be called if the body throws', () => {
      _.bracket(acquireSuccess, useFailure, releaseSuccess)()
      assert.deepStrictEqual(log, ['release success'])
    })

    it('should return the release error if release fails', () => {
      const e = _.bracket(acquireSuccess, useSuccess, releaseFailure)()
      assert.deepStrictEqual(e, E.left('release failure'))
    })
  })

  it('getApplicativeIOValidation', () => {
    const A = _.getApplicativeIOValidation(monoidString)
    assert.deepStrictEqual(sequenceT(A)(_.left('a'), _.left('b'))(), E.left('ab'))
    assert.deepStrictEqual(sequenceT(A)(_.left('a'), _.right(1))(), E.left('a'))
    const AV = _.getIOValidation(monoidString)
    assert.deepStrictEqual(sequenceT(AV)(_.left('a'), _.left('b'))(), E.left('ab'))
  })

  it('getAltIOValidation', () => {
    const A = _.getAltIOValidation(monoidString)
    assert.deepStrictEqual(A.alt(_.left('a'), () => _.left('b'))(), E.left('ab'))
    const AV = _.getIOValidation(monoidString)
    assert.deepStrictEqual(AV.alt(_.left('a'), () => _.left('b'))(), E.left('ab'))
  })

  describe('getFilterable', () => {
    const F_ = _.getFilterable(getMonoid<string>())
    const { filter } = pipeable(F_)

    it('filter', async () => {
      const r1 = pipe(
        _.right(1),
        filter((n) => n > 0)
      )
      assert.deepStrictEqual(r1(), _.right(1)())
      const r2 = pipe(
        _.right(-1),
        filter((n) => n > 0)
      )
      assert.deepStrictEqual(r2(), _.left([])())
      const r3 = pipe(
        _.left(['a']),
        filter((n) => n > 0)
      )
      assert.deepStrictEqual(r3(), _.left(['a'])())
    })
  })

  it('chainEitherK', () => {
    const f = (s: string) => E.right(s.length)
    const x = pipe(_.right('a'), _.chainEitherK(f))()
    assert.deepStrictEqual(x, E.right(1))
  })
})
