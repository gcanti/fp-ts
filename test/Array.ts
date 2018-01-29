import * as assert from 'assert'
import * as array from '../src/Array'
import * as option from '../src/Option'

import { fold, monoidSum } from '../src/Monoid'
import { left, right } from '../src/Either'
import { none, some } from '../src/Option'

import { ordNumber } from '../src/Ord'
import { tuple } from '../src/function'

describe('Array', () => {
  const as = [1, 2, 3]

  it('ap', () => {
    const as = array.ap([x => x * 2, x => x * 3], [1, 2, 3])
    assert.deepEqual(as, [2, 4, 6, 3, 6, 9])
  })

  it('traverse', () => {
    const tfanone = [1, 2]
    const f = (n: number): option.Option<number> => (n % 2 === 0 ? none : some(n))
    const fasnone = array.traverse(option.option)(tfanone, f)
    assert.ok(fasnone.isNone())
    const tfa = [1, 3]
    const fas = array.traverse(option.option)(tfa, f)
    assert.deepEqual(fas, some([1, 3]))
  })

  it('unfoldr', () => {
    const as = array.unfoldr(n => (n > 0 ? some(tuple(n, n - 1)) : none), 5)
    assert.deepEqual(as, [5, 4, 3, 2, 1])
  })

  it('isEmpty', () => {
    assert.strictEqual(array.isEmpty(as), false)
    assert.strictEqual(array.isEmpty([]), true)
  })

  it('length', () => {
    assert.strictEqual(array.length(as), 3)
    assert.strictEqual(array.length([]), 0)
  })

  it('index', () => {
    assert.deepEqual(array.index(1)(as), some(2))
  })

  it('cons', () => {
    assert.deepEqual(array.cons(0)(as), [0, 1, 2, 3])
    assert.deepEqual(array.cons([1])([[2]]), [[1], [2]])
  })

  it('snoc', () => {
    assert.deepEqual(array.snoc(as)(4), [1, 2, 3, 4])
    assert.deepEqual(array.snoc([[1]])([2]), [[1], [2]])
  })

  it('head', () => {
    assert.deepEqual(array.head(as), some(1))
  })

  it('last', () => {
    assert.deepEqual(array.last(as), some(3))
  })

  it('tail', () => {
    assert.strictEqual(array.tail([]), none)
    assert.deepEqual(array.tail(as), some([2, 3]))
  })

  it('take', () => {
    assert.deepEqual(array.take(2)([]), [])
    assert.deepEqual(array.take(2)(as), [1, 2])
  })

  it('span', () => {
    assert.deepEqual(array.span((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })
  })

  it('takeWhile', () => {
    assert.deepEqual(array.takeWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
    assert.deepEqual(array.takeWhile((n: number) => n % 2 === 0)([]), [])
    assert.deepEqual(array.takeWhile((n: number) => n % 2 === 0)([1, 2, 4]), [])
    assert.deepEqual(array.takeWhile((n: number) => n % 2 === 0)([2, 4]), [2, 4])
  })

  it('drop', () => {
    assert.deepEqual(array.drop(2)(as), [3])
  })

  it('dropWhile', () => {
    assert.deepEqual(array.dropWhile((n: number) => n % 2 === 0)([1, 3, 2, 4, 5]), [1, 3, 2, 4, 5])
    assert.deepEqual(array.dropWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
    assert.deepEqual(array.dropWhile((n: number) => n % 2 === 0)([]), [])
    assert.deepEqual(array.dropWhile((n: number) => n % 2 === 0)([2, 4, 1]), [1])
    assert.deepEqual(array.dropWhile((n: number) => n % 2 === 0)([2, 4]), [])
  })

  it('init', () => {
    assert.deepEqual(array.init([]), none)
    assert.deepEqual(array.init(as), some([1, 2]))
  })

  it('slice', () => {
    assert.deepEqual(array.slice(1, 2)(as), [2])
  })

  it('findIndex', () => {
    assert.deepEqual(array.findIndex(x => x === 2)([]), none)
    assert.deepEqual(array.findIndex(x => x === 2)(as), some(1))
  })

  it('findFirst', () => {
    assert.deepEqual(array.findFirst(x => x === 2)([]), none)
    assert.deepEqual(
      array.findFirst<{ a: number; b: number }>(x => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]),
      some({ a: 1, b: 1 })
    )
  })

  it('findLast', () => {
    assert.deepEqual(array.findLast(x => x === 2)([]), none)
    assert.deepEqual(
      array.findLast<{ a: number; b: number }>(x => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]),
      some({ a: 1, b: 2 })
    )
    assert.deepEqual(
      array.findLast<{ a: number; b: number }>(x => x.a === 1)([{ a: 1, b: 2 }, { a: 2, b: 1 }]),
      some({ a: 1, b: 2 })
    )
  })

  it('insertAt', () => {
    assert.deepEqual(array.insertAt(1)(1)([]), none)
    assert.deepEqual(array.insertAt(0)(1)([]), some([1]))
  })

  it('updateAt', () => {
    assert.deepEqual(array.updateAt(1)(1)([]), none)
    assert.deepEqual(array.updateAt(1)(1)(as), some([1, 1, 3]))
  })

  it('deleteAt', () => {
    assert.deepEqual(array.deleteAt(1)([]), none)
    assert.deepEqual(array.deleteAt(0)(as), some([2, 3]))
  })

  it('modifyAt', () => {
    const double = (x: number) => 2 * x
    assert.deepEqual(array.modifyAt(1)(double)([]), none)
    assert.deepEqual(array.modifyAt(1)(double)(as), some([1, 4, 3]))
  })

  it('mapOption', () => {
    const f = (a: number) => (a % 2 === 0 ? none : some(a))
    assert.deepEqual(array.mapOption(as, f), [1, 3])
  })

  it('catOptions', () => {
    assert.deepEqual(array.catOptions([some(1), some(2), some(3)]), [1, 2, 3])
    assert.deepEqual(array.catOptions([some(1), none, some(3)]), [1, 3])
  })

  it('sort', () => {
    assert.deepEqual(array.sort(ordNumber)([3, 2, 1]), [1, 2, 3])
  })

  it('refine', () => {
    const x = array.refine([option.some(3), option.some(2), option.some(1)])(option.isSome)
    assert.deepEqual(x, [option.some(3), option.some(2), option.some(1)])
    const y = array.refine([option.some(3), option.none, option.some(1)])(option.isSome)
    assert.deepEqual(y, [option.some(3), option.some(1)])
  })

  it('extend', () => {
    const sum = (as: Array<number>) => fold(monoidSum)(as)
    assert.deepEqual(array.extend(sum, [1, 2, 3, 4]), [10, 9, 7, 4])
    assert.deepEqual(array.extend(a => a, [1, 2, 3, 4]), [[1, 2, 3, 4], [2, 3, 4], [3, 4], [4]])
  })

  it('zip', () => {
    assert.deepEqual(array.zip([1, 2, 3])(['a', 'b', 'c', 'd']), [[1, 'a'], [2, 'b'], [3, 'c']])
  })

  it('rights', () => {
    const eithers = [right(1), left('foo'), right(2)]
    assert.deepEqual(array.rights(eithers), [1, 2])
  })

  it('lefts', () => {
    const eithers = [right(1), left('foo'), right(2)]
    assert.deepEqual(array.lefts(eithers), ['foo'])
  })

  it('flatten', () => {
    assert.deepEqual(array.flatten([[1], [2], [3]]), [1, 2, 3])
  })

  it('partitionMap', () => {
    const eithers = [right(1), left('foo'), right(2)]
    assert.deepEqual(array.partitionMap(x => x, eithers), { left: ['foo'], right: [1, 2] })
  })

  it('rotate', () => {
    assert.deepEqual(array.rotate(1)([]), [])
    assert.deepEqual(array.rotate(1)([1]), [1])
    assert.deepEqual(array.rotate(1)([1, 2]), [2, 1])
    assert.deepEqual(array.rotate(2)([1, 2]), [1, 2])
    assert.deepEqual(array.rotate(0)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepEqual(array.rotate(1)([1, 2, 3, 4, 5]), [5, 1, 2, 3, 4])
    assert.deepEqual(array.rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
    assert.deepEqual(array.rotate(-1)([1, 2, 3, 4, 5]), [2, 3, 4, 5, 1])
    assert.deepEqual(array.rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
  })

  it('filter', () => {
    assert.deepEqual(array.filter((n: number) => n % 2 === 1)([1, 2, 3]), [1, 3])
  })

  it('map', () => {
    assert.deepEqual(array.map([1, 2, 3], n => n * 2), [2, 4, 6])
  })

  it('ap', () => {
    assert.deepEqual(array.ap([(n: number) => n * 2, (n: number) => n + 1], [1, 2, 3]), [2, 4, 6, 2, 3, 4])
  })

  it('copy', () => {
    const xs = [1, 2, 3]
    const ys = array.copy([1, 2, 3])
    assert.deepEqual(xs, ys)
    assert.strictEqual(xs !== ys, true)
  })

  it('chain', () => {
    assert.deepEqual(array.chain([1, 2, 3], n => [n, n + 1]), [1, 2, 2, 3, 3, 4])
  })

  it('reverse', () => {
    assert.deepEqual(array.reverse([1, 2, 3]), [3, 2, 1])
  })

  it('reduce', () => {
    assert.deepEqual(array.reduce([1, 2, 3], 0, (acc, a) => acc + a), 6)
  })
})
