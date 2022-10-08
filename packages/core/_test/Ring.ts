import { pipe } from '@fp-ts/core/Function'
import * as N from '@fp-ts/core/number'
import { negate, tuple } from '@fp-ts/core/Ring'
import { deepStrictEqual } from '@fp-ts/core/test/util'

describe('Ring', () => {
  it('tuple', () => {
    const R = tuple(N.Field, N.Field, N.Field)
    deepStrictEqual(pipe([1, 2, 3], R.add([4, 5, 6])), [5, 7, 9])
    deepStrictEqual(pipe([1, 2, 3], R.mul([4, 5, 6])), [4, 10, 18])
    deepStrictEqual(R.one, [1, 1, 1])
    deepStrictEqual(pipe([1, 2, 3], R.sub([4, 5, 6])), [-3, -3, -3])
    deepStrictEqual(R.zero, [0, 0, 0])
  })

  it('negate', () => {
    deepStrictEqual(negate(N.Field)(1), -1)
  })
})
