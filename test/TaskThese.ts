import * as assert from 'assert'
import * as IO from '../src/IO'
import { monoidString, monoidSum } from '../src/Monoid'
import { pipe } from '../src/function'
import * as T from '../src/Task'
import * as _ from '../src/TaskThese'
import * as TH from '../src/These'
import { assertSeq, assertPar } from './util'
import { semigroupString } from '../src/Semigroup'

describe('TaskThese', () => {
  // -------------------------------------------------------------------------------------
  // pipeables
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(await pipe(_.right(1), _.map(double))(), TH.right(2))
  })

  it('bimap', async () => {
    const f = (e: string) => e + e
    const g = (a: number) => a + 1
    assert.deepStrictEqual(await pipe(_.right(1), _.bimap(f, g))(), TH.right(2))
    assert.deepStrictEqual(await pipe(_.left('a'), _.bimap(f, g))(), TH.left('aa'))
    assert.deepStrictEqual(await pipe(_.both('a', 1), _.bimap(f, g))(), TH.both('aa', 2))
  })

  it('mapLeft', async () => {
    const f = (e: string) => e + e
    assert.deepStrictEqual(await pipe(_.right(1), _.mapLeft(f))(), TH.right(1))
    assert.deepStrictEqual(await pipe(_.left('a'), _.mapLeft(f))(), TH.left('aa'))
    assert.deepStrictEqual(await pipe(_.both('a', 1), _.mapLeft(f))(), TH.both('aa', 1))
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  describe('getApplicative', () => {
    it('Par', async () => {
      await assertSeq(_.getApplicative(T.ApplicativeSeq, semigroupString), { fromTask: _.fromTask }, (fa) => fa())
    })

    it('Seq', async () => {
      await assertPar(_.getApplicative(T.ApplicativePar, semigroupString), { fromTask: _.fromTask }, (fa) => fa())
    })
  })

  it('getSemigroup', async () => {
    const S = _.getSemigroup(monoidString, monoidSum)
    assert.deepStrictEqual(await S.concat(_.right(1), _.right(2))(), TH.right(3))
    assert.deepStrictEqual(await S.concat(_.right(1), _.left('a'))(), TH.both('a', 1))
    assert.deepStrictEqual(await S.concat(_.left('a'), _.left('b'))(), TH.left('ab'))
    assert.deepStrictEqual(await S.concat(_.right(1), _.both('a', 2))(), TH.both('a', 3))
    assert.deepStrictEqual(await S.concat(_.left('a'), _.both('b', 2))(), TH.both('ab', 2))
    assert.deepStrictEqual(await S.concat(_.both('a', 1), _.both('b', 2))(), TH.both('ab', 3))
  })

  describe('getMonad', () => {
    const M = _.getMonad(monoidString)
    it('map', async () => {
      const f = (n: number): number => n * 2
      assert.deepStrictEqual(await M.map(_.right(1), f)(), TH.right(2))
      assert.deepStrictEqual(await M.map(_.left('a'), f)(), TH.left('a'))
      assert.deepStrictEqual(await M.map(_.both('a', 1), f)(), TH.both('a', 2))
    })

    it('ap', async () => {
      const f = (n: number): number => n * 2
      assert.deepStrictEqual(await M.ap(_.right(f), _.right(1))(), TH.right(2))
    })

    it('chain', async () => {
      const f = (n: number) => (n > 2 ? _.both(`c`, n * 3) : n > 1 ? _.right(n * 2) : _.left(`b`))
      assert.deepStrictEqual(await M.chain(_.right(1), f)(), TH.left('b'))
      assert.deepStrictEqual(await M.chain(_.right(2), f)(), TH.right(4))

      assert.deepStrictEqual(await M.chain(_.left('a'), f)(), TH.left('a'))

      assert.deepStrictEqual(await M.chain(_.both('a', 1), f)(), TH.left('ab'))
      assert.deepStrictEqual(await M.chain(_.both('a', 2), f)(), TH.both('a', 4))
      assert.deepStrictEqual(await M.chain(_.both('a', 3), f)(), TH.both('ac', 9))
    })
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('right', async () => {
    const x = await _.right(1)()
    assert.deepStrictEqual(x, TH.right(1))
  })

  it('left', async () => {
    const x = await _.left('a')()
    assert.deepStrictEqual(x, TH.left('a'))
  })

  it('both', async () => {
    const x = await _.both('a', 1)()
    assert.deepStrictEqual(x, TH.both('a', 1))
  })

  it('rightIO', async () => {
    const x = await _.rightIO(IO.of(1))()
    assert.deepStrictEqual(x, TH.right(1))
  })

  it('leftIO', async () => {
    const x = await _.leftIO(IO.of('a'))()
    assert.deepStrictEqual(x, TH.left('a'))
  })

  it('rightTask', async () => {
    const x = await _.rightTask(T.of(1))()
    assert.deepStrictEqual(x, TH.right(1))
  })

  it('leftTask', async () => {
    const x = await _.leftTask(T.of('a'))()
    assert.deepStrictEqual(x, TH.left('a'))
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
    assert.deepStrictEqual(await pipe(_.right(1), f)(), 'right 1')
    assert.deepStrictEqual(await pipe(_.left('a'), f)(), 'left a')
    assert.deepStrictEqual(await pipe(_.both('a', 1), f)(), 'both a 1')
  })

  it('swap', async () => {
    assert.deepStrictEqual(await _.swap(_.right(1))(), TH.left(1))
    assert.deepStrictEqual(await _.swap(_.left('a'))(), TH.right('a'))
    assert.deepStrictEqual(await _.swap(_.both('a', 1))(), TH.both(1, 'a'))
  })

  it('toTuple', async () => {
    const f = _.toTuple('b', 2)
    assert.deepStrictEqual(await f(_.right(1))(), ['b', 1])
    assert.deepStrictEqual(await f(_.left('a'))(), ['a', 2])
    assert.deepStrictEqual(await f(_.both('a', 1))(), ['a', 1])
  })
})
