import * as assert from 'assert'
import { Foldable, toArray, foldMap, getFoldableComposition, intercalate, traverse_, sequence_ } from '../src/Foldable'
import * as array from '../src/Array'
import * as option from '../src/Option'
import * as io from '../src/IO'
import { monoidString } from '../src/Monoid'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable', () => {
  it('toArray', () => {
    assert.deepEqual(toArray(array)([1, 2, 3]), [1, 2, 3])
  })

  it('foldMap', () => {
    assert.deepEqual(foldMap(array, monoidString)((s: string) => s)(['a', 'b', 'c']), 'abc')
  })

  it('getFoldableComposition', () => {
    const arrayOptionFoldable = getFoldableComposition(array, option)
    const sum = (b: number, a: number): number => b + a
    assert.strictEqual(arrayOptionFoldable.reduce(sum, 0, [option.some(1), option.some(2)]), 3)
    assert.strictEqual(arrayOptionFoldable.reduce(sum, 0, [option.none, option.some(2)]), 2)
  })

  it('intercalate', () => {
    const arrayOptionFoldable = getFoldableComposition(array, option)
    const URI = 'ArrayOption'
    type URI = typeof URI
    class ArrayOption<A> {
      readonly _A: A
      readonly _URI: URI
      constructor(public readonly value: Array<option.Option<A>>) {}
    }
    const arrayOption: Foldable<URI> = {
      URI,
      reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: ArrayOption<A>): B {
        return arrayOptionFoldable.reduce(f, b, fa.value)
      }
    }
    const join = intercalate(arrayOption, monoidString)(' ')
    assert.strictEqual(join(new ArrayOption([])), '')
    assert.strictEqual(join(new ArrayOption([option.some('a')])), 'a')
    assert.strictEqual(join(new ArrayOption([option.some('a'), option.none, option.some('b')])), 'a b')
  })

  it('traverse_', () => {
    let counter = ''
    const x = traverse_(io, array)(a => new io.IO(() => (counter += a)), ['a', 'b', 'c'])
    x.run()
    assert.strictEqual(counter, 'abc')
  })

  it('sequence_', () => {
    let counter = ''
    const x = sequence_(io, array)([
      new io.IO(() => (counter += 'a')),
      new io.IO(() => (counter += 'b')),
      new io.IO(() => (counter += 'c'))
    ])
    x.run()
    assert.strictEqual(counter, 'abc')
  })
})
