import * as assert from 'assert'
import { wiltDefault, wilted, witherDefault, withered } from '../src/Witherable'
import { array } from '../src/Array'
import { Identity, identity as I } from '../src/Identity'
import { left, right } from '../src/Either'
import { none, some } from '../src/Option'

describe('Witherable', () => {
  it('wiltDefault', () => {
    const f = (x: number) => (x > 2 ? new Identity(right(x * 10)) : new Identity(left(x)))
    const list = [1, 2, 3]
    const { URI, traverse, separate } = array
    const wilt = wiltDefault({
      URI,
      traverse,
      separate
    })
    const wiltIdentity = wilt(I)
    assert.deepEqual(wiltIdentity(list, f), new Identity({ left: [1, 2], right: [30] }))
  })

  it('witherDefault', () => {
    const f = (x: number) => (x > 2 ? new Identity(some(x * 10)) : new Identity(none))
    const list = [1, 2, 3]
    const { URI, traverse, compact } = array
    const wither = witherDefault({
      URI,
      traverse,
      compact
    })
    const witherIdentity = wither(I)
    assert.deepEqual(witherIdentity(list, f), new Identity([30]))
  })

  describe('', () => {
    const { URI, traverse, compact, separate } = array
    const wither = witherDefault({
      URI,
      traverse,
      compact
    })
    const wilt = wiltDefault({
      URI,
      traverse,
      separate
    })

    const witherableArray = {
      ...array,
      wilt,
      wither
    }

    it('withered', () => {
      const w = withered(witherableArray, I)
      assert.deepEqual(w([]), new Identity([]))
      assert.deepEqual(w([new Identity(none)]), new Identity([]))
      assert.deepEqual(w([new Identity(none), new Identity(some(123))]), new Identity([123]))
    })

    it('wilted', () => {
      const w = wilted(witherableArray, I)
      assert.deepEqual(w([]), new Identity({ left: [], right: [] }))
      assert.deepEqual(
        w([new Identity(left(123)), new Identity(right('foo'))]),
        new Identity({ left: [123], right: ['foo'] })
      )
    })
  })
})
