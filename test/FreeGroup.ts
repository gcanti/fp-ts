import * as assert from 'assert'
import { left, right } from '../src/Either'
import { empty, freeGroup, FreeGroup, fromArray, getGroup, normalize, getEq } from '../src/FreeGroup'
import { eqNumber } from '../src/Eq'

const fromArrayS = fromArray(eqNumber)

describe('FreeGroup', () => {
  it('normalize', () => {
    const canonicalS = normalize(eqNumber)
    assert.deepStrictEqual(canonicalS([]), [])
    assert.deepStrictEqual(canonicalS([right(1)]), [right(1)])
    assert.deepStrictEqual(canonicalS([right(1), left(1)]), [])
    assert.deepStrictEqual(canonicalS([right(0), right(1), left(1), left(0)]), [])
    assert.deepStrictEqual(canonicalS([right(2), right(0), right(1), left(1), left(0), left(-2)]), [right(2), left(-2)])
  })

  it('getEq', () => {
    const S = getEq(eqNumber)
    assert.strictEqual(S.equals(empty, empty), true)
    assert.strictEqual(S.equals(fromArrayS([right(1)]), fromArrayS([right(1)])), true)
    assert.strictEqual(S.equals(fromArrayS([right(1), left(1)]), fromArrayS([right(-1), left(-1)])), true)
    assert.strictEqual(S.equals(fromArrayS([right(1)]), empty), false)
  })

  it('getGroup', () => {
    const G = getGroup(eqNumber)
    assert.deepStrictEqual(G.concat(fromArrayS([right(1), left(-1)]), fromArrayS([right(-1), left(1)])), empty)
    assert.deepStrictEqual(G.inverse(empty), empty)
    assert.deepStrictEqual(G.inverse(fromArrayS([right(1)])), fromArrayS([left(1)]))
    assert.deepStrictEqual(G.inverse(fromArrayS([right(1), left(-2)])), fromArrayS([right(-2), left(1)]))
  })

  it('of', () => {
    assert.deepStrictEqual(freeGroup.of(1), new FreeGroup([right<number, number>(1)]))
  })

  it('map', () => {
    assert.deepStrictEqual(freeGroup.map(freeGroup.of(1), n => n > 1), freeGroup.of(false))
    assert.deepStrictEqual(freeGroup.map(freeGroup.of(2), n => n > 1), freeGroup.of(true))
  })

  it('ap', () => {
    const gt1 = (n: number): boolean => n > 1
    const lt2 = (n: number): boolean => n < 2
    const fab = new FreeGroup<(n: number) => boolean>([left(gt1), right(lt2)])
    const fa = new FreeGroup<number>([left(1), right(1), left(2), right(2)])
    assert.deepStrictEqual(
      freeGroup.ap(fab, fa),
      new FreeGroup([
        left<boolean, boolean>(false),
        right<boolean, boolean>(false),
        left<boolean, boolean>(true),
        right<boolean, boolean>(true),
        left<boolean, boolean>(true),
        right<boolean, boolean>(true),
        left<boolean, boolean>(false),
        right<boolean, boolean>(false)
      ])
    )
    assert.deepStrictEqual(fab.ap_(fa), fa.ap(fab))
  })

  it('chain', () => {
    const fa = new FreeGroup<number>([left(1), right(1), left(2), right(2)])
    const f = (n: number) =>
      new FreeGroup([
        left<boolean, boolean>(n > 1),
        right<boolean, boolean>(n > 1),
        left<boolean, boolean>(n < 2),
        right<boolean, boolean>(n < 2)
      ])
    assert.deepStrictEqual(
      freeGroup.chain(fa, f),
      new FreeGroup([
        left<boolean, boolean>(false),
        right<boolean, boolean>(false),
        left<boolean, boolean>(true),
        right<boolean, boolean>(true),
        left<boolean, boolean>(false),
        right<boolean, boolean>(false),
        left<boolean, boolean>(true),
        right<boolean, boolean>(true),
        left<boolean, boolean>(true),
        right<boolean, boolean>(true),
        left<boolean, boolean>(false),
        right<boolean, boolean>(false),
        left<boolean, boolean>(true),
        right<boolean, boolean>(true),
        left<boolean, boolean>(false),
        right<boolean, boolean>(false)
      ])
    )
  })
})
