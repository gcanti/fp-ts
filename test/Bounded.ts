import * as assert from 'assert'
import { boundedNumber, Bounded } from '../src/Bounded'
import { fold, getMeetSemigroup, getJoinSemigroup } from '../src/Semigroup'

describe('Bounded', () => {
  it('boundedNumber', () => {
    const min_ = <A>(B: Bounded<A>): ((as: Array<A>) => A) => fold(getMeetSemigroup(B))(B.top)
    const max_ = <A>(B: Bounded<A>): ((as: Array<A>) => A) => fold(getJoinSemigroup(B))(B.bottom)
    const min = min_(boundedNumber)
    const max = max_(boundedNumber)
    assert.strictEqual(min([9, 2, 6, 1]), 1)
    assert.strictEqual(max([9, 2, 6, 1]), 9)
  })
})
