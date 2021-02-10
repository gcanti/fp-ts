import * as U from './util'
import { sequenceT } from '../src/Apply'
import * as _ from '../src/Either'
import { identity, pipe } from '../src/function'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as S from '../src/string'
import * as T from '../src/Task'
import { separated } from '../src/Separated'

describe('Either', () => {
  describe('pipeables', () => {
    it('mapLeft', () => {
      const double = (n: number): number => n * 2
      U.deepStrictEqual(pipe(_.right('bar'), _.mapLeft(double)), _.right('bar'))
      U.deepStrictEqual(pipe(_.left(2), _.mapLeft(double)), _.left(4))
    })

    it('alt', () => {
      U.deepStrictEqual(
        pipe(
          _.right(1),
          _.alt(() => _.right(2))
        ),
        _.right(1)
      )
      U.deepStrictEqual(
        pipe(
          _.right(1),
          _.alt(() => _.left('a'))
        ),
        _.right(1)
      )
      U.deepStrictEqual(
        pipe(
          _.left('a'),
          _.alt(() => _.right(2))
        ),
        _.right(2)
      )
      U.deepStrictEqual(
        pipe(
          _.left('a'),
          _.alt(() => _.left('b'))
        ),
        _.left('b')
      )
    })

    it('map', () => {
      const f = (s: string): number => s.length
      U.deepStrictEqual(pipe(_.right('abc'), _.map(f)), _.right(3))
      U.deepStrictEqual(pipe(_.left('s'), _.map(f)), _.left('s'))
    })

    it('ap', () => {
      const f = (s: string): number => s.length
      U.deepStrictEqual(pipe(_.right(f), _.ap(_.right('abc'))), _.right(3))
      U.deepStrictEqual(pipe(_.right(f), _.ap(_.left('maError'))), _.left('maError'))
      U.deepStrictEqual(
        pipe(_.left<string, (s: string) => number>('mabError'), _.ap(_.right('abc'))),
        _.left('mabError')
      )
      U.deepStrictEqual(pipe(_.left('mabError'), _.ap(_.left('maError'))), _.left('mabError'))
    })

    it('apFirst', () => {
      U.deepStrictEqual(pipe(_.right('a'), _.apFirst(_.right(1))), _.right('a'))
    })

    it('apSecond', () => {
      U.deepStrictEqual(pipe(_.right('a'), _.apSecond(_.right(1))), _.right(1))
    })

    it('chain', () => {
      const f = (s: string) => _.right<string, number>(s.length)
      U.deepStrictEqual(pipe(_.right('abc'), _.chain(f)), _.right(3))
      U.deepStrictEqual(pipe(_.left<string, string>('maError'), _.chain(f)), _.left('maError'))
    })

    it('chainFirst', () => {
      const f = (s: string) => _.right<string, number>(s.length)
      U.deepStrictEqual(pipe(_.right('abc'), _.chainFirst(f)), _.right('abc'))
      U.deepStrictEqual(pipe(_.left<string, string>('maError'), _.chainFirst(f)), _.left('maError'))
    })

    it('chainFirstW', () => {
      const f = (s: string) => _.right<boolean, number>(s.length)
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

  it('fold', () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    const fold = _.fold(f, g)
    U.deepStrictEqual(fold(_.left('abc')), 'left3')
    U.deepStrictEqual(fold(_.right('abc')), 'right3')
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
    U.deepStrictEqual(_.elem(N.Eq)(2, _.left('a')), false)
    U.deepStrictEqual(_.elem(N.Eq)(2, _.right(2)), true)
    U.deepStrictEqual(_.elem(N.Eq)(1, _.right(2)), false)
  })

  it('filterOrElse', () => {
    const gt10 = (n: number): boolean => n > 10
    U.deepStrictEqual(
      pipe(
        _.right(12),
        _.filterOrElse(gt10, () => -1)
      ),
      _.right(12)
    )
    U.deepStrictEqual(
      pipe(
        _.right(7),
        _.filterOrElse(gt10, () => -1)
      ),
      _.left(-1)
    )
    U.deepStrictEqual(
      pipe(
        _.left(12),
        _.filterOrElse(gt10, () => -1)
      ),
      _.left(12)
    )
    U.deepStrictEqual(
      pipe(
        _.right(7),
        _.filterOrElse(gt10, (n) => `invalid ${n}`)
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

  it('parseJSON', () => {
    U.deepStrictEqual(_.parseJSON('{"a":1}', _.toError), _.right({ a: 1 }))
    U.deepStrictEqual(
      _.parseJSON('{"a":}', _.toError),
      _.left(new SyntaxError('Unexpected token } in JSON at position 5'))
    )
  })

  it('stringifyJSON', () => {
    U.deepStrictEqual(_.stringifyJSON({ a: 1 }, _.toError), _.right('{"a":1}'))
    const circular: any = { ref: null }
    circular.ref = circular
    U.deepStrictEqual(
      pipe(
        _.stringifyJSON(circular, _.toError),
        _.mapLeft((e) => e.message.includes('Converting circular structure to JSON'))
      ),
      _.left(true)
    )
    interface Person {
      readonly name: string
      readonly age: number
    }
    const person: Person = { name: 'Giulio', age: 45 }
    U.deepStrictEqual(_.stringifyJSON(person, _.toError), _.right('{"name":"Giulio","age":45}'))

    // #1397
    U.deepStrictEqual(
      _.stringifyJSON(undefined, _.toError),
      _.left(new Error('Converting unsupported structure to JSON'))
    )
  })

  it('fromPredicate', () => {
    const gt2 = _.fromPredicate(
      (n: number) => n >= 2,
      (n) => `Invalid number ${n}`
    )
    U.deepStrictEqual(gt2(3), _.right(3))
    U.deepStrictEqual(gt2(1), _.left('Invalid number 1'))

    // refinements
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const from = _.fromPredicate(isColor, (s) => `invalid color ${s}`)
    U.deepStrictEqual(from('red'), _.right('red'))
    U.deepStrictEqual(from('foo'), _.left('invalid color foo'))
  })

  it('fromNullable', () => {
    U.deepStrictEqual(_.fromNullable('default')(null), _.left('default'))
    U.deepStrictEqual(_.fromNullable('default')(undefined), _.left('default'))
    U.deepStrictEqual(_.fromNullable('default')(1), _.right(1))
  })

  it('tryCatch', () => {
    U.deepStrictEqual(
      _.tryCatch(() => {
        return 1
      }, _.toError),
      _.right(1)
    )

    U.deepStrictEqual(
      _.tryCatch(() => {
        // tslint:disable-next-line: no-string-throw
        throw 'string error'
      }, _.toError),
      _.left(new Error('string error'))
    )
  })

  describe('getEq', () => {
    it('equals', () => {
      const equals = _.getEq(S.Eq, N.Eq).equals
      U.deepStrictEqual(equals(_.right(1), _.right(1)), true)
      U.deepStrictEqual(equals(_.right(1), _.right(2)), false)
      U.deepStrictEqual(equals(_.right(1), _.left('foo')), false)
      U.deepStrictEqual(equals(_.left('foo'), _.left('foo')), true)
      U.deepStrictEqual(equals(_.left('foo'), _.left('bar')), false)
      U.deepStrictEqual(equals(_.left('foo'), _.right(1)), false)
    })
  })

  describe('ChainRec', () => {
    it('chainRec', () => {
      const chainRec = _.ChainRec.chainRec
      U.deepStrictEqual(
        chainRec(1, () => _.left('foo')),
        _.left('foo')
      )
      U.deepStrictEqual(
        chainRec(1, () => _.right(_.right(1))),
        _.right(1)
      )
      U.deepStrictEqual(
        chainRec(1, (a) => {
          if (a < 5) {
            return _.right(_.left(a + 1))
          } else {
            return _.right(_.right(a))
          }
        }),
        _.right(5)
      )
    })
  })

  describe('getWitherable', () => {
    const W = _.getWitherable(S.Monoid)
    const p = (n: number) => n > 2

    it('compact', () => {
      U.deepStrictEqual(W.compact(_.left('1')), _.left('1'))
      U.deepStrictEqual(W.compact(_.right(O.none)), _.left(S.Monoid.empty))
      U.deepStrictEqual(W.compact(_.right(O.some(123))), _.right(123))
    })

    it('separate', () => {
      U.deepStrictEqual(W.separate(_.left('123')), separated(_.left('123'), _.left('123')))
      U.deepStrictEqual(W.separate(_.right(_.left('123'))), separated(_.right('123'), _.left(S.Monoid.empty)))
      U.deepStrictEqual(W.separate(_.right(_.right('123'))), separated(_.left(S.Monoid.empty), _.right('123')))
    })

    it('partition', () => {
      U.deepStrictEqual(W.partition(_.left('123'), p), separated(_.left('123'), _.left('123')))
      U.deepStrictEqual(W.partition(_.right(1), p), separated(_.right(1), _.left(S.Monoid.empty)))
      U.deepStrictEqual(W.partition(_.right(3), p), separated(_.left(S.Monoid.empty), _.right(3)))
    })

    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? _.right(n + 1) : _.left(n - 1))
      U.deepStrictEqual(W.partitionMap(_.left('123'), f), separated(_.left('123'), _.left('123')))
      U.deepStrictEqual(W.partitionMap(_.right(1), f), separated(_.right(0), _.left(S.Monoid.empty)))
      U.deepStrictEqual(W.partitionMap(_.right(3), f), separated(_.left(S.Monoid.empty), _.right(4)))
    })

    it('filter', () => {
      U.deepStrictEqual(W.filter(_.left('123'), p), _.left('123'))
      U.deepStrictEqual(W.filter(_.right(1), p), _.left(S.Monoid.empty))
      U.deepStrictEqual(W.filter(_.right(3), p), _.right(3))
    })

    it('filterMap', () => {
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(W.filterMap(_.left('123'), f), _.left('123'))
      U.deepStrictEqual(W.filterMap(_.right(1), f), _.left(S.Monoid.empty))
      U.deepStrictEqual(W.filterMap(_.right(3), f), _.right(4))
    })

    it('wither', async () => {
      const wither = W.wither(T.ApplicativePar)
      const f = (n: number) => T.of(p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(await wither(_.left('foo'), f)(), _.left('foo'))
      U.deepStrictEqual(await wither(_.right(1), f)(), _.left(S.Monoid.empty))
      U.deepStrictEqual(await wither(_.right(3), f)(), _.right(4))
    })

    it('wilt', async () => {
      const wilt = W.wilt(T.ApplicativePar)
      const f = (n: number) => T.of(p(n) ? _.right(n + 1) : _.left(n - 1))
      U.deepStrictEqual(await wilt(_.left('foo'), f)(), separated(_.left('foo'), _.left('foo')))
      U.deepStrictEqual(await wilt(_.right(1), f)(), separated(_.right(0), _.left(S.Monoid.empty)))
      U.deepStrictEqual(await wilt(_.right(3), f)(), separated(_.left(S.Monoid.empty), _.right(4)))
    })
  })

  describe('getSemigroup', () => {
    it('concat', () => {
      const S = _.getSemigroup(N.SemigroupSum)
      U.deepStrictEqual(S.concat(_.left('a'), _.left('b')), _.left('a'))
      U.deepStrictEqual(S.concat(_.left('a'), _.right(2)), _.right(2))
      U.deepStrictEqual(S.concat(_.right(1), _.left('b')), _.right(1))
      U.deepStrictEqual(S.concat(_.right(1), _.right(2)), _.right(3))
    })
  })

  describe('getApplySemigroup', () => {
    it('concat', () => {
      // tslint:disable-next-line: deprecation
      const S = _.getApplySemigroup(N.SemigroupSum)
      U.deepStrictEqual(S.concat(_.left('a'), _.left('b')), _.left('a'))
      U.deepStrictEqual(S.concat(_.left('a'), _.right(2)), _.left('a'))
      U.deepStrictEqual(S.concat(_.right(1), _.left('b')), _.left('b'))
      U.deepStrictEqual(S.concat(_.right(1), _.right(2)), _.right(3))
    })
  })

  describe('getApplyMonoid', () => {
    it('concat', () => {
      // tslint:disable-next-line: deprecation
      const M = _.getApplyMonoid(N.MonoidSum)
      U.deepStrictEqual(M.concat(_.left('a'), M.empty), _.left('a'))
      U.deepStrictEqual(M.concat(M.empty, _.left('b')), _.left('b'))
      U.deepStrictEqual(M.concat(_.right(1), M.empty), _.right(1))
      U.deepStrictEqual(M.concat(M.empty, _.right(2)), _.right(2))
    })
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
    U.deepStrictEqual(sequenceT(A)(_.left('a'), _.left('b')), _.left('ab'))
    // tslint:disable-next-line: deprecation
    const AV = _.getValidation(S.Monoid)
    U.deepStrictEqual(sequenceT(AV)(_.left('a'), _.left('b')), _.left('ab'))
  })

  it('getAltValidation', () => {
    const A = _.getAltValidation(S.Monoid)
    U.deepStrictEqual(
      A.alt(_.left('a'), () => _.left('b')),
      _.left('ab')
    )
    U.deepStrictEqual(
      A.alt(_.right(1), () => _.left('b')),
      _.right(1)
    )
    U.deepStrictEqual(
      A.alt(_.left('a'), () => _.right(2)),
      _.right(2)
    )
    // tslint:disable-next-line: deprecation
    const AV = _.getValidation(S.Monoid)
    U.deepStrictEqual(
      AV.alt(_.left('a'), () => _.left('b')),
      _.left('ab')
    )
  })

  it('getValidationSemigroup', () => {
    // tslint:disable-next-line: deprecation
    const VS = _.getValidationSemigroup(S.Monoid, N.MonoidSum)
    U.deepStrictEqual(VS.concat(_.right(1), _.right(2)), _.right(3))
    U.deepStrictEqual(VS.concat(_.right(1), _.left('foo')), _.left('foo'))
    U.deepStrictEqual(VS.concat(_.left('foo'), _.right(1)), _.left('foo'))
    U.deepStrictEqual(VS.concat(_.left('foo'), _.left('bar')), _.left('foobar'))
  })

  it('getValidationMonoid', () => {
    // tslint:disable-next-line: deprecation
    const M = _.getValidationMonoid(S.Monoid, N.MonoidSum)
    U.deepStrictEqual(M.concat(_.right(1), M.empty), _.right(1))
    U.deepStrictEqual(M.concat(M.empty, _.right(1)), _.right(1))
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
        _.right<string, number>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      ),
      _.right({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(
      pipe(_.right<string, number>(1), _.bindTo('a'), _.apS('b', _.right('b'))),
      _.right({ a: 1, b: 'b' })
    )
  })

  it('fromNullableK', () => {
    const f = _.fromNullableK('error')((n: number) => (n > 0 ? n : null))
    U.deepStrictEqual(f(1), _.right(1))
    U.deepStrictEqual(f(-1), _.left('error'))
  })

  it('chainNullableK', () => {
    const f = _.chainNullableK('error')((n: number) => (n > 0 ? n : null))
    U.deepStrictEqual(f(_.right(1)), _.right(1))
    U.deepStrictEqual(f(_.right(-1)), _.left('error'))
    U.deepStrictEqual(f(_.left('a')), _.left('a'))
  })

  it('sequenceArray', () => {
    U.deepStrictEqual(pipe([_.right(1), _.right(2)], _.sequenceArray), _.right([1, 2]))
    U.deepStrictEqual(pipe([_.right(1), _.left('a')], _.sequenceArray), _.left('a'))
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
})
