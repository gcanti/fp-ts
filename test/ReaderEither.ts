import * as assert from 'assert'
import * as E from '../src/Either'
import { monoidString } from '../src/Monoid'
import { none, some } from '../src/Option'
import { pipe } from '../src/pipeable'
import { reader } from '../src/Reader'
import * as _ from '../src/ReaderEither'
import { semigroupSum, semigroupString } from '../src/Semigroup'

describe('ReaderEither', () => {
  it('fromOption', () => {
    const e1 = _.fromOption(() => 'none')(none)({})
    assert.deepStrictEqual(e1, E.left('none'))
    const e2 = _.fromOption(() => 'none')(some(1))({})
    assert.deepStrictEqual(e2, E.right(1))
  })

  it('fromPredicate', () => {
    const gt2 = _.fromPredicate(
      (n: number) => n >= 2,
      n => `Invalid number ${n}`
    )
    assert.deepStrictEqual(gt2(3)({}), E.right(3))
    assert.deepStrictEqual(gt2(1)({}), E.left('Invalid number 1'))
  })

  it('fold', () => {
    const fold = _.fold(
      (s: string) => reader.of(s.length),
      (n: number) => reader.of(n * 2)
    )
    assert.deepStrictEqual(fold(_.right(1))({}), 2)
    assert.deepStrictEqual(fold(_.left('aaa'))({}), 3)
  })

  it('getOrElse', () => {
    const getOrElse = _.getOrElse((s: string) => reader.of(s.length))
    assert.deepStrictEqual(getOrElse(_.right(1))({}), 1)
    assert.deepStrictEqual(getOrElse(_.left('aaa'))({}), 3)
  })

  it('orElse', () => {
    const orElse = _.orElse((s: string) => (s.length > 2 ? _.right(1) : _.left(2)))
    assert.deepStrictEqual(orElse(_.right(1))({}), E.right(1))
  })

  it('filterOrElse', () => {
    const e1 = pipe(
      _.right(12),
      _.filterOrElse(
        n => n > 10,
        () => 'a'
      )
    )({})
    assert.deepStrictEqual(e1, E.right(12))
    const e2 = pipe(
      _.right(7),
      _.filterOrElse(
        n => n > 10,
        () => 'a'
      )
    )({})
    assert.deepStrictEqual(e2, E.left('a'))
  })

  describe('getSemigroup', () => {
    it('concat', () => {
      const S = _.getSemigroup(semigroupSum)
      const e1 = S.concat(_.left('a'), _.left('b'))({})
      assert.deepStrictEqual(e1, E.left('a'))

      const e2 = S.concat(_.left('a'), _.right(2))({})
      assert.deepStrictEqual(e2, E.right(2))

      const e3 = S.concat(_.right(1), _.left('b'))({})
      assert.deepStrictEqual(e3, E.right(1))

      const e4 = S.concat(_.right(1), _.right(2))({})
      assert.deepStrictEqual(e4, E.right(3))
    })
  })

  describe('getApplyMonoid', () => {
    const M = _.getApplyMonoid(monoidString)

    it('concat (right)', () => {
      const x = M.concat(_.right('a'), _.right('b'))({})
      return assert.deepStrictEqual(x, E.right('ab'))
    })

    it('concat (left)', () => {
      const x = M.concat(_.right('a'), _.left('b'))({})
      return assert.deepStrictEqual(x, E.left('b'))
    })

    it('empty (right)', () => {
      const x = M.concat(_.right('a'), M.empty)({})
      return assert.deepStrictEqual(x, E.right('a'))
    })

    it('empty (left)', () => {
      const x = M.concat(M.empty, _.right('a'))({})
      return assert.deepStrictEqual(x, E.right('a'))
    })
  })

  it('ask', () => {
    assert.deepStrictEqual(_.ask()({}), E.right({}))
  })

  it('asks', () => {
    assert.deepStrictEqual(_.asks((r: { readonly a: number }) => r.a)({ a: 1 }), E.right(1))
  })

  it('local', () => {
    assert.deepStrictEqual(
      _.local((n: number) => ({ a: n }))((r: { readonly a: number }) => E.right(r.a))(1),
      E.right(1)
    )
  })

  describe('getReaderValidation', () => {
    const RV = _.getReaderValidation(semigroupString)

    it('alt', async () => {
      const e1 = RV.alt(_.right(1), () => _.right(2))(undefined)
      assert.deepStrictEqual(e1, E.right(1))
      const e2 = RV.alt(_.left('a'), () => _.right(2))(undefined)
      assert.deepStrictEqual(e2, E.right(2))
      const e3 = RV.alt(_.right(1), () => _.left('b'))(undefined)
      assert.deepStrictEqual(e3, E.right(1))
      const e4 = RV.alt(_.left('a'), () => _.left('b'))(undefined)
      assert.deepStrictEqual(e4, E.left('ab'))
    })
  })

  it('chainEitherK', () => {
    const f = (s: string) => E.right(s.length)
    const x = pipe(_.right('a'), _.chainEitherK(f))(undefined)
    assert.deepStrictEqual(x, E.right(1))
  })
})
