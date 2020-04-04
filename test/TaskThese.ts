import * as assert from 'assert'
import * as IO from '../src/IO'
import { monoidString, monoidSum } from '../src/Monoid'
import { pipe } from '../src/pipeable'
import * as T from '../src/Task'
import * as TT from '../src/TaskThese'
import * as TH from '../src/These'

describe('TaskThese', () => {
  it('right', async () => {
    const x = await TT.right(1)()
    assert.deepStrictEqual(x, TH.right(1))
  })

  it('left', async () => {
    const x = await TT.left('a')()
    assert.deepStrictEqual(x, TH.left('a'))
  })

  it('both', async () => {
    const x = await TT.both('a', 1)()
    assert.deepStrictEqual(x, TH.both('a', 1))
  })

  it('rightIO', async () => {
    const x = await TT.rightIO(IO.of(1))()
    assert.deepStrictEqual(x, TH.right(1))
  })

  it('leftIO', async () => {
    const x = await TT.leftIO(IO.of('a'))()
    assert.deepStrictEqual(x, TH.left('a'))
  })

  it('rightTask', async () => {
    const x = await TT.rightTask(T.of(1))()
    assert.deepStrictEqual(x, TH.right(1))
  })

  it('leftTask', async () => {
    const x = await TT.leftTask(T.of('a'))()
    assert.deepStrictEqual(x, TH.left('a'))
  })

  it('fold', async () => {
    const f = TT.fold(
      (e) => T.of(`left ${e}`),
      (a) => T.of(`right ${a}`),
      (e, a) => T.of(`both ${e} ${a}`)
    )
    assert.deepStrictEqual(await pipe(TT.right(1), f)(), 'right 1')
    assert.deepStrictEqual(await pipe(TT.left('a'), f)(), 'left a')
    assert.deepStrictEqual(await pipe(TT.both('a', 1), f)(), 'both a 1')
  })

  it('swap', async () => {
    assert.deepStrictEqual(await TT.swap(TT.right(1))(), TH.left(1))
    assert.deepStrictEqual(await TT.swap(TT.left('a'))(), TH.right('a'))
    assert.deepStrictEqual(await TT.swap(TT.both('a', 1))(), TH.both(1, 'a'))
  })

  it('toTuple', async () => {
    const f = TT.toTuple('b', 2)
    assert.deepStrictEqual(await f(TT.right(1))(), ['b', 1])
    assert.deepStrictEqual(await f(TT.left('a'))(), ['a', 2])
    assert.deepStrictEqual(await f(TT.both('a', 1))(), ['a', 1])
  })

  it('bimap', async () => {
    const f = TT.bimap(
      (e: string) => e + e,
      (a: number) => a + 1
    )
    assert.deepStrictEqual(await pipe(TT.right(1), f)(), TH.right(2))
    assert.deepStrictEqual(await pipe(TT.left('a'), f)(), TH.left('aa'))
    assert.deepStrictEqual(await pipe(TT.both('a', 1), f)(), TH.both('aa', 2))
  })

  it('mapLeft', async () => {
    const f = TT.mapLeft((e: string) => e + e)
    assert.deepStrictEqual(await pipe(TT.right(1), f)(), TH.right(1))
    assert.deepStrictEqual(await pipe(TT.left('a'), f)(), TH.left('aa'))
    assert.deepStrictEqual(await pipe(TT.both('a', 1), f)(), TH.both('aa', 1))
  })

  it('getSemigroup', async () => {
    const S = TT.getSemigroup(monoidString, monoidSum)
    assert.deepStrictEqual(await S.concat(TT.right(1), TT.right(2))(), TH.right(3))
    assert.deepStrictEqual(await S.concat(TT.right(1), TT.left('a'))(), TH.both('a', 1))
    assert.deepStrictEqual(await S.concat(TT.left('a'), TT.left('b'))(), TH.left('ab'))
    assert.deepStrictEqual(await S.concat(TT.right(1), TT.both('a', 2))(), TH.both('a', 3))
    assert.deepStrictEqual(await S.concat(TT.left('a'), TT.both('b', 2))(), TH.both('ab', 2))
    assert.deepStrictEqual(await S.concat(TT.both('a', 1), TT.both('b', 2))(), TH.both('ab', 3))
  })

  describe('getMonad', () => {
    const M = TT.getMonad(monoidString)
    it('map', async () => {
      const f = (n: number): number => n * 2
      assert.deepStrictEqual(await M.map(TT.right(1), f)(), TH.right(2))
      assert.deepStrictEqual(await M.map(TT.left('a'), f)(), TH.left('a'))
      assert.deepStrictEqual(await M.map(TT.both('a', 1), f)(), TH.both('a', 2))
    })

    it('map', async () => {
      const f = (n: number): number => n * 2
      assert.deepStrictEqual(await M.ap(TT.right(f), TT.right(1))(), TH.right(2))
    })

    it('chain', async () => {
      const f = (n: number) => (n > 2 ? TT.both(`c`, n + 1) : n > 1 ? TT.right(n * 2) : TT.left(`b`))
      assert.deepStrictEqual(await M.chain(TT.right(1), f)(), TH.left('b'))
      assert.deepStrictEqual(await M.chain(TT.right(2), f)(), TH.right(4))

      assert.deepStrictEqual(await M.chain(TT.left('a'), f)(), TH.left('a'))

      assert.deepStrictEqual(await M.chain(TT.both('a', 1), f)(), TH.left('ab'))
      assert.deepStrictEqual(await M.chain(TT.both('a', 2), f)(), TH.right(4))
      assert.deepStrictEqual(await M.chain(TT.both('a', 3), f)(), TH.both('ac', 4))
    })
  })
})
