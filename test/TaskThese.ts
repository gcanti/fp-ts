import * as E from '../src/Result'
import { pipe } from '../src/Function'
import * as IO from '../src/Sync'
import * as RA from '../src/ReadonlyArray'
import type { ReadonlyNonEmptyArray } from '../src/ReadonlyNonEmptyArray'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as _ from '../src/TaskThese'
import * as TH from '../src/These'
import * as U from './util'

describe('TaskThese', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    U.deepStrictEqual(await pipe(_.succeed(1), _.map(U.double))(), TH.succeed(2))
  })

  it('mapBoth', async () => {
    const f = _.mapBoth(
      (e: string) => e + e,
      (a: number) => a + 1
    )
    U.deepStrictEqual(await pipe(_.succeed(1), f)(), TH.succeed(2))
    U.deepStrictEqual(await pipe(_.left('a'), f)(), TH.fail('aa'))
    U.deepStrictEqual(await pipe(_.both('a', 1), f)(), TH.both('aa', 2))
  })

  it('mapError', async () => {
    const f = _.mapError((e: string) => e + e)
    U.deepStrictEqual(await pipe(_.succeed(1), f)(), TH.succeed(1))
    U.deepStrictEqual(await pipe(_.left('a'), f)(), TH.fail('aa'))
    U.deepStrictEqual(await pipe(_.both('a', 1), f)(), TH.both('aa', 1))
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Applicative', async () => {
    await U.assertSeq(_.getApply(T.Apply, S.Semigroup) as any, _.FromTask, (fa) => fa())
    await U.assertSeq(_.getApplicative(T.Apply, S.Semigroup), _.FromTask, (fa) => fa())
  })

  it('ApplicativePar', async () => {
    await U.assertPar(_.getApply(T.ApplyPar, S.Semigroup) as any, _.FromTask, (fa) => fa())
    await U.assertPar(_.getApplicative(T.ApplyPar, S.Semigroup), _.FromTask, (fa) => fa())
  })

  it('getApplicative', async () => {
    const A = _.getApplicative(T.ApplicativePar, S.Monoid)
    const f = (n: number): number => n * 2
    U.deepStrictEqual(await pipe(_.succeed(f), A.ap(_.succeed(1)))(), TH.succeed(2))
  })

  describe('getMonad', () => {
    const M = _.getMonad(S.Monoid)

    it('map', async () => {
      const f = (n: number): number => n * 2
      U.deepStrictEqual(await pipe(_.succeed(1), M.map(f))(), TH.succeed(2))
      U.deepStrictEqual(await pipe(_.left('a'), M.map(f))(), TH.fail('a'))
      U.deepStrictEqual(await pipe(_.both('a', 1), M.map(f))(), TH.both('a', 2))
    })

    it('flatMap', async () => {
      const f = (n: number) => (n > 2 ? _.both(`c`, n * 3) : n > 1 ? _.succeed(n * 2) : _.left(`b`))
      U.deepStrictEqual(await pipe(_.succeed(1), M.flatMap(f))(), TH.fail('b'))
      U.deepStrictEqual(await pipe(_.succeed(2), M.flatMap(f))(), TH.succeed(4))

      U.deepStrictEqual(await pipe(_.left('a'), M.flatMap(f))(), TH.fail('a'))

      U.deepStrictEqual(await pipe(_.both('a', 1), M.flatMap(f))(), TH.fail('ab'))
      U.deepStrictEqual(await pipe(_.both('a', 2), M.flatMap(f))(), TH.both('a', 4))
      U.deepStrictEqual(await pipe(_.both('a', 3), M.flatMap(f))(), TH.both('ac', 9))
    })
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('right', async () => {
    const x = await _.succeed(1)()
    U.deepStrictEqual(x, TH.succeed(1))
  })

  it('left', async () => {
    const x = await _.left('a')()
    U.deepStrictEqual(x, TH.fail('a'))
  })

  it('both', async () => {
    const x = await _.both('a', 1)()
    U.deepStrictEqual(x, TH.both('a', 1))
  })

  it('fromIO', async () => {
    const x = await _.fromIO(IO.succeed(1))()
    U.deepStrictEqual(x, TH.succeed(1))
  })

  it('leftIO', async () => {
    const x = await _.leftIO(IO.succeed('a'))()
    U.deepStrictEqual(x, TH.fail('a'))
  })

  it('fromTask', async () => {
    const x = await _.fromTask(T.succeed(1))()
    U.deepStrictEqual(x, TH.succeed(1))
  })

  it('leftTask', async () => {
    const x = await _.leftTask(T.succeed('a'))()
    U.deepStrictEqual(x, TH.fail('a'))
  })

  it('fromEither', async () => {
    U.deepStrictEqual(await _.fromEither(E.succeed('a'))(), E.succeed('a'))
    U.deepStrictEqual(await _.fromEither(E.fail('a'))(), E.fail('a'))
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('match', async () => {
    const match = _.match(
      (e) => `left ${e}`,
      (a) => `right ${a}`,
      (e, a) => `both ${e} ${a}`
    )
    U.deepStrictEqual(await pipe(_.succeed(1), match)(), 'right 1')
    U.deepStrictEqual(await pipe(_.left('a'), match)(), 'left a')
    U.deepStrictEqual(await pipe(_.both('a', 1), match)(), 'both a 1')
  })

  it('matchTask', async () => {
    const matchTask = _.matchTask(
      (e) => T.succeed(`left ${e}`),
      (a) => T.succeed(`right ${a}`),
      (e, a) => T.succeed(`both ${e} ${a}`)
    )
    U.deepStrictEqual(await pipe(_.succeed(1), matchTask)(), 'right 1')
    U.deepStrictEqual(await pipe(_.left('a'), matchTask)(), 'left a')
    U.deepStrictEqual(await pipe(_.both('a', 1), matchTask)(), 'both a 1')
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('swap', async () => {
    U.deepStrictEqual(await _.swap(_.succeed(1))(), TH.fail(1))
    U.deepStrictEqual(await _.swap(_.left('a'))(), TH.succeed('a'))
    U.deepStrictEqual(await _.swap(_.both('a', 1))(), TH.both(1, 'a'))
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('toTuple2', async () => {
    const f = _.toTuple2('b', 2)
    U.deepStrictEqual(await f(_.succeed(1))(), ['b', 1])
    U.deepStrictEqual(await f(_.left('a'))(), ['a', 2])
    U.deepStrictEqual(await f(_.both('a', 1))(), ['a', 1])
  })

  it('liftThese', async () => {
    const g = _.liftThese((n: number) => (n > 0 ? TH.succeed(n) : n === 0 ? TH.both('zero', n) : TH.fail('negative')))
    U.deepStrictEqual(await g(-1)(), TH.fail('negative'))
    U.deepStrictEqual(await g(0)(), TH.both('zero', 0))
    U.deepStrictEqual(await g(1)(), TH.succeed(1))
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  // --- Par ---

  it('traverseReadonlyArrayWithIndexPar', async () => {
    const f = (i: number, n: number) => (n > 0 ? _.succeed(n + i) : n === 0 ? _.both('a', 0) : _.left(String(n)))
    const standard = RA.traverseWithIndex(_.getApplicative(T.ApplicativePar, S.Semigroup))(f)
    const optimized = _.traverseReadonlyArrayWithIndexPar(S.Semigroup)(f)
    const assert = async (input: ReadonlyArray<number>) => {
      U.deepStrictEqual(await standard(input)(), await optimized(input)())
    }
    await assert([1, 2, 3])
    await assert([0, 2, 3])
    await assert([1, 0, 3])
    await assert([0, 0, 3])
    await assert([-1, 2, 3])
    await assert([1, -2, 3])
    await assert(RA.empty)
  })

  it('traverseReadonlyNonEmptyArrayPar', async () => {
    const f = (n: number) => (n > 0 ? _.succeed(n) : n === 0 ? _.both('a', 0) : _.left(String(n)))
    const standard = RA.traverse(_.getApplicative(T.ApplicativePar, S.Semigroup))(f)
    const optimized = _.traverseReadonlyNonEmptyArrayPar(S.Semigroup)(f)
    const assert = async (input: ReadonlyNonEmptyArray<number>) => {
      U.deepStrictEqual(await standard(input)(), await optimized(input)())
    }
    await assert([1, 2, 3])
    await assert([0, 2, 3])
    await assert([1, 0, 3])
    await assert([0, 0, 3])
    await assert([-1, 2, 3])
    await assert([1, -2, 3])
  })

  it('sequenceReadonlyArrayPar', async () => {
    const log: Array<number | string> = []
    const right = (n: number): _.TaskThese<string, number> =>
      _.fromIO(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.TaskThese<string, number> =>
      _.leftIO(() => {
        log.push(s)
        return s
      })
    const f = _.sequenceReadonlyArrayPar(S.Semigroup)
    U.deepStrictEqual(await pipe([right(1), right(2)], f)(), E.succeed([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], f)(), E.fail('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], f)(), E.fail('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
  })

  // --- Seq ---

  it('traverseReadonlyArrayWithIndex', async () => {
    const f = (i: number, n: number) => (n > 0 ? _.succeed(n + i) : n === 0 ? _.both('a', 0) : _.left(String(n)))
    const standard = RA.traverseWithIndex(_.getApplicative(T.Applicative, S.Semigroup))(f)
    const optimized = _.traverseReadonlyArrayWithIndex(S.Semigroup)(f)
    const assert = async (input: ReadonlyArray<number>) => {
      U.deepStrictEqual(await standard(input)(), await optimized(input)())
    }
    await assert([1, 2, 3])
    await assert([0, 2, 3])
    await assert([1, 0, 3])
    await assert([0, 0, 3])
    await assert([-1, 2, 3])
    await assert([1, -2, 3])
    await assert(RA.empty)
  })

  it('traverseReadonlyNonEmptyArray', async () => {
    const f = (n: number) => (n > 0 ? _.succeed(n) : n === 0 ? _.both('a', 0) : _.left(String(n)))
    const standard = RA.traverse(_.getApplicative(T.Applicative, S.Semigroup))(f)
    const optimized = _.traverseReadonlyNonEmptyArray(S.Semigroup)(f)
    const assert = async (input: ReadonlyNonEmptyArray<number>) => {
      U.deepStrictEqual(await standard(input)(), await optimized(input)())
    }
    await assert([1, 2, 3])
    await assert([0, 2, 3])
    await assert([1, 0, 3])
    await assert([0, 0, 3])
    await assert([-1, 2, 3])
    await assert([1, -2, 3])
  })

  it('sequenceReadonlyArray', async () => {
    const log: Array<number | string> = []
    const right = (n: number): _.TaskThese<string, number> =>
      _.fromIO(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.TaskThese<string, number> =>
      _.leftIO(() => {
        log.push(s)
        return s
      })
    const f = _.sequenceReadonlyArray(S.Semigroup)
    U.deepStrictEqual(await pipe([right(1), right(2)], f)(), E.succeed([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], f)(), E.fail('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], f)(), E.fail('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })
})
