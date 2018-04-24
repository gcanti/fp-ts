import * as assert from 'assert'
import {
  fold,
  monoidSum,
  getFunctionMonoid,
  monoidAll,
  monoidAny,
  getArrayMonoid,
  getRecordMonoid,
  monoidString,
  getEndomorphismMonoid,
  getObjectMonoid,
  getDictionaryMonoid
} from '../src/Monoid'
import { filter } from '../src/Array'
import { semigroupSum } from '../src/Semigroup'

describe('Monoid', () => {
  it('fold', () => {
    assert.strictEqual(fold(monoidSum)([1, 2, 3]), 6)
  })

  it('getFunctionMonoid', () => {
    const getPredicateMonoidAll = getFunctionMonoid(monoidAll)
    const getPredicateMonoidAny = getFunctionMonoid(monoidAny)

    const isLessThan10 = (n: number) => n <= 10
    const isEven = (n: number) => n % 2 === 0

    assert.deepEqual(filter([1, 2, 3, 40], fold(getPredicateMonoidAll<number>())([isLessThan10, isEven])), [2])
    assert.deepEqual(filter([1, 2, 3, 40, 41], fold(getPredicateMonoidAny<number>())([isLessThan10, isEven])), [
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
    assert.deepEqual(M.concat({ a: true, b: 'foo' }, { a: false, b: 'bar' }), { a: false, b: 'foobar' })
  })

  it('getEndomorphismMonoid', () => {
    const M = getEndomorphismMonoid<number>()
    const double = (n: number) => n * 2
    const inc = (n: number) => n + 1
    const f = M.concat(double, inc)
    assert.strictEqual(f(3), 8)
  })

  it('getDictionaryMonoid', () => {
    const foo = {
      foo: 123,
      bar: 123
    }
    const bar = {
      foo: 456,
      fff: 456
    }
    const M = getDictionaryMonoid(semigroupSum)
    const result = fold(M)([foo, bar])
    const expected = {
      bar: foo.bar,
      foo: foo.foo + bar.foo,
      fff: bar.fff
    }
    assert.deepEqual(result, expected)
  })

  it('getObjectMonoid', () => {
    type T = {
      foo?: number
      bar: string
    }
    const foo: T = {
      foo: 123,
      bar: '000'
    }
    const bar: T = {
      bar: '123'
    }
    const M = getObjectMonoid<T>()
    const result = fold(M)([foo, bar])
    const expected = Object.assign({}, foo, bar)
    assert.strictEqual(result.bar, expected.bar)
    assert.strictEqual(result.foo, expected.foo)
  })
})
