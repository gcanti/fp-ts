import * as assert from 'assert'
import { left, right } from '../src/Either'
import { none, some } from '../src/Option'
import {
  getCompactFromFilterMap,
  getCompactFromSeparate,
  getSeparateFromCompact,
  getSeparateFromPartitionMap
} from '../src/Compactable'
import { array, mapOption, partitionMap } from '../src/Array'

describe('Compactable', () => {
  it('getCompactFromSeparate', () => {
    const { URI, map, separate } = array
    const compactF = getCompactFromSeparate({
      URI,
      map,
      separate
    })
    assert.deepEqual(compactF([]), [])
    assert.deepEqual(compactF([none]), [])
    assert.deepEqual(compactF([none, some(1)]), [1])
  })

  it('getCompactFromFilterMap', () => {
    const compactF = getCompactFromFilterMap({
      URI: array.URI,
      filterMap: mapOption
    })
    assert.deepEqual(compactF([]), [])
    assert.deepEqual(compactF([none]), [])
    assert.deepEqual(compactF([none, some(1)]), [1])
  })

  it('getSeparateFromCompact', () => {
    const { URI, map, compact } = array
    const separateF = getSeparateFromCompact({
      URI,
      map,
      compact
    })
    assert.deepEqual(separateF([]), { left: [], right: [] })
    assert.deepEqual(separateF([left(1)]), { left: [1], right: [] })
    assert.deepEqual(separateF([left(1), right(3)]), { left: [1], right: [3] })
  })

  it('getSeparateFromPartitionMap', () => {
    const separateF = getSeparateFromPartitionMap({
      URI: array.URI,
      partitionMap
    })

    assert.deepEqual(separateF([]), { left: [], right: [] })
    assert.deepEqual(separateF([left(1)]), { left: [1], right: [] })
    assert.deepEqual(separateF([left(1), right(3)]), { left: [1], right: [3] })
  })
})
