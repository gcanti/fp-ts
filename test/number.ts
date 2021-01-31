import * as assert from 'assert'
import { pipe } from '../src/function'
import * as _ from '../src/number'

describe('string', () => {
  it('Ord', () => {
    assert.deepStrictEqual(pipe(1, _.Ord.compare(2)), -1)
    assert.deepStrictEqual(pipe(2, _.Ord.compare(1)), 1)
    assert.deepStrictEqual(pipe(2, _.Ord.compare(2)), 0)
  })

  it('Field', () => {
    assert.deepStrictEqual(_.Field.degree(0), 1)
    assert.deepStrictEqual(_.Field.degree(1), 1)
    assert.deepStrictEqual(_.Field.degree(2), 1)
  })

  it('Show', () => {
    assert.deepStrictEqual(_.Show.show(1), '1')
  })

  it('SemigroupProduct', () => {
    assert.deepStrictEqual(pipe(2, _.SemigroupProduct.concat(3)), 6)
  })
})
