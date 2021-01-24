import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as IO from '../src/IO'
import { monoidString } from '../src/Monoid'
import { semigroupString } from '../src/Semigroup'
import * as T from '../src/Task'
import * as _ from '../src/TaskThese'
import * as TH from '../src/These'
import * as U from './util'

describe('TaskThese', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    U.deepStrictEqual(await pipe(_.right(1), _.map(U.double))(), TH.right(2))
  })

  it('bimap', async () => {
    const f = (e: string) => e + e
    const g = (a: number) => a + 1
    U.deepStrictEqual(await pipe(_.right(1), _.bimap(f, g))(), TH.right(2))
    U.deepStrictEqual(await pipe(_.left('a'), _.bimap(f, g))(), TH.left('aa'))
    U.deepStrictEqual(await pipe(_.both('a', 1), _.bimap(f, g))(), TH.both('aa', 2))
  })

  it('mapLeft', async () => {
    const f = (e: string) => e + e
    U.deepStrictEqual(await pipe(_.right(1), _.mapLeft(f))(), TH.right(1))
    U.deepStrictEqual(await pipe(_.left('a'), _.mapLeft(f))(), TH.left('aa'))
    U.deepStrictEqual(await pipe(_.both('a', 1), _.mapLeft(f))(), TH.both('aa', 1))
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('ApplicativeSeq', async () => {
    await U.assertSeq(_.getApply(T.ApplySeq, semigroupString), _.FromTask, (fa) => fa())
    await U.assertSeq<_.URI, string>(_.getApplicative(T.ApplySeq, semigroupString), _.FromTask, (fa) => fa())
  })

  it('ApplicativePar', async () => {
    await U.assertPar(_.getApply(T.ApplyPar, semigroupString), _.FromTask, (fa) => fa())
    await U.assertPar<_.URI, string>(_.getApplicative(T.ApplyPar, semigroupString), _.FromTask, (fa) => fa())
  })

  it('getApplicative', async () => {
    const A = _.getApplicative(T.ApplicativePar, monoidString)
    const f = (n: number): number => n * 2
    U.deepStrictEqual(await pipe(_.right(f), A.ap(_.right(1)))(), TH.right(2))
  })

  describe('getMonad', () => {
    const M = _.getMonad(monoidString)

    it('map', async () => {
      const f = (n: number): number => n * 2
      U.deepStrictEqual(await pipe(_.right(1), M.map(f))(), TH.right(2))
      U.deepStrictEqual(await pipe(_.left('a'), M.map(f))(), TH.left('a'))
      U.deepStrictEqual(await pipe(_.both('a', 1), M.map(f))(), TH.both('a', 2))
    })

    it('chain', async () => {
      const f = (n: number) => (n > 2 ? _.both(`c`, n * 3) : n > 1 ? _.right(n * 2) : _.left(`b`))
      U.deepStrictEqual(await pipe(_.right(1), M.chain(f))(), TH.left('b'))
      U.deepStrictEqual(await pipe(_.right(2), M.chain(f))(), TH.right(4))

      U.deepStrictEqual(await pipe(_.left('a'), M.chain(f))(), TH.left('a'))

      U.deepStrictEqual(await pipe(_.both('a', 1), M.chain(f))(), TH.left('ab'))
      U.deepStrictEqual(await pipe(_.both('a', 2), M.chain(f))(), TH.both('a', 4))
      U.deepStrictEqual(await pipe(_.both('a', 3), M.chain(f))(), TH.both('ac', 9))
    })
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('right', async () => {
    const x = await _.right(1)()
    U.deepStrictEqual(x, TH.right(1))
  })

  it('left', async () => {
    const x = await _.left('a')()
    U.deepStrictEqual(x, TH.left('a'))
  })

  it('both', async () => {
    const x = await _.both('a', 1)()
    U.deepStrictEqual(x, TH.both('a', 1))
  })

  it('rightIO', async () => {
    const x = await _.rightIO(IO.of(1))()
    U.deepStrictEqual(x, TH.right(1))
  })

  it('leftIO', async () => {
    const x = await _.leftIO(IO.of('a'))()
    U.deepStrictEqual(x, TH.left('a'))
  })

  it('rightTask', async () => {
    const x = await _.rightTask(T.of(1))()
    U.deepStrictEqual(x, TH.right(1))
  })

  it('leftTask', async () => {
    const x = await _.leftTask(T.of('a'))()
    U.deepStrictEqual(x, TH.left('a'))
  })

  it('fromEither', async () => {
    U.deepStrictEqual(await _.fromEither(E.right('a'))(), E.right('a'))
    U.deepStrictEqual(await _.fromEither(E.left('a'))(), E.left('a'))
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('fold', async () => {
    const f = _.fold(
      (e) => T.of(`left ${e}`),
      (a) => T.of(`right ${a}`),
      (e, a) => T.of(`both ${e} ${a}`)
    )
    U.deepStrictEqual(await pipe(_.right(1), f)(), 'right 1')
    U.deepStrictEqual(await pipe(_.left('a'), f)(), 'left a')
    U.deepStrictEqual(await pipe(_.both('a', 1), f)(), 'both a 1')
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('swap', async () => {
    U.deepStrictEqual(await _.swap(_.right(1))(), TH.left(1))
    U.deepStrictEqual(await _.swap(_.left('a'))(), TH.right('a'))
    U.deepStrictEqual(await _.swap(_.both('a', 1))(), TH.both(1, 'a'))
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('toReadonlyTuple2', async () => {
    const f = _.toReadonlyTuple2(
      () => 'b',
      () => 2
    )
    U.deepStrictEqual(await f(_.right(1))(), ['b', 1])
    U.deepStrictEqual(await f(_.left('a'))(), ['a', 2])
    U.deepStrictEqual(await f(_.both('a', 1))(), ['a', 1])
  })
})
