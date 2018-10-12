import * as assert from 'assert'
import { left, right } from '../src/Either'
import * as F from '../src/Foldable'
import { identity } from '../src/function'
import * as I from '../src/Identity'
import { monoidString } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { setoidNumber } from '../src/Setoid'
import * as T from '../src/Traversable'

describe('Identity', () => {
  it('map', () => {
    const double = (n: number): number => n * 2
    const x = I.identity.of(1)
    const expected = I.identity.of(2)
    assert.deepEqual(x.map(double), expected)
    assert.deepEqual(I.identity.map(x, double), expected)
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = I.identity.of(double)
    const fa = I.identity.of(1)
    const expected = I.identity.of(2)
    assert.deepEqual(fa.ap(fab), expected)
    assert.deepEqual(fab.ap_(fa), expected)
    assert.deepEqual(I.identity.ap(fab, fa), expected)
  })

  it('chain', () => {
    const f = (n: number) => I.identity.of(n * 2)
    const x = I.identity.of(1)
    const expected = I.identity.of(2)
    assert.deepEqual(x.chain(f), expected)
    assert.deepEqual(I.identity.chain(x, f), expected)
  })

  it('reduce', () => {
    const x = I.identity.of('b')
    const expected = 'ab'
    assert.deepEqual(x.reduce('a', (b, a) => b + a), expected)
    assert.deepEqual(I.identity.reduce(x, 'a', (b, a) => b + a), expected)
  })

  it('foldMap', () => {
    const old = F.foldMap(I.identity, monoidString)
    const foldMap = I.identity.foldMap(monoidString)
    const x1 = I.identity.of('a')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'a')
    assert.strictEqual(foldMap(x1, f1), old(x1, f1))
  })

  it('foldr', () => {
    const old = F.foldr(I.identity)
    const foldr = I.identity.foldr
    const x1 = I.identity.of('a')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'a')
    assert.strictEqual(foldr(x1, init1, f1), old(x1, init1, f1))
  })

  it('alt', () => {
    const x = I.identity.of(1)
    const y = I.identity.of(2)
    assert.strictEqual(x.alt(y), x)
    assert.strictEqual(I.identity.alt(x, y), x)
  })

  it('extract', () => {
    const x = I.identity.of(1)
    assert.strictEqual(x.extract(), 1)
    assert.strictEqual(I.identity.extract(x), 1)
  })

  it('extend', () => {
    const f = (fa: I.Identity<string>): number => fa.value.length
    const x = I.identity.of('foo')
    const expected = I.identity.of(3)
    assert.deepEqual(x.extend(f), expected)
    assert.deepEqual(I.identity.extend(x, f), expected)
  })

  it('fold', () => {
    const len = (a: string): number => a.length
    const x = I.identity.of('foo')
    assert.strictEqual(x.fold(len), 3)
  })

  it('toString', () => {
    const x = I.identity.of(1)
    assert.strictEqual(x.toString(), 'new Identity(1)')
    assert.strictEqual(x.inspect(), 'new Identity(1)')
  })

  it('getSetoid', () => {
    const S = I.getSetoid(setoidNumber)
    assert.strictEqual(S.equals(I.identity.of(1), I.identity.of(1)), true)
    assert.strictEqual(S.equals(I.identity.of(1), I.identity.of(2)), false)
    assert.strictEqual(S.equals(I.identity.of(2), I.identity.of(1)), false)
  })

  it('ChainRec', () => {
    const x = I.identity.chainRec<number, number>(0, a => I.identity.of(a < 10 ? left(a + 1) : right(a)))
    const expected = I.identity.of(10)
    assert.deepEqual(x, expected)
  })

  it('traverse', () => {
    const x1 = I.identity.traverse(option)(I.identity.of(1), some)
    assert.deepEqual(x1, some(I.identity.of(1)))
    const x2 = I.identity.traverse(option)(I.identity.of(1), () => none)
    assert.deepEqual(x2, none)
  })

  it('sequence', () => {
    const old = T.sequence(option, I.identity)
    const sequence = I.identity.sequence(option)
    const x1 = I.identity.of(some('a'))
    assert.deepEqual(sequence(x1), some(I.identity.of('a')))
    assert.deepEqual(sequence(x1), old(x1))
  })

  it('orElse', () => {
    assert.deepEqual(I.identity.of(123).orElse(() => I.identity.of(456)), I.identity.of(123))
  })
})
