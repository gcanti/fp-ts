import * as assert from 'assert'
import * as A from '../src/ReadonlyArray'
import { foldM, getFoldableComposition, intercalate, traverse_ } from '../src/Foldable'
import * as I from '../src/IO'
import { monoidString } from '../src/Monoid'
import * as O from '../src/Option'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable', () => {
  it('getFoldableComposition', () => {
    const F = getFoldableComposition(A.foldableArray, O.foldableOption)
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
    assert.deepStrictEqual(intercalate(monoidString, A.foldableArray)(',', ['a', 'b', 'c']), 'a,b,c')
  })

  it('traverse_', () => {
    let log = ''
    const append = (s: String) => () => (log += s)
    traverse_(I.applicativeIO, A.foldableArray)(['a', 'b', 'c'], append)()
    assert.deepStrictEqual(log, 'abc')
  })

  it('foldM', () => {
    assert.deepStrictEqual(
      foldM(O.monadOption, A.foldableArray)([], 1, () => O.none),
      O.some(1)
    )
    assert.deepStrictEqual(
      foldM(O.monadOption, A.foldableArray)([2], 1, () => O.none),
      O.none
    )
    assert.deepStrictEqual(
      foldM(O.monadOption, A.foldableArray)([2], 1, (b, a) => O.some(b + a)),
      O.some(3)
    )
  })
})
