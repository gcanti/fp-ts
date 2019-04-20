import * as assert from 'assert'
import { left, right } from '../src/Either'
import { empty, freeGroup, getGroup, getSetoid, normalize } from '../src/FreeGroup'
import { setoidNumber } from '../src/Setoid'

const fromArrayS = normalize(setoidNumber)

describe('FreeGroup', () => {
  it('normalize', () => {
    const canonicalS = normalize(setoidNumber)
    assert.deepStrictEqual(canonicalS([]), [])
    assert.deepStrictEqual(canonicalS([right(1)]), [right(1)])
    assert.deepStrictEqual(canonicalS([right(1), left(1)]), [])
    assert.deepStrictEqual(canonicalS([right(0), right(1), left(1), left(0)]), [])
    assert.deepStrictEqual(canonicalS([right(2), right(0), right(1), left(1), left(0), left(-2)]), [right(2), left(-2)])
  })

  it('getSetoid', () => {
    const S = getSetoid(setoidNumber)
    assert.strictEqual(S.equals(empty, empty), true)
    assert.strictEqual(S.equals(fromArrayS([right(1)]), fromArrayS([right(1)])), true)
    assert.strictEqual(S.equals(fromArrayS([right(1), left(1)]), fromArrayS([right(-1), left(-1)])), true)
    assert.strictEqual(S.equals(fromArrayS([right(1)]), empty), false)
  })

  it('getGroup', () => {
    const G = getGroup(setoidNumber)
    assert.deepStrictEqual(G.concat(fromArrayS([right(1), left(-1)]), fromArrayS([right(-1), left(1)])), empty)
    assert.deepStrictEqual(G.inverse(empty), empty)
    assert.deepStrictEqual(G.inverse(fromArrayS([right(1)])), fromArrayS([left(1)]))
    assert.deepStrictEqual(G.inverse(fromArrayS([right(1), left(-2)])), fromArrayS([right(-2), left(1)]))
  })

  it('of', () => {
    assert.deepStrictEqual(freeGroup.of(1), [right(1)])
  })

  it('map', () => {
    assert.deepStrictEqual(freeGroup.map(freeGroup.of(1), n => n > 1), freeGroup.of(false))
    assert.deepStrictEqual(freeGroup.map(freeGroup.of(2), n => n > 1), freeGroup.of(true))
  })

  it('ap', () => {
    const gt1 = (n: number): boolean => n > 1
    const lt2 = (n: number): boolean => n < 2
    const fab = [left(gt1), right(lt2)]
    const fa = [left(1), right(1), left(2), right(2)]
    assert.deepStrictEqual(freeGroup.ap(fab, fa), [
      left(false),
      right(false),
      left(true),
      right(true),
      left(true),
      right(true),
      left(false),
      right(false)
    ])
  })

  it('chain', () => {
    const fa = [left(1), right(1), left(2), right(2)]
    const f = (n: number) => [left(n > 1), right(n > 1), left(n < 2), right(n < 2)]
    assert.deepStrictEqual(freeGroup.chain(fa, f), [
      left(false),
      right(false),
      left(true),
      right(true),
      left(false),
      right(false),
      left(true),
      right(true),
      left(true),
      right(true),
      left(false),
      right(false),
      left(true),
      right(true),
      left(false),
      right(false)
    ])
  })
})
