import * as assert from 'assert'
import {
  fold,
  getRecordSemigroup,
  getMeetSemigroup,
  getJoinSemigroup,
  getProductSemigroup,
  getArraySemigroup
} from '../src/Semigroup'
import { monoidString, monoidAll, monoidSum } from '../src/Monoid'
import { ordNumber } from '../src/Ord'

describe('Semigroup', () => {
  it('fold', () => {
    assert.strictEqual(fold(monoidString)('')(['a', 'b', 'c']), 'abc')
  })

  it('getRecordSemigroup', () => {
    interface T {
      a: boolean
      b: string
    }
    const S = getRecordSemigroup<T>({
      a: monoidAll,
      b: monoidString
    })
    assert.deepEqual(S.concat({ a: true, b: 'foo' }, { a: false, b: 'bar' }), { a: false, b: 'foobar' })
  })

  it('getMeetSemigroup', () => {
    assert.strictEqual(getMeetSemigroup(ordNumber).concat(1, 2), 1)
  })

  it('getJoinSemigroup', () => {
    assert.strictEqual(getJoinSemigroup(ordNumber).concat(1, 2), 2)
  })

  it('getProductSemigroup', () => {
    assert.deepEqual(getProductSemigroup(monoidString, monoidSum).concat(['a', 2], ['b', 3]), ['ab', 5])
  })

  it('getArraySemigroup', () => {
    assert.deepEqual(getArraySemigroup<number>().concat([1], [2]), [1, 2])
  })
})
