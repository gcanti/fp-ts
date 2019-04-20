import * as assert from 'assert'
import { left as eitherLeft, right as eitherRight, toError } from '../src/Either'
import { io } from '../src/IO'
import { IOEither, fromLeft, left, right, ioEither, tryCatch, make } from '../src/IOEither'
import { none, some } from '../src/Option'

describe('IOEither', () => {
  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = make(double)
    const fa = make(1)

    const e1 = fa.ap(fab).run()
    const e2 = fab.ap_(fa).run()
    const e3 = ioEither.ap(fab, fa).run()

    assert.deepStrictEqual(e1, eitherRight(2))
    assert.deepStrictEqual(e1, e2)
    assert.deepStrictEqual(e1, e3)
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    const e = ioEither.map(make(1), double).run()

    assert.deepStrictEqual(e, eitherRight(2))
  })

  it('mapLeft', () => {
    const double = (n: number): number => n * 2
    const fa = fromLeft(1)
    const e = fa.mapLeft(double).run()

    assert.deepStrictEqual(e, eitherLeft(2))
  })

  it('chain', () => {
    const te1 = ioEither.chain(make('foo'), a => (a.length > 2 ? make(a.length) : fromLeft('foo')))
    const te2 = ioEither.chain(make('a'), a => (a.length > 2 ? make(a.length) : fromLeft('foo')))
    const e1 = te1.run()
    const e2 = te2.run()

    assert.deepStrictEqual(e1, eitherRight(3))
    assert.deepStrictEqual(e2, eitherLeft('foo'))
  })

  it('fold', () => {
    const f = (s: string): boolean => s.length > 2
    const g = (n: number): boolean => n > 2
    const io1 = make(1).fold(f, g)
    const io2 = fromLeft('foo').fold(f, g)
    const b1 = io1()
    const b2 = io2()

    assert.strictEqual(b1, false)
    assert.strictEqual(b2, true)
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    const teRight = make(1)
    const teLeft = fromLeft('foo')
    const e1 = teRight.bimap(f, g).run()
    const e2 = teLeft.bimap(f, g).run()
    const e3 = ioEither.bimap(teRight, f, g).run()

    assert.deepStrictEqual(e1, eitherRight(false))
    assert.deepStrictEqual(e2, eitherLeft(3))
    assert.deepStrictEqual(e1, e3)
  })

  it('orElse', () => {
    const l: IOEither<string, number> = fromLeft('foo')
    const r = make(1)
    const tl = l.orElse(l => make(l.length))
    const tr = r.orElse(() => make(2))
    const el = tl.run()
    const er = tr.run()

    assert.deepStrictEqual(el, eitherRight(3))
    assert.deepStrictEqual(er, eitherRight(1))
  })

  it('left', () => {
    const e = left(io.of(1)).run()

    assert.deepStrictEqual(e, eitherLeft(1))
  })

  it('applySecond', () => {
    const log: Array<string> = []
    const append = (message: string): IOEither<string, number> => right(() => log.push(message))
    const e = append('a')
      .applySecond(append('b'))
      .run()

    assert.deepStrictEqual(e, eitherRight(2))
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  it('tryCatch', () => {
    const ok = tryCatch(() => 1, toError)
    const ko = tryCatch(() => {
      throw new Error('error')
    }, toError)

    const eok = ok.run()
    const eko = ko.run()

    assert.deepStrictEqual(eok, eitherRight(1))
    assert.deepStrictEqual(eko, eitherLeft(new Error('error')))
  })

  it('alt', () => {
    const l1: IOEither<string, number> = fromLeft('foo')
    const l2 = fromLeft('bar')
    const r1: IOEither<string, number> = make(1)
    const r2 = make(2)
    const x1 = l1.alt(l2)
    const x2 = l1.alt(r1)
    const x3 = r1.alt(l1)
    const x4 = r1.alt(r2)
    const x5 = ioEither.alt(r1, r2)

    const e1 = x1.run()
    const e2 = x2.run()
    const e3 = x3.run()
    const e4 = x4.run()
    const e5 = x5.run()

    assert.deepStrictEqual(e1, eitherLeft('bar'))
    assert.deepStrictEqual(e2, eitherRight(1))
    assert.deepStrictEqual(e3, eitherRight(1))
    assert.deepStrictEqual(e4, eitherRight(1))
    assert.deepStrictEqual(e4, e5)
  })

  it('applyFirst', () => {
    const log: Array<string> = []
    const append = (message: string): IOEither<string, number> => right(() => log.push(message))
    const e = append('a')
      .applyFirst(append('b'))
      .run()

    assert.deepStrictEqual(e, eitherRight(1))
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  describe('MonadThrow', () => {
    it('should obey the law', () => {
      assert.deepStrictEqual(
        ioEither.chain(ioEither.throwError('error'), a => make(a)).run(),
        ioEither.throwError('error').run()
      )
    })

    it('fromOption', () => {
      assert.deepStrictEqual(ioEither.fromOption(none, 'error').run(), eitherLeft('error'))
      assert.deepStrictEqual(ioEither.fromOption(some(1), 'error').run(), eitherRight(1))
    })
  })
})
