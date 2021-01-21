import * as E from '../src/Either'
import { pipe } from '../src/function'
import { monoidString } from '../src/Monoid'
import * as O from '../src/Option'
import * as R from '../src/Reader'
import * as _ from '../src/ReaderEither'
import * as A from '../src/ReadonlyArray'
import { deepStrictEqual } from './util'

describe('ReaderEither', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number) => n * 2
      deepStrictEqual(pipe(_.right(1), _.map(double))({}), E.right(2))
    })

    it('alt', () => {
      const assertAlt = (
        a: _.ReaderEither<null, string, number>,
        b: _.ReaderEither<null, string, number>,
        expected: E.Either<string, number>
      ) => {
        deepStrictEqual(
          pipe(
            a,
            _.alt(() => b)
          )(null),
          expected
        )
      }
      assertAlt(_.right(1), _.right(2), E.right(1))
      assertAlt(_.right(1), _.left('b'), E.right(1))
      assertAlt(_.left('a'), _.right(2), E.right(2))
      assertAlt(_.left('a'), _.left('b'), E.left('b'))
    })

    it('ap', () => {
      const double = (n: number) => n * 2
      deepStrictEqual(pipe(_.right(double), _.ap(_.right(1)))({}), E.right(2))
    })

    it('apFirst', () => {
      deepStrictEqual(pipe(_.right('a'), _.apFirst(_.right('b')))({}), E.right('a'))
    })

    it('apSecond', () => {
      deepStrictEqual(pipe(_.right('a'), _.apSecond(_.right('b')))({}), E.right('b'))
    })

    it('chainFirst', () => {
      const f = (n: number) => _.right(n * 2)
      deepStrictEqual(pipe(_.right(1), _.chainFirst(f))({}), E.right(1))
    })

    it('chainFirstW', () => {
      const f = (n: number): _.ReaderEither<unknown, boolean, number> => _.right(n * 2)
      deepStrictEqual(pipe(_.right<number, unknown, string>(1), _.chainFirstW(f))({}), E.right(1))
    })

    it('flatten', () => {
      deepStrictEqual(pipe(_.right(_.right('a')), _.flatten)({}), E.right('a'))
    })

    it('mapLeft', () => {
      const len = (s: string) => s.length
      deepStrictEqual(pipe(_.right(1), _.mapLeft(len))({}), E.right(1))
      deepStrictEqual(pipe(_.left('aa'), _.mapLeft(len))({}), E.left(2))
    })

    it('bimap', () => {
      const double = (n: number) => n * 2
      const len = (s: string) => s.length
      deepStrictEqual(pipe(_.right(1), _.bimap(len, double))({}), E.right(2))
      deepStrictEqual(pipe(_.left('aaa'), _.bimap(len, double))({}), E.left(3))
    })

    it('fromOption', () => {
      deepStrictEqual(
        pipe(
          O.none,
          _.fromOption(() => 'none')
        )({}),
        E.left('none')
      )
      deepStrictEqual(
        pipe(
          O.some(1),
          _.fromOption(() => 'none')
        )({}),
        E.right(1)
      )
    })

    it('fromPredicate', () => {
      const f = _.fromPredicate((n: number) => n >= 2)
      deepStrictEqual(f(3)({}), E.right(3))
      deepStrictEqual(f(1)({}), E.left(1))
    })

    it('filterOrElse', () => {
      const e1 = pipe(
        _.right(12),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )({})
      deepStrictEqual(e1, E.right(12))
      const e2 = pipe(
        _.right(7),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )({})
      deepStrictEqual(e2, E.left('a'))
    })
  })

  it('fold', () => {
    const fold = _.fold(
      (s: string) => R.of(s.length),
      (n: number) => R.of(n * 2)
    )
    deepStrictEqual(fold(_.right(1))({}), 2)
    deepStrictEqual(fold(_.left('aaa'))({}), 3)
  })

  it('getOrElse', () => {
    const getOrElse = _.getOrElse((s: string) => R.of(s.length))
    deepStrictEqual(getOrElse(_.right(1))({}), 1)
    deepStrictEqual(getOrElse(_.left('aaa'))({}), 3)
  })

  it('orElse', () => {
    const orElse = _.orElse((s: string) => (s.length > 2 ? _.right(1) : _.left(2)))
    deepStrictEqual(orElse(_.right(1))({}), E.right(1))
  })

  it('ask', () => {
    deepStrictEqual(_.ask()({}), E.right({}))
  })

  it('asks', () => {
    deepStrictEqual(_.asks((r: { readonly a: number }) => r.a)({ a: 1 }), E.right(1))
  })

  it('getApplicativeReaderValidation', () => {
    const A = _.getApplicativeReaderValidation(monoidString)
    const tuple = <A>(a: A) => <B>(b: B): readonly [A, B] => [a, b]
    deepStrictEqual(pipe(_.left('a'), A.map(tuple), A.ap(_.left('b')))(null), E.left('ab'))
  })

  it('getAltReaderValidation', () => {
    const A = _.getAltReaderValidation(monoidString)
    deepStrictEqual(
      pipe(
        _.left('a'),
        A.alt(() => _.left('b'))
      )(null),
      E.left('ab')
    )
  })

  it('chainEitherK', () => {
    const f = (s: string) => (s.length === 1 ? E.right(s.length) : E.left('b'))
    deepStrictEqual(pipe(_.right('a'), _.chainEitherK(f))({}), E.right(1))
    deepStrictEqual(pipe(_.right('aa'), _.chainEitherK(f))({}), E.left('b'))
  })

  it('do notation', () => {
    deepStrictEqual(
      pipe(
        _.right<number, void, string>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(undefined),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    deepStrictEqual(
      pipe(_.right<number, void, string>(1), _.bindTo('a'), _.apS('b', _.right('b')))(undefined),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apT', () => {
    deepStrictEqual(pipe(_.right<number, {}, string>(1), _.tupled, _.apT(_.right('b')))({}), E.right([1, 'b'] as const))
  })

  describe('array utils', () => {
    it('sequenceReadonlyArray', () => {
      const arr = A.range(1, 10)
      deepStrictEqual(pipe(arr, A.map(_.of), _.sequenceReadonlyArray)({}), E.right(arr))
    })

    it('traverseReadonlyArray', () => {
      const arr = A.range(1, 10)
      deepStrictEqual(pipe(arr, _.traverseReadonlyArray(_.of))({}), E.right(arr))
    })

    it('traverseReadonlyArrayWithIndex', () => {
      const arr = A.replicate(3, 1)
      deepStrictEqual(
        pipe(
          arr,
          _.traverseReadonlyArrayWithIndex((index, _data) => _.of(index))
        )({}),
        E.right([0, 1, 2])
      )
    })
  })

  it('getCompactable', () => {
    const C = _.getCompactable(monoidString)
    deepStrictEqual(C.compact(_.of(O.some('a')))({}), E.right('a'))
  })

  it('getFilterable', () => {
    const F = _.getFilterable(monoidString)
    const fa: _.ReaderEither<unknown, string, string> = _.of('a')
    deepStrictEqual(
      pipe(
        fa,
        F.filter((s) => s.length > 0)
      )({}),
      E.right('a')
    )
    deepStrictEqual(
      pipe(
        fa,
        F.filterMap((s) => (s.length > 0 ? O.some(s.length) : O.none))
      )({}),
      E.right(1)
    )
    const { left: left1, right: right1 } = pipe(
      fa,
      F.partition((s) => s.length > 0)
    )
    deepStrictEqual(left1({}), E.left(''))
    deepStrictEqual(right1({}), E.right('a'))
    const { left: left2, right: right2 } = pipe(
      fa,
      F.partitionMap((s) => (s.length > 0 ? E.right(s.length) : E.left(s)))
    )
    deepStrictEqual(left2({}), E.left(''))
    deepStrictEqual(right2({}), E.right(1))
  })
})
