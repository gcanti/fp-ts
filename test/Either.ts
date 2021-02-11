import * as _ from '../src/Either'
import { identity, pipe } from '../src/function'
import * as N from '../src/number'
import * as O from '../src/Option'
import { separated } from '../src/Separated'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as U from './util'

describe('Either', () => {
  describe('pipeables', () => {
    it('mapLeft', () => {
      U.deepStrictEqual(pipe(_.right('bar'), _.mapLeft(U.double)), _.right('bar'))
      U.deepStrictEqual(pipe(_.left(2), _.mapLeft(U.double)), _.left(4))
    })

    it('alt', () => {
      const assertAlt = (
        a: _.Either<string, number>,
        b: _.Either<string, number>,
        expected: _.Either<string, number>
      ) => {
        U.deepStrictEqual(
          pipe(
            a,
            _.alt(() => b)
          ),
          expected
        )
      }
      assertAlt(_.right(1), _.right(2), _.right(1))
      assertAlt(_.right(1), _.left('b'), _.right(1))
      assertAlt(_.left('a'), _.right(2), _.right(2))
      assertAlt(_.left('a'), _.left('b'), _.left('b'))
    })

    it('map', () => {
      const f = (s: string): number => s.length
      U.deepStrictEqual(pipe(_.right('abc'), _.map(f)), _.right(3))
      U.deepStrictEqual(pipe(_.left('s'), _.map(f)), _.left('s'))
    })

    it('ap', () => {
      const assertAp = (
        a: _.Either<string, number>,
        b: _.Either<string, number>,
        expected: _.Either<string, number>
      ) => {
        U.deepStrictEqual(
          pipe(
            a,
            _.map((a) => (b: number) => a + b),
            _.ap(b)
          ),
          expected
        )
      }
      assertAp(_.right(1), _.right(2), _.right(3))
      assertAp(_.right(1), _.left('b'), _.left('b'))
      assertAp(_.left('a'), _.right(2), _.left('a'))
      assertAp(_.left('a'), _.left('b'), _.left('a'))
    })

    it('apSecond', () => {
      U.deepStrictEqual(pipe(_.right('a'), _.apSecond(_.right(1))), _.right(1))
    })

    it('chain', () => {
      const f = (s: string): _.Either<string, number> => _.right(s.length)
      U.deepStrictEqual(pipe(_.right('abc'), _.chain(f)), _.right(3))
      U.deepStrictEqual(pipe(_.left<string, string>('maError'), _.chain(f)), _.left('maError'))
    })

    it('chainFirst', () => {
      const f = (s: string): _.Either<string, number> => _.right(s.length)
      U.deepStrictEqual(pipe(_.right('abc'), _.chainFirst(f)), _.right('abc'))
      U.deepStrictEqual(pipe(_.left<string, string>('maError'), _.chainFirst(f)), _.left('maError'))
    })

    it('chainFirstW', () => {
      const f = (s: string): _.Either<boolean, number> => _.right(s.length)
      U.deepStrictEqual(pipe(_.right('abc'), _.chainFirstW(f)), _.right('abc'))
      U.deepStrictEqual(pipe(_.left<string, string>('maError'), _.chainFirstW(f)), _.left('maError'))
    })

    it('duplicate', () => {
      U.deepStrictEqual(pipe(_.right('a'), _.duplicate), _.right(_.right('a')))
    })

    it('extend', () => {
      U.deepStrictEqual(
        pipe(
          _.right(1),
          _.extend(() => 2)
        ),
        _.right(2)
      )
      U.deepStrictEqual(
        pipe(
          _.left('err'),
          _.extend(() => 2)
        ),
        _.left('err')
      )
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.right(_.right('a')), _.flatten), _.right('a'))
    })

    it('bimap', () => {
      const f = (s: string): number => s.length
      const g = (n: number): boolean => n > 2
      U.deepStrictEqual(pipe(_.right(1), _.bimap(f, g)), _.right(false))
    })

    it('foldMap', () => {
      U.deepStrictEqual(pipe(_.right('a'), _.foldMap(S.Monoid)(identity)), 'a')
      U.deepStrictEqual(pipe(_.left(1), _.foldMap(S.Monoid)(identity)), '')
    })

    it('reduce', () => {
      U.deepStrictEqual(
        pipe(
          _.right('bar'),
          _.reduce('foo', (b, a) => b + a)
        ),
        'foobar'
      )
      U.deepStrictEqual(
        pipe(
          _.left('bar'),
          _.reduce('foo', (b, a) => b + a)
        ),
        'foo'
      )
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      U.deepStrictEqual(pipe(_.right('a'), _.reduceRight('', f)), 'a')
      U.deepStrictEqual(pipe(_.left(1), _.reduceRight('', f)), '')
    })

    it('traverse', () => {
      const traverse = _.traverse(O.Applicative)((n: number) => (n >= 2 ? O.some(n) : O.none))
      U.deepStrictEqual(pipe(_.left('a'), traverse), O.some(_.left('a')))
      U.deepStrictEqual(pipe(_.right(1), traverse), O.none)
      U.deepStrictEqual(pipe(_.right(3), traverse), O.some(_.right(3)))
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      U.deepStrictEqual(sequence(_.right(O.some(1))), O.some(_.right(1)))
      U.deepStrictEqual(sequence(_.left('a')), O.some(_.left('a')))
      U.deepStrictEqual(sequence(_.right(O.none)), O.none)
    })
  })

  it('match', () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    const match = _.match(f, g)
    U.deepStrictEqual(match(_.left('abc')), 'left3')
    U.deepStrictEqual(match(_.right('abc')), 'right3')
  })

  it('getOrElse', () => {
    U.deepStrictEqual(
      pipe(
        _.right(12),
        _.getOrElse(() => 17)
      ),
      12
    )
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        _.getOrElse(() => 17)
      ),
      17
    )
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        _.getOrElse((l: string) => l.length + 1)
      ),
      2
    )
  })

  it('elem', () => {
    U.deepStrictEqual(pipe(_.left('a'), _.elem(N.Eq)(2)), false)
    U.deepStrictEqual(pipe(_.right(2), _.elem(N.Eq)(2)), true)
    U.deepStrictEqual(pipe(_.right(2), _.elem(N.Eq)(1)), false)
  })

  it('filterOrElse', () => {
    const f = (n: number): boolean => n > 10
    U.deepStrictEqual(
      pipe(
        _.right(12),
        _.filterOrElse(f, () => -1)
      ),
      _.right(12)
    )
    U.deepStrictEqual(
      pipe(
        _.right(7),
        _.filterOrElse(f, () => -1)
      ),
      _.left(-1)
    )
    U.deepStrictEqual(
      pipe(
        _.left(12),
        _.filterOrElse(f, () => -1)
      ),
      _.left(12)
    )
    U.deepStrictEqual(
      pipe(
        _.right(7),
        _.filterOrElse(f, (n) => `invalid ${n}`)
      ),
      _.left('invalid 7')
    )

    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const errorHandler = (s: string) => `invalid color ${s}`

    U.deepStrictEqual(pipe(_.right('red'), _.filterOrElse(isColor, errorHandler)), _.right('red'))
    U.deepStrictEqual(pipe(_.right('foo'), _.filterOrElse(isColor, errorHandler)), _.left('invalid color foo'))
    U.deepStrictEqual(pipe(_.left('err'), _.filterOrElse(isColor, errorHandler)), _.left('err'))
  })

  it('isLeft', () => {
    U.deepStrictEqual(_.isLeft(_.right(1)), false)
    U.deepStrictEqual(_.isLeft(_.left(1)), true)
  })

  it('isRight', () => {
    U.deepStrictEqual(_.isRight(_.right(1)), true)
    U.deepStrictEqual(_.isRight(_.left(1)), false)
  })

  it('orElse', () => {
    U.deepStrictEqual(
      pipe(
        _.right(1),
        _.orElse(() => _.right(2))
      ),
      _.right(1)
    )
    U.deepStrictEqual(
      pipe(
        _.right(1),
        _.orElse(() => _.left('foo'))
      ),
      _.right(1)
    )
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        _.orElse(() => _.right(1))
      ),
      _.right(1)
    )
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        _.orElse(() => _.left('b'))
      ),
      _.left('b')
    )
  })

  it('swap', () => {
    U.deepStrictEqual(_.swap(_.right('a')), _.left('a'))
    U.deepStrictEqual(_.swap(_.left('b')), _.right('b'))
  })

  it('fromPredicate', () => {
    const f = _.fromPredicate((n: number) => n >= 2)
    U.deepStrictEqual(f(3), _.right(3))
    U.deepStrictEqual(f(1), _.left(1))
  })

  it('fromNullable', () => {
    U.deepStrictEqual(_.fromNullable(() => 'default')(null), _.left('default'))
    U.deepStrictEqual(_.fromNullable(() => 'default')(undefined), _.left('default'))
    U.deepStrictEqual(_.fromNullable(() => 'default')(1), _.right(1))
  })

  it('tryCatch', () => {
    U.deepStrictEqual(
      _.tryCatch(() => {
        return 1
      }),
      _.right(1)
    )

    U.deepStrictEqual(
      _.tryCatch(() => {
        // tslint:disable-next-line: no-string-throw
        throw 'string error'
      }),
      _.left('string error')
    )
  })

  describe('getEq', () => {
    it('equals', () => {
      const equals = _.getEq(S.Eq, N.Eq).equals
      U.deepStrictEqual(equals(_.right(1))(_.right(1)), true)
      U.deepStrictEqual(equals(_.right(1))(_.right(2)), false)
      U.deepStrictEqual(equals(_.right(1))(_.left('foo')), false)
      U.deepStrictEqual(equals(_.left('foo'))(_.left('foo')), true)
      U.deepStrictEqual(equals(_.left('foo'))(_.left('bar')), false)
      U.deepStrictEqual(equals(_.left('foo'))(_.right(1)), false)
    })
  })

  describe('getCompactable', () => {
    const C = _.getCompactable(S.Monoid)
    it('compact', () => {
      U.deepStrictEqual(C.compact(_.left('1')), _.left('1'))
      U.deepStrictEqual(C.compact(_.right(O.none)), _.left(S.Monoid.empty))
      U.deepStrictEqual(C.compact(_.right(O.some(123))), _.right(123))
    })

    it('separate', () => {
      U.deepStrictEqual(C.separate(_.left('123')), separated(_.left('123'), _.left('123')))
      U.deepStrictEqual(C.separate(_.right(_.left('123'))), separated(_.right('123'), _.left(S.Monoid.empty)))
      U.deepStrictEqual(C.separate(_.right(_.right('123'))), separated(_.left(S.Monoid.empty), _.right('123')))
    })
  })

  describe('getFilterable', () => {
    const F = _.getFilterable(S.Monoid)
    const p = (n: number) => n > 2

    it('partition', () => {
      U.deepStrictEqual(pipe(_.left('123'), F.partition(p)), separated(_.left('123'), _.left('123')))
      U.deepStrictEqual(pipe(_.right(1), F.partition(p)), separated(_.right(1), _.left(S.Monoid.empty)))
      U.deepStrictEqual(pipe(_.right(3), F.partition(p)), separated(_.left(S.Monoid.empty), _.right(3)))
    })

    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? _.right(n + 1) : _.left(n - 1))
      U.deepStrictEqual(pipe(_.left('123'), F.partitionMap(f)), separated(_.left('123'), _.left('123')))
      U.deepStrictEqual(pipe(_.right(1), F.partitionMap(f)), separated(_.right(0), _.left(S.Monoid.empty)))
      U.deepStrictEqual(pipe(_.right(3), F.partitionMap(f)), separated(_.left(S.Monoid.empty), _.right(4)))
    })

    it('filter', () => {
      U.deepStrictEqual(pipe(_.left('123'), F.filter(p)), _.left('123'))
      U.deepStrictEqual(pipe(_.right(1), F.filter(p)), _.left(S.Monoid.empty))
      U.deepStrictEqual(pipe(_.right(3), F.filter(p)), _.right(3))
    })

    it('filterMap', () => {
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(pipe(_.left('123'), F.filterMap(f)), _.left('123'))
      U.deepStrictEqual(pipe(_.right(1), F.filterMap(f)), _.left(S.Monoid.empty))
      U.deepStrictEqual(pipe(_.right(3), F.filterMap(f)), _.right(4))
    })
  })

  describe('getWitherable', () => {
    const W = _.getWitherable(S.Monoid)
    const p = (n: number) => n > 2

    it('wither', async () => {
      const wither = W.wither(T.ApplicativePar)
      const f = (n: number) => T.of(p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(await pipe(_.left('foo'), wither(f))(), _.left('foo'))
      U.deepStrictEqual(await pipe(_.right(1), wither(f))(), _.left(S.Monoid.empty))
      U.deepStrictEqual(await pipe(_.right(3), wither(f))(), _.right(4))
    })

    it('wilt', async () => {
      const wilt = W.wilt(T.ApplicativePar)
      const f = (n: number) => T.of(p(n) ? _.right(n + 1) : _.left(n - 1))
      U.deepStrictEqual(await pipe(_.left('foo'), wilt(f))(), separated(_.left('foo'), _.left('foo')))
      U.deepStrictEqual(await pipe(_.right(1), wilt(f))(), separated(_.right(0), _.left(S.Monoid.empty)))
      U.deepStrictEqual(await pipe(_.right(3), wilt(f))(), separated(_.left(S.Monoid.empty), _.right(4)))
    })
  })

  it('getSemigroup', () => {
    const S = _.getSemigroup(N.SemigroupSum)
    U.deepStrictEqual(pipe(_.left('a'), S.concat(_.left('b'))), _.left('a'))
    U.deepStrictEqual(pipe(_.left('a'), S.concat(_.right(2))), _.right(2))
    U.deepStrictEqual(pipe(_.right(1), S.concat(_.left('b'))), _.right(1))
    U.deepStrictEqual(pipe(_.right(1), S.concat(_.right(2))), _.right(3))
  })

  describe('getShow', () => {
    it('show', () => {
      const Sh = _.getShow(S.Show, S.Show)
      U.deepStrictEqual(Sh.show(_.left('a')), `left("a")`)
      U.deepStrictEqual(Sh.show(_.right('a')), `right("a")`)
    })
  })

  it('getApplicativeValidation', () => {
    const A = _.getApplicativeValidation(S.Monoid)

    const apT = <B>(fb: _.Either<string, B>) => <A extends ReadonlyArray<unknown>>(
      fas: _.Either<string, A>
    ): _.Either<string, readonly [...A, B]> =>
      pipe(
        fas,
        _.map((a) => (b: B): readonly [...A, B] => [...a, b]),
        A.ap(fb)
      )

    U.deepStrictEqual(pipe(_.left('a'), apT(_.left('b'))), _.left('ab'))
    U.deepStrictEqual(pipe(_.right([1]), apT(_.left('b'))), _.left('b'))
    U.deepStrictEqual(pipe(_.right([1]), apT(_.right(2))), _.right([1, 2]))
  })

  it('getAltValidation', () => {
    const A = _.getAltValidation(S.Monoid)
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        A.alt(() => _.left('b'))
      ),
      _.left('ab')
    )
    U.deepStrictEqual(
      pipe(
        _.right(1),
        A.alt(() => _.left('b'))
      ),
      _.right(1)
    )
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        A.alt(() => _.right(2))
      ),
      _.right(2)
    )
  })

  it('fromOption', () => {
    U.deepStrictEqual(_.fromOption(() => 'none')(O.none), _.left('none'))
    U.deepStrictEqual(_.fromOption(() => 'none')(O.some(1)), _.right(1))
  })

  it('fromOptionK', () => {
    const f = _.fromOptionK(() => 'a')((n: number) => (n > 0 ? O.some(n) : O.none))
    U.deepStrictEqual(f(1), _.right(1))
    U.deepStrictEqual(f(-1), _.left('a'))
  })

  it('chainOptionK', () => {
    const f = _.chainOptionK(() => 'a')((n: number) => (n > 0 ? O.some(n) : O.none))
    U.deepStrictEqual(f(_.right(1)), _.right(1))
    U.deepStrictEqual(f(_.right(-1)), _.left('a'))
    U.deepStrictEqual(f(_.left('b')), _.left('b'))
  })

  it('exists', () => {
    const gt2 = _.exists((n: number) => n > 2)
    U.deepStrictEqual(gt2(_.left('a')), false)
    U.deepStrictEqual(gt2(_.right(1)), false)
    U.deepStrictEqual(gt2(_.right(3)), true)
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.right<number, string>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      ),
      _.right({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(
      pipe(_.right<number, string>(1), _.bindTo('a'), _.apS('b', _.right('b'))),
      _.right({ a: 1, b: 'b' })
    )
  })

  it('apT', () => {
    U.deepStrictEqual(pipe(_.right<number, string>(1), _.tupled, _.apT(_.right('b'))), _.right([1, 'b'] as const))
  })

  it('fromNullableK', () => {
    const f = _.fromNullableK(() => 'error')((n: number) => (n > 0 ? n : null))
    U.deepStrictEqual(f(1), _.right(1))
    U.deepStrictEqual(f(-1), _.left('error'))
  })

  it('chainNullableK', () => {
    const f = _.chainNullableK(() => 'error')((n: number) => (n > 0 ? n : null))
    U.deepStrictEqual(f(_.right(1)), _.right(1))
    U.deepStrictEqual(f(_.right(-1)), _.left('error'))
    U.deepStrictEqual(f(_.left('a')), _.left('a'))
  })

  it('chainNullableK', () => {
    const f = _.chainNullableK(() => 'error')((n: number) => (n > 0 ? n : null))
    U.deepStrictEqual(f(_.right(1)), _.right(1))
    U.deepStrictEqual(f(_.right(-1)), _.left('error'))
    U.deepStrictEqual(f(_.left('a')), _.left('a'))
  })

  it('sequenceReadonlyArray', () => {
    U.deepStrictEqual(pipe([_.right(1), _.right(2)], _.sequenceReadonlyArray), _.right([1, 2]))
    U.deepStrictEqual(pipe([_.right(1), _.left('a')], _.sequenceReadonlyArray), _.left('a'))
  })

  it('toUnion', () => {
    U.deepStrictEqual(_.toUnion(_.right(1)), 1)
    U.deepStrictEqual(_.toUnion(_.left('a')), 'a')
  })

  it('tryCatchK', () => {
    const f = _.tryCatchK((s: string) => {
      const len = s.length
      if (len > 0) {
        return len
      }
      throw new Error('empty string')
    }, identity)
    U.deepStrictEqual(f('a'), _.right(1))
    U.deepStrictEqual(f(''), _.left(new Error('empty string')))
  })

  it('chainRec', () => {
    const chainRec = _.chainRec
    U.deepStrictEqual(
      pipe(
        1,
        chainRec(() => _.left('a'))
      ),
      _.left('a')
    )
    U.deepStrictEqual(
      pipe(
        1,
        chainRec(() => _.right(_.right(1)))
      ),
      _.right(1)
    )
    U.deepStrictEqual(
      pipe(
        1,
        chainRec((a) => {
          if (a < 5) {
            return _.right(_.left(a + 1))
          } else {
            return _.right(_.right(a))
          }
        })
      ),
      _.right(5)
    )
  })
})
