import * as assert from 'assert'
import { left, right } from '../src/Either'
import { empty, freeGroup, FreeGroup, fromArray, getGroup, getSetoid, normalize } from '../src/FreeGroup'
import { setoidNumber } from '../src/Setoid'

const fromArrayS = fromArray(setoidNumber)

describe('FreeGroup', () => {
  it('normalize', () => {
    const canonicalS = normalize(setoidNumber)
    assert.deepEqual(canonicalS([]), [])
    assert.deepEqual(canonicalS([right(1)]), [right(1)])
    assert.deepEqual(canonicalS([right(1), left(1)]), [])
    assert.deepEqual(canonicalS([right(0), right(1), left(1), left(0)]), [])
    assert.deepEqual(canonicalS([right(2), right(0), right(1), left(1), left(0), left(-2)]), [right(2), left(-2)])
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
    assert.deepEqual(G.concat(fromArrayS([right(1), left(-1)]), fromArrayS([right(-1), left(1)])), empty)
    assert.deepEqual(G.inverse(empty), empty)
    assert.deepEqual(G.inverse(fromArrayS([right(1)])), fromArrayS([left(1)]))
    assert.deepEqual(G.inverse(fromArrayS([right(1), left(-2)])), fromArrayS([right(-2), left(1)]))
  })

  it('of', () => {
    assert.deepEqual(freeGroup.of(1), new FreeGroup([right(1)]))
  })

  it('map', () => {
    assert.deepEqual(freeGroup.map(freeGroup.of(1), n => n > 1), freeGroup.of(false))
    assert.deepEqual(freeGroup.map(freeGroup.of(2), n => n > 1), freeGroup.of(true))
  })

  it('ap', () => {
    const gt1 = (n: number): boolean => n > 1
    const lt2 = (n: number): boolean => n < 2
    const fab = new FreeGroup<(n: number) => boolean>([left(gt1), right(lt2)])
    const fa = new FreeGroup<number>([left(1), right(1), left(2), right(2)])
    assert.deepEqual(
      freeGroup.ap(fab, fa),
      new FreeGroup([
        left(false),
        right(false),
        left(true),
        right(true),
        left(true),
        right(true),
        left(false),
        right(false)
      ])
    )
    assert.deepEqual(fab.ap_(fa), fa.ap(fab))
  })

  it('chain', () => {
    const fa = new FreeGroup<number>([left(1), right(1), left(2), right(2)])
    const f = (n: number) => new FreeGroup([left(n > 1), right(n > 1), left(n < 2), right(n < 2)])
    assert.deepEqual(
      freeGroup.chain(fa, f),
      new FreeGroup([
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
    )
  })
})
