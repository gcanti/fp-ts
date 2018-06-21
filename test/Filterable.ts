import * as assert from 'assert'
import {
  filterDefaultPartition,
  filterMapDefaultCompact,
  partitionDefaultFilter,
  partitionMapDefaultSeparate
} from '../src/Filterable'
import { array, filter } from '../src/Array'
import { left, right } from '../src/Either'
import { separated } from '../src/Compactable'
import { none, some } from '../src/Option'

describe('Filterable', () => {
  const p = (n: number) => n > 2

  it('partitionMapDefaultSeparate', () => {
    const { URI, map, separate } = array
    const F = {
      URI,
      map,
      separate
    }
    const partitionMapF = partitionMapDefaultSeparate(F)
    const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
    assert.deepEqual(partitionMapF([], f), separated([], []))
    assert.deepEqual(partitionMapF([1, 3], f), separated([0], [4]))
  })

  it('partitionDefaultFilter', () => {
    const { URI } = array
    const F = {
      URI,
      filter
    }
    const partitionF = partitionDefaultFilter(F)
    assert.deepEqual(partitionF([], p), separated([], []))
    assert.deepEqual(partitionF([1, 3], p), separated([1], [3]))
  })

  it('filterMapDefaultCompact', () => {
    const { URI, map, compact } = array
    const F = {
      URI,
      map,
      compact
    }
    const filterMapF = filterMapDefaultCompact(F)
    const f = (n: number) => (p(n) ? some(n + 1) : none)
    assert.deepEqual(filterMapF([], f), [])
    assert.deepEqual(filterMapF([1, 3], f), [4])
  })

  it('filterDefaultPartition', () => {
    const { URI, map } = array
    const partition = partitionDefaultFilter({ URI, filter })
    const filterF = filterDefaultPartition({ URI, map, partition })
    assert.deepEqual(filterF([], p), [])
    assert.deepEqual(filterF([1, 3], p), [3])
  })
})
