import * as assert from 'assert'
import { fold, monoidSum } from '../src/Monoid'
import { NonEmptyArray, nonEmptyArray, fromArray, getSemigroup } from '../src/NonEmptyArray'
import { none, option, some } from '../src/Option'
import { ordNumber } from '../src/Ord'
import { traverse } from '../src/Traversable'

describe('NonEmptyArray', () => {
  it('concat', () => {
    const x = new NonEmptyArray(1, [2])
    const y = new NonEmptyArray(3, [4])
    assert.deepEqual(x.concat(y).toArray(), [1, 2, 3, 4])
  })

  it('map', () => {
    const x = new NonEmptyArray(1, [2])
    const double = (n: number) => n * 2
    assert.deepEqual(x.map(double).toArray(), [2, 4])
    assert.deepEqual(nonEmptyArray.map(x, double).toArray(), [2, 4])
  })

  it('ap', () => {
    assert.deepEqual(nonEmptyArray.of(1), new NonEmptyArray(1, []))
  })

  it('ap', () => {
    const x = new NonEmptyArray(1, [2])
    const double = (n: number) => n * 2
    assert.deepEqual(x.ap(new NonEmptyArray(double, [double])).toArray(), [2, 4, 2, 4])
    assert.deepEqual(nonEmptyArray.ap(new NonEmptyArray(double, [double]), x).toArray(), [2, 4, 2, 4])
    assert.deepEqual(new NonEmptyArray(double, [double]).ap_(x).toArray(), [2, 4, 2, 4])
  })

  it('chain', () => {
    const x = new NonEmptyArray(1, [2])
    const f = (a: number) => new NonEmptyArray(a, [4])
    assert.deepEqual(x.chain(f).toArray(), [1, 4, 2, 4])
    assert.deepEqual(nonEmptyArray.chain(x, f).toArray(), [1, 4, 2, 4])
  })

  it('extend', () => {
    const sum = (as: NonEmptyArray<number>) => fold(monoidSum)(as.toArray())
    assert.deepEqual(new NonEmptyArray(1, [2, 3, 4]).extend(sum), new NonEmptyArray(10, [9, 7, 4]))
    assert.deepEqual(nonEmptyArray.extend(new NonEmptyArray(1, [2, 3, 4]), sum), new NonEmptyArray(10, [9, 7, 4]))
  })

  it('extract', () => {
    assert.strictEqual(new NonEmptyArray(1, [2, 3]).extract(), 1)
    assert.strictEqual(nonEmptyArray.extract(new NonEmptyArray(1, [2, 3])), 1)
  })

  it('traverse', () => {
    assert.deepEqual(
      traverse(option, nonEmptyArray)(new NonEmptyArray(1, [2, 3]), n => (n >= 0 ? some(n) : none)),
      some(new NonEmptyArray(1, [2, 3]))
    )
    assert.deepEqual(
      traverse(option, nonEmptyArray)(new NonEmptyArray(1, [2, 3]), n => (n >= 2 ? some(n) : none)),
      none
    )
  })

  it('min', () => {
    assert.deepEqual(new NonEmptyArray(1, [2, 3]).min(ordNumber), 1)
    assert.deepEqual(new NonEmptyArray(3, []).min(ordNumber), 3)
  })

  it('max', () => {
    assert.deepEqual(new NonEmptyArray(1, [2, 3]).max(ordNumber), 3)
    assert.deepEqual(new NonEmptyArray(1, []).max(ordNumber), 1)
  })

  it('reduce', () => {
    const x = new NonEmptyArray('a', ['b'])
    assert.strictEqual(x.reduce('', (b, a) => b + a), 'ab')
    assert.strictEqual(nonEmptyArray.reduce(x, '', (b, a) => b + a), 'ab')
  })

  it('toString', () => {
    const x = new NonEmptyArray(1, [2])
    assert.strictEqual(x.toString(), 'new NonEmptyArray(1, [2])')
    assert.strictEqual(x.inspect(), 'new NonEmptyArray(1, [2])')
  })

  it('fromArray', () => {
    assert.deepEqual(fromArray([]), none)
    assert.deepEqual(fromArray([1]), some(new NonEmptyArray(1, [])))
    assert.deepEqual(fromArray([1, 2]), some(new NonEmptyArray(1, [2])))
  })

  it('getSemigroup', () => {
    const S = getSemigroup<number>()
    assert.deepEqual(S.concat(new NonEmptyArray(1, []), new NonEmptyArray(2, [])), new NonEmptyArray(1, [2]))
    assert.deepEqual(S.concat(new NonEmptyArray(1, [2]), new NonEmptyArray(3, [4])), new NonEmptyArray(1, [2, 3, 4]))
  })

  it('last', () => {
    assert.deepEqual(new NonEmptyArray(1, [2, 3]).last(), 3)
    assert.deepEqual(new NonEmptyArray(1, []).last(), 1)
  })

  it('sort', () => {
    assert.deepEqual(new NonEmptyArray(3, [2, 1]).sort(ordNumber), new NonEmptyArray(1, [2, 3]))
  })

  it('reverse', () => {
    const result = new NonEmptyArray(1, [2, 3]).reverse()
    const expected = new NonEmptyArray(3, [2, 1])
    assert.deepEqual(result, expected)
  })
})
