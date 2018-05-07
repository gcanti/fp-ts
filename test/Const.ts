import * as assert from 'assert'
import { Const, getApply, getSetoid } from '../src/Const'
import { semigroupSum } from '../src/Semigroup'
import { setoidNumber } from '../src/Setoid'

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
