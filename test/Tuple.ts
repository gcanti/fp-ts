import * as assert from 'assert'
import { sort } from '../src/Array'
import { left, right } from '../src/Either'
import * as F from '../src/Foldable'
import { identity } from '../src/function'
import { getArrayMonoid, monoidString, monoidSum } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { ordNumber, ordString } from '../src/Ord'
import { setoidBoolean, setoidNumber } from '../src/Setoid'
import * as T from '../src/Traversable'
import {
  getApplicative,
  getApply,
  getChainRec,
  getMonad,
  getMonoid,
  getOrd,
  getSemigroup,
  getSetoid,
  Tuple,
  tuple
} from '../src/Tuple'

describe('Tuple', () => {
  it('compose', () => {
    const x = new Tuple(true, 2)
    const y = new Tuple(1, 's')
    const z = new Tuple(true, 's')
    assert.deepEqual(x.compose(y), z)
    assert.deepEqual(
      tuple.compose(
        y,
        x
      ),
      z
    )
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    const x = new Tuple('s', 1)
    const y = new Tuple('s', 2)
    assert.deepEqual(x.map(double), y)
    assert.deepEqual(tuple.map(x, double), y)
  })

  it('extract', () => {
    const x = new Tuple('a', 1)
    assert.deepEqual(x.extract(), 1)
    assert.deepEqual(tuple.extract(x), 1)
  })

  it('extend', () => {
    const x = new Tuple('a', 1)
    const f = (fa: Tuple<string, number>): number => fa.fst.length + fa.snd
    const y = new Tuple('a', 2)
    assert.deepEqual(x.extend(f), y)
    assert.deepEqual(tuple.extend(x, f), y)
  })

  it('getApplicative', () => {
    const F = getApplicative(monoidString)
    const double = (n: number): number => n * 2
    const x = F.of(double)
    const y = new Tuple('a', 1)
    const z = new Tuple('a', 2)
    assert.deepEqual(F.ap(x, y), z)
  })

  it('getMonad', () => {
    const M = getMonad(monoidString)
    const f = (n: number) => M.of(n * 2)
    const x = new Tuple('a', 1)
    const y = new Tuple('a', 2)
    assert.deepEqual(M.chain(x, f), y)
  })

  it('getMonoid', () => {
    const M = getMonoid(monoidString, monoidSum)
    const x = new Tuple('a', 1)
    const y = new Tuple('b', 2)
    const z = new Tuple('ab', 3)
    assert.deepEqual(M.concat(x, y), z)
  })

  it('bimap', () => {
    const double = (n: number): number => n * 2
    const len = (s: string): number => s.length
    const x = new Tuple('a', 1)
    const y = new Tuple(1, 2)
    assert.deepEqual(x.bimap(len, double), y)
    assert.deepEqual(tuple.bimap(x, len, double), y)
  })

  it('getSemigroup', () => {
    const semigroup = getSemigroup(monoidString, monoidSum)
    assert.deepEqual(semigroup.concat(new Tuple('a', 1), new Tuple('b', 2)), new Tuple('ab', 3))
  })

  it('toString', () => {
    assert.strictEqual(new Tuple('a', 1).toString(), `new Tuple("a", 1)`)
    assert.strictEqual(new Tuple('a', 1).inspect(), `new Tuple("a", 1)`)
  })

  it('reduce', () => {
    const x = new Tuple(1, 'b')
    assert.strictEqual(x.reduce('a', (b, a) => b + a), 'ab')
    assert.strictEqual(tuple.reduce(x, 'a', (b, a) => b + a), 'ab')
  })

  it('foldMap', () => {
    const old = F.foldMap(tuple, monoidString)
    const foldMap = tuple.foldMap(monoidString)
    const x1 = new Tuple(1, 'a')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'a')
    assert.strictEqual(foldMap(x1, f1), old(x1, f1))
  })

  it('foldr', () => {
    const old = F.foldr(tuple)
    const foldr = tuple.foldr
    const x1 = new Tuple(1, 'a')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'a')
    assert.strictEqual(foldr(x1, init1, f1), old(x1, init1, f1))
  })

  it('swap', () => {
    assert.deepEqual(new Tuple('a', 1).swap(), new Tuple(1, 'a'))
  })

  it('toTuple', () => {
    assert.deepEqual(new Tuple('a', 1).toTuple(), ['a', 1])
  })

  it('getApply', () => {
    const apply = getApply(monoidString)
    const double = (n: number): number => n * 2
    assert.deepEqual(apply.ap(new Tuple('a', double), new Tuple('b', 1)), new Tuple('ab', 2))
  })

  it('getApplicative', () => {
    const applicative = getApplicative(monoidString)
    assert.deepEqual(applicative.of(1), new Tuple('', 1))
  })

  it('getMonad', () => {
    const monad = getMonad(monoidString)
    const double = (n: number): number => n * 2
    assert.deepEqual(monad.chain(new Tuple('a', double), f => new Tuple('b', f(1))), new Tuple('ab', 2))
  })

  it('chainRec', () => {
    const { chainRec } = getChainRec(getArrayMonoid<number>())
    function seqReq(upper: number): Tuple<Array<number>, number> {
      return chainRec(
        1,
        init => new Tuple([init], init >= upper ? right<number, number>(init) : left<number, number>(init + 1))
      )
    }
    const xs = seqReq(10000).fst
    assert.strictEqual(xs.length, 10000)
    assert.strictEqual(xs[0], 1)
    assert.strictEqual(xs[xs.length - 1], 10000)
  })

  it('getOrd', () => {
    const tuples: Array<Tuple<number, string>> = [
      new Tuple(2, 'c'),
      new Tuple(1, 'b'),
      new Tuple(2, 'a'),
      new Tuple(1, 'c')
    ]
    const O = getOrd(ordNumber, ordString)
    assert.deepEqual(sort(O)(tuples), [new Tuple(1, 'b'), new Tuple(1, 'c'), new Tuple(2, 'a'), new Tuple(2, 'c')])
  })

  it('traverse', () => {
    assert.deepEqual(tuple.traverse(option)(new Tuple('a', 2), n => (n >= 2 ? some(n) : none)), some(new Tuple('a', 2)))
    assert.deepEqual(tuple.traverse(option)(new Tuple('a', 1), n => (n >= 2 ? some(n) : none)), none)
  })

  it('sequence', () => {
    const old = T.sequence(option, tuple)
    const sequence = tuple.sequence(option)
    const x1 = new Tuple('a', some(2))
    assert.deepEqual(sequence(x1), some(new Tuple('a', 2)))
    assert.deepEqual(sequence(x1), old(x1))
    const x2 = new Tuple('a', none)
    assert.deepEqual(sequence(x2), none)
    assert.deepEqual(sequence(x2), old(x2))
  })

  it('toString', () => {
    assert.strictEqual(new Tuple(1, 2).toString(), 'new Tuple(1, 2)')
  })

  it('getSetoid', () => {
    const S = getSetoid(setoidNumber, setoidBoolean)
    assert.strictEqual(S.equals(new Tuple(1, true), new Tuple(1, true)), true)
    assert.strictEqual(S.equals(new Tuple(1, true), new Tuple(2, true)), false)
    assert.strictEqual(S.equals(new Tuple(1, true), new Tuple(1, false)), false)
  })
})
