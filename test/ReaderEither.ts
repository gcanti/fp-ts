import * as U from './util'
import * as Apply from '../src/Apply'
import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as O from '../src/Option'
import * as R from '../src/Reader'
import * as _ from '../src/ReaderEither'
import * as S from '../src/string'
import * as N from '../src/number'
import { left, right } from '../src/Separated'

describe('ReaderEither', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number) => n * 2
      U.deepStrictEqual(pipe(_.right(1), _.map(double))({}), E.right(2))
    })

    it('alt', () => {
      U.deepStrictEqual(
        pipe(
          _.right('a'),
          _.alt(() => _.right('b'))
        )({}),
        E.right('a')
      )
      U.deepStrictEqual(
        pipe(
          _.left(1),
          _.alt(() => _.right('b'))
        )({}),
        E.right('b')
      )
    })

    it('ap', () => {
      const double = (n: number) => n * 2
      U.deepStrictEqual(pipe(_.right(double), _.ap(_.right(1)))({}), E.right(2))
    })

    it('apFirst', () => {
      U.deepStrictEqual(pipe(_.right('a'), _.apFirst(_.right('b')))({}), E.right('a'))
    })

    it('apSecond', () => {
      U.deepStrictEqual(pipe(_.right('a'), _.apSecond(_.right('b')))({}), E.right('b'))
    })

    it('chainFirst', () => {
      const f = (n: number) => _.right(n * 2)
      U.deepStrictEqual(pipe(_.right(1), _.chainFirst(f))({}), E.right(1))
    })

    it('chainFirstW', () => {
      const f = (n: number) => _.right<unknown, boolean, number>(n * 2)
      U.deepStrictEqual(pipe(_.right<unknown, string, number>(1), _.chainFirstW(f))({}), E.right(1))
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.right(_.right('a')), _.flatten)({}), E.right('a'))
    })

    it('mapLeft', () => {
      const len = (s: string) => s.length
      U.deepStrictEqual(pipe(_.right(1), _.mapLeft(len))({}), E.right(1))
      U.deepStrictEqual(pipe(_.left('aa'), _.mapLeft(len))({}), E.left(2))
    })

    it('bimap', () => {
      const double = (n: number) => n * 2
      const len = (s: string) => s.length
      U.deepStrictEqual(pipe(_.right(1), _.bimap(len, double))({}), E.right(2))
      U.deepStrictEqual(pipe(_.left('aaa'), _.bimap(len, double))({}), E.left(3))
    })

    it('fromOption', () => {
      U.deepStrictEqual(
        pipe(
          O.none,
          _.fromOption(() => 'none')
        )({}),
        E.left('none')
      )
      U.deepStrictEqual(
        pipe(
          O.some(1),
          _.fromOption(() => 'none')
        )({}),
        E.right(1)
      )
    })

    it('fromPredicate', () => {
      const gt2 = _.fromPredicate(
        (n: number) => n >= 2,
        (n) => `Invalid number ${n}`
      )
      U.deepStrictEqual(gt2(3)({}), E.right(3))
      U.deepStrictEqual(gt2(1)({}), E.left('Invalid number 1'))
    })

    it('filterOrElse', () => {
      const e1 = pipe(
        _.right(12),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )({})
      U.deepStrictEqual(e1, E.right(12))
      const e2 = pipe(
        _.right(7),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )({})
      U.deepStrictEqual(e2, E.left('a'))
    })
  })

  it('fold', () => {
    const fold = _.fold(
      (s: string) => R.of(s.length),
      (n: number) => R.of(n * 2)
    )
    U.deepStrictEqual(fold(_.right(1))({}), 2)
    U.deepStrictEqual(fold(_.left('aaa'))({}), 3)
  })

  it('getOrElse', () => {
    const getOrElse = _.getOrElse((s: string) => R.of(s.length))
    U.deepStrictEqual(getOrElse(_.right(1))({}), 1)
    U.deepStrictEqual(getOrElse(_.left('aaa'))({}), 3)
  })

  it('orElse', () => {
    const orElse = _.orElse((s: string) => (s.length > 2 ? _.right(1) : _.left(2)))
    U.deepStrictEqual(orElse(_.right(1))({}), E.right(1))
  })

  describe('getSemigroup', () => {
    it('concat', () => {
      // tslint:disable-next-line: deprecation
      const S = _.getSemigroup(N.SemigroupSum)
      const e1 = S.concat(_.left('a'), _.left('b'))({})
      U.deepStrictEqual(e1, E.left('a'))

      const e2 = S.concat(_.left('a'), _.right(2))({})
      U.deepStrictEqual(e2, E.right(2))

      const e3 = S.concat(_.right(1), _.left('b'))({})
      U.deepStrictEqual(e3, E.right(1))

      const e4 = S.concat(_.right(1), _.right(2))({})
      U.deepStrictEqual(e4, E.right(3))
    })
  })

  describe('getApplyMonoid', () => {
    // tslint:disable-next-line: deprecation
    const M = _.getApplyMonoid(S.Monoid)

    it('concat (right)', () => {
      const x = M.concat(_.right('a'), _.right('b'))({})
      return U.deepStrictEqual(x, E.right('ab'))
    })

    it('concat (left)', () => {
      const x = M.concat(_.right('a'), _.left('b'))({})
      return U.deepStrictEqual(x, E.left('b'))
    })

    it('empty (right)', () => {
      const x = M.concat(_.right('a'), M.empty)({})
      return U.deepStrictEqual(x, E.right('a'))
    })

    it('empty (left)', () => {
      const x = M.concat(M.empty, _.right('a'))({})
      return U.deepStrictEqual(x, E.right('a'))
    })
  })

  it('ask', () => {
    U.deepStrictEqual(_.ask()({}), E.right({}))
  })

  it('asks', () => {
    U.deepStrictEqual(_.asks((r: { readonly a: number }) => r.a)({ a: 1 }), E.right(1))
  })

  it('local', () => {
    U.deepStrictEqual(
      // tslint:disable-next-line: deprecation
      _.local((n: number) => ({ a: n }))((r: { readonly a: number }) => E.right(r.a))(1),
      E.right(1)
    )
  })

  it('getApplicativeReaderValidation', () => {
    const A = _.getApplicativeReaderValidation(S.Monoid)
    U.deepStrictEqual(Apply.sequenceT(A)(_.left('a'), _.left('b'))(null), E.left('ab'))
    // tslint:disable-next-line: deprecation
    const AV = _.getReaderValidation(S.Monoid)
    U.deepStrictEqual(Apply.sequenceT(AV)(_.left('a'), _.left('b'))(null), E.left('ab'))
  })

  it('getAltReaderValidation', () => {
    const A = _.getAltReaderValidation(S.Monoid)
    U.deepStrictEqual(A.alt(_.left('a'), () => _.left('b'))(null), E.left('ab'))
    // tslint:disable-next-line: deprecation
    const AV = _.getReaderValidation(S.Monoid)
    U.deepStrictEqual(AV.alt(_.left('a'), () => _.left('b'))(null), E.left('ab'))
  })

  it('chainEitherK', () => {
    const f = (s: string) => (s.length === 1 ? E.right(s.length) : E.left('b'))
    U.deepStrictEqual(pipe(_.right('a'), _.chainEitherK(f))({}), E.right(1))
    U.deepStrictEqual(pipe(_.right('aa'), _.chainEitherK(f))({}), E.left('b'))
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.right<void, string, number>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(undefined),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(
      pipe(_.right<void, string, number>(1), _.bindTo('a'), _.apS('b', _.right('b')))(undefined),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('sequenceArray', () => {
    U.deepStrictEqual(pipe([_.right(1), _.right(2)], _.sequenceArray)(undefined), E.right([1, 2]))
    U.deepStrictEqual(pipe([_.right(1), _.left('a')], _.sequenceArray)(undefined), E.left('a'))
  })

  it('getCompactable', () => {
    const C = _.getCompactable(S.Monoid)
    U.deepStrictEqual(C.compact(_.of(O.some('a')))({}), E.right('a'))
  })

  it('getFilterable', () => {
    const F = _.getFilterable(S.Monoid)
    U.deepStrictEqual(F.filter(_.of('a'), (s) => s.length > 0)({}), E.right('a'))
    U.deepStrictEqual(F.filterMap(_.of('a'), (s) => (s.length > 0 ? O.some(s.length) : O.none))({}), E.right(1))
    const s1 = F.partition(_.of('a'), (s) => s.length > 0)
    U.deepStrictEqual(left(s1)({}), E.left(''))
    U.deepStrictEqual(right(s1)({}), E.right('a'))
    const s2 = F.partitionMap(_.of('a'), (s) => (s.length > 0 ? E.right(s.length) : E.left(s)))
    U.deepStrictEqual(left(s2)({}), E.left(''))
    U.deepStrictEqual(right(s2)({}), E.right(1))
  })
})
