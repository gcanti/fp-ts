import * as assert from 'assert'
import { identity } from '../src/function'
import { monoidString } from '../src/Monoid'
import { showString } from '../src/Show'
import * as T from '../src/Tuple'
import { getMonoid } from '../src/Array'
import { right, left } from '../src/Either'
import { option, some, none } from '../src/Option'

describe('Tuple', () => {
  it('compose', () => {
    assert.deepStrictEqual(
      T.tuple.compose(
        [true, 2],
        [1, 'a']
      ),
      [true, 'a']
    )
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(T.tuple.map([1, 'a'], double), [2, 'a'])
  })

  it('extract', () => {
    assert.deepStrictEqual(T.tuple.extract([1, 'a']), 1)
  })

  it('extend', () => {
    const f = (fa: [number, string]): number => T.snd(fa).length + T.fst(fa)
    assert.deepStrictEqual(T.tuple.extend([1, 'bb'], f), [3, 'bb'])
  })

  // it('getApplicative', () => {
  //   const F = T.getApplicative(monoidString)
  //   const double = (n: number): number => n * 2
  //   const x = F.of(double)
  //   const y = tuple('a', 1)
  //   const z = tuple('a', 2)
  //   assert.deepStrictEqual(F.ap(x, y), z)
  // })

  // it('getMonad', () => {
  //   const M = T.getMonad(monoidString)
  //   const f = (n: number) => M.of(n * 2)
  //   const x = tuple('a', 1)
  //   const y = tuple('a', 2)
  //   assert.deepStrictEqual(M.chain(x, f), y)
  // })

  describe('Bifunctor', () => {
    it('bimap', () => {
      const double = (n: number): number => n * 2
      const len = (s: string): number => s.length
      assert.deepStrictEqual(T.tuple.bimap([1, 'a'], len, double), [2, 1])
    })

    it('mapLeft', () => {
      const len = (s: string): number => s.length
      assert.deepStrictEqual(T.tuple.mapLeft([1, 'a'], len), [1, 1])
    })
  })

  it('reduce', () => {
    assert.strictEqual(T.tuple.reduce(['b', 1], 'a', (acc, a) => acc + a), 'ab')
  })

  it('foldMap', () => {
    assert.strictEqual(T.tuple.foldMap(monoidString)(['a', 1], identity), 'a')
  })

  it('reduceRight', () => {
    assert.strictEqual(T.tuple.reduceRight(['b', 1], 'a', (acc, a) => acc + a), 'ba')
  })

  it('swap', () => {
    assert.deepStrictEqual(T.swap([1, 'a']), ['a', 1])
  })

  it('getApply', () => {
    const apply = T.getApply(monoidString)
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(apply.ap([double, 'a'], [1, 'b']), [2, 'ab'])
  })

  it('getApplicative', () => {
    const applicative = T.getApplicative(monoidString)
    assert.deepStrictEqual(applicative.of(1), [1, ''])
  })

  it('getMonad', () => {
    const monad = T.getMonad(monoidString)
    assert.deepStrictEqual(monad.chain([1, 'a'], a => [a * 2, 'b']), [2, 'ab'])
  })

  it('chainRec', () => {
    const { chainRec } = T.getChainRec(getMonoid<number>())
    function seqReq(upper: number): [number, Array<number>] {
      return chainRec(1, init => [init >= upper ? right(init) : left(init + 1), [init]])
    }
    const xs = T.snd(seqReq(10000))
    assert.strictEqual(xs.length, 10000)
    assert.strictEqual(xs[0], 1)
    assert.strictEqual(xs[xs.length - 1], 10000)
  })

  it('traverse', () => {
    assert.deepStrictEqual(T.tuple.traverse(option)([2, 'a'], n => (n >= 2 ? some(n) : none)), some([2, 'a']))
    assert.deepStrictEqual(T.tuple.traverse(option)([1, 'a'], n => (n >= 2 ? some(n) : none)), none)
  })

  it('sequence', () => {
    const sequence = T.tuple.sequence(option)
    assert.deepStrictEqual(sequence([some(2), 'a']), some([2, 'a']))
    assert.deepStrictEqual(sequence([none, 'a']), none)
  })

  it('getShow', () => {
    const S = T.getShow(showString, showString)
    assert.strictEqual(S.show(['a', 'b']), `["a", "b"]`)
  })
})
