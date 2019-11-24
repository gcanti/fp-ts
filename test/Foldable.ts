import * as assert from 'assert'
import { array } from '../src/Array'
import { foldM, getFoldableComposition, intercalate, traverse_ } from '../src/Foldable'
import { io } from '../src/IO'
import { monoidString } from '../src/Monoid'
import * as option from '../src/Option'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable', () => {
  it('getFoldableComposition', () => {
    const F = getFoldableComposition(array, option.option)
    // reduce
    assert.strictEqual(F.reduce([option.some('a'), option.some('b'), option.some('c')], '', monoidString.concat), 'abc')
    assert.strictEqual(F.reduce([option.none, option.some('b'), option.none], '', monoidString.concat), 'b')
    assert.strictEqual(F.reduce([option.none, option.none, option.none], '', monoidString.concat), '')
    assert.strictEqual(F.reduce([], '', monoidString.concat), '')
    // foldMap
    assert.strictEqual(
      F.foldMap(monoidString)([option.some('a'), option.some('b'), option.some('c')], a => a),
      'abc'
    )
    assert.strictEqual(
      F.foldMap(monoidString)([option.none, option.some('b'), option.none], a => a),
      'b'
    )
    assert.strictEqual(
      F.foldMap(monoidString)([option.none, option.none, option.none], a => a),
      ''
    )
    assert.strictEqual(
      F.foldMap(monoidString)([], (a: string) => a),
      ''
    )
    // reduceRight
    assert.strictEqual(
      F.reduceRight([option.some('a'), option.some('b'), option.some('c')], '', monoidString.concat),
      'abc'
    )
    assert.strictEqual(F.reduceRight([option.none, option.some('b'), option.none], '', monoidString.concat), 'b')
    assert.strictEqual(F.reduceRight([option.none, option.none, option.none], '', monoidString.concat), '')
    assert.strictEqual(F.reduceRight([], '', monoidString.concat), '')
  })

  it('intercalate', () => {
    assert.strictEqual(intercalate(monoidString, array)(',', ['a', 'b', 'c']), 'a,b,c')
  })

  it('traverse_', () => {
    let log = ''
    const append = (s: String) => () => (log += s)
    traverse_(io, array)(['a', 'b', 'c'], append)()
    assert.strictEqual(log, 'abc')
  })

  it('foldM', () => {
    assert.deepStrictEqual(
      foldM(option.option, array)([], 1, () => option.none),
      option.some(1)
    )
    assert.deepStrictEqual(
      foldM(option.option, array)([2], 1, () => option.none),
      option.none
    )
    assert.deepStrictEqual(
      foldM(option.option, array)([2], 1, (b, a) => option.some(b + a)),
      option.some(3)
    )
  })
})
