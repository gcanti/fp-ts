import * as assert from 'assert'
import { array } from '../src/Array'
import { salign, padZip, padZipWith } from '../src/Align'
import { semigroupSum } from '../src/Semigroup'
import { Option, some, none } from '../src/Option'

describe('Align', () => {
  it('salign', () => {
    assert.deepStrictEqual(salign(array, semigroupSum)([1, 2], [4, 5]), [5, 7])
    assert.deepStrictEqual(salign(array, semigroupSum)([1, 2], [4]), [5, 2])
    assert.deepStrictEqual(salign(array, semigroupSum)([1], [4, 5]), [5, 5])
    assert.deepStrictEqual(salign(array, semigroupSum)([], []), [])
  })

  it('padZip', () => {
    assert.deepStrictEqual(padZip(array)([1, 2], ['a', 'b']), [[some(1), some('a')], [some(2), some('b')]])
    assert.deepStrictEqual(padZip(array)([1, 2], ['a']), [[some(1), some('a')], [some(2), none]])
    assert.deepStrictEqual(padZip(array)([1], ['a', 'b']), [[some(1), some('a')], [none, some('b')]])
    assert.deepStrictEqual(padZip(array)([], []), [])
  })

  it('padZipWith', () => {
    const f = (ma: Option<number>, mb: Option<string>) => mb.getOrElse('#') + ma.fold('*', a => a.toString())
    assert.deepStrictEqual(padZipWith(array)([1, 2], ['a', 'b'], f), ['a1', 'b2'])
    assert.deepStrictEqual(padZipWith(array)([1, 2], ['a'], f), ['a1', '#2'])
    assert.deepStrictEqual(padZipWith(array)([1], ['a', 'b'], f), ['a1', 'b*'])
    assert.deepStrictEqual(padZipWith(array)([], [], f), [])
  })
})
