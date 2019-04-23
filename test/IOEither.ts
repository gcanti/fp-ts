import * as assert from 'assert'
import { left as eitherLeft, right as eitherRight, toError } from '../src/Either'
import { io } from '../src/IO'
import {
  fold,
  fromLeft,
  IOEither,
  ioEither,
  left,
  fromRight,
  mapLeft,
  orElse,
  tryCatch,
  run,
  right
} from '../src/IOEither'
import { none, some } from '../src/Option'

describe('IOEither', () => {
  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = fromRight(double)
    const fa = fromRight(1)

    const e3 = ioEither.ap(fab, fa)()

    assert.deepStrictEqual(e3, eitherRight(2))
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    const e = run(ioEither.map(fromRight(1), double))

    assert.deepStrictEqual(e, eitherRight(2))
  })

  it('mapLeft', () => {
    const double = (n: number): number => n * 2
    const fa = fromLeft(1)
    const e = mapLeft(fa, double)()

    assert.deepStrictEqual(e, eitherLeft(2))
  })

  it('chain', () => {
    const ioe1 = ioEither.chain(fromRight('foo'), a => (a.length > 2 ? fromRight(a.length) : fromLeft('foo')))
    const ioe2 = ioEither.chain(fromRight('a'), a => (a.length > 2 ? fromRight(a.length) : fromLeft('foo')))
    const e1 = ioe1()
    const e2 = ioe2()

    assert.deepStrictEqual(e1, eitherRight(3))
    assert.deepStrictEqual(e2, eitherLeft('foo'))
  })

  it('fold', () => {
    const f = (s: string): boolean => s.length > 2
    const g = (n: number): boolean => n > 2
    const io1 = fold(fromRight(1), f, g)
    const io2 = fold(fromLeft('foo'), f, g)
    const b1 = io1()
    const b2 = io2()

    assert.strictEqual(b1, false)
    assert.strictEqual(b2, true)
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    const teRight = fromRight(1)
    const teLeft = fromLeft('foo')
    const e1 = ioEither.bimap(teRight, f, g)()
    const e2 = ioEither.bimap(teLeft, f, g)()

    assert.deepStrictEqual(e1, eitherRight(false))
    assert.deepStrictEqual(e2, eitherLeft(3))
  })

  it('orElse', () => {
    const l: IOEither<string, number> = fromLeft('foo')
    const r = fromRight(1)
    const tl = orElse(l, l => fromRight(l.length))
    const tr = orElse(r, () => fromRight(2))
    const el = tl()
    const er = tr()

    assert.deepStrictEqual(el, eitherRight(3))
    assert.deepStrictEqual(er, eitherRight(1))
  })

  it('left', () => {
    const e = left(io.of(1))()
    assert.deepStrictEqual(e, eitherLeft(1))
  })

  it('right', () => {
    const e = right(io.of(1))()
    assert.deepStrictEqual(e, eitherRight(1))
  })

  it('tryCatch', () => {
    const ok = tryCatch(() => 1, toError)
    const ko = tryCatch(() => {
      throw new Error('error')
    }, toError)

    const eok = ok()
    const eko = ko()

    assert.deepStrictEqual(eok, eitherRight(1))
    assert.deepStrictEqual(eko, eitherLeft(new Error('error')))
  })

  it('alt', () => {
    const l1: IOEither<string, number> = fromLeft('foo')
    const l2 = fromLeft('bar')
    const r1: IOEither<string, number> = fromRight(1)
    const r2 = fromRight(2)
    const x1 = ioEither.alt(l1, () => l2)
    const x2 = ioEither.alt(l1, () => r1)
    const x3 = ioEither.alt(r1, () => l1)
    const x4 = ioEither.alt(r1, () => r2)

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
        ioEither.chain(ioEither.throwError('error'), a => fromRight(a))(),
        ioEither.throwError('error')()
      )
    })

    it('fromOption', () => {
      assert.deepStrictEqual(ioEither.fromOption(none, () => 'error')(), eitherLeft('error'))
      assert.deepStrictEqual(ioEither.fromOption(some(1), () => 'error')(), eitherRight(1))
    })
  })
})
