import * as assert from 'assert'
import { monoidAll, monoidString, monoidSum } from '../src/Monoid'
import { ordNumber } from '../src/Ord'
import {
  fold,
  getArraySemigroup,
  getDictionarySemigroup,
  getFirstSemigroup,
  getJoinSemigroup,
  getMeetSemigroup,
  getObjectSemigroup,
  getProductSemigroup,
  getRecordSemigroup,
  semigroupProduct,
  semigroupSum,
  semigroupVoid
} from '../src/Semigroup'

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
    assert.deepStrictEqual(S.concat({ a: true, b: 'foo' }, { a: false, b: 'bar' }), { a: false, b: 'foobar' })
  })

  it('getMeetSemigroup', () => {
    assert.strictEqual(getMeetSemigroup(ordNumber).concat(1, 2), 1)
  })

  it('getJoinSemigroup', () => {
    assert.strictEqual(getJoinSemigroup(ordNumber).concat(1, 2), 2)
  })

  it('getProductSemigroup', () => {
    assert.deepStrictEqual(getProductSemigroup(monoidString, monoidSum).concat(['a', 2], ['b', 3]), ['ab', 5])
  })

  it('getArraySemigroup', () => {
    assert.deepStrictEqual(getArraySemigroup<number>().concat([1], [2]), [1, 2])
  })

  it('getDictionarySemigroup', () => {
    type NumberDictionary = { [key: string]: number }
    const foo: NumberDictionary = {
      foo: 123,
      bar: 123
    }
    const bar: NumberDictionary = {
      foo: 456,
      fff: 456
    }
    // tslint:disable-next-line: deprecation
    const S = getDictionarySemigroup(semigroupSum)
    const result = S.concat(foo, bar)
    const expected = {
      bar: foo.bar,
      foo: foo.foo + bar.foo,
      fff: bar.fff
    }
    assert.deepStrictEqual(result, expected)
  })

  it('getObjectSemigroup', () => {
    type T = {
      foo?: number
      bar: string
    }
    const foo: T = {
      foo: 123,
      bar: '456'
    }
    const bar: T = {
      bar: '123'
    }
    const S = getObjectSemigroup<T>()
    const result = S.concat(foo, bar)
    const expected = Object.assign({}, foo, bar)
    assert.strictEqual(result.foo, expected.foo)
    assert.strictEqual(result.bar, expected.bar)
  })

  it('semigroupProduct', () => {
    assert.strictEqual(semigroupProduct.concat(2, 3), 6)
  })

  it('getFirstSemigroup', () => {
    assert.deepStrictEqual(getFirstSemigroup<number>().concat(1, 2), 1)
  })

  it('semigroupVoid', () => {
    assert.deepStrictEqual(semigroupVoid.concat(undefined, undefined), undefined)
  })
})
