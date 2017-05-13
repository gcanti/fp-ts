import * as assert from 'assert'
import {
  fold,
  monoidSum,
  getFunctionStaticMonoid,
  monoidAll,
  monoidAny
} from '../src/Monoid'
import { filter } from '../src/Array'

describe('Monoid', () => {

  it('fold', () => {
    assert.strictEqual(fold(monoidSum, [1, 2, 3]), 6)
  })

  it('getFunctionStaticMonoid', () => {
    const getPredicateStaticMonoidAll = getFunctionStaticMonoid(monoidAll)
    const getPredicateStaticMonoidAny = getFunctionStaticMonoid(monoidAny)

    const isLessThan10 = (n: number) => n <= 10
    const isEven = (n: number) => n % 2 === 0

    assert.deepEqual(filter(fold(getPredicateStaticMonoidAll<number>(), [isLessThan10, isEven]), [1, 2, 3, 40]), [2])
    assert.deepEqual(filter(fold(getPredicateStaticMonoidAny<number>(), [isLessThan10, isEven]), [1, 2, 3, 40, 41]), [1, 2, 3, 40])
  })

})
