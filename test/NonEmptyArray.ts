import * as assert from 'assert'
import { NonEmptyArray, nonEmptyArray } from '../src/NonEmptyArray'
import { monoidSum, fold } from '../src/Monoid'
import { traverse } from '../src/Traversable'
import { none, some, option } from '../src/Option'
import { ordNumber } from '../src/Ord'

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
  })

  it('chain', () => {
    const x = new NonEmptyArray(1, [2])
    const f = (a: number) => new NonEmptyArray(a, [4])
    assert.deepEqual(x.chain(f).toArray(), [1, 4, 2, 4])
  })

  it('extend', () => {
    const sum = (as: NonEmptyArray<number>) => fold(monoidSum)(as.toArray())
    assert.deepEqual(new NonEmptyArray(1, [2, 3, 4]).extend(sum), new NonEmptyArray(10, [9, 7, 4]))
  })

  it('extract', () => {
    assert.strictEqual(new NonEmptyArray(1, [2, 3]).extract(), 1)
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
})
