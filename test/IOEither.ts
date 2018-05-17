import * as assert from 'assert'
import { left as eitherLeft, right as eitherRight } from '../src/Either'
import { IO, io } from '../src/IO'
import { IOEither, fromIO, fromLeft, left, right, ioEither, tryCatch } from '../src/IOEither'

describe('IOEither', () => {
  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = ioEither.of(double)
    const fa = ioEither.of(1)

    const e1 = fa.ap(fab).run()
    const e2 = fab.ap_(fa).run()
    const e3 = ioEither.ap(fab, fa).run()

    assert.deepEqual(e1, eitherRight(2))
    assert.deepEqual(e1, e2)
    assert.deepEqual(e1, e3)
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    const e = ioEither.map(ioEither.of(1), double).run()

    assert.deepEqual(e, eitherRight(2))
  })

  it('mapLeft', () => {
    const double = (n: number): number => n * 2
    const fa = fromLeft(1)
    const e = fa.mapLeft(double).run()

    assert.deepEqual(e, eitherLeft(2))
  })

  it('chain', () => {
    const te1 = ioEither.chain(
      ioEither.of<string, string>('foo'),
      a => (a.length > 2 ? ioEither.of<string, number>(a.length) : fromLeft<string, number>('foo'))
    )
    const te2 = ioEither.chain(
      ioEither.of<string, string>('a'),
      a => (a.length > 2 ? ioEither.of<string, number>(a.length) : fromLeft<string, number>('foo'))
    )
    const e1 = te1.run()
    const e2 = te2.run()

    assert.deepEqual(e1, eitherRight(3))
    assert.deepEqual(e2, eitherLeft('foo'))
  })

  it('fold', () => {
    const f = (s: string): boolean => s.length > 2
    const g = (n: number): boolean => n > 2
    const te1 = ioEither.of<string, number>(1).fold(f, g)
    const te2 = fromLeft<string, number>('foo').fold(f, g)
    const b1 = te1.run()
    const b2 = te2.run()

    assert.strictEqual(b1, false)
    assert.strictEqual(b2, true)
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    const teRight = ioEither.of<string, number>(1)
    const teLeft = fromLeft<string, number>('foo')
    const e1 = teRight.bimap(f, g).run()
    const e2 = teLeft.bimap(f, g).run()
    const e3 = ioEither.bimap(teRight, f, g).run()

    assert.deepEqual(e1, eitherRight(false))
    assert.deepEqual(e2, eitherLeft(3))
    assert.deepEqual(e1, e3)
  })

  it('orElse', () => {
    const l = fromLeft<string, number>('foo')
    const r = ioEither.of<string, number>(1)
    const tl = l.orElse(l => ioEither.of<number, number>(l.length))
    const tr = r.orElse(() => ioEither.of<number, number>(2))
    const el = tl.run()
    const er = tr.run()

    assert.deepEqual(el, eitherRight(3))
    assert.deepEqual(er, eitherRight(1))
  })

  it('left', () => {
    const e = left(io.of(1)).run()

    assert.deepEqual(e, eitherLeft(1))
  })

  it('applySecond', () => {
    const log: Array<string> = []
    const append = (message: string): IOEither<string, number> => right(new IO(() => log.push(message)))
    const e = append('a')
      .applySecond(append('b'))
      .run()

    assert.deepEqual(e, eitherRight(2))
    assert.deepEqual(log, ['a', 'b'])
  })

  it('tryCatch', () => {
    const ok = tryCatch(() => 1, () => new Error('error'))
    const ko = tryCatch(() => {
      throw new Error()
    }, () => new Error('error'))

    const eok = ok.run()
    const eko = ko.run()

    assert.deepEqual(eok, eitherRight(1))
    assert.deepEqual(eko, eitherLeft(new Error('error')))
  })

  it('fromIO', () => {
    const io = new IO(() => 1)
    const fa = fromIO(io)
    const e = fa.run()

    assert.deepEqual(e, eitherRight(1))
  })
})
