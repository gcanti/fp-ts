import * as assert from 'assert'
import { filter } from '../src/Array'
import {
  fold,
  getArrayMonoid,
  getDictionaryMonoid,
  getEndomorphismMonoid,
  getFunctionMonoid,
  getRecordMonoid,
  monoidAll,
  monoidAny,
  monoidString,
  monoidSum,
  getProductMonoid,
  getMeetMonoid,
  getJoinMonoid,
  getTupleMonoid
} from '../src/Monoid'
import { semigroupSum } from '../src/Semigroup'
import { boundedNumber } from '../src/Bounded'

describe('Monoid', () => {
  it('getTupleMonoid', () => {
    const M1 = getTupleMonoid(monoidString, monoidSum)
    assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
    const M2 = getTupleMonoid(monoidString, monoidSum, monoidAll)
    assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
  })

  it('fold', () => {
    assert.strictEqual(fold(monoidSum)([1, 2, 3]), 6)
  })

  it('getFunctionMonoid', () => {
    const getPredicateMonoidAll = getFunctionMonoid(monoidAll)
    const getPredicateMonoidAny = getFunctionMonoid(monoidAny)

    const isLessThan10 = (n: number) => n <= 10
    const isEven = (n: number) => n % 2 === 0

    assert.deepStrictEqual(filter([1, 2, 3, 40], fold(getPredicateMonoidAll<number>())([isLessThan10, isEven])), [2])
    assert.deepStrictEqual(filter([1, 2, 3, 40, 41], fold(getPredicateMonoidAny<number>())([isLessThan10, isEven])), [
      1,
      2,
      3,
      40
    ])
  })

  it('getArrayMonoid', () => {
    assert.deepStrictEqual(getArrayMonoid<number>().concat([1], [2]), [1, 2])
  })

  it('getRecordMonoid', () => {
    interface T {
      a: boolean
      b: string
    }
    // tslint:disable-next-line: deprecation
    const M = getRecordMonoid<T>({
      a: monoidAll,
      b: monoidString
    })
    assert.deepStrictEqual(M.concat({ a: true, b: 'foo' }, M.empty), { a: true, b: 'foo' })
    assert.deepStrictEqual(M.concat({ a: true, b: 'foo' }, { a: false, b: 'bar' }), { a: false, b: 'foobar' })
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
    // tslint:disable-next-line: deprecation
    const M1 = getDictionaryMonoid(semigroupSum)
    assert.deepStrictEqual(fold(M1)([foo, bar]), {
      bar: foo.bar,
      foo: foo.foo + bar.foo,
      fff: bar.fff
    })
    type Keys = 'a' | 'b'
    // tslint:disable-next-line: deprecation
    const M2 = getDictionaryMonoid<Keys, number>(semigroupSum)
    assert.deepStrictEqual(fold(M2)([{ a: 1, b: 2 }, { a: 3, b: 4 }]), {
      a: 4,
      b: 6
    })
  })

  it('getProductMonoid', () => {
    // tslint:disable-next-line: deprecation
    const M = getProductMonoid(monoidString, monoidSum)
    assert.deepStrictEqual(M.empty, ['', 0])
  })

  it('getMeetMonoid', () => {
    const M = getMeetMonoid(boundedNumber)
    assert.deepStrictEqual(fold(M)([]), +Infinity)
    assert.deepStrictEqual(fold(M)([1]), 1)
    assert.deepStrictEqual(fold(M)([1, -1]), -1)
  })

  it('getJoinMonoid', () => {
    const M = getJoinMonoid(boundedNumber)
    assert.deepStrictEqual(fold(M)([]), -Infinity)
    assert.deepStrictEqual(fold(M)([1]), 1)
    assert.deepStrictEqual(fold(M)([1, -1]), 1)
  })
})
