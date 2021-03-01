import * as U from './util'
import { pipe } from '../src/function'
import * as _ from '../src/number'

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
    U.deepStrictEqual(pipe(2, _.SemigroupProduct.concat(3)), 6)
  })

  it('MagmaSub', () => {
    U.deepStrictEqual(pipe(2, _.MagmaSub.concat(3)), -1)
  })
})
