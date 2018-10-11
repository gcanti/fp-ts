import * as assert from 'assert'
import * as I from '../src/Identity'
import { setoidNumber } from '../src/Setoid'
import { right, left, either } from '../src/Either'
import { sequence } from '../src/Traversable'
import { monoidString } from '../src/Monoid'
import * as F from '../src/Foldable'
import { identity } from '../src/function'

describe('Identity', () => {
  it('map', () => {
    const double = (n: number): number => n * 2
    const x = new I.Identity(1)
    const expected = new I.Identity(2)
    assert.deepEqual(x.map(double), expected)
    assert.deepEqual(I.identity.map(x, double), expected)
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = I.identity.of(double)
    const fa = new I.Identity(1)
    const expected = new I.Identity(2)
    assert.deepEqual(fa.ap(fab), expected)
    assert.deepEqual(fab.ap_(fa), expected)
    assert.deepEqual(I.identity.ap(fab, fa), expected)
  })

  it('chain', () => {
    const f = (n: number) => I.identity.of(n * 2)
    const x = new I.Identity(1)
    const expected = new I.Identity(2)
    assert.deepEqual(x.chain(f), expected)
    assert.deepEqual(I.identity.chain(x, f), expected)
  })

  it('reduce', () => {
    const x = new I.Identity('b')
    const expected = 'ab'
    assert.deepEqual(x.reduce('a', (b, a) => b + a), expected)
    assert.deepEqual(I.identity.reduce(x, 'a', (b, a) => b + a), expected)
  })

  it('foldMap', () => {
    const old = F.foldMap(I.identity, monoidString)
    const foldMap = I.identity.foldMap(monoidString)
    const x1 = new I.Identity('a')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'a')
    assert.strictEqual(foldMap(x1, f1), old(x1, f1))
  })

  it('foldr', () => {
    const old = F.foldr(I.identity)
    const foldr = I.identity.foldr
    const x1 = new I.Identity('a')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'a')
    assert.strictEqual(foldr(x1, init1, f1), old(x1, init1, f1))
  })

  it('alt', () => {
    const x = new I.Identity(1)
    const y = new I.Identity(2)
    assert.strictEqual(x.alt(y), x)
    assert.strictEqual(I.identity.alt(x, y), x)
  })

  it('extract', () => {
    const x = new I.Identity(1)
    assert.strictEqual(x.extract(), 1)
    assert.strictEqual(I.identity.extract(x), 1)
  })

  it('extend', () => {
    const f = (fa: I.Identity<string>): number => fa.value.length
    const x = new I.Identity('foo')
    const expected = new I.Identity(3)
    assert.deepEqual(x.extend(f), expected)
    assert.deepEqual(I.identity.extend(x, f), expected)
  })

  it('fold', () => {
    const len = (a: string): number => a.length
    const x = new I.Identity('foo')
    assert.strictEqual(x.fold(len), 3)
  })

  it('toString', () => {
    const x = new I.Identity(1)
    assert.strictEqual(x.toString(), 'new Identity(1)')
    assert.strictEqual(x.inspect(), 'new Identity(1)')
  })

  it('getSetoid', () => {
    const S = I.getSetoid(setoidNumber)
    assert.strictEqual(S.equals(new I.Identity(1), new I.Identity(1)), true)
    assert.strictEqual(S.equals(new I.Identity(1), new I.Identity(2)), false)
    assert.strictEqual(S.equals(new I.Identity(2), new I.Identity(1)), false)
  })

  it('ChainRec', () => {
    const x = I.identity.chainRec<number, number>(0, a => new I.Identity(a < 10 ? left(a + 1) : right(a)))
    const expected = new I.Identity(10)
    assert.deepEqual(x, expected)
  })

  it('traverse', () => {
    const x = sequence(either, I.identity)(new I.Identity(right(1)))
    const expected = right(new I.Identity(1))
    assert.deepEqual(x, expected)
  })

  it('orElse', () => {
    assert.deepEqual(new I.Identity(123).orElse(() => new I.Identity(456)), new I.Identity(123))
  })
})
