import * as assert from 'assert'
import { Identity, identity, getSetoid } from '../src/Identity'
import { setoidNumber } from '../src/Setoid'
import { right, left, either } from '../src/Either'
import { sequence } from '../src/Traversable'

describe('Identity', () => {
  it('map', () => {
    const double = (n: number): number => n * 2
    const x = new Identity(1)
    const expected = new Identity(2)
    assert.deepEqual(x.map(double), expected)
    assert.deepEqual(identity.map(x, double), expected)
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = identity.of(double)
    const fa = new Identity(1)
    const expected = new Identity(2)
    assert.deepEqual(fa.ap(fab), expected)
    assert.deepEqual(fab.ap_(fa), expected)
    assert.deepEqual(identity.ap(fab, fa), expected)
  })

  it('chain', () => {
    const f = (n: number) => identity.of(n * 2)
    const x = new Identity(1)
    const expected = new Identity(2)
    assert.deepEqual(x.chain(f), expected)
    assert.deepEqual(identity.chain(x, f), expected)
  })

  it('reduce', () => {
    const x = new Identity('b')
    const expected = 'ab'
    assert.deepEqual(x.reduce('a', (b, a) => b + a), expected)
    assert.deepEqual(identity.reduce(x, 'a', (b, a) => b + a), expected)
  })

  it('alt', () => {
    const x = new Identity(1)
    const y = new Identity(2)
    assert.strictEqual(x.alt(y), x)
    assert.strictEqual(identity.alt(x, y), x)
  })

  it('extract', () => {
    const x = new Identity(1)
    assert.strictEqual(x.extract(), 1)
    assert.strictEqual(identity.extract(x), 1)
  })

  it('extend', () => {
    const f = (fa: Identity<string>): number => fa.value.length
    const x = new Identity('foo')
    const expected = new Identity(3)
    assert.deepEqual(x.extend(f), expected)
    assert.deepEqual(identity.extend(x, f), expected)
  })

  it('fold', () => {
    const len = (a: string): number => a.length
    const x = new Identity('foo')
    assert.strictEqual(x.fold(len), 3)
  })

  it('toString', () => {
    const x = new Identity(1)
    assert.strictEqual(x.toString(), 'new Identity(1)')
    assert.strictEqual(x.inspect(), 'new Identity(1)')
  })

  it('getSetoid', () => {
    const S = getSetoid(setoidNumber)
    assert.strictEqual(S.equals(new Identity(1), new Identity(1)), true)
    assert.strictEqual(S.equals(new Identity(1), new Identity(2)), false)
    assert.strictEqual(S.equals(new Identity(2), new Identity(1)), false)
  })

  it('ChainRec', () => {
    const x = identity.chainRec<number, number>(0, a => new Identity(a < 10 ? left(a + 1) : right(a)))
    const expected = new Identity(10)
    assert.deepEqual(x, expected)
  })

  it('traverse', () => {
    const x = sequence(either, identity)(new Identity(right(1)))
    const expected = right(new Identity(1))
    assert.deepEqual(x, expected)
  })

  it('orElse', () => {
    assert.deepEqual(new Identity(123).orElse(() => new Identity(456)), new Identity(123))
  })
})
