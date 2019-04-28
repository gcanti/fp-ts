import * as assert from 'assert'
import { sort, getMonoid } from '../src/Array'
import { left, right } from '../src/Either'
import { identity, tuple } from '../src/function'
import { monoidString, monoidSum } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { ordNumber, ordString } from '../src/Ord'
import { eqBoolean, eqNumber } from '../src/Eq'
import { showString } from '../src/Show'
import * as T from '../src/Tuple'

describe('Tuple', () => {
  it('compose', () => {
    const x = tuple(true, 2)
    const y = tuple(1, 's')
    const z = tuple(true, 's')
    assert.deepStrictEqual(
      T.tuple.compose(
        y,
        x
      ),
      z
    )
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    const x = tuple('s', 1)
    const y = tuple('s', 2)
    assert.deepStrictEqual(T.tuple.map(x, double), y)
  })

  it('extract', () => {
    const x = tuple('a', 1)
    assert.deepStrictEqual(T.tuple.extract(x), 1)
  })

  it('extend', () => {
    const x = tuple('a', 1)
    const f = (fa: T.Tuple<string, number>): number => T.fst(fa).length + T.snd(fa)
    const y = tuple('a', 2)
    assert.deepStrictEqual(T.tuple.extend(x, f), y)
  })

  it('getApplicative', () => {
    const F = T.getApplicative(monoidString)
    const double = (n: number): number => n * 2
    const x = F.of(double)
    const y = tuple('a', 1)
    const z = tuple('a', 2)
    assert.deepStrictEqual(F.ap(x, y), z)
  })

  it('getMonad', () => {
    const M = T.getMonad(monoidString)
    const f = (n: number) => M.of(n * 2)
    const x = tuple('a', 1)
    const y = tuple('a', 2)
    assert.deepStrictEqual(M.chain(x, f), y)
  })

  it('getMonoid', () => {
    const M = T.getMonoid(monoidString, monoidSum)
    const x = tuple('a', 1)
    const y = tuple('b', 2)
    const z = tuple('ab', 3)
    assert.deepStrictEqual(M.concat(x, y), z)
  })

  it('bimap', () => {
    const double = (n: number): number => n * 2
    const len = (s: string): number => s.length
    const x = tuple('a', 1)
    const y = tuple(1, 2)
    assert.deepStrictEqual(T.tuple.bimap(x, len, double), y)
  })

  it('getSemigroup', () => {
    const semigroup = T.getSemigroup(monoidString, monoidSum)
    assert.deepStrictEqual(semigroup.concat(tuple('a', 1), tuple('b', 2)), tuple('ab', 3))
  })

  it('reduce', () => {
    const x = tuple(1, 'b')
    assert.strictEqual(T.tuple.reduce(x, 'a', (b, a) => b + a), 'ab')
  })

  it('foldMap', () => {
    const foldMap = T.tuple.foldMap(monoidString)
    const x1 = tuple(1, 'a')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'a')
  })

  it('reduceRight', () => {
    const reduceRight = T.tuple.reduceRight
    const x1 = tuple(1, 'a')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(reduceRight(x1, init1, f1), 'a')
  })

  it('swap', () => {
    assert.deepStrictEqual(T.swap(tuple('a', 1)), tuple(1, 'a'))
  })

  it('getApply', () => {
    const apply = T.getApply(monoidString)
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(apply.ap(tuple('a', double), tuple('b', 1)), tuple('ab', 2))
  })

  it('getApplicative', () => {
    const applicative = T.getApplicative(monoidString)
    assert.deepStrictEqual(applicative.of(1), tuple('', 1))
  })

  it('getMonad', () => {
    const monad = T.getMonad(monoidString)
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(monad.chain(tuple('a', double), f => tuple('b', f(1))), tuple('ab', 2))
  })

  it('chainRec', () => {
    const { chainRec } = T.getChainRec(getMonoid<number>())
    function seqReq(upper: number): T.Tuple<Array<number>, number> {
      return chainRec(1, init => tuple([init], init >= upper ? right(init) : left(init + 1)))
    }
    const xs = T.fst(seqReq(10000))
    assert.strictEqual(xs.length, 10000)
    assert.strictEqual(xs[0], 1)
    assert.strictEqual(xs[xs.length - 1], 10000)
  })

  it('getOrd', () => {
    const tuples: Array<T.Tuple<number, string>> = [tuple(2, 'c'), tuple(1, 'b'), tuple(2, 'a'), tuple(1, 'c')]
    const O = T.getOrd(ordNumber, ordString)
    assert.deepStrictEqual(sort(O)(tuples), [tuple(1, 'b'), tuple(1, 'c'), tuple(2, 'a'), tuple(2, 'c')])
  })

  it('traverse', () => {
    assert.deepStrictEqual(T.tuple.traverse(option)(tuple('a', 2), n => (n >= 2 ? some(n) : none)), some(tuple('a', 2)))
    assert.deepStrictEqual(T.tuple.traverse(option)(tuple('a', 1), n => (n >= 2 ? some(n) : none)), none)
  })

  it('sequence', () => {
    const sequence = T.tuple.sequence(option)
    const x1 = tuple('a', some(2))
    assert.deepStrictEqual(sequence(x1), some(tuple('a', 2)))
    const x2 = tuple('a', none)
    assert.deepStrictEqual(sequence(x2), none)
  })

  it('getEq', () => {
    const S = T.getEq(eqNumber, eqBoolean)
    assert.strictEqual(S.equals(tuple(1, true), tuple(1, true)), true)
    assert.strictEqual(S.equals(tuple(1, true), tuple(2, true)), false)
    assert.strictEqual(S.equals(tuple(1, true), tuple(1, false)), false)
  })

  it('getShow', () => {
    const S = T.getShow(showString, showString)
    assert.strictEqual(S.show(tuple('a', 'b')), `["a", "b"]`)
  })
})
