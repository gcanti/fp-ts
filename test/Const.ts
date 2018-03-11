import * as assert from 'assert'
import { Const, getSetoid, getApply } from '../src/Const'
import { setoidNumber } from '../src/Setoid'
import { semigroupSum } from '../src/Semigroup'

describe('Const', () => {
  it('getSetoid', () => {
    const S = getSetoid<number, string>(setoidNumber)
    assert.strictEqual(S.equals(new Const(1), new Const(1)), true)
    assert.strictEqual(S.equals(new Const(1), new Const(2)), false)
  })

  it('getApply', () => {
    const A = getApply(semigroupSum)
    assert.deepEqual(A.ap(new Const<number, (s: string) => string>(1), new Const<number, string>(1)), new Const(2))
  })
})
