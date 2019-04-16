import * as assert from 'assert'
import * as F from '../src/Foldable'
import { identity } from '../src/function'
import * as I from '../src/Identity'
import { monoidString } from '../src/Monoid'
import { setoidNumber, Setoid, contramap } from '../src/Setoid'
import * as T from '../src/Traversable'
import { drawTree, getSetoid, Tree, tree, unfoldTree, unfoldTreeM, elem, getShow } from '../src/Tree'
import { showString } from '../src/Show'

describe('Tree', () => {
  it('map', () => {
    const double = (n: number): number => n * 2
    const fa = new Tree(1, [new Tree(2, []), new Tree(3, [])])
    const expected = new Tree(2, [new Tree(4, []), new Tree(6, [])])
    assert.deepStrictEqual(fa.map(double), expected)
    assert.deepStrictEqual(tree.map(fa, double), expected)
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = tree.of(double)
    const fa = new Tree(1, [new Tree(2, []), new Tree(3, [])])
    const expected = new Tree(2, [new Tree(4, []), new Tree(6, [])])
    assert.deepStrictEqual(fa.ap(fab), expected)
    assert.deepStrictEqual(fab.ap_(fa), expected)
    assert.deepStrictEqual(tree.ap(fab, fa), expected)
  })

  it('chain', () => {
    const f = (n: number) => tree.of(n * 2)
    const fa = new Tree(1, [new Tree(2, []), new Tree(3, [])])
    const expected = new Tree(2, [new Tree(4, []), new Tree(6, [])])
    assert.deepStrictEqual(fa.chain(f), expected)
    assert.deepStrictEqual(tree.chain(fa, f), expected)
  })

  it('extract', () => {
    const fa = new Tree(1, [new Tree(2, []), new Tree(3, [])])
    assert.strictEqual(fa.extract(), 1)
    assert.strictEqual(tree.extract(fa), 1)
  })

  it('extend', () => {
    const fa = new Tree('a', [new Tree('foo', []), new Tree('b', [])])
    const f = (fa: Tree<string>) => fa.value.length + fa.forest.length
    const expected = new Tree(3, [new Tree(3, []), new Tree(1, [])])
    assert.deepStrictEqual(fa.extend(f), expected)
    assert.deepStrictEqual(tree.extend(fa, f), expected)
  })

  it('reduce', () => {
    const fa = new Tree('a', [new Tree('b', []), new Tree('c', [])])
    assert.strictEqual(tree.reduce(fa, '', (b, a) => b + a), 'abc')
  })

  it('foldMap', () => {
    const old = F.foldMap(tree, monoidString)
    const foldMap = tree.foldMap(monoidString)
    const x1 = new Tree('a', [new Tree('b', []), new Tree('c', [])])
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'abc')
    assert.strictEqual(foldMap(x1, f1), old(x1, f1))
  })

  it('foldr', () => {
    const old = F.foldr(tree)
    const foldr = tree.foldr
    const x1 = new Tree('a', [new Tree('b', []), new Tree('c', [])])
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'cba')
    assert.strictEqual(foldr(x1, init1, f1), old(x1, init1, f1))
  })

  it('traverse', () => {
    const fa = new Tree('a', [new Tree('b', []), new Tree('c', [])])
    assert.deepStrictEqual(tree.traverse(I.identity)(fa, a => I.identity.of(a)), I.identity.of(fa))
  })

  it('sequence', () => {
    const old = T.sequence(I.identity, tree)
    const sequence = tree.sequence(I.identity)
    const x1 = new Tree(I.identity.of('a'), [new Tree(I.identity.of('b'), []), new Tree(I.identity.of('c'), [])])
    assert.deepStrictEqual(sequence(x1), I.identity.of(new Tree('a', [new Tree('b', []), new Tree('c', [])])))
    assert.deepStrictEqual(sequence(x1), old(x1))
  })

  it('drawTree', () => {
    const tree = new Tree('a', [])
    assert.strictEqual(drawTree(tree), 'a')

    const tree1 = new Tree('a', [
      new Tree('b', []),
      new Tree('c', []),
      new Tree('d', [new Tree('e', []), new Tree('f', [])]),
      new Tree('g', [])
    ])
    assert.strictEqual(
      drawTree(tree1),
      `a
├─ b
├─ c
├─ d
│  ├─ e
│  └─ f
└─ g`
    )

    const tree2 = new Tree('a', [new Tree('b', [new Tree('c', [])])])
    assert.strictEqual(
      drawTree(tree2),
      `a
└─ b
   └─ c`
    )

    const tree3 = new Tree('a', [new Tree('b', [new Tree('c', [])]), new Tree('d', [new Tree('e', [])])])
    assert.strictEqual(
      drawTree(tree3),
      `a
├─ b
│  └─ c
└─ d
   └─ e`
    )

    const tree4 = new Tree('a', [
      new Tree('b', [new Tree('c', [new Tree('d', [])]), new Tree('e', [new Tree('f', [])])]),
      new Tree('e', [])
    ])
    assert.strictEqual(
      drawTree(tree4),
      `a
├─ b
│  ├─ c
│  │  └─ d
│  └─ e
│     └─ f
└─ e`
    )
  })

  it('toString', () => {
    const fa = new Tree('a', [new Tree('b', [])])
    const expected = 'new Tree("a", [new Tree("b", [])])'
    assert.strictEqual(fa.toString(), expected)
    assert.strictEqual(fa.inspect(), expected)
  })

  it('getSetoid', () => {
    const S = getSetoid(setoidNumber)
    const x = new Tree(1, [new Tree(2, [])])
    const y = new Tree(2, [new Tree(2, [])])
    const z = new Tree(1, [new Tree(1, [])])
    assert.strictEqual(S.equals(x, x), true)
    assert.strictEqual(S.equals(x, y), false)
    assert.strictEqual(S.equals(x, z), false)
  })

  it('unfoldTree', () => {
    const fa = unfoldTree(1, b => [b, b < 3 ? [b + 1, b + 2] : []])
    const expected = new Tree(1, [new Tree(2, [new Tree(3, []), new Tree(4, [])]), new Tree(3, [])])
    assert.deepStrictEqual(fa, expected)
  })

  it('unfoldTreeM', () => {
    const fa = unfoldTreeM(I.identity)(1, b => I.identity.of([b, b < 3 ? [b + 1, b + 2] : []]))
    const expected = I.identity.of(new Tree(1, [new Tree(2, [new Tree(3, []), new Tree(4, [])]), new Tree(3, [])]))
    assert.deepStrictEqual(fa, expected)
  })

  it('elem', () => {
    interface User {
      id: number
    }
    const S: Setoid<User> = contramap((user: User) => user.id, setoidNumber)
    const users = new Tree({ id: 1 }, [
      new Tree({ id: 1 }, [new Tree({ id: 3 }, []), new Tree({ id: 4 }, [])]),
      new Tree({ id: 2 }, [])
    ])
    assert.strictEqual(elem(S)({ id: 1 }, users), true)
    assert.strictEqual(elem(S)({ id: 4 }, users), true)
    assert.strictEqual(elem(S)({ id: 5 }, users), false)
  })

  it('getShow', () => {
    const S = getShow(showString)
    const t1 = new Tree('a', [])
    assert.strictEqual(S.show(t1), `new Tree("a", [])`)
    const t2 = new Tree('a', [new Tree('b', []), new Tree('c', [])])
    assert.strictEqual(S.show(t2), `new Tree("a", [new Tree("b", []), new Tree("c", [])])`)
  })
})
