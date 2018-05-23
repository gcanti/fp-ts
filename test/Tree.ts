import * as assert from 'assert'
import { Tree, tree, drawTree, getSetoid, unfoldTree, unfoldTreeM } from '../src/Tree'
import { traverse } from '../src/Traversable'
import { identity, Identity } from '../src/Identity'
import { setoidNumber } from '../src/Setoid'
import { tuple } from '../src/function'

describe('Tree', () => {
  it('map', () => {
    const double = (n: number): number => n * 2
    const fa = new Tree(1, [new Tree(2, []), new Tree(3, [])])
    const expected = new Tree(2, [new Tree(4, []), new Tree(6, [])])
    assert.deepEqual(fa.map(double), expected)
    assert.deepEqual(tree.map(fa, double), expected)
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = tree.of(double)
    const fa = new Tree(1, [new Tree(2, []), new Tree(3, [])])
    const expected = new Tree(2, [new Tree(4, []), new Tree(6, [])])
    assert.deepEqual(fa.ap(fab), expected)
    assert.deepEqual(fab.ap_(fa), expected)
    assert.deepEqual(tree.ap(fab, fa), expected)
  })

  it('chain', () => {
    const f = (n: number) => tree.of(n * 2)
    const fa = new Tree(1, [new Tree(2, []), new Tree(3, [])])
    const expected = new Tree(2, [new Tree(4, []), new Tree(6, [])])
    assert.deepEqual(fa.chain(f), expected)
    assert.deepEqual(tree.chain(fa, f), expected)
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
    assert.deepEqual(fa.extend(f), expected)
    assert.deepEqual(tree.extend(fa, f), expected)
  })

  it('reduce', () => {
    const fa = new Tree('a', [new Tree('b', []), new Tree('c', [])])
    assert.strictEqual(tree.reduce(fa, '', (b, a) => b + a), 'abc')
  })

  it('traverse', () => {
    const fa = new Tree('a', [new Tree('b', []), new Tree('c', [])])
    assert.deepEqual(traverse(identity, tree)(fa, a => new Identity(a)), new Identity(fa))
  })

  it('drawTree', () => {
    const fa = new Tree('a', [
      new Tree('b', []),
      new Tree('c', []),
      new Tree('d', [new Tree('e', []), new Tree('f', [])])
    ])
    assert.strictEqual(
      drawTree(fa),
      `a
├─ b
├─ c
└─ d
   ├─ e
   └─ f`
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
    const fa = unfoldTree(1, b => tuple(b, b < 3 ? [b + 1, b + 2] : []))
    const expected = new Tree(1, [new Tree(2, [new Tree(3, []), new Tree(4, [])]), new Tree(3, [])])
    assert.deepEqual(fa, expected)
  })

  it('unfoldTreeM', () => {
    const fa = unfoldTreeM(identity)(1, b => new Identity(tuple(b, b < 3 ? [b + 1, b + 2] : [])))
    const expected = new Identity(new Tree(1, [new Tree(2, [new Tree(3, []), new Tree(4, [])]), new Tree(3, [])]))
    assert.deepEqual(fa, expected)
  })
})
