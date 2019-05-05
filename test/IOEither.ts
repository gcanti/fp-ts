import * as assert from 'assert'
import * as E from '../src/Either'
import { io } from '../src/IO'
import * as _ from '../src/IOEither'
import { monoidString } from '../src/Monoid'
import { none, some } from '../src/Option'
import { semigroupSum } from '../src/Semigroup'

describe('IOEither', () => {
  it('fold', () => {
    const f = (s: string): boolean => s.length > 2
    const g = (n: number): boolean => n > 2

    assert.strictEqual(_.fold(_.fromRight(1), f, g)(), false)
    assert.strictEqual(_.fold(_.fromLeft('foo'), f, g)(), true)
  })

  it('orElse', () => {
    assert.deepStrictEqual(_.orElse(_.fromLeft('foo'), l => _.fromRight(l.length))(), E.right(3))
    assert.deepStrictEqual(_.orElse(_.fromRight(1), () => _.fromRight(2))(), E.right(1))
  })

  it('left', () => {
    assert.deepStrictEqual(_.left(io.of(1))(), E.left(1))
  })

  it('right', () => {
    assert.deepStrictEqual(_.right(io.of(1))(), E.right(1))
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

  it('filterOrElse', () => {
    const isNumber = (u: string | number): u is number => typeof u === 'number'

    assert.deepStrictEqual(_.filterOrElse(_.fromRight(12), n => n > 10, () => 'bar')(), E.right(12))
    assert.deepStrictEqual(_.filterOrElse(_.fromRight(7), n => n > 10, () => 'bar')(), E.left('bar'))
    assert.deepStrictEqual(_.filterOrElse(_.fromLeft('foo'), n => n > 10, () => 'bar')(), E.left('foo'))
    assert.deepStrictEqual(_.filterOrElse(_.fromRight(7), n => n > 10, n => `invalid ${n}`)(), E.left('invalid 7'))
    assert.deepStrictEqual(_.filterOrElse(_.fromRight(12), isNumber, () => 'not a number')(), E.right(12))
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
      assert.deepStrictEqual(_.ioEither.map(_.fromRight(1), double)(), E.right(2))
    })

    it('ap', () => {
      const double = (n: number): number => n * 2
      const mab = _.fromRight(double)
      const ma = _.fromRight(1)
      assert.deepStrictEqual(_.ioEither.ap(mab, ma)(), E.right(2))
    })

    it('chain', () => {
      const f = (a: string) => (a.length > 2 ? _.fromRight(a.length) : _.fromLeft('foo'))
      const ma1 = _.ioEither.chain(_.fromRight('foo'), f)
      const ma2 = _.ioEither.chain(_.fromRight('a'), f)
      assert.deepStrictEqual(ma1(), E.right(3))
      assert.deepStrictEqual(ma2(), E.left('foo'))
    })
  })

  describe('Bifunctor', () => {
    it('bimap', () => {
      const f = (s: string): number => s.length
      const g = (n: number): boolean => n > 2

      assert.deepStrictEqual(_.ioEither.bimap(_.fromRight(1), f, g)(), E.right(false))
      assert.deepStrictEqual(_.ioEither.bimap(_.fromLeft('foo'), f, g)(), E.left(3))
    })

    it('mapLeft', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(_.mapLeft(_.fromLeft(1), double)(), E.left(2))
    })
  })

  describe('Alt', () => {
    it('alt', () => {
      const alt = _.ioEither.alt

      const r1 = _.fromRight(1)
      const r2 = _.fromRight(2)
      const l1 = _.fromLeft('foo')
      const l2 = _.fromLeft('bar')

      assert.deepStrictEqual(alt(l1, () => l2)(), E.left('bar'))
      assert.deepStrictEqual(alt(l1, () => r1)(), E.right(1))
      assert.deepStrictEqual(alt(r1, () => l1)(), E.right(1))
      assert.deepStrictEqual(alt(r1, () => r2)(), E.right(1))
    })
  })

  describe('MonadThrow', () => {
    it('should obey the law', () => {
      assert.deepStrictEqual(
        _.ioEither.chain(_.ioEither.throwError('error'), a => _.fromRight(a))(),
        _.ioEither.throwError('error')()
      )
    })

    it('fromOption', () => {
      assert.deepStrictEqual(_.ioEither.fromOption(none, () => 'error')(), E.left('error'))
      assert.deepStrictEqual(_.ioEither.fromOption(some(1), () => 'error')(), E.right(1))
    })
  })

  describe('getSemigroup', () => {
    it('concat', () => {
      const S = _.getSemigroup<string, number>(semigroupSum)
      assert.deepStrictEqual(S.concat(_.left(io.of('a')), _.left(io.of('b')))(), E.left('a'))
      assert.deepStrictEqual(S.concat(_.left(io.of('a')), _.right(io.of(2)))(), E.right(2))
      assert.deepStrictEqual(S.concat(_.right(io.of(1)), _.left(io.of('b')))(), E.right(1))
      assert.deepStrictEqual(S.concat(_.right(io.of(1)), _.right(io.of(2)))(), E.right(3))
    })
  })

  describe('getApplyMonoid', () => {
    it('concat', () => {
      const M = _.getApplyMonoid(monoidString)
      assert.deepStrictEqual(M.concat(_.right(io.of('a')), _.right(io.of('b')))(), E.right('ab'))
      assert.deepStrictEqual(M.concat(_.right(io.of('a')), _.left(io.of('b')))(), E.left('b'))
      assert.deepStrictEqual(M.concat(_.right(io.of('a')), M.empty)(), E.right('a'))
      assert.deepStrictEqual(M.concat(M.empty, _.right(io.of('a')))(), E.right('a'))
    })
  })

  describe('bracket', () => {
    let log: Array<string> = []

    const acquireFailure = _.fromLeft('acquire failure')
    const acquireSuccess = _.fromRight({ res: 'acquire success' })
    const useSuccess = () => _.fromRight('use success')
    const useFailure = () => _.fromLeft('use failure')
    const releaseSuccess = () =>
      _.ioEither.fromIO(() => {
        log.push('release success')
      })
    const releaseFailure = () => _.fromLeft('release failure')

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
