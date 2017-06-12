import * as assert from 'assert'
import * as filterable from '../src/Filterable'
import * as array from '../src/Array'
import * as either from '../src/Either'
import * as option from '../src/Option'

describe('Filterable', () => {
  it('partitionMap', () => {
    const isEven = (n: number) => n % 2 === 0
    const { left, right } = array.partitionMap(
      (a: string) => (isEven(a.length) ? either.right<number, string>(a) : either.left<number, string>(a.length)),
      ['a', 'bb', 'ccc']
    )
    assert.deepEqual(left, [1, 3])
    assert.deepEqual(right, ['bb'])
  })

  it('partition', () => {
    const isEven = (n: number) => n % 2 === 0
    const { no, yes } = filterable.partition(array)(isEven, [1, 2, 3])
    assert.deepEqual(no, [1, 3])
    assert.deepEqual(yes, [2])
  })

  it('filterMap', () => {
    const xs = filterable.filterMap(array)(
      (s: string): option.Option<number> => (s.length >= 2 ? option.some(s.length) : option.none),
      ['a', 'bb', 'ccc']
    )
    assert.deepEqual(xs, [2, 3])
  })

  it('filter', () => {
    const isEven = (n: number) => n % 2 === 0
    const xs = filterable.filter(array)(isEven, [1, 2, 3])
    assert.deepEqual(xs, [2])
  })

  it('partitioned', () => {
    const { left, right } = filterable.partitioned(array)([
      either.left<string, number>('a'),
      either.right<string, number>(1)
    ])
    assert.deepEqual(left, ['a'])
    assert.deepEqual(right, [1])
  })

  it('filtered', () => {
    const xs = filterable.filtered(array)([option.some(1), option.none])
    assert.deepEqual(xs, [1])
  })
})
