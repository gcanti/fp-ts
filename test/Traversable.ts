import * as assert from 'assert'
import { getTraversableComposition } from '../src/Traversable'
import { array } from '../src/Array'
import { option, some, none } from '../src/Option'
import { Applicative } from '../src/Applicative'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Traversable', () => {
  it('getTraversableComposition', () => {
    const o: Applicative<'Option'> = option as any // TODO
    const arrayOptionTraversable = getTraversableComposition(array, option)
    assert.deepEqual(
      arrayOptionTraversable.traverse(o)([some(1), some(2)], (n: number) => (n <= 2 ? some(n * 2) : none)),
      some([some(2), some(4)])
    )
    assert.deepEqual(
      arrayOptionTraversable.traverse(o)([some(1), some(3)], (n: number) => (n <= 2 ? some(n * 2) : none)),
      none
    )
  })
})
