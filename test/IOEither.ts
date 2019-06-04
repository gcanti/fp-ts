import * as assert from 'assert'
import { left as eitherLeft, right as eitherRight } from '../src/Either'
import { IO, io } from '../src/IO'
import { IOEither, ioEither, tryCatch, left2v, leftIO, rightIO, right2v, fold, orElse } from '../src/IOEither'
import { none, some } from '../src/Option'
import { pipe } from '../src/pipeable'

describe('IOEither', () => {
  it('map', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(ioEither.map(right2v(1), double).run(), eitherRight(2))
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = right2v(double)
    const fa = right2v(1)

    const e1 = fa.ap(fab).run()

    assert.deepStrictEqual(e1, eitherRight(2))
    assert.deepStrictEqual(e1, fab.ap_(fa).run())
    assert.deepStrictEqual(e1, ioEither.ap(fab, fa).run())
  })

  it('chain', () => {
    const te1 = ioEither.chain(ioEither.of<string, string>('foo'), a =>
      a.length > 2 ? ioEither.of<string, number>(a.length) : left2v('foo')
    )
    const te2 = ioEither.chain(ioEither.of<string, string>('a'), a =>
      a.length > 2 ? ioEither.of<string, number>(a.length) : left2v('foo')
    )
    assert.deepStrictEqual(te1.run(), eitherRight(3))
    assert.deepStrictEqual(te2.run(), eitherLeft('foo'))
  })

  it('mapLeft', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(
      left2v(1)
        .mapLeft(double)
        .run(),
      eitherLeft(2)
    )
  })

  it('fold (method)', () => {
    const onLeft = (s: string): boolean => s.length > 2
    const onRight = (n: number): boolean => n > 2

    assert.strictEqual(
      right2v(1)
        .fold(onLeft, onRight)
        .run(),
      false
    )
    assert.strictEqual(
      left2v('foo')
        .fold(onLeft, onRight)
        .run(),
      true
    )
  })

  it('fold (top level function)', () => {
    const onLeft = (s: string) => io.of(s.length > 2)
    const onRight = (n: number) => io.of(n > 2)
    assert.strictEqual(
      pipe(
        right2v(1),
        fold(onLeft, onRight)
      ).run(),
      false
    )
    assert.strictEqual(
      pipe(
        left2v('foo'),
        fold(onLeft, onRight)
      ).run(),
      true
    )
  })

  it('foldIO', () => {
    const onLeft = () => io.of('left')
    const onRight = () => io.of('right')

    assert.deepStrictEqual(
      left2v('a')
        .foldIO(onLeft, onRight)
        .run(),
      'left'
    )
    assert.deepStrictEqual(
      right2v(1)
        .foldIO(onLeft, onRight)
        .run(),
      'right'
    )
  })

  it('foldIOEither', () => {
    const onLeft = (s: string) => (s.length >= 2 ? ioEither.of<boolean, string>('okleft') : left2v(false))
    const onRight = (n: number) => (n >= 2 ? ioEither.of<boolean, string>('okright') : left2v(true))

    assert.deepStrictEqual(
      left2v('a')
        .foldIOEither(onLeft, onRight)
        .run(),
      eitherLeft(false)
    )
    assert.deepStrictEqual(
      left2v('aa')
        .foldIOEither(onLeft, onRight)
        .run(),
      eitherRight('okleft')
    )
    assert.deepStrictEqual(
      right2v(1)
        .foldIOEither(onLeft, onRight)
        .run(),
      eitherLeft(true)
    )
    assert.deepStrictEqual(
      right2v(2)
        .foldIOEither(onLeft, onRight)
        .run(),
      eitherRight('okright')
    )
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    const teRight = ioEither.of<string, number>(1)
    const e1 = teRight.bimap(f, g).run()

    assert.deepStrictEqual(e1, eitherRight(false))
    assert.deepStrictEqual(
      left2v('foo')
        .bimap(f, g)
        .run(),
      eitherLeft(3)
    )
    assert.deepStrictEqual(e1, ioEither.bimap(teRight, f, g).run())
  })

  it('orElse', () => {
    assert.deepStrictEqual(
      pipe(
        left2v('foo'),
        orElse(l => right2v(l.length))
      ).run(),
      eitherRight(3)
    )
    assert.deepStrictEqual(
      pipe(
        right2v(1),
        orElse(() => right2v(2))
      ).run(),
      eitherRight(1)
    )
  })

  it('leftIO', () => {
    assert.deepStrictEqual(leftIO(io.of(1)).run(), eitherLeft(1))
  })

  it('applySecond', () => {
    const log: Array<string> = []
    const append = (message: string): IOEither<string, number> => rightIO(new IO(() => log.push(message)))
    const e = append('a')
      .applySecond(append('b'))
      .run()

    assert.deepStrictEqual(e, eitherRight(2))
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  it('tryCatch', () => {
    // tslint:disable-next-line: deprecation
    const ok = tryCatch(() => 1)
    // tslint:disable-next-line: deprecation
    const ko = tryCatch(
      () => {
        throw new Error()
      },
      () => new Error('error')
    )

    const eok = ok.run()
    const eko = ko.run()

    assert.deepStrictEqual(eok, eitherRight(1))
    assert.deepStrictEqual(eko, eitherLeft(new Error('error')))
  })

  it('alt', () => {
    const l1: IOEither<string, number> = left2v('foo')
    const l2 = left2v('bar')
    const r1: IOEither<string, number> = right2v(1)
    const r2 = right2v(2)

    const e4 = r1.alt(r2).run()
    const e5 = ioEither.alt(r1, r2).run()

    assert.deepStrictEqual(l1.alt(l2).run(), eitherLeft('bar'))
    assert.deepStrictEqual(l1.alt(r1).run(), eitherRight(1))
    assert.deepStrictEqual(r1.alt(l1).run(), eitherRight(1))
    assert.deepStrictEqual(e4, eitherRight(1))
    assert.deepStrictEqual(e4, e5)
  })

  it('applyFirst', () => {
    const log: Array<string> = []
    const append = (message: string): IOEither<string, number> => rightIO(new IO(() => log.push(message)))
    const e = append('a')
      .applyFirst(append('b'))
      .run()

    assert.deepStrictEqual(e, eitherRight(1))
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  describe('MonadThrow', () => {
    it('should obey the law', () => {
      assert.deepStrictEqual(
        ioEither.chain(ioEither.throwError('error'), a => right2v(a)).run(),
        ioEither.throwError('error').run()
      )
    })

    it('fromOption', () => {
      assert.deepStrictEqual(ioEither.fromOption(none, 'error').run(), eitherLeft('error'))
      assert.deepStrictEqual(ioEither.fromOption(some(1), 'error').run(), eitherRight(1))
    })
  })
})
