import * as assert from 'assert'
import { Applicative, Applicative1 } from '../src/Applicative'
import { array } from '../src/Array'
import { none, option, some } from '../src/Option'
import { getTraversableComposition, traverse, sequence } from '../src/Traversable'
import { HKT, Kind, URIS } from '../src/HKT'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Traversable', () => {
  it('getTraversableComposition', () => {
    // tslint:disable-next-line: deprecation
    const T = getTraversableComposition(array, option)
    const x1 = T.traverse(option)([some(1), some(2)], (n: number) => (n <= 2 ? some(n * 2) : none))
    assert.deepStrictEqual(x1, some([some(2), some(4)]))
    const x2 = T.traverse(option)([some(1), some(3)], (n: number) => (n <= 2 ? some(n * 2) : none))
    assert.deepStrictEqual(x2, none)
  })

  it('traverse', () => {
    assert.deepStrictEqual(traverse(option, array)([1, 2, 3], n => (n > 0 ? some(n) : none)), some([1, 2, 3]))
  })

  it('sequence', () => {
    function f<F extends URIS>(F: Applicative1<F>): <A>(fas: Array<Kind<F, A>>) => Kind<F, Array<A>>
    function f<F>(F: Applicative<F>): <A>(fas: Array<HKT<F, A>>) => HKT<F, Array<A>>
    function f<F>(F: Applicative<F>): <A>(fas: Array<HKT<F, A>>) => HKT<F, Array<A>> {
      return fas => sequence(F, array)(fas)
    }
    assert.deepStrictEqual(f(option)([some(1), some(2), some(3)]), some([1, 2, 3]))
  })
})
