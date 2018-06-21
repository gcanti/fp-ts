import * as assert from 'assert'
import { left, right } from '../src/Either'
import { none, some } from '../src/Option'
import {
  compactDefaultFilterMap,
  compactDefaultSeparate,
  separateDefaultCompact,
  separateDefaultPartitionMap
} from '../src/Compactable'
import { array, mapOption, partitionMap } from '../src/Array'

describe('Compactable', () => {
  it('compactDefaultSeparate', () => {
    const { URI, map, separate } = array
    const compactF = compactDefaultSeparate({
      URI,
      map,
      separate
    })
    assert.deepEqual(compactF([]), [])
    assert.deepEqual(compactF([none]), [])
    assert.deepEqual(compactF([none, some(1)]), [1])
  })

  it('compactDefaultFilterMap', () => {
    const compactF = compactDefaultFilterMap({
      URI: array.URI,
      filterMap: mapOption
    })
    assert.deepEqual(compactF([]), [])
    assert.deepEqual(compactF([none]), [])
    assert.deepEqual(compactF([none, some(1)]), [1])
  })

  it('separateDefaultCompact', () => {
    const { URI, map, compact } = array
    const separateF = separateDefaultCompact({
      URI,
      map,
      compact
    })
    assert.deepEqual(separateF([]), { left: [], right: [] })
    assert.deepEqual(separateF([left(1)]), { left: [1], right: [] })
    assert.deepEqual(separateF([left(1), right(3)]), { left: [1], right: [3] })
  })

  it('separateDefaultPartitionMap', () => {
    const separateF = separateDefaultPartitionMap({
      URI: array.URI,
      partitionMap
    })

    assert.deepEqual(separateF([]), { left: [], right: [] })
    assert.deepEqual(separateF([left(1)]), { left: [1], right: [] })
    assert.deepEqual(separateF([left(1), right(3)]), { left: [1], right: [3] })
  })
})
