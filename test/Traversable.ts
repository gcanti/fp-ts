import * as assert from 'assert'
import { Applicative, Applicative1 } from '../src/Applicative'
import { array } from '../src/Array'
import { none, option, some } from '../src/Option'
import { getTraversableComposition, traverse, sequence } from '../src/Traversable'
import { HKT, Type, URIS } from '../src/HKT'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Traversable', () => {
  it('getTraversableComposition', () => {
    const o: Applicative<'Option'> = option as any
    // tslint:disable-next-line: deprecation
    const arrayOptionTraversable = getTraversableComposition(array, option)
    assert.deepStrictEqual(
      arrayOptionTraversable.traverse(o)([some(1), some(2)], (n: number) => (n <= 2 ? some(n * 2) : none)),
      some([some(2), some(4)])
    )
    assert.deepStrictEqual(
      arrayOptionTraversable.traverse(o)([some(1), some(3)], (n: number) => (n <= 2 ? some(n * 2) : none)),
      none
    )
  })

  it('traverse', () => {
    assert.deepStrictEqual(traverse(option, array)([1, 2, 3], n => (n > 0 ? some(n) : none)), some([1, 2, 3]))
  })

  it('sequence', () => {
    function f<F extends URIS>(F: Applicative1<F>): <A>(fas: Array<Type<F, A>>) => Type<F, Array<A>>
    function f<F>(F: Applicative<F>): <A>(fas: Array<HKT<F, A>>) => HKT<F, Array<A>>
    function f<F>(F: Applicative<F>): <A>(fas: Array<HKT<F, A>>) => HKT<F, Array<A>> {
      return fas => sequence(F, array)(fas)
    }
    assert.deepStrictEqual(f(option)([some(1), some(2), some(3)]), some([1, 2, 3]))
  })
})
