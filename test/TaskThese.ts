import * as E from '../src/Either'
import { pipe, SK } from '../src/function'
import * as IO from '../src/IO'
import * as N from '../src/number'
import * as RA from '../src/ReadonlyArray'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as _ from '../src/TaskThese'
import * as TH from '../src/These'
import * as U from './util'

describe('TaskThese', () => {
  // -------------------------------------------------------------------------------------
  // pipeables
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

  describe('getApplicative', () => {
    it('Par', async () => {
      await U.assertSeq(_.getApplicative(T.ApplicativeSeq, S.Semigroup), _.FromTask, (fa) => fa())
    })

    it('Seq', async () => {
      await U.assertPar(_.getApplicative(T.ApplicativePar, S.Semigroup), _.FromTask, (fa) => fa())
    })
  })

  it('getSemigroup', async () => {
    const SSN = _.getSemigroup(S.Semigroup, N.SemigroupSum)
    U.deepStrictEqual(await SSN.concat(_.right(1), _.right(2))(), TH.right(3))
    U.deepStrictEqual(await SSN.concat(_.right(1), _.left('a'))(), TH.both('a', 1))
    U.deepStrictEqual(await SSN.concat(_.left('a'), _.left('b'))(), TH.left('ab'))
    U.deepStrictEqual(await SSN.concat(_.right(1), _.both('a', 2))(), TH.both('a', 3))
    U.deepStrictEqual(await SSN.concat(_.left('a'), _.both('b', 2))(), TH.both('ab', 2))
    U.deepStrictEqual(await SSN.concat(_.both('a', 1), _.both('b', 2))(), TH.both('ab', 3))
  })

  describe('getMonad', () => {
    const M = _.getMonad(S.Monoid)
    it('map', async () => {
      const f = (n: number): number => n * 2
      U.deepStrictEqual(await M.map(_.right(1), f)(), TH.right(2))
      U.deepStrictEqual(await M.map(_.left('a'), f)(), TH.left('a'))
      U.deepStrictEqual(await M.map(_.both('a', 1), f)(), TH.both('a', 2))
    })

    it('ap', async () => {
      const f = (n: number): number => n * 2
      U.deepStrictEqual(await M.ap(_.right(f), _.right(1))(), TH.right(2))
    })

    it('chain', async () => {
      const f = (n: number) => (n > 2 ? _.both(`c`, n * 3) : n > 1 ? _.right(n * 2) : _.left(`b`))
      U.deepStrictEqual(await M.chain(_.right(1), f)(), TH.left('b'))
      U.deepStrictEqual(await M.chain(_.right(2), f)(), TH.right(4))

      U.deepStrictEqual(await M.chain(_.left('a'), f)(), TH.left('a'))

      U.deepStrictEqual(await M.chain(_.both('a', 1), f)(), TH.left('ab'))
      U.deepStrictEqual(await M.chain(_.both('a', 2), f)(), TH.both('a', 4))
      U.deepStrictEqual(await M.chain(_.both('a', 3), f)(), TH.both('ac', 9))
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

  it('swap', async () => {
    U.deepStrictEqual(await _.swap(_.right(1))(), TH.left(1))
    U.deepStrictEqual(await _.swap(_.left('a'))(), TH.right('a'))
    U.deepStrictEqual(await _.swap(_.both('a', 1))(), TH.both(1, 'a'))
  })

  it('toTuple', async () => {
    const f = _.toTuple('b', 2)
    U.deepStrictEqual(await f(_.right(1))(), ['b', 1])
    U.deepStrictEqual(await f(_.left('a'))(), ['a', 2])
    U.deepStrictEqual(await f(_.both('a', 1))(), ['a', 1])
  })

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
