import * as assert from 'assert'
import { left as eitherLeft, right as eitherRight, toError } from '../src/Either'
import { io } from '../src/IO'
import * as IE from '../src/IOEither'
import { none, some } from '../src/Option'
import { semigroupSum } from '../src/Semigroup'
import { monoidString } from '../src/Monoid'

describe('IOEither', () => {
  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = IE.fromRight(double)
    const fa = IE.fromRight(1)

    const e3 = IE.ioEither.ap(fab, fa)()

    assert.deepStrictEqual(e3, eitherRight(2))
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    const e = IE.ioEither.map(IE.fromRight(1), double)

    assert.deepStrictEqual(e(), eitherRight(2))
  })

  it('mapLeft', () => {
    const double = (n: number): number => n * 2
    const fa = IE.fromLeft(1)
    const e = IE.mapLeft(fa, double)()

    assert.deepStrictEqual(e, eitherLeft(2))
  })

  it('chain', () => {
    const ioe1 = IE.ioEither.chain(IE.fromRight('foo'), a =>
      a.length > 2 ? IE.fromRight(a.length) : IE.fromLeft('foo')
    )
    const ioe2 = IE.ioEither.chain(IE.fromRight('a'), a => (a.length > 2 ? IE.fromRight(a.length) : IE.fromLeft('foo')))
    const e1 = ioe1()
    const e2 = ioe2()

    assert.deepStrictEqual(e1, eitherRight(3))
    assert.deepStrictEqual(e2, eitherLeft('foo'))
  })

  it('fold', () => {
    const f = (s: string): boolean => s.length > 2
    const g = (n: number): boolean => n > 2
    const io1 = IE.fold(IE.fromRight(1), f, g)
    const io2 = IE.fold(IE.fromLeft('foo'), f, g)
    const b1 = io1()
    const b2 = io2()

    assert.strictEqual(b1, false)
    assert.strictEqual(b2, true)
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    const teRight = IE.fromRight(1)
    const teLeft = IE.fromLeft('foo')
    const e1 = IE.ioEither.bimap(teRight, f, g)()
    const e2 = IE.ioEither.bimap(teLeft, f, g)()

    assert.deepStrictEqual(e1, eitherRight(false))
    assert.deepStrictEqual(e2, eitherLeft(3))
  })

  it('orElse', () => {
    const l: IE.IOEither<string, number> = IE.fromLeft('foo')
    const r = IE.fromRight(1)
    const tl = IE.orElse(l, l => IE.fromRight(l.length))
    const tr = IE.orElse(r, () => IE.fromRight(2))
    const el = tl()
    const er = tr()

    assert.deepStrictEqual(el, eitherRight(3))
    assert.deepStrictEqual(er, eitherRight(1))
  })

  it('left', () => {
    const e = IE.left(io.of(1))()
    assert.deepStrictEqual(e, eitherLeft(1))
  })

  it('right', () => {
    const e = IE.right(io.of(1))()
    assert.deepStrictEqual(e, eitherRight(1))
  })

  it('tryCatch', () => {
    const ok = IE.tryCatch(() => 1, toError)
    const ko = IE.tryCatch(() => {
      throw new Error('error')
    }, toError)

    const eok = ok()
    const eko = ko()

    assert.deepStrictEqual(eok, eitherRight(1))
    assert.deepStrictEqual(eko, eitherLeft(new Error('error')))
  })

  it('alt', () => {
    const l1: IE.IOEither<string, number> = IE.fromLeft('foo')
    const l2 = IE.fromLeft('bar')
    const r1: IE.IOEither<string, number> = IE.fromRight(1)
    const r2 = IE.fromRight(2)
    const x1 = IE.ioEither.alt(l1, () => l2)
    const x2 = IE.ioEither.alt(l1, () => r1)
    const x3 = IE.ioEither.alt(r1, () => l1)
    const x4 = IE.ioEither.alt(r1, () => r2)

    const e1 = x1()
    const e2 = x2()
    const e3 = x3()
    const e4 = x4()

    assert.deepStrictEqual(e1, eitherLeft('bar'))
    assert.deepStrictEqual(e2, eitherRight(1))
    assert.deepStrictEqual(e3, eitherRight(1))
    assert.deepStrictEqual(e4, eitherRight(1))
  })

  describe('MonadThrow', () => {
    it('should obey the law', () => {
      assert.deepStrictEqual(
        IE.ioEither.chain(IE.ioEither.throwError('error'), a => IE.fromRight(a))(),
        IE.ioEither.throwError('error')()
      )
    })

    it('fromOption', () => {
      assert.deepStrictEqual(IE.ioEither.fromOption(none, () => 'error')(), eitherLeft('error'))
      assert.deepStrictEqual(IE.ioEither.fromOption(some(1), () => 'error')(), eitherRight(1))
    })
  })

  it('filterOrElse', () => {
    const isNumber = (u: string | number): u is number => typeof u === 'number'

    assert.deepStrictEqual(IE.filterOrElse(IE.fromRight(12), n => n > 10, () => 'bar')(), eitherRight(12))
    assert.deepStrictEqual(IE.filterOrElse(IE.fromRight(7), n => n > 10, () => 'bar')(), eitherLeft('bar'))
    assert.deepStrictEqual(IE.filterOrElse(IE.fromLeft('foo'), n => n > 10, () => 'bar')(), eitherLeft('foo'))
    assert.deepStrictEqual(
      IE.filterOrElse(IE.fromRight(7), n => n > 10, n => `invalid ${n}`)(),
      eitherLeft('invalid 7')
    )
    assert.deepStrictEqual(IE.filterOrElse(IE.fromRight(12), isNumber, () => 'not a number')(), eitherRight(12))
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const handleError = (n: number) => `Invalid number ${n}`
    const gt2 = IE.fromPredicate(predicate, handleError)
    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const is = IE.fromPredicate(isNumber, () => 'not a number')
    const actual = is(4)

    assert.deepStrictEqual(gt2(3)(), eitherRight(3))
    assert.deepStrictEqual(gt2(1)(), eitherLeft('Invalid number 1'))
    assert.deepStrictEqual(actual(), eitherRight(4))
  })

  it('getSemigroup', () => {
    const S = IE.getSemigroup<string, number>(semigroupSum)
    assert.deepStrictEqual(S.concat(IE.left(io.of('a')), IE.left(io.of('b')))(), eitherLeft('a'))
    assert.deepStrictEqual(S.concat(IE.left(io.of('a')), IE.right(io.of(2)))(), eitherRight(2))
    assert.deepStrictEqual(S.concat(IE.right(io.of(1)), IE.left(io.of('b')))(), eitherRight(1))
    assert.deepStrictEqual(S.concat(IE.right(io.of(1)), IE.right(io.of(2)))(), eitherRight(3))
  })

  describe('getApplyMonoid', () => {
    const M = IE.getApplyMonoid(monoidString)
    assert.deepStrictEqual(M.concat(IE.right(io.of('a')), IE.right(io.of('b')))(), eitherRight('ab'))
    assert.deepStrictEqual(M.concat(IE.right(io.of('a')), IE.left(io.of('b')))(), eitherLeft('b'))
    assert.deepStrictEqual(M.concat(IE.right(io.of('a')), M.empty)(), eitherRight('a'))
    assert.deepStrictEqual(M.concat(M.empty, IE.right(io.of('a')))(), eitherRight('a'))
  })

  describe('bracket', () => {
    let log: Array<string> = []

    const acquireFailure = IE.fromLeft('acquire failure')
    const acquireSuccess = IE.fromRight({ res: 'acquire success' })
    const useSuccess = () => IE.fromRight('use success')
    const useFailure = () => IE.fromLeft('use failure')
    const releaseSuccess = () =>
      IE.ioEither.fromIO(() => {
        log.push('release success')
      })
    const releaseFailure = () => IE.fromLeft('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', () => {
      assert.deepStrictEqual(IE.bracket(acquireFailure, useSuccess, releaseSuccess)(), eitherLeft('acquire failure'))
    })
    it('body and release must not be called if acquire fails', () => {
      IE.bracket(acquireFailure, useSuccess, releaseSuccess)()
      assert.deepStrictEqual(log, [])
    })
    it('should return the use error if use fails and release does not', () => {
      assert.deepStrictEqual(IE.bracket(acquireSuccess, useFailure, releaseSuccess)(), eitherLeft('use failure'))
    })
    it('should return the release error if both use and release fail', () => {
      assert.deepStrictEqual(IE.bracket(acquireSuccess, useFailure, releaseFailure)(), eitherLeft('release failure'))
    })
    it('release must be called if the body returns', () => {
      IE.bracket(acquireSuccess, useSuccess, releaseSuccess)()
      assert.deepStrictEqual(log, ['release success'])
    })
    it('release must be called if the body throws', () => {
      IE.bracket(acquireSuccess, useFailure, releaseSuccess)()
      assert.deepStrictEqual(log, ['release success'])
    })
    it('should return the release error if release fails', () => {
      assert.deepStrictEqual(IE.bracket(acquireSuccess, useSuccess, releaseFailure)(), eitherLeft('release failure'))
    })
  })
})
