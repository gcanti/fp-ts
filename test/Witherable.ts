import * as assert from 'assert'
import { wiltDefault, witherDefault } from '../src/Witherable'
import { array } from '../src/Array'
import { Identity, identity as I } from '../src/Identity'
import { left, right } from '../src/Either'
import { none, some } from '../src/Option'

describe('Witherable', () => {
  it('wiltDefault', () => {
    const f = (x: number) => (x > 2 ? new Identity(right(x * 10)) : new Identity(left(x)))
    const list = [1, 2, 3]
    const wilt = wiltDefault(array, I)
    assert.deepEqual(wilt(list, f), new Identity({ left: [1, 2], right: [30] }))
  })

  it('witherDefault', () => {
    const f = (x: number) => (x > 2 ? new Identity(some(x * 10)) : new Identity(none))
    const list = [1, 2, 3]
    const wither = witherDefault(array, I)
    const result = wither(list, f)
    const expected = new Identity([30])
    assert.deepEqual(result, expected)
  })
})
