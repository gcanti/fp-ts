import * as assert from 'assert'
import * as N from '../src/number'
import * as _ from '../src/Ring'

describe('Ring', () => {
  it('getTupleRing', () => {
    const R = _.getTupleRing(N.Field, N.Field, N.Field)
    assert.deepStrictEqual(R.add([1, 2, 3], [4, 5, 6]), [5, 7, 9])
    assert.deepStrictEqual(R.mul([1, 2, 3], [4, 5, 6]), [4, 10, 18])
    assert.deepStrictEqual(R.one, [1, 1, 1])
    assert.deepStrictEqual(R.sub([1, 2, 3], [4, 5, 6]), [-3, -3, -3])
    assert.deepStrictEqual(R.zero, [0, 0, 0])
  })

  it('negate', () => {
    assert.deepStrictEqual(_.negate(N.Field)(1), -1)
  })
})
