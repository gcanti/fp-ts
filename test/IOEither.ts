import * as assert from 'assert'
import * as E from '../src/Either'
import { identity, pipe } from '../src/function'
import * as I from '../src/IO'
import * as _ from '../src/IOEither'
import { monoidString } from '../src/Monoid'
import { none, some } from '../src/Option'
import * as A from '../src/ReadonlyArray'

describe('IOEither', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('alt', () => {
    assert.deepStrictEqual(
      pipe(
        _.left('a'),
        _.alt(() => _.left('b'))
      )(),
      E.left('b')
    )
    assert.deepStrictEqual(
      pipe(
        _.left('a'),
        _.alt(() => _.right(1))
      )(),
      E.right(1)
    )
    assert.deepStrictEqual(
      pipe(
        _.right(1),
        _.alt(() => _.left('a'))
      )(),
      E.right(1)
    )
    assert.deepStrictEqual(
      pipe(
        _.right(1),
        _.alt(() => _.right(2))
      )(),
      E.right(1)
    )
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(pipe(_.right(1), _.map(double))(), E.right(2))
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(pipe(_.right(double), _.ap(_.right(1)))(), E.right(2))
  })

  it('apSecond', () => {
    assert.deepStrictEqual(pipe(_.right('a'), _.apSecond(_.right('b')))(), E.right('b'))
  })

  it('chain', () => {
    const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('foo'))
    assert.deepStrictEqual(pipe(_.right('foo'), _.chain(f))(), E.right(3))
    assert.deepStrictEqual(pipe(_.right('a'), _.chain(f))(), E.left('foo'))
  })

  it('chainFirst', () => {
    const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('foo'))
    assert.deepStrictEqual(pipe(_.right('foo'), _.chainFirst(f))(), E.right('foo'))
    assert.deepStrictEqual(pipe(_.right('a'), _.chainFirst(f))(), E.left('foo'))
  })

  it('chainFirstW', () => {
    const f = (a: string): _.IOEither<string, number> => (a.length > 2 ? _.right(a.length) : _.left('foo'))
    assert.deepStrictEqual(pipe(_.right<string, boolean>('foo'), _.chainFirstW(f))(), E.right('foo'))
    assert.deepStrictEqual(pipe(_.right<string, boolean>('a'), _.chainFirstW(f))(), E.left('foo'))
  })

  it('flatten', () => {
    assert.deepStrictEqual(pipe(_.right(_.right('a')), _.flatten)(), E.right('a'))
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    assert.deepStrictEqual(pipe(_.right(1), _.bimap(f, g))(), E.right(false))
    assert.deepStrictEqual(pipe(_.left('foo'), _.bimap(f, g))(), E.left(3))
  })

  it('mapLeft', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(pipe(_.left(1), _.mapLeft(double))(), E.left(2))
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('tryCatch', () => {
    assert.deepStrictEqual(_.tryCatch(() => 1)(), E.right(1))
    assert.deepStrictEqual(
      _.tryCatch(() => {
        throw new Error('error')
      })(),
      E.left(new Error('error'))
    )
  })

  it('fromOption', () => {
    assert.deepStrictEqual(_.fromOption(() => 'err')(none)(), E.left('err'))
    assert.deepStrictEqual(_.fromOption(() => 'err')(some(1))(), E.right(1))
  })

  it('fromEither', () => {
    assert.deepStrictEqual(_.fromEither(E.right('a'))(), E.right('a'))
    assert.deepStrictEqual(_.fromEither(E.left('a'))(), E.left('a'))
  })

  it('fromPredicate', () => {
    const f = _.fromPredicate((n: number) => n >= 2)
    assert.deepStrictEqual(f(3)(), E.right(3))
    assert.deepStrictEqual(f(1)(), E.left(1))
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('fold', () => {
    assert.deepStrictEqual(
      _.fold(
        () => I.of('left'),
        () => I.of('right')
      )(_.right(1))(),
      'right'
    )
    assert.deepStrictEqual(
      _.fold(
        () => I.of('left'),
        () => I.of('right')
      )(_.left(1))(),
      'left'
    )
  })

  it('getOrElse', () => {
    assert.deepStrictEqual(_.getOrElse(() => I.of(2))(_.right(1))(), 1)
    assert.deepStrictEqual(_.getOrElse(() => I.of(2))(_.left(1))(), 2)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('orElse', () => {
    assert.deepStrictEqual(_.orElse(() => _.right(2))(_.right(1))(), E.right(1))
  })

  it('chainEitherK', () => {
    const f = (s: string) => E.right(s.length)
    const x = pipe(_.right('a'), _.chainEitherK(f))()
    assert.deepStrictEqual(x, E.right(1))
  })

  it('filterOrElse', () => {
    const isNumber = (u: string | number): u is number => typeof u === 'number'

    assert.deepStrictEqual(
      pipe(
        _.right(12),
        _.filterOrElse(
          (n) => n > 10,
          () => 'bar'
        )
      )(),
      E.right(12)
    )
    assert.deepStrictEqual(
      pipe(
        _.right(7),
        _.filterOrElse(
          (n) => n > 10,
          () => 'bar'
        )
      )(),
      E.left('bar')
    )
    assert.deepStrictEqual(
      pipe(
        _.left('foo'),
        _.filterOrElse(
          (n) => n > 10,
          () => 'bar'
        )
      )(),
      E.left('foo')
    )
    assert.deepStrictEqual(
      pipe(
        _.right(7),
        _.filterOrElse(
          (n) => n > 10,
          (n) => `invalid ${n}`
        )
      )(),
      E.left('invalid 7')
    )
    assert.deepStrictEqual(
      pipe(
        _.right(12),
        _.filterOrElse(isNumber, () => 'not a number')
      )(),
      E.right(12)
    )
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('ApplicativePar', () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const tuple = <A>(a: A) => <B>(b: B) => <C>(c: C): readonly [A, B, C] => [a, b, c]
    const a = _.rightIO<number, string>(() => log.push('a'))
    const b = _.leftIO<string, number>(() => {
      log.push('b')
      return 'error'
    })
    const c = _.rightIO<number, string>(() => log.push('c'))
    const A = _.ApplicativePar
    assert.deepStrictEqual(pipe(a, A.map(tuple), A.ap(b), A.ap(c))(), E.left('error'))
    assert.deepStrictEqual(log, ['a', 'b', 'c'])
  })

  it('ApplicativeSeq', () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const tuple = <A>(a: A) => <B>(b: B) => <C>(c: C): readonly [A, B, C] => [a, b, c]
    const a = _.rightIO<number, string>(() => log.push('a'))
    const b = _.leftIO<string, number>(() => {
      log.push('b')
      return 'error'
    })
    const c = _.rightIO<number, string>(() => log.push('c'))
    const A = _.ApplicativeSeq
    assert.deepStrictEqual(pipe(a, A.map(tuple), A.ap(b), A.ap(c))(), E.left('error'))
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  it('getApplicativeIOValidation', () => {
    const A = _.getApplicativeIOValidation(monoidString)
    const tuple = <A>(a: A) => <B>(b: B): readonly [A, B] => [a, b]
    assert.deepStrictEqual(pipe(_.left('a'), A.map(tuple), A.ap(_.left('b')))(), E.left('ab'))
    assert.deepStrictEqual(pipe(_.left('a'), A.map(tuple), A.ap(_.right(1)))(), E.left('a'))
  })

  it('getAltIOValidation', () => {
    const A = _.getAltIOValidation(monoidString)
    assert.deepStrictEqual(
      pipe(
        _.left('a'),
        A.alt(() => _.left('b'))
      )(),
      E.left('ab')
    )
  })

  describe('getCompactable', () => {
    const C = _.getCompactable(monoidString)

    it('compact', () => {
      assert.deepStrictEqual(C.compact(_.right(some(1)))(), E.right(1))
    })

    it('separate', () => {
      const s1 = C.separate(_.left('a'))
      assert.deepStrictEqual(s1.left(), E.left('a'))
      assert.deepStrictEqual(s1.right(), E.left('a'))
      const s2 = C.separate(_.right(E.left('a')))
      assert.deepStrictEqual(s2.left(), E.right('a'))
      assert.deepStrictEqual(s2.right(), E.left(''))
      const s3 = C.separate(_.right(E.right(1)))
      assert.deepStrictEqual(s3.left(), E.left(''))
      assert.deepStrictEqual(s3.right(), E.right(1))
    })
  })

  describe('getFilterable', () => {
    const F = _.getFilterable(A.getMonoid<string>())

    it('partition', () => {
      const { left, right } = pipe(
        _.of<string, ReadonlyArray<string>>('a'),
        F.partition((s) => s.length > 2)
      )
      assert.deepStrictEqual(left(), E.right('a'))
      assert.deepStrictEqual(right(), E.left([]))
    })

    it('partitionMap', () => {
      const { left, right } = pipe(
        _.of<string, ReadonlyArray<string>>('a'),
        F.partitionMap((s) => (s.length > 2 ? E.right(s.length) : E.left(false)))
      )
      assert.deepStrictEqual(left(), E.right(false))
      assert.deepStrictEqual(right(), E.left([]))
    })
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  describe('bracket', () => {
    // tslint:disable-next-line: readonly-array
    let log: Array<string> = []

    const acquireFailure = _.left('acquire failure')
    const acquireSuccess = _.right({ res: 'acquire success' })
    const useSuccess = () => _.right('use success')
    const useFailure = () => _.left('use failure')
    const releaseSuccess = () =>
      _.rightIO(() => {
        log.push('release success')
      })
    const releaseFailure = () => _.left('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', () => {
      const e = _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      assert.deepStrictEqual(e, E.left('acquire failure'))
    })

    it('body and release must not be called if acquire fails', () => {
      _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      assert.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', () => {
      const e = _.bracket(acquireSuccess, useFailure, releaseSuccess)()
      assert.deepStrictEqual(e, E.left('use failure'))
    })

    it('should return the release error if both use and release fail', () => {
      const e = _.bracket(acquireSuccess, useFailure, releaseFailure)()
      assert.deepStrictEqual(e, E.left('release failure'))
    })

    it('release must be called if the body returns', () => {
      _.bracket(acquireSuccess, useSuccess, releaseSuccess)()
      assert.deepStrictEqual(log, ['release success'])
    })

    it('release must be called if the body throws', () => {
      _.bracket(acquireSuccess, useFailure, releaseSuccess)()
      assert.deepStrictEqual(log, ['release success'])
    })

    it('should return the release error if release fails', () => {
      const e = _.bracket(acquireSuccess, useSuccess, releaseFailure)()
      assert.deepStrictEqual(e, E.left('release failure'))
    })
  })

  it('do notation', () => {
    assert.deepStrictEqual(
      pipe(
        _.right<number, string>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    assert.deepStrictEqual(
      pipe(_.right<number, string>(1), _.bindTo('a'), _.apS('b', _.right('b')))(),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apT', () => {
    assert.deepStrictEqual(pipe(_.right<number, string>(1), _.tupled, _.apT(_.right('b')))(), E.right([1, 'b']))
  })

  describe('array utils', () => {
    it('sequenceReadonlyArray', () => {
      const arr = A.range(0, 10)
      assert.deepStrictEqual(pipe(arr, A.map(_.of), _.sequenceReadonlyArray)(), E.right(arr))
    })

    it('traverseReadonlyArray', () => {
      const arr = A.range(0, 10)
      assert.deepStrictEqual(pipe(arr, _.traverseReadonlyArray(_.of))(), E.right(arr))
    })

    it('traverseReadonlyArrayWithIndex', () => {
      const arr = A.replicate(3, 1)
      assert.deepStrictEqual(
        pipe(
          arr,
          _.traverseReadonlyArrayWithIndex((index, _data) => _.of(index))
        )(),
        E.right([0, 1, 2])
      )
    })

    it('sequenceReadonlyArraySeq', () => {
      const arr = A.range(0, 10)
      assert.deepStrictEqual(pipe(arr, A.map(_.of), _.sequenceReadonlyArraySeq)(), E.right(arr))
    })

    it('traverseReadonlyArraySeq', () => {
      const arr = A.range(0, 10)
      assert.deepStrictEqual(pipe(arr, _.traverseReadonlyArraySeq(_.of))(), E.right(arr))
    })

    it('traverseReadonlyArrayWithIndexSeq', () => {
      const arr = A.replicate(3, 1)
      assert.deepStrictEqual(
        pipe(
          arr,
          _.traverseReadonlyArrayWithIndexSeq((index, _data) =>
            pipe(
              index,
              _.fromPredicate((index) => index < 1)
            )
          )
        )(),
        E.left(1)
      )
      assert.deepStrictEqual(
        pipe(
          arr,
          _.traverseReadonlyArrayWithIndexSeq((index, _data) => _.of(index))
        )(),
        E.right([0, 1, 2])
      )
    })
  })

  it('tryCatchK', () => {
    const f = (n: number) => {
      if (n > 0) {
        return n * 2
      }
      throw new Error('negative')
    }
    const g = _.tryCatchK(f, identity)
    assert.deepStrictEqual(g(1)(), E.right(2))
    assert.deepStrictEqual(g(-1)(), E.left(new Error('negative')))
  })
})
