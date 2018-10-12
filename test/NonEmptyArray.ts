import * as assert from 'assert'
import { fold, monoidSum, monoidString } from '../src/Monoid'
import { NonEmptyArray, nonEmptyArray, fromArray, getSemigroup, group, groupSort } from '../src/NonEmptyArray'
import { none, option, some } from '../src/Option'
import { ordNumber } from '../src/Ord'
import * as F from '../src/Foldable'
import { identity } from '../src/function'
import * as T from '../src/Traversable'

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
      nonEmptyArray.traverse(option)(new NonEmptyArray(1, [2, 3]), n => (n >= 0 ? some(n) : none)),
      some(new NonEmptyArray(1, [2, 3]))
    )
    assert.deepEqual(nonEmptyArray.traverse(option)(new NonEmptyArray(1, [2, 3]), n => (n >= 2 ? some(n) : none)), none)
  })

  it('sequence', () => {
    const old = T.sequence(option, nonEmptyArray)
    const sequence = nonEmptyArray.sequence(option)
    const x1 = new NonEmptyArray(some(1), [some(2), some(3)])
    assert.deepEqual(sequence(x1), some(new NonEmptyArray(1, [2, 3])))
    assert.deepEqual(sequence(x1), old(x1))
    const x2 = new NonEmptyArray(none, [some(2), some(3)])
    assert.deepEqual(sequence(x2), none)
    assert.deepEqual(sequence(x2), old(x2))
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

  it('foldMap', () => {
    const old = F.foldMap(nonEmptyArray, monoidString)
    const foldMap = nonEmptyArray.foldMap(monoidString)
    const x1 = new NonEmptyArray('a', ['b', 'c'])
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'abc')
    assert.strictEqual(foldMap(x1, f1), old(x1, f1))
  })

  it('foldr', () => {
    const old = F.foldr(nonEmptyArray)
    const foldr = nonEmptyArray.foldr
    const x1 = new NonEmptyArray('a', ['b', 'c'])
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'cba')
    assert.strictEqual(foldr(x1, init1, f1), old(x1, init1, f1))
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

  it('group', () => {
    assert.deepEqual(group(ordNumber)([]), [])

    assert.deepEqual(group(ordNumber)([1, 2, 1, 1]), [
      new NonEmptyArray(1, []),
      new NonEmptyArray(2, []),
      new NonEmptyArray(1, [1])
    ])

    assert.deepEqual(group(ordNumber)([1, 2, 1, 1, 3]), [
      new NonEmptyArray(1, []),
      new NonEmptyArray(2, []),
      new NonEmptyArray(1, [1]),
      new NonEmptyArray(3, [])
    ])
  })

  it('groupSort', () => {
    assert.deepEqual(groupSort(ordNumber)([]), [])
    assert.deepEqual(groupSort(ordNumber)([1, 2, 1, 1]), [new NonEmptyArray(1, [1, 1]), new NonEmptyArray(2, [])])
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
