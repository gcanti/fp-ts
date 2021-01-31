import * as assert from 'assert'
import * as _ from '../src/number'

describe('string', () => {
  it('Ord', () => {
    assert.deepStrictEqual(_.Ord.compare(1, 2), -1)
    assert.deepStrictEqual(_.Ord.compare(2, 1), 1)
    assert.deepStrictEqual(_.Ord.compare(2, 2), 0)
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
    assert.deepStrictEqual(_.SemigroupProduct.concat(2, 3), 6)
  })
})
