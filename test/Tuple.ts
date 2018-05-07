import * as assert from 'assert'
import { sort } from '../src/Array'
import { left, right } from '../src/Either'
import { getArrayMonoid, monoidString, monoidSum } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { ordNumber, ordString } from '../src/Ord'
import { setoidBoolean, setoidNumber } from '../src/Setoid'
import { traverse } from '../src/Traversable'
import { Tuple, getApplicative, getChainRec, getOrd, getSemigroup, getSetoid, tuple } from '../src/Tuple'

describe('Tuple', () => {
  it('compose', () => {
    assert.deepEqual(new Tuple(true, 2).compose(new Tuple(1, 's')), new Tuple(true, 's'))
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    assert.deepEqual(new Tuple('s', 1).map(double), new Tuple('s', 2))
  })

  it('bimap', () => {
    const double = (n: number): number => n * 2
    const len = (s: string): number => s.length
    assert.deepEqual(new Tuple('s', 1).bimap(len, double), new Tuple(1, 2))
  })

  it('getSemigroup', () => {
    const semigroup = getSemigroup(monoidString, monoidSum)
    assert.deepEqual(semigroup.concat(new Tuple('a', 1), new Tuple('b', 2)), new Tuple('ab', 3))
  })

  it('toString', () => {
    assert.strictEqual(new Tuple('a', 1).toString(), `new Tuple("a", 1)`)
  })

  it('getApplicative', () => {
    const applicative = getApplicative(monoidString)
    assert.deepEqual(applicative.of(1), new Tuple('', 1))
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
    assert.deepEqual(traverse(option, tuple)(new Tuple(1, 2), n => (n >= 2 ? some(n) : none)), some(new Tuple(1, 2)))
    assert.deepEqual(traverse(option, tuple)(new Tuple(1, 1), n => (n >= 2 ? some(n) : none)), none)
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
