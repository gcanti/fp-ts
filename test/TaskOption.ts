import { pipe } from '../src/function'
import * as O from '../src/Option'
import * as A from '../src/ReadonlyArray'
import * as T from '../src/Task'
import * as _ from '../src/TaskOption'
import { assertPar, assertSeq, deepStrictEqual } from './util'

describe('TaskOption', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    const double = (n: number): number => n * 2
    deepStrictEqual(await pipe(_.some(1), _.map(double))(), O.some(2))
  })

  it('ap', async () => {
    const double = (n: number) => n * 2
    deepStrictEqual(await pipe(_.some(double), _.ap(_.some(2)))(), O.some(4))
    deepStrictEqual(await pipe(_.some(double), _.ap(_.none))(), O.none)
    deepStrictEqual(await pipe(_.none, _.ap(_.some(2)))(), O.none)
    deepStrictEqual(await pipe(_.none, _.ap(_.none))(), O.none)
  })

  it('chain', async () => {
    const f = (n: number) => _.some(n * 2)
    const g = () => _.none
    deepStrictEqual(await pipe(_.some(1), _.chain(f))(), O.some(2))
    deepStrictEqual(await pipe(_.none, _.chain(f))(), O.none)
    deepStrictEqual(await pipe(_.some(1), _.chain(g))(), O.none)
    deepStrictEqual(await pipe(_.none, _.chain(g))(), O.none)
  })

  it('alt', async () => {
    const assertAlt = async (a: _.TaskOption<number>, b: _.TaskOption<number>, expected: O.Option<number>) => {
      deepStrictEqual(
        await pipe(
          a,
          _.alt(() => b)
        )(),
        expected
      )
    }
    await assertAlt(_.some(1), _.some(2), O.some(1))
    await assertAlt(_.some(1), _.none, O.some(1))
    await assertAlt(_.none, _.some(2), O.some(2))
    await assertAlt(_.none, _.none, O.none)
  })

  it('zero', async () => {
    deepStrictEqual(await _.zero()(), O.none)
  })

  it('fromIO', async () => {
    deepStrictEqual(await _.fromIO(() => 1)(), O.some(1))
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('ApplicativeSeq', async () => {
    await assertSeq(_.ApplySeq, _.FromTask, (fa) => fa())
    await assertSeq(_.ApplicativeSeq, _.FromTask, (fa) => fa())
  })

  it('ApplicativePar', async () => {
    await assertPar(_.ApplyPar, _.FromTask, (fa) => fa())
    await assertPar(_.ApplicativePar, _.FromTask, (fa) => fa())
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('tryCatch', async () => {
    deepStrictEqual(await _.tryCatch(() => Promise.resolve(1))(), O.some(1))
    deepStrictEqual(await _.tryCatch(() => Promise.reject())(), O.none)
  })

  it('fromNullable', async () => {
    deepStrictEqual(await _.fromNullable(T.of(2))(), O.some(2))
    deepStrictEqual(await _.fromNullable(T.of(null))(), O.none)
    deepStrictEqual(await _.fromNullable(T.of(undefined))(), O.none)
  })

  it('fromPredicate', async () => {
    const p = (n: number): boolean => n > 2
    const f = _.fromPredicate(p)
    deepStrictEqual(await f(1)(), O.none)
    deepStrictEqual(await f(3)(), O.some(3))
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('fold', async () => {
    const f = _.fold(
      () => T.of('none'),
      (a) => T.of(`some(${a})`)
    )
    deepStrictEqual(await pipe(_.some(1), f)(), 'some(1)')
    deepStrictEqual(await pipe(_.none, f)(), 'none')
  })

  it('getOrElse', async () => {
    deepStrictEqual(
      await pipe(
        _.some(1),
        _.getOrElse(() => T.of(2))
      )(),
      1
    )
    deepStrictEqual(
      await pipe(
        _.none,
        _.getOrElse(() => T.of(2))
      )(),
      2
    )
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('fromOptionK', async () => {
    const f = (s: string) => (s.length > 0 ? O.some(s.length) : O.none)
    const g = _.fromOptionK(f)
    deepStrictEqual(await g('a')(), O.some(1))
    deepStrictEqual(await g('')(), O.none)
  })

  describe('array utils', () => {
    it('traverseReadonlyArray', async () => {
      const arr = A.range(0, 10)
      deepStrictEqual(await pipe(arr, _.traverseReadonlyArray(_.of))(), O.some(arr))
      deepStrictEqual(await pipe(arr, _.traverseReadonlyArray(_.fromPredicate((x) => x > 5)))(), O.none)
    })

    it('traverseReadonlyArraySeq', async () => {
      const arr = A.range(0, 10)
      deepStrictEqual(await pipe(arr, _.traverseReadonlyArraySeq(_.of))(), O.some(arr))
      deepStrictEqual(await pipe(arr, _.traverseReadonlyArraySeq(_.fromPredicate((x) => x > 5)))(), O.none)
    })

    it('sequenceReadonlyArray', async () => {
      const arr = A.range(0, 10)
      deepStrictEqual(await pipe(arr, A.map(_.of), _.sequenceReadonlyArray)(), O.some(arr))
      deepStrictEqual(await pipe(arr, A.map(_.fromPredicate((x) => x > 5)), _.sequenceReadonlyArray)(), O.none)
    })

    it('sequenceReadonlyArraySeq', async () => {
      const arr = A.range(0, 10)
      deepStrictEqual(await pipe(arr, A.map(_.of), _.sequenceReadonlyArraySeq)(), O.some(arr))
      deepStrictEqual(await pipe(arr, A.map(_.fromPredicate((x) => x > 5)), _.sequenceReadonlyArraySeq)(), O.none)
    })
  })
})
