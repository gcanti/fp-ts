import * as assert from 'assert'
import {
  NonEmptyArray,
  concat,
  map,
  chain
} from '../src/NonEmptyArray'

describe('NonEmptyArray', () => {

  it('concat', () => {
    const x = new NonEmptyArray(1, [2])
    const y = new NonEmptyArray(3, [4])
    assert.deepEqual(concat(x, y).toArray(), [1, 2, 3, 4])
  })

  it('map', () => {
    const x = new NonEmptyArray(1, [2])
    const double = (n: number) => n * 2
    assert.deepEqual(map(double, x).toArray(), [2, 4])
  })

  it('chain', () => {
    const x = new NonEmptyArray(1, [2])
    const f = (a: number) => new NonEmptyArray(a, [4])
    assert.deepEqual(chain(f, x).toArray(), [1, 4, 2, 4])
  })

})
