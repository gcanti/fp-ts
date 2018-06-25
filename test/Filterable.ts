import * as assert from 'assert'
import {
  getFilterFromFilterMap,
  getFilterFromPartition,
  getFilterFromPartitionMap,
  getFilterMapFromCompact,
  getPartitionFromFilter,
  getPartitionFromFilterMap,
  getPartitionFromPartitionMap,
  getPartitionMapFromSeparate
} from '../src/Filterable'
import { array, filter } from '../src/Array'
import { left, right } from '../src/Either'
import { none, some } from '../src/Option'

describe('Filterable', () => {
  const p = (n: number) => n > 2

  it('getPartitionMapFromSeparate', () => {
    const { URI, map, separate } = array
    const F = {
      URI,
      map,
      separate
    }
    const partitionMapF = getPartitionMapFromSeparate(F)
    const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
    assert.deepEqual(partitionMapF([], f), { left: [], right: [] })
    assert.deepEqual(partitionMapF([1, 3], f), { left: [0], right: [4] })
  })

  it('getPartitionFromPartitionMap', () => {
    const { URI, map, separate } = array

    const partitionMapF = getPartitionMapFromSeparate({
      URI,
      map,
      separate
    })

    const partitionF = getPartitionFromPartitionMap({
      URI,
      partitionMap: partitionMapF
    })

    assert.deepEqual(partitionF([], p), { left: [], right: [] })
    assert.deepEqual(partitionF([1, 3], p), { left: [1], right: [3] })
  })

  it('getPartitionFromFilter', () => {
    const { URI } = array
    const F = {
      URI,
      filter
    }
    const partitionF = getPartitionFromFilter(F)
    assert.deepEqual(partitionF([], p), { left: [], right: [] })
    assert.deepEqual(partitionF([1, 3], p), { left: [1], right: [3] })
  })

  it('getPartitionFromFilterMap', () => {
    const { URI, map, compact } = array
    const filterMapF = getFilterMapFromCompact({
      URI,
      map,
      compact
    })
    const partitionF = getPartitionFromFilterMap({
      URI,
      filterMap: filterMapF
    })

    assert.deepEqual(partitionF([], p), { left: [], right: [] })
    assert.deepEqual(partitionF([1, 3], p), { left: [1], right: [3] })
  })

  it('getFilterMapFromCompact', () => {
    const { URI, map, compact } = array
    const F = {
      URI,
      map,
      compact
    }
    const filterMapF = getFilterMapFromCompact(F)
    const f = (n: number) => (p(n) ? some(n + 1) : none)
    assert.deepEqual(filterMapF([], f), [])
    assert.deepEqual(filterMapF([1, 3], f), [4])
  })

  it('getFilterFromFilterMap', () => {
    const { URI, map, compact } = array
    const filterMapF = getFilterMapFromCompact({
      URI,
      map,
      compact
    })
    const filterF = getFilterFromFilterMap({
      URI,
      filterMap: filterMapF
    })

    assert.deepEqual(filterF([], p), [])
    assert.deepEqual(filterF([1, 3], p), [3])
  })

  it('getFilterFromPartition', () => {
    const { URI, map } = array
    const partition = getPartitionFromFilter({ URI, filter })
    const filterF = getFilterFromPartition({ URI, map, partition })
    assert.deepEqual(filterF([], p), [])
    assert.deepEqual(filterF([1, 3], p), [3])
  })

  it('getFilterFromPartitionMap', () => {
    const { URI, map, separate } = array

    const partitionMapF = getPartitionMapFromSeparate({
      URI,
      map,
      separate
    })

    const filterF = getFilterFromPartitionMap({
      URI,
      partitionMap: partitionMapF
    })

    const p = (n: number) => n > 2

    assert.deepEqual(filterF([], p), [])
    assert.deepEqual(filterF([1, 3], p), [3])
  })
})
