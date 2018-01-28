import * as assert from 'assert'
import {
  fold,
  monoidSum,
  getFunctionMonoid,
  monoidAll,
  monoidAny,
  getArrayMonoid,
  getRecordMonoid,
  monoidString
} from '../src/Monoid'
import { filter } from '../src/Array'

describe('Monoid', () => {
  it('fold', () => {
    assert.strictEqual(fold(monoidSum)([1, 2, 3]), 6)
  })

  it('getFunctionMonoid', () => {
    const getPredicateMonoidAll = getFunctionMonoid(monoidAll)
    const getPredicateMonoidAny = getFunctionMonoid(monoidAny)

    const isLessThan10 = (n: number) => n <= 10
    const isEven = (n: number) => n % 2 === 0

    assert.deepEqual(filter(fold(getPredicateMonoidAll<number>())([isLessThan10, isEven]))([1, 2, 3, 40]), [2])
    assert.deepEqual(filter(fold(getPredicateMonoidAny<number>())([isLessThan10, isEven]))([1, 2, 3, 40, 41]), [
      1,
      2,
      3,
      40
    ])
  })

  it('getArrayMonoid', () => {
    assert.deepEqual(getArrayMonoid<number>().concat([1], [2]), [1, 2])
  })

  it('getRecordMonoid', () => {
    interface T {
      a: boolean
      b: string
    }
    const M = getRecordMonoid<T>({
      a: monoidAll,
      b: monoidString
    })
    assert.deepEqual(M.concat({ a: true, b: 'foo' }, M.empty), { a: true, b: 'foo' })
  })
})
