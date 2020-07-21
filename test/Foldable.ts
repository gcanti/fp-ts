import * as assert from 'assert'
import * as A from '../src/ReadonlyArray'
import * as I from '../src/IO'
import * as O from '../src/Option'
import * as T from '../src/Tree'
import { monoidString } from '../src/Monoid'
import { foldM, getFoldableComposition, intercalate, traverse_, toArray, toReadOnlyArray } from '../src/Foldable'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable', () => {
  it('getFoldableComposition', () => {
    const F = getFoldableComposition(A.Foldable, O.Foldable)
    // reduce
    assert.deepStrictEqual(F.reduce([O.some('a'), O.some('b'), O.some('c')], '', monoidString.concat), 'abc')
    assert.deepStrictEqual(F.reduce([O.none, O.some('b'), O.none], '', monoidString.concat), 'b')
    assert.deepStrictEqual(F.reduce([O.none, O.none, O.none], '', monoidString.concat), '')
    assert.deepStrictEqual(F.reduce([], '', monoidString.concat), '')
    // foldMap
    assert.deepStrictEqual(
      F.foldMap(monoidString)([O.some('a'), O.some('b'), O.some('c')], (a) => a),
      'abc'
    )
    assert.deepStrictEqual(
      F.foldMap(monoidString)([O.none, O.some('b'), O.none], (a) => a),
      'b'
    )
    assert.deepStrictEqual(
      F.foldMap(monoidString)([O.none, O.none, O.none], (a) => a),
      ''
    )
    assert.deepStrictEqual(
      F.foldMap(monoidString)([], (a: string) => a),
      ''
    )
    // reduceRight
    assert.deepStrictEqual(F.reduceRight([O.some('a'), O.some('b'), O.some('c')], '', monoidString.concat), 'abc')
    assert.deepStrictEqual(F.reduceRight([O.none, O.some('b'), O.none], '', monoidString.concat), 'b')
    assert.deepStrictEqual(F.reduceRight([O.none, O.none, O.none], '', monoidString.concat), '')
    assert.deepStrictEqual(F.reduceRight([], '', monoidString.concat), '')
  })

  it('intercalate', () => {
    assert.deepStrictEqual(intercalate(monoidString, A.Foldable)(',', ['a', 'b', 'c']), 'a,b,c')
  })

  it('toArray', () => {
    // Option
    const optionToArray = toArray(O.option)
    assert.deepStrictEqual(optionToArray(O.some(1)), [1])
    assert.deepStrictEqual(optionToArray(O.none), [])

    // Tree
    const treeToArray = toArray(T.tree)
    assert.deepStrictEqual(treeToArray(T.make(1, [T.make(2, []), T.make(3, []), T.make(4, [])])), [1, 2, 3, 4])
  })

  it('toReadOnlyArray', () => {
    // Option
    const optionToRA = toReadOnlyArray(O.option)
    assert.deepStrictEqual(optionToRA(O.some(1)), [1])
    assert.deepStrictEqual(optionToRA(O.none), [])

    // Tree
    const treeToArray = toReadOnlyArray(T.tree)
    assert.deepStrictEqual(treeToArray(T.make(1, [T.make(2, []), T.make(3, []), T.make(4, [])])), [1, 2, 3, 4])
  })

  it('traverse_', () => {
    let log = ''
    const append = (s: String) => () => (log += s)
    traverse_(I.Applicative, A.Foldable)(['a', 'b', 'c'], append)()
    assert.deepStrictEqual(log, 'abc')
  })

  it('foldM', () => {
    assert.deepStrictEqual(
      foldM(O.Monad, A.Foldable)([], 1, () => O.none),
      O.some(1)
    )
    assert.deepStrictEqual(
      foldM(O.Monad, A.Foldable)([2], 1, () => O.none),
      O.none
    )
    assert.deepStrictEqual(
      foldM(O.Monad, A.Foldable)([2], 1, (b, a) => O.some(b + a)),
      O.some(3)
    )
  })
})
