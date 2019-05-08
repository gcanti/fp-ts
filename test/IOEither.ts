import * as assert from 'assert'
import * as E from '../src/Either'
import { io } from '../src/IO'
import * as _ from '../src/IOEither'
import { monoidString } from '../src/Monoid'
import { semigroupSum } from '../src/Semigroup'
import { none, some } from '../src/Option'

describe('IOEither', () => {
  it('tryCatch', () => {
    assert.deepStrictEqual(_.tryCatch(() => 1, E.toError)(), E.right(1))
    assert.deepStrictEqual(
      _.tryCatch(() => {
        throw new Error('error')
      }, E.toError)(),
      E.left(new Error('error'))
    )
  })

  it('filterOrElse', () => {
    const isNumber = (u: string | number): u is number => typeof u === 'number'

    assert.deepStrictEqual(_.filterOrElse(_.right(12), n => n > 10, () => 'bar')(), E.right(12))
    assert.deepStrictEqual(_.filterOrElse(_.right(7), n => n > 10, () => 'bar')(), E.left('bar'))
    assert.deepStrictEqual(_.filterOrElse(_.left('foo'), n => n > 10, () => 'bar')(), E.left('foo'))
    assert.deepStrictEqual(_.filterOrElse(_.right(7), n => n > 10, n => `invalid ${n}`)(), E.left('invalid 7'))
    assert.deepStrictEqual(_.filterOrElse(_.right(12), isNumber, () => 'not a number')(), E.right(12))
  })

  it('fromOption', () => {
    assert.deepStrictEqual(_.fromOption(none, () => 'err')(), E.left('err'))
    assert.deepStrictEqual(_.fromOption(some(1), () => 'err')(), E.right(1))
  })

  it('fromPredicate', () => {
    const gt2 = _.fromPredicate((n: number) => n >= 2, n => `Invalid number ${n}`)
    assert.deepStrictEqual(gt2(3)(), E.right(3))
    assert.deepStrictEqual(gt2(1)(), E.left('Invalid number 1'))

    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const from = _.fromPredicate(isNumber, () => 'not a number')
    assert.deepStrictEqual(from(4)(), E.right(4))
  })

  describe('Monad', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(_.ioEither.map(_.right(1), double)(), E.right(2))
    })

    it('ap', () => {
      const double = (n: number): number => n * 2
      const mab = _.right(double)
      const ma = _.right(1)
      assert.deepStrictEqual(_.ioEither.ap(mab, ma)(), E.right(2))
    })

    it('chain', () => {
      const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('foo'))
      const ma1 = _.ioEither.chain(_.right('foo'), f)
      const ma2 = _.ioEither.chain(_.right('a'), f)
      assert.deepStrictEqual(ma1(), E.right(3))
      assert.deepStrictEqual(ma2(), E.left('foo'))
    })
  })

  describe('Bifunctor', () => {
    it('bimap', () => {
      const f = (s: string): number => s.length
      const g = (n: number): boolean => n > 2

      assert.deepStrictEqual(_.ioEither.bimap(_.right(1), f, g)(), E.right(false))
      assert.deepStrictEqual(_.ioEither.bimap(_.left('foo'), f, g)(), E.left(3))
    })

    it('mapLeft', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(_.ioEither.mapLeft(_.left(1), double)(), E.left(2))
    })
  })

  describe('Alt', () => {
    it('alt', () => {
      const alt = _.ioEither.alt

      const r1 = _.right(1)
      const r2 = _.right(2)
      const l1 = _.left('foo')
      const l2 = _.left('bar')

      assert.deepStrictEqual(alt(l1, () => l2)(), E.left('bar'))
      assert.deepStrictEqual(alt(l1, () => r1)(), E.right(1))
      assert.deepStrictEqual(alt(r1, () => l1)(), E.right(1))
      assert.deepStrictEqual(alt(r1, () => r2)(), E.right(1))
    })
  })

  describe('getSemigroup', () => {
    it('concat', () => {
      const S = _.getSemigroup<string, number>(semigroupSum)
      assert.deepStrictEqual(S.concat(_.leftIO(io.of('a')), _.leftIO(io.of('b')))(), E.left('a'))
      assert.deepStrictEqual(S.concat(_.leftIO(io.of('a')), _.rightIO(io.of(2)))(), E.right(2))
      assert.deepStrictEqual(S.concat(_.rightIO(io.of(1)), _.leftIO(io.of('b')))(), E.right(1))
      assert.deepStrictEqual(S.concat(_.rightIO(io.of(1)), _.rightIO(io.of(2)))(), E.right(3))
    })
  })

  describe('getApplyMonoid', () => {
    it('concat', () => {
      const M = _.getApplyMonoid(monoidString)
      assert.deepStrictEqual(M.concat(_.rightIO(io.of('a')), _.rightIO(io.of('b')))(), E.right('ab'))
      assert.deepStrictEqual(M.concat(_.rightIO(io.of('a')), _.leftIO(io.of('b')))(), E.left('b'))
      assert.deepStrictEqual(M.concat(_.rightIO(io.of('a')), M.empty)(), E.right('a'))
      assert.deepStrictEqual(M.concat(M.empty, _.rightIO(io.of('a')))(), E.right('a'))
    })
  })

  describe('bracket', () => {
    let log: Array<string> = []

    const acquireFailure = _.left('acquire failure')
    const acquireSuccess = _.right({ res: 'acquire success' })
    const useSuccess = () => _.right('use success')
    const useFailure = () => _.left('use failure')
    const releaseSuccess = () =>
      _.ioEither.fromIO(() => {
        log.push('release success')
      })
    const releaseFailure = () => _.left('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', () => {
      assert.deepStrictEqual(_.bracket(acquireFailure, useSuccess, releaseSuccess)(), E.left('acquire failure'))
    })

    it('body and release must not be called if acquire fails', () => {
      _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      assert.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', () => {
      assert.deepStrictEqual(_.bracket(acquireSuccess, useFailure, releaseSuccess)(), E.left('use failure'))
    })

    it('should return the release error if both use and release fail', () => {
      assert.deepStrictEqual(_.bracket(acquireSuccess, useFailure, releaseFailure)(), E.left('release failure'))
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
      assert.deepStrictEqual(_.bracket(acquireSuccess, useSuccess, releaseFailure)(), E.left('release failure'))
    })
  })
})
