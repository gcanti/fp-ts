import * as assert from 'assert'
import * as F from '../src/Foldable'
import { identity } from '../src/function'
import { monoidString, monoidSum } from '../src/Monoid'
import { NonEmptyArray } from '../src/NonEmptyArray'
import { fromNonEmptyArray } from '../src/NonEmptyArray2v'
import { none, option, some } from '../src/Option'
import { semigroupSum } from '../src/Semigroup'
import * as T from '../src/Traversable'
import {
  fromArray,
  fromNonEmptyArray as zipperFromNonEmptyArray,
  getMonoid,
  getSemigroup,
  Zipper,
  zipper,
  fromNonEmptyArray2v,
  getShow
} from '../src/Zipper'
import { showString } from '../src/Show'

const len = (s: string): number => s.length
const prepend = (a: string) => (s: string): string => a + s
const append = (a: string) => (s: string): string => s + a

describe('Zipper', () => {
  it('update', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d'])
    assert.deepStrictEqual(fa.update('e'), new Zipper(['a', 'b'], 'e', ['d']))
  })

  it('modify', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d'])
    assert.deepStrictEqual(fa.modify(append('!')), new Zipper(['a', 'b'], 'c!', ['d']))
  })

  it('toArray', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d'])
    assert.deepStrictEqual(fa.toArray(), ['a', 'b', 'c', 'd'])
  })

  it('isOutOfBound', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d'])
    assert.deepStrictEqual(fa.isOutOfBound(-1), true)
    assert.deepStrictEqual(fa.isOutOfBound(4), true)
    assert.deepStrictEqual(fa.isOutOfBound(2), false)
  })

  it('up', () => {
    assert.deepStrictEqual(new Zipper(['a', 'b'], 'c', ['d']).up(), some(new Zipper(['a'], 'b', ['c', 'd'])))
    assert.deepStrictEqual(new Zipper([], 'c', ['d']).up(), none)
  })

  it('down', () => {
    assert.deepStrictEqual(
      new Zipper(['a', 'b'], 'c', ['d', 'e']).down(),
      some(new Zipper(['a', 'b', 'c'], 'd', ['e']))
    )
    assert.deepStrictEqual(new Zipper(['a', 'b'], 'c', []).down(), none)
  })

  it('start', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d', 'e'])
    assert.deepStrictEqual(fa.start(), new Zipper([], 'a', ['b', 'c', 'd', 'e']))
    const start = new Zipper([], 1, [2])
    assert.strictEqual(start.start(), start)
  })

  it('end', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d', 'e'])
    assert.deepStrictEqual(fa.end(), new Zipper(['a', 'b', 'c', 'd'], 'e', []))
    const end = new Zipper([1], 2, [])
    assert.strictEqual(end.end(), end)
  })

  it('insertLeft', () => {
    assert.deepStrictEqual(
      new Zipper(['a', 'b'], 'c', ['d', 'e']).insertLeft('f'),
      new Zipper(['a', 'b'], 'f', ['c', 'd', 'e'])
    )
  })

  it('insertRight', () => {
    assert.deepStrictEqual(
      new Zipper(['a', 'b'], 'c', ['d', 'e']).insertRight('f'),
      new Zipper(['a', 'b', 'c'], 'f', ['d', 'e'])
    )
  })

  it('deleteLeft', () => {
    assert.deepStrictEqual(
      new Zipper(['a', 'b'], 'c', ['d', 'e']).deleteLeft(),
      some(new Zipper(['a'], 'b', ['d', 'e']))
    )
    assert.deepStrictEqual(
      new Zipper(['a', 'b', 'c'], 'd', ['e', 'f']).deleteLeft(),
      some(new Zipper(['a', 'b'], 'c', ['e', 'f']))
    )
    assert.deepStrictEqual(new Zipper([], 'c', ['d', 'e']).deleteLeft(), some(new Zipper([], 'd', ['e'])))
    assert.deepStrictEqual(new Zipper([], 1, []).deleteLeft(), none)
  })

  it('deleteRight', () => {
    assert.deepStrictEqual(
      new Zipper(['a', 'b'], 'c', ['d', 'e']).deleteRight(),
      some(new Zipper(['a', 'b'], 'd', ['e']))
    )
    assert.deepStrictEqual(
      new Zipper(['a', 'b'], 'c', ['d', 'e', 'f']).deleteRight(),
      some(new Zipper(['a', 'b'], 'd', ['e', 'f']))
    )
    assert.deepStrictEqual(new Zipper(['a', 'b'], 'c', []).deleteRight(), some(new Zipper(['a'], 'b', [])))
    assert.deepStrictEqual(new Zipper([], 1, []).deleteRight(), none)
  })

  it('map', () => {
    const fa = new Zipper(['a', 'bb'], 'ccc', ['dddd'])
    assert.deepStrictEqual(zipper.map(fa, len), new Zipper([1, 2], 3, [4]))
  })

  it('of', () => {
    assert.deepStrictEqual(zipper.of(1), new Zipper([], 1, []))
  })

  it('ap', () => {
    const fa = new Zipper(['a'], 'b', ['c'])
    const fab = new Zipper([prepend('P1'), append('A1')], prepend('P2'), [append('A2')])
    assert.deepStrictEqual(zipper.ap(fab, fa), new Zipper(['P1a', 'aA1'], 'P2b', ['cA2']))
  })

  it('fromArray', () => {
    assert.deepStrictEqual(fromArray([]), none)
    assert.deepStrictEqual(fromArray([1]), some(new Zipper([], 1, [])))
    assert.deepStrictEqual(fromArray([1], 0), some(new Zipper([], 1, [])))
    assert.deepStrictEqual(fromArray([1], 1), none)
    assert.deepStrictEqual(fromArray([1, 2, 3], 1), some(new Zipper([1], 2, [3])))
  })

  it('fromNonEmptyArray', () => {
    assert.deepStrictEqual(zipperFromNonEmptyArray(new NonEmptyArray(1, [])), new Zipper([], 1, []))
    assert.deepStrictEqual(zipperFromNonEmptyArray(new NonEmptyArray(1, [2, 3])), new Zipper([], 1, [2, 3]))
  })

  it('fromNonEmptyArray2v', () => {
    assert.deepStrictEqual(fromNonEmptyArray2v(fromNonEmptyArray([1])), new Zipper([], 1, []))
    assert.deepStrictEqual(fromNonEmptyArray2v(fromNonEmptyArray([1, 2, 3])), new Zipper([], 1, [2, 3]))
  })

  it('toString', () => {
    assert.strictEqual(new Zipper([], 1, []).toString(), 'new Zipper([], 1, [])')
    assert.strictEqual(new Zipper([], 1, []).inspect(), 'new Zipper([], 1, [])')
  })

  it('getSemigroup', () => {
    const S = getSemigroup(semigroupSum)
    const x = new Zipper([1, 2], 3, [4])
    const y = new Zipper([5], 6, [7])
    assert.deepStrictEqual(S.concat(x, y), new Zipper([1, 2, 5], 9, [4, 7]))
  })

  it('getMonoid', () => {
    const M = getMonoid(monoidSum)
    const x = new Zipper([1, 2], 3, [4])
    assert.deepStrictEqual(M.concat(x, M.empty), x)
    assert.deepStrictEqual(M.concat(M.empty, x), x)
  })

  it('reduce', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d'])
    assert.deepStrictEqual(zipper.reduce(fa, '', (b: string, a: string) => b + a), 'abcd')
  })

  it('foldMap', () => {
    const old = F.foldMap(zipper, monoidString)
    const foldMap = zipper.foldMap(monoidString)
    const x1 = new Zipper(['a'], 'b', ['c'])
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'abc')
    assert.strictEqual(foldMap(x1, f1), old(x1, f1))
  })

  it('foldr', () => {
    const old = F.foldr(zipper)
    const foldr = zipper.foldr
    const x1 = new Zipper(['a'], 'b', ['c'])
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'cba')
    assert.strictEqual(foldr(x1, init1, f1), old(x1, init1, f1))
  })

  it('traverse', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d'])
    assert.deepStrictEqual(zipper.traverse(option)(fa, some), some(fa))
    assert.deepStrictEqual(zipper.traverse(option)(fa, a => (a === 'a' ? none : some(a))), none)
  })

  it('sequence', () => {
    const old = T.sequence(option, zipper)
    const sequence = zipper.sequence(option)
    const x1 = new Zipper([some('a'), some('b')], some('c'), [some('d')])
    assert.deepStrictEqual(sequence(x1), some(new Zipper(['a', 'b'], 'c', ['d'])))
    assert.deepStrictEqual(sequence(x1), old(x1))
    const x2 = new Zipper([some('a'), some('b')], none, [some('d')])
    assert.deepStrictEqual(sequence(x2), none)
    assert.deepStrictEqual(sequence(x2), old(x2))
  })

  it('extract', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d'])
    assert.strictEqual(zipper.extract(fa), 'c')
  })

  it('extend', () => {
    const fa = new Zipper(['a', 'b'], 'c', ['d', 'e'])
    const f = (fa: Zipper<string>) => fa.toString()
    assert.deepStrictEqual(
      zipper.extend(fa, f),
      new Zipper(
        ['new Zipper([], "a", ["b", "c", "d", "e"])', 'new Zipper(["a"], "b", ["c", "d", "e"])'],
        'new Zipper(["a", "b"], "c", ["d", "e"])',
        ['new Zipper(["a", "b", "c"], "d", ["e"])', 'new Zipper(["a", "b", "c", "d"], "e", [])']
      )
    )
  })

  it('getShow', () => {
    const S = getShow(showString)
    assert.strictEqual(S.show(new Zipper([], 'a', [])), 'new Zipper([], "a", [])')
    assert.strictEqual(S.show(new Zipper(['b'], 'a', [])), 'new Zipper(["b"], "a", [])')
    assert.strictEqual(S.show(new Zipper(['b', 'c'], 'a', [])), 'new Zipper(["b", "c"], "a", [])')
    assert.strictEqual(S.show(new Zipper(['b', 'c'], 'a', ['d'])), 'new Zipper(["b", "c"], "a", ["d"])')
    assert.strictEqual(S.show(new Zipper(['b', 'c'], 'a', ['d', 'e'])), 'new Zipper(["b", "c"], "a", ["d", "e"])')
  })
})
