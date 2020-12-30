import * as assert from 'assert'
import * as E from '../src/Either'
import { pipe } from '../src/function'
import { monoidString } from '../src/Monoid'
import { none, some } from '../src/Option'
import * as R from '../src/Reader'
import * as _ from '../src/ReaderEither'
import * as A from '../src/ReadonlyArray'
import { semigroupSum } from '../src/Semigroup'

describe('ReaderEither', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number) => n * 2
      assert.deepStrictEqual(pipe(_.right(1), _.map(double))({}), E.right(2))
    })

    it('alt', () => {
      assert.deepStrictEqual(
        pipe(
          _.right('a'),
          _.alt(() => _.right('b'))
        )({}),
        E.right('a')
      )
      assert.deepStrictEqual(
        pipe(
          _.left(1),
          _.alt(() => _.right('b'))
        )({}),
        E.right('b')
      )
    })

    it('ap', () => {
      const double = (n: number) => n * 2
      assert.deepStrictEqual(pipe(_.right(double), _.ap(_.right(1)))({}), E.right(2))
    })

    it('apFirst', () => {
      assert.deepStrictEqual(pipe(_.right('a'), _.apFirst(_.right('b')))({}), E.right('a'))
    })

    it('apSecond', () => {
      assert.deepStrictEqual(pipe(_.right('a'), _.apSecond(_.right('b')))({}), E.right('b'))
    })

    it('chainFirst', () => {
      const f = (n: number) => _.right(n * 2)
      assert.deepStrictEqual(pipe(_.right(1), _.chainFirst(f))({}), E.right(1))
    })

    it('chainFirstW', () => {
      const f = (n: number): _.ReaderEither<unknown, boolean, number> => _.right(n * 2)
      assert.deepStrictEqual(pipe(_.right<number, unknown, string>(1), _.chainFirstW(f))({}), E.right(1))
    })

    it('flatten', () => {
      assert.deepStrictEqual(pipe(_.right(_.right('a')), _.flatten)({}), E.right('a'))
    })

    it('mapLeft', () => {
      const len = (s: string) => s.length
      assert.deepStrictEqual(pipe(_.right(1), _.mapLeft(len))({}), E.right(1))
      assert.deepStrictEqual(pipe(_.left('aa'), _.mapLeft(len))({}), E.left(2))
    })

    it('bimap', () => {
      const double = (n: number) => n * 2
      const len = (s: string) => s.length
      assert.deepStrictEqual(pipe(_.right(1), _.bimap(len, double))({}), E.right(2))
      assert.deepStrictEqual(pipe(_.left('aaa'), _.bimap(len, double))({}), E.left(3))
    })

    it('fromOption', () => {
      assert.deepStrictEqual(
        pipe(
          none,
          _.fromOption(() => 'none')
        )({}),
        E.left('none')
      )
      assert.deepStrictEqual(
        pipe(
          some(1),
          _.fromOption(() => 'none')
        )({}),
        E.right(1)
      )
    })

    it('fromPredicate', () => {
      const f = _.fromPredicate((n: number) => n >= 2)
      assert.deepStrictEqual(f(3)({}), E.right(3))
      assert.deepStrictEqual(f(1)({}), E.left(1))
    })

    it('filterOrElse', () => {
      const e1 = pipe(
        _.right(12),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )({})
      assert.deepStrictEqual(e1, E.right(12))
      const e2 = pipe(
        _.right(7),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )({})
      assert.deepStrictEqual(e2, E.left('a'))
    })
  })

  it('fold', () => {
    const fold = _.fold(
      (s: string) => R.of(s.length),
      (n: number) => R.of(n * 2)
    )
    assert.deepStrictEqual(fold(_.right(1))({}), 2)
    assert.deepStrictEqual(fold(_.left('aaa'))({}), 3)
  })

  it('getOrElse', () => {
    const getOrElse = _.getOrElse((s: string) => R.of(s.length))
    assert.deepStrictEqual(getOrElse(_.right(1))({}), 1)
    assert.deepStrictEqual(getOrElse(_.left('aaa'))({}), 3)
  })

  it('orElse', () => {
    const orElse = _.orElse((s: string) => (s.length > 2 ? _.right(1) : _.left(2)))
    assert.deepStrictEqual(orElse(_.right(1))({}), E.right(1))
  })

  describe('getSemigroup', () => {
    it('concat', () => {
      const S = _.getSemigroup(semigroupSum)
      assert.deepStrictEqual(pipe(_.left('a'), S.concat(_.left('b')))({}), E.left('a'))
      assert.deepStrictEqual(pipe(_.left('a'), S.concat(_.right(2)))({}), E.right(2))
      assert.deepStrictEqual(pipe(_.right(1), S.concat(_.left('b')))({}), E.right(1))
      assert.deepStrictEqual(pipe(_.right(1), S.concat(_.right(2)))({}), E.right(3))
    })
  })

  describe('getApplyMonoid', () => {
    const M = _.getApplyMonoid(monoidString)
    assert.deepStrictEqual(pipe(_.right('a'), M.concat(_.right('b')))({}), E.right('ab'))
    assert.deepStrictEqual(pipe(_.right('a'), M.concat(_.left('b')))({}), E.left('b'))
    assert.deepStrictEqual(pipe(_.right('a'), M.concat(M.empty))({}), E.right('a'))
    assert.deepStrictEqual(pipe(M.empty, M.concat(_.right('a')))({}), E.right('a'))
  })

  it('ask', () => {
    assert.deepStrictEqual(_.ask()({}), E.right({}))
  })

  it('asks', () => {
    assert.deepStrictEqual(_.asks((r: { readonly a: number }) => r.a)({ a: 1 }), E.right(1))
  })

  it('getApplicativeReaderValidation', () => {
    const A = _.getApplicativeReaderValidation(monoidString)
    const tuple = <A>(a: A) => <B>(b: B): readonly [A, B] => [a, b]
    assert.deepStrictEqual(pipe(_.left('a'), A.map(tuple), A.ap(_.left('b')))(null), E.left('ab'))
  })

  it('getAltReaderValidation', () => {
    const A = _.getAltReaderValidation(monoidString)
    assert.deepStrictEqual(
      pipe(
        _.left('a'),
        A.alt(() => _.left('b'))
      )(null),
      E.left('ab')
    )
  })

  it('chainEitherK', () => {
    const f = (s: string) => (s.length === 1 ? E.right(s.length) : E.left('b'))
    assert.deepStrictEqual(pipe(_.right('a'), _.chainEitherK(f))({}), E.right(1))
    assert.deepStrictEqual(pipe(_.right('aa'), _.chainEitherK(f))({}), E.left('b'))
  })

  it('do notation', () => {
    assert.deepStrictEqual(
      pipe(
        _.right<number, void, string>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(undefined),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    assert.deepStrictEqual(
      pipe(_.right<number, void, string>(1), _.bindTo('a'), _.apS('b', _.right('b')))(undefined),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apT', () => {
    assert.deepStrictEqual(pipe(_.right<number, {}, string>(1), _.tupled, _.apT(_.right('b')))({}), E.right([1, 'b']))
  })

  describe('array utils', () => {
    it('sequenceReadonlyArray', () => {
      const arr = A.range(1, 10)
      assert.deepStrictEqual(pipe(arr, A.map(_.of), _.sequenceReadonlyArray)({}), E.right(arr))
    })

    it('traverseReadonlyArray', () => {
      const arr = A.range(1, 10)
      assert.deepStrictEqual(pipe(arr, _.traverseReadonlyArray(_.of))({}), E.right(arr))
    })

    it('traverseReadonlyArrayWithIndex', () => {
      const arr = A.replicate(3, 1)
      assert.deepStrictEqual(
        pipe(
          arr,
          _.traverseReadonlyArrayWithIndex((index, _data) => _.of(index))
        )({}),
        E.right([0, 1, 2])
      )
    })
  })
})
