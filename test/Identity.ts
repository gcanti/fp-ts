import * as assert from 'assert'
import { left, right } from '../src/Either'
import { identity } from '../src/function'
import * as I from '../src/Identity'
import { monoidString } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { setoidNumber } from '../src/Setoid'
import { showString } from '../src/Show'

describe('Identity', () => {
  it('map', () => {
    const double = (n: number): number => n * 2
    const x = I.identity.of(1)
    const expected = I.identity.of(2)
    assert.deepStrictEqual(I.identity.map(x, double), expected)
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = I.identity.of(double)
    const fa = I.identity.of(1)
    const expected = I.identity.of(2)
    assert.deepStrictEqual(I.identity.ap(fab, fa), expected)
  })

  it('chain', () => {
    const f = (n: number) => I.identity.of(n * 2)
    const x = I.identity.of(1)
    const expected = I.identity.of(2)
    assert.deepStrictEqual(I.identity.chain(x, f), expected)
  })

  it('reduce', () => {
    const x = I.identity.of('b')
    const expected = 'ab'
    assert.deepStrictEqual(I.identity.reduce(x, 'a', (b, a) => b + a), expected)
  })

  it('foldMap', () => {
    const foldMap = I.identity.foldMap(monoidString)
    const x1 = I.identity.of('a')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'a')
  })

  it('foldr', () => {
    const foldr = I.identity.foldr
    const x1 = I.identity.of('a')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'a')
  })

  it('alt', () => {
    const x = I.identity.of(1)
    const y = I.identity.of(2)
    assert.strictEqual(I.identity.alt(x, y), x)
  })

  it('extract', () => {
    const x = I.identity.of(1)
    assert.strictEqual(I.identity.extract(x), 1)
  })

  it('extend', () => {
    const f = (fa: I.Identity<string>): number => fa.length
    const x = I.identity.of('foo')
    const expected = I.identity.of(3)
    assert.deepStrictEqual(I.identity.extend(x, f), expected)
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
    assert.deepStrictEqual(x, expected)
  })

  it('traverse', () => {
    const x1 = I.identity.traverse(option)(I.identity.of(1), some)
    assert.deepStrictEqual(x1, some(I.identity.of(1)))
    const x2 = I.identity.traverse(option)(I.identity.of(1), () => none)
    assert.deepStrictEqual(x2, none)
  })

  it('sequence', () => {
    const sequence = I.identity.sequence(option)
    const x1 = I.identity.of(some('a'))
    assert.deepStrictEqual(sequence(x1), some(I.identity.of('a')))
  })

  it('getShow', () => {
    const S = I.getShow(showString)
    assert.strictEqual(S.show(I.identity.of('a')), `"a"`)
  })
})
