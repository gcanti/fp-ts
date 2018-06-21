import * as assert from 'assert'
import {
  filterDefaultFilterMap,
  filterDefaultPartition,
  filterDefaultPartitionMap,
  filterMapDefaultCompact,
  partitionDefaultFilter,
  partitionDefaultFilterMap,
  partitionDefaultPartitionMap,
  partitionMapDefaultSeparate
} from '../src/Filterable'
import { array, filter } from '../src/Array'
import { left, right } from '../src/Either'
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
    assert.deepEqual(partitionMapF([], f), { left: [], right: [] })
    assert.deepEqual(partitionMapF([1, 3], f), { left: [0], right: [4] })
  })

  it('partitionDefaultPartitionMap', () => {
    const { URI, map, separate } = array

    const partitionMapF = partitionMapDefaultSeparate({
      URI,
      map,
      separate
    })

    const partitionF = partitionDefaultPartitionMap({
      URI,
      partitionMap: partitionMapF
    })

    assert.deepEqual(partitionF([], p), { left: [], right: [] })
    assert.deepEqual(partitionF([1, 3], p), { left: [1], right: [3] })
  })

  it('partitionDefaultFilter', () => {
    const { URI } = array
    const F = {
      URI,
      filter
    }
    const partitionF = partitionDefaultFilter(F)
    assert.deepEqual(partitionF([], p), { left: [], right: [] })
    assert.deepEqual(partitionF([1, 3], p), { left: [1], right: [3] })
  })

  it('partitionDefaultFilterMap', () => {
    const { URI, map, compact } = array
    const filterMapF = filterMapDefaultCompact({
      URI,
      map,
      compact
    })
    const partitionF = partitionDefaultFilterMap({
      URI,
      filterMap: filterMapF
    })

    assert.deepEqual(partitionF([], p), { left: [], right: [] })
    assert.deepEqual(partitionF([1, 3], p), { left: [1], right: [3] })
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

  it('filterDefaultFilterMap', () => {
    const { URI, map, compact } = array
    const filterMapF = filterMapDefaultCompact({
      URI,
      map,
      compact
    })
    const filterF = filterDefaultFilterMap({
      URI,
      filterMap: filterMapF
    })

    assert.deepEqual(filterF([], p), [])
    assert.deepEqual(filterF([1, 3], p), [3])
  })

  it('filterDefaultPartition', () => {
    const { URI, map } = array
    const partition = partitionDefaultFilter({ URI, filter })
    const filterF = filterDefaultPartition({ URI, map, partition })
    assert.deepEqual(filterF([], p), [])
    assert.deepEqual(filterF([1, 3], p), [3])
  })

  it('filterDefaultPartitionMap', () => {
    const { URI, map, separate } = array

    const partitionMapF = partitionMapDefaultSeparate({
      URI,
      map,
      separate
    })

    const filterF = filterDefaultPartitionMap({
      URI,
      partitionMap: partitionMapF
    })

    const p = (n: number) => n > 2

    assert.deepEqual(filterF([], p), [])
    assert.deepEqual(filterF([1, 3], p), [3])
  })
})
