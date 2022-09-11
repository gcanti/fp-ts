import * as E from '../src/Either'
import { pipe, SK } from '../src/function'
import * as IO from '../src/IO'
import * as RA from '../src/ReadonlyArray'
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
    U.deepStrictEqual(await pipe(_.right(1), _.map(U.double))(), TH.right(2))
  })

  it('bimap', async () => {
    const f = _.bimap(
      (e: string) => e + e,
      (a: number) => a + 1
    )
    U.deepStrictEqual(await pipe(_.right(1), f)(), TH.right(2))
    U.deepStrictEqual(await pipe(_.left('a'), f)(), TH.left('aa'))
    U.deepStrictEqual(await pipe(_.both('a', 1), f)(), TH.both('aa', 2))
  })

  it('mapLeft', async () => {
    const f = _.mapLeft((e: string) => e + e)
    U.deepStrictEqual(await pipe(_.right(1), f)(), TH.right(1))
    U.deepStrictEqual(await pipe(_.left('a'), f)(), TH.left('aa'))
    U.deepStrictEqual(await pipe(_.both('a', 1), f)(), TH.both('aa', 1))
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('ApplicativeSeq', async () => {
    // TODO
    await U.assertSeq(_.getApply(T.ApplySeq, S.Semigroup) as any, _.FromTask, (fa) => fa())
    await U.assertSeq(_.getApplicative(T.ApplySeq, S.Semigroup), _.FromTask, (fa) => fa())
  })

  it('ApplicativePar', async () => {
    // TODO
    await U.assertPar(_.getApply(T.ApplyPar, S.Semigroup) as any, _.FromTask, (fa) => fa())
    await U.assertPar(_.getApplicative(T.ApplyPar, S.Semigroup), _.FromTask, (fa) => fa())
  })

  it('getApplicative', async () => {
    const A = _.getApplicative(T.ApplicativePar, S.Monoid)
    const f = (n: number): number => n * 2
    U.deepStrictEqual(await pipe(_.right(f), A.ap(_.right(1)))(), TH.right(2))
  })

  describe('getMonad', () => {
    const M = _.getMonad(S.Monoid)

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

  it('match', async () => {
    const match = _.match(
      (e) => `left ${e}`,
      (a) => `right ${a}`,
      (e, a) => `both ${e} ${a}`
    )
    U.deepStrictEqual(await pipe(_.right(1), match)(), 'right 1')
    U.deepStrictEqual(await pipe(_.left('a'), match)(), 'left a')
    U.deepStrictEqual(await pipe(_.both('a', 1), match)(), 'both a 1')
  })

  it('matchE', async () => {
    const matchE = _.matchE(
      (e) => T.of(`left ${e}`),
      (a) => T.of(`right ${a}`),
      (e, a) => T.of(`both ${e} ${a}`)
    )
    U.deepStrictEqual(await pipe(_.right(1), matchE)(), 'right 1')
    U.deepStrictEqual(await pipe(_.left('a'), matchE)(), 'left a')
    U.deepStrictEqual(await pipe(_.both('a', 1), matchE)(), 'both a 1')
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

  it('toTuple2', async () => {
    const f = _.toTuple2(
      () => 'b',
      () => 2
    )
    U.deepStrictEqual(await f(_.right(1))(), ['b', 1])
    U.deepStrictEqual(await f(_.left('a'))(), ['a', 2])
    U.deepStrictEqual(await f(_.both('a', 1))(), ['a', 1])
  })

  it('fromTheseK', async () => {
    const g = _.fromTheseK((n: number) => (n > 0 ? TH.right(n) : n === 0 ? TH.both('zero', n) : TH.left('negative')))
    U.deepStrictEqual(await g(-1)(), TH.left('negative'))
    U.deepStrictEqual(await g(0)(), TH.both('zero', 0))
    U.deepStrictEqual(await g(1)(), TH.right(1))
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyArrayWithIndex', async () => {
    const f = (i: number, n: number) => (n > 0 ? _.right(n + i) : n === 0 ? _.both('a', 0) : _.left(String(n)))
    const standard = RA.traverseWithIndex(_.getApplicative(T.ApplicativePar, S.Semigroup))(f)
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

  it('traverseReadonlyArrayWithIndexSeq', async () => {
    const f = (i: number, n: number) => (n > 0 ? _.right(n + i) : n === 0 ? _.both('a', 0) : _.left(String(n)))
    const standard = RA.traverseWithIndex(_.getApplicative(T.ApplicativeSeq, S.Semigroup))(f)
    const optimized = _.traverseReadonlyArrayWithIndexSeq(S.Semigroup)(f)
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

  it('sequenceReadonlyArray', async () => {
    const log: Array<number | string> = []
    const right = (n: number): _.TaskThese<string, number> =>
      _.rightIO(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.TaskThese<string, number> =>
      _.leftIO(() => {
        log.push(s)
        return s
      })
    const f = _.traverseReadonlyArrayWithIndex(S.Semigroup)
    U.deepStrictEqual(await pipe([right(1), right(2)], f(SK))(), E.right([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], f(SK))(), E.left('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], f(SK))(), E.left('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
  })

  it('sequenceReadonlyArraySeq', async () => {
    const log: Array<number | string> = []
    const right = (n: number): _.TaskThese<string, number> =>
      _.rightIO(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.TaskThese<string, number> =>
      _.leftIO(() => {
        log.push(s)
        return s
      })
    const f = _.traverseReadonlyArrayWithIndexSeq(S.Semigroup)
    U.deepStrictEqual(await pipe([right(1), right(2)], f(SK))(), E.right([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], f(SK))(), E.left('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], f(SK))(), E.left('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })
})
