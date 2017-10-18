import * as assert from 'assert'
import { compose, map, bimap, getSemigroup, Tuple, getApplicative, chainRec, getOrd } from '../src/Tuple'
import { monoidString, monoidSum, getArrayMonoid } from '../src/Monoid'
import { left, right } from '../src/Either'
import { ordNumber, ordString } from '../src/Ord'
import { sort } from '../src/Array'

describe('Tuple', () => {
  it('compose', () => {
    assert.deepEqual(compose(new Tuple([1, 's']), new Tuple([true, 2])), new Tuple([true, 's']))
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    assert.deepEqual(map(double, new Tuple(['s', 1])), new Tuple(['s', 2]))
  })

  it('bimap', () => {
    const double = (n: number): number => n * 2
    const len = (s: string): number => s.length
    assert.deepEqual(bimap(len, double, new Tuple(['s', 1])), new Tuple([1, 2]))
  })

  it('getSemigroup', () => {
    const semigroup = getSemigroup(monoidString, monoidSum)
    assert.deepEqual(semigroup.concat(new Tuple(['a', 1]))(new Tuple(['b', 2])), new Tuple(['ab', 3]))
  })

  it('toString', () => {
    assert.strictEqual(new Tuple(['a', 1]).toString(), `new Tuple(["a", 1])`)
  })

  it('getApplicative', () => {
    const applicative = getApplicative(monoidString)
    assert.strictEqual(applicative.of(1).toString(), `new Tuple(["", 1])`)
  })

  it('getChainRec', () => {
    const monoidArrayNumber = getArrayMonoid<number>()

    function seqReq(upper: number): Tuple<Array<number>, number> {
      return chainRec(monoidArrayNumber)(init => new Tuple([[init], init >= upper ? right(init) : left(init + 1)]), 1)
    }
    const xs = seqReq(10000).fst()
    assert.strictEqual(xs.length, 10000)
    assert.strictEqual(xs[0], 1)
    assert.strictEqual(xs[xs.length - 1], 10000)
  })

  it('getOrd', () => {
    const tuples: Array<Tuple<number, string>> = [
      new Tuple([2, 'c']),
      new Tuple([1, 'b']),
      new Tuple([2, 'a']),
      new Tuple([1, 'c'])
    ]
    const O = getOrd(ordNumber, ordString)
    assert.deepEqual(sort(O)(tuples), [
      new Tuple([1, 'b']),
      new Tuple([1, 'c']),
      new Tuple([2, 'a']),
      new Tuple([2, 'c'])
    ])
  })
})
