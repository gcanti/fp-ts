import * as assert from 'assert'
import { array } from '../src/Array'
import { getFilterableComposition } from '../src/Filterable'
import { some, none } from '../src/Option'
import { right, left } from '../src/Either'

describe('Filterable', () => {
  it('getFilterableComposition', () => {
    const F = getFilterableComposition(array, array)
    assert.deepEqual(F.filter([[1, 2], [3, 4]], a => a > 1), [[2], [3, 4]])

    assert.deepEqual(F.filterMap([['a', 'bb'], ['ccc', 'dddd']], a => (a.length > 1 ? some(a.length) : none)), [
      [2],
      [3, 4]
    ])

    assert.deepEqual(F.partition([['a', 'bb'], ['ccc', 'dddd']], a => a.length % 2 === 0), {
      left: [['a'], ['ccc']],
      right: [['bb'], ['dddd']]
    })

    assert.deepEqual(
      F.partitionMap([['a', 'bb'], ['ccc', 'dddd']], a => (a.length % 2 === 0 ? right(a.length) : left(a))),
      {
        left: [['a'], ['ccc']],
        right: [[2], [4]]
      }
    )
  })
})
