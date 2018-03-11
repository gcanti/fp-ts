import * as assert from 'assert'
import {
  array,
  getMonoid,
  isEmpty,
  index,
  cons,
  snoc,
  head,
  last,
  tail,
  take,
  span,
  takeWhile,
  dropWhile,
  init,
  findIndex,
  findFirst,
  findLast,
  insertAt,
  updateAt,
  deleteAt,
  modifyAt,
  mapOption,
  catOptions,
  sort,
  refine,
  zip,
  rights,
  lefts,
  partitionMap,
  rotate,
  filter,
  copy,
  reverse,
  drop,
  flatten,
  fold,
  foldL,
  scanLeft,
  scanRight
} from '../src/Array'
import * as option from '../src/Option'
import { traverse } from '../src/Traversable'
import { fold as foldMonoid, monoidSum } from '../src/Monoid'
import { left, right } from '../src/Either'
import { none, some } from '../src/Option'
import { ordNumber } from '../src/Ord'
import { tuple, identity } from '../src/function'

describe('Array', () => {
  const as = [1, 2, 3]

  it('getMonoid', () => {
    const M = getMonoid<number>()
    assert.deepEqual(M.concat([1], [2]), [1, 2])
  })

  it('ap', () => {
    const as = array.ap([x => x * 2, x => x * 3], [1, 2, 3])
    assert.deepEqual(as, [2, 4, 6, 3, 6, 9])
  })

  it('traverse', () => {
    const tfanone = [1, 2]
    const f = (n: number): option.Option<number> => (n % 2 === 0 ? none : some(n))
    const fasnone = traverse(option.option, array)(tfanone, f)
    assert.ok(fasnone.isNone())
    const tfa = [1, 3]
    const fas = traverse(option.option, array)(tfa, f)
    assert.deepEqual(fas, some([1, 3]))
  })

  it('unfoldr', () => {
    const as = array.unfoldr(5, n => (n > 0 ? some(tuple(n, n - 1)) : none))
    assert.deepEqual(as, [5, 4, 3, 2, 1])
  })

  it('isEmpty', () => {
    assert.strictEqual(isEmpty(as), false)
    assert.strictEqual(isEmpty([]), true)
  })

  it('index', () => {
    assert.deepEqual(index(1, as), some(2))
  })

  it('cons', () => {
    assert.deepEqual(cons(0, as), [0, 1, 2, 3])
    assert.deepEqual(cons([1], [[2]]), [[1], [2]])
  })

  it('snoc', () => {
    assert.deepEqual(snoc(as, 4), [1, 2, 3, 4])
    assert.deepEqual(snoc([[1]], [2]), [[1], [2]])
  })

  it('head', () => {
    assert.deepEqual(head(as), some(1))
  })

  it('last', () => {
    assert.deepEqual(last(as), some(3))
  })

  it('tail', () => {
    assert.strictEqual(tail([]), none)
    assert.deepEqual(tail(as), some([2, 3]))
  })

  it('take', () => {
    assert.deepEqual(take(2, []), [])
    assert.deepEqual(take(2, as), [1, 2])
  })

  it('span', () => {
    assert.deepEqual(span([1, 3, 2, 4, 5], n => n % 2 === 1), { init: [1, 3], rest: [2, 4, 5] })
  })

  it('takeWhile', () => {
    assert.deepEqual(takeWhile([2, 4, 3, 6], n => n % 2 === 0), [2, 4])
    assert.deepEqual(takeWhile([], n => n % 2 === 0), [])
    assert.deepEqual(takeWhile([1, 2, 4], n => n % 2 === 0), [])
    assert.deepEqual(takeWhile([2, 4], n => n % 2 === 0), [2, 4])
  })

  it('drop', () => {
    assert.deepEqual(drop(2, as), [3])
  })

  it('dropWhile', () => {
    assert.deepEqual(dropWhile([1, 3, 2, 4, 5], n => n % 2 === 0), [1, 3, 2, 4, 5])
    assert.deepEqual(dropWhile([1, 3, 2, 4, 5], n => n % 2 === 1), [2, 4, 5])
    assert.deepEqual(dropWhile([], n => n % 2 === 0), [])
    assert.deepEqual(dropWhile([2, 4, 1], n => n % 2 === 0), [1])
    assert.deepEqual(dropWhile([2, 4], n => n % 2 === 0), [])
  })

  it('init', () => {
    assert.deepEqual(init([]), none)
    assert.deepEqual(init(as), some([1, 2]))
  })

  it('findIndex', () => {
    assert.deepEqual(findIndex([], x => x === 2), none)
    assert.deepEqual(findIndex(as, x => x === 2), some(1))
  })

  it('findFirst', () => {
    assert.deepEqual(findFirst([], x => x === 2), none)
    assert.deepEqual(findFirst([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 1 }))
  })

  it('findLast', () => {
    assert.deepEqual(findLast([], x => x === 2), none)
    assert.deepEqual(findLast([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 2 }))
    assert.deepEqual(findLast([{ a: 1, b: 2 }, { a: 2, b: 1 }], x => x.a === 1), some({ a: 1, b: 2 }))
  })

  it('insertAt', () => {
    assert.deepEqual(insertAt(1, 1, []), none)
    assert.deepEqual(insertAt(0, 1, []), some([1]))
  })

  it('updateAt', () => {
    assert.deepEqual(updateAt(1, 1, []), none)
    assert.deepEqual(updateAt(1, 1, as), some([1, 1, 3]))
  })

  it('deleteAt', () => {
    assert.deepEqual(deleteAt(1, []), none)
    assert.deepEqual(deleteAt(0, as), some([2, 3]))
  })

  it('modifyAt', () => {
    const double = (x: number) => 2 * x
    assert.deepEqual(modifyAt([], 1, double), none)
    assert.deepEqual(modifyAt(as, 1, double), some([1, 4, 3]))
  })

  it('mapOption', () => {
    const f = (a: number) => (a % 2 === 0 ? none : some(a))
    assert.deepEqual(mapOption([], f), [])
    assert.deepEqual(mapOption(as, f), [1, 3])
  })

  it('catOptions', () => {
    assert.deepEqual(catOptions([]), [])
    assert.deepEqual(catOptions([some(1), some(2), some(3)]), [1, 2, 3])
    assert.deepEqual(catOptions([some(1), none, some(3)]), [1, 3])
  })

  it('sort', () => {
    assert.deepEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
  })

  it('refine', () => {
    const x = refine([option.some(3), option.some(2), option.some(1)], (o): o is option.Option<number> => o.isSome())
    assert.deepEqual(x, [option.some(3), option.some(2), option.some(1)])
    const y = refine([option.some(3), option.none, option.some(1)], (o): o is option.Option<number> => o.isSome())
    assert.deepEqual(y, [option.some(3), option.some(1)])
  })

  it('extend', () => {
    const sum = (as: Array<number>) => foldMonoid(monoidSum)(as)
    assert.deepEqual(array.extend([1, 2, 3, 4], sum), [10, 9, 7, 4])
    assert.deepEqual(array.extend([1, 2, 3, 4], identity), [[1, 2, 3, 4], [2, 3, 4], [3, 4], [4]])
  })

  it('zip', () => {
    assert.deepEqual(zip([1, 2, 3], ['a', 'b', 'c', 'd']), [[1, 'a'], [2, 'b'], [3, 'c']])
  })

  it('rights', () => {
    assert.deepEqual(rights([]), [])
    assert.deepEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
  })

  it('lefts', () => {
    assert.deepEqual(lefts([]), [])
    assert.deepEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
  })

  it('flatten', () => {
    assert.deepEqual(flatten([[1], [2], [3]]), [1, 2, 3])
  })

  it('partitionMap', () => {
    assert.deepEqual(partitionMap([], x => x), { left: [], right: [] })
    assert.deepEqual(partitionMap([right(1), left('foo'), right(2)], x => x), { left: ['foo'], right: [1, 2] })
  })

  it('rotate', () => {
    assert.deepEqual(rotate(1, []), [])
    assert.deepEqual(rotate(1, [1]), [1])
    assert.deepEqual(rotate(1, [1, 2]), [2, 1])
    assert.deepEqual(rotate(2, [1, 2]), [1, 2])
    assert.deepEqual(rotate(0, [1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepEqual(rotate(1, [1, 2, 3, 4, 5]), [5, 1, 2, 3, 4])
    assert.deepEqual(rotate(2, [1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
    assert.deepEqual(rotate(-1, [1, 2, 3, 4, 5]), [2, 3, 4, 5, 1])
    assert.deepEqual(rotate(-2, [1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
  })

  it('filter', () => {
    assert.deepEqual(filter([1, 2, 3], n => n % 2 === 1), [1, 3])
  })

  it('map', () => {
    assert.deepEqual(array.map([1, 2, 3], n => n * 2), [2, 4, 6])
  })

  it('ap', () => {
    assert.deepEqual(array.ap([(n: number) => n * 2, (n: number) => n + 1], [1, 2, 3]), [2, 4, 6, 2, 3, 4])
  })

  it('copy', () => {
    const xs = [1, 2, 3]
    const ys = copy([1, 2, 3])
    assert.deepEqual(xs, ys)
    assert.strictEqual(xs !== ys, true)
  })

  it('chain', () => {
    assert.deepEqual(array.chain([1, 2, 3], n => [n, n + 1]), [1, 2, 2, 3, 3, 4])
  })

  it('reverse', () => {
    assert.deepEqual(reverse([1, 2, 3]), [3, 2, 1])
  })

  it('reduce', () => {
    assert.deepEqual(array.reduce([1, 2, 3], 0, (acc, a) => acc + a), 6)
  })

  it('fold', () => {
    const len = <A>(as: Array<A>): number => fold(as, 0, (_, tail) => 1 + len(tail))
    assert.strictEqual(len([1, 2, 3]), 3)
  })

  it('foldL', () => {
    const len = <A>(as: Array<A>): number => foldL(as, () => 0, (_, tail) => 1 + len(tail))
    assert.strictEqual(len([1, 2, 3]), 3)
  })

  it('scanLeft', () => {
    const f = (b: number, a: number) => b - a
    assert.deepEqual(scanLeft([1, 2, 3], 10, f), [10, 9, 7, 4])
    assert.deepEqual(scanLeft([0], 10, f), [10, 10])
    assert.deepEqual(scanLeft([], 10, f), [10])
  })

  it('scanRight', () => {
    const f = (b: number, a: number) => b - a
    assert.deepEqual(scanRight([1, 2, 3], 10, f), [-8, 9, -7, 10])
    assert.deepEqual(scanRight([0], 10, f), [-10, 10])
    assert.deepEqual(scanRight([], 10, f), [10])
  })
})
