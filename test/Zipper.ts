import * as assert from 'assert'
import { Zipper, zipper, fromArray, getSemigroup, getMonoid, fromNonEmptyArray } from '../src/Zipper'
import { none, some, option } from '../src/Option'
import { semigroupSum } from '../src/Semigroup'
import { monoidSum } from '../src/Monoid'
import { NonEmptyArray } from '../src/NonEmptyArray'

const len = (s: string): number => s.length
const prepend = (a: string) => (s: string): string => a + s
const append = (a: string) => (s: string): string => s + a

describe('Zipper', () => {
  it('update', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d'])
    assert.deepEqual(fa.update('e'), new Zipper(['a', 'b'], 'e', ['d']))
  })

  it('modify', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d'])
    assert.deepEqual(fa.modify(append('!')), new Zipper(['a', 'b'], 'c!', ['d']))
  })

  it('toArray', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d'])
    assert.deepEqual(fa.toArray(), ['a', 'b', 'c', 'd'])
  })

  it('isOutOfBound', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d'])
    assert.deepEqual(fa.isOutOfBound(-1), true)
    assert.deepEqual(fa.isOutOfBound(4), true)
    assert.deepEqual(fa.isOutOfBound(2), false)
  })

  it('up', () => {
    assert.deepEqual(new Zipper(['a', 'b'], 'c', ['d']).up(), some(new Zipper(['a'], 'b', ['c', 'd'])))
    assert.deepEqual(new Zipper([], 'c', ['d']).up(), none)
  })

  it('down', () => {
    assert.deepEqual(new Zipper(['a', 'b'], 'c', ['d', 'e']).down(), some(new Zipper(['a', 'b', 'c'], 'd', ['e'])))
    assert.deepEqual(new Zipper(['a', 'b'], 'c', []).down(), none)
  })

  it('start', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d', 'e'])
    assert.deepEqual(fa.start(), new Zipper([], 'a', ['b', 'c', 'd', 'e']))
    const start = new Zipper([], 1, [2])
    assert.strictEqual(start.start(), start)
  })

  it('end', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d', 'e'])
    assert.deepEqual(fa.end(), new Zipper(['a', 'b', 'c', 'd'], 'e', []))
    const end = new Zipper([1], 2, [])
    assert.strictEqual(end.end(), end)
  })

  it('insertLeft', () => {
    assert.deepEqual(
      new Zipper(['a', 'b'], 'c', ['d', 'e']).insertLeft('f'),
      new Zipper(['a', 'b'], 'f', ['c', 'd', 'e'])
    )
  })

  it('insertRight', () => {
    assert.deepEqual(
      new Zipper(['a', 'b'], 'c', ['d', 'e']).insertRight('f'),
      new Zipper(['a', 'b', 'c'], 'f', ['d', 'e'])
    )
  })

  it('deleteLeft', () => {
    assert.deepEqual(new Zipper(['a', 'b'], 'c', ['d', 'e']).deleteLeft(), some(new Zipper(['a'], 'b', ['d', 'e'])))
    assert.deepEqual(
      new Zipper(['a', 'b', 'c'], 'd', ['e', 'f']).deleteLeft(),
      some(new Zipper(['a', 'b'], 'c', ['e', 'f']))
    )
    assert.deepEqual(new Zipper([], 'c', ['d', 'e']).deleteLeft(), some(new Zipper([], 'd', ['e'])))
    assert.deepEqual(new Zipper([], 1, []).deleteLeft(), none)
  })

  it('deleteRight', () => {
    assert.deepEqual(new Zipper(['a', 'b'], 'c', ['d', 'e']).deleteRight(), some(new Zipper(['a', 'b'], 'd', ['e'])))
    assert.deepEqual(
      new Zipper(['a', 'b'], 'c', ['d', 'e', 'f']).deleteRight(),
      some(new Zipper(['a', 'b'], 'd', ['e', 'f']))
    )
    assert.deepEqual(new Zipper(['a', 'b'], 'c', []).deleteRight(), some(new Zipper(['a'], 'b', [])))
    assert.deepEqual(new Zipper([], 1, []).deleteRight(), none)
  })

  it('map', () => {
    const fa = new Zipper(['a', 'bb'], 'ccc', ['dddd'])
    assert.deepEqual(zipper.map(fa, len), new Zipper([1, 2], 3, [4]))
  })

  it('of', () => {
    assert.deepEqual(zipper.of(1), new Zipper([], 1, []))
  })

  it('ap', () => {
    const fa = new Zipper(['a'], 'b', ['c'])
    const fab = new Zipper([prepend('P1'), append('A1')], prepend('P2'), [append('A2')])
    assert.deepEqual(zipper.ap(fab, fa), new Zipper(['P1a', 'aA1'], 'P2b', ['cA2']))
  })

  it('fromArray', () => {
    assert.deepEqual(fromArray([]), none)
    assert.deepEqual(fromArray([1]), some(new Zipper([], 1, [])))
    assert.deepEqual(fromArray([1], 0), some(new Zipper([], 1, [])))
    assert.deepEqual(fromArray([1], 1), none)
    assert.deepEqual(fromArray([1, 2, 3], 1), some(new Zipper([1], 2, [3])))
  })

  it('fromNonEmptyArray', () => {
    assert.deepEqual(fromNonEmptyArray(new NonEmptyArray(1, [])), new Zipper([], 1, []))
    assert.deepEqual(fromNonEmptyArray(new NonEmptyArray(1, [2, 3])), new Zipper([], 1, [2, 3]))
  })

  it('toString', () => {
    assert.strictEqual(new Zipper([], 1, []).toString(), 'new Zipper([], 1, [])')
    assert.strictEqual(new Zipper([], 1, []).inspect(), 'new Zipper([], 1, [])')
  })

  it('getSemigroup', () => {
    const S = getSemigroup(semigroupSum)
    const x = new Zipper([1, 2], 3, [4])
    const y = new Zipper([5], 6, [7])
    assert.deepEqual(S.concat(x, y), new Zipper([1, 2, 5], 9, [4, 7]))
  })

  it('getMonoid', () => {
    const M = getMonoid(monoidSum)
    const x = new Zipper([1, 2], 3, [4])
    assert.deepEqual(M.concat(x, M.empty), x)
    assert.deepEqual(M.concat(M.empty, x), x)
  })

  it('reduce', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d'])
    assert.deepEqual(zipper.reduce(fa, '', (b: string, a: string) => b + a), 'abcd')
  })

  it('traverse', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d'])
    assert.deepEqual(zipper.traverse(option)(fa, a => some(a)), some(fa))
  })

  it('extract', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d'])
    assert.strictEqual(zipper.extract(fa), 'c')
  })

  it('extend', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d', 'e'])
    const f = (fa: Zipper<string>) => fa.toString()
    assert.deepEqual(
      zipper.extend(fa, f),
      new Zipper(
        ['new Zipper([], "a", ["b", "c", "d", "e"])', 'new Zipper(["a"], "b", ["c", "d", "e"])'],
        'new Zipper(["a", "b"], "c", ["d", "e"])',
        ['new Zipper(["a", "b", "c"], "d", ["e"])', 'new Zipper(["a", "b", "c", "d"], "e", [])']
      )
    )
  })
})
