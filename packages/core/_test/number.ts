import { pipe } from '@fp-ts/core/Function'
import * as _ from '@fp-ts/core/number'
import * as U from '@fp-ts/core/test/util'

describe('number', () => {
  it('Ord', () => {
    U.deepStrictEqual(pipe(1, _.Ord.compare(2)), -1)
    U.deepStrictEqual(pipe(2, _.Ord.compare(1)), 1)
    U.deepStrictEqual(pipe(2, _.Ord.compare(2)), 0)
  })

  it('Field', () => {
    U.deepStrictEqual(_.Field.degree(0), 1)
    U.deepStrictEqual(_.Field.degree(1), 1)
    U.deepStrictEqual(_.Field.degree(2), 1)
  })

  it('Show', () => {
    U.deepStrictEqual(_.Show.show(1), '1')
  })

  it('SemigroupProduct', () => {
    U.deepStrictEqual(pipe(2, _.SemigroupProduct.combine(3)), 6)
  })

  it('MagmaSub', () => {
    U.deepStrictEqual(pipe(2, _.MagmaSub.combine(3)), -1)
  })
})
