import * as array from '../src/Array'
import { some, none } from '../src/Option'
import * as option from '../src/Option'
import * as assert from 'assert'
import { numberOrd } from '../src/Ord'
import { eqOptions as eq } from './helpers'
import { monoidSum, fold } from '../src/Monoid'
import { tuple } from '../src/function'

describe('Array', () => {
  const as = [1, 2, 3]
  const empty = array.empty()

  it('traverse', () => {
    const tfanone = [1, 2]
    const f = (n: number): option.Option<number> => (n % 2 === 0 ? none : some(n))
    const fasnone = array.traverse(option)(f, tfanone)
    assert.ok(option.isNone(fasnone))
    const tfa = [1, 3]
    const fas = array.traverse(option)(f, tfa)
    eq(fas, some([1, 3]))
  })

  it('unfoldr', () => {
    const as = array.unfoldr(n => (n > 0 ? some(tuple(n, n - 1)) : none), 5)
    assert.deepEqual(as, [5, 4, 3, 2, 1])
  })

  it('isEmpty', () => {
    assert.strictEqual(array.isEmpty(as), false)
    assert.strictEqual(array.isEmpty(empty), true)
  })

  it('length', () => {
    assert.strictEqual(array.length(as), 3)
    assert.strictEqual(array.length(empty), 0)
  })

  it('index', () => {
    eq(array.index(1)(as), some(2))
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
    eq(array.head(as), some(1))
  })

  it('last', () => {
    eq(array.last(as), some(3))
  })

  it('tail', () => {
    assert.strictEqual(array.tail(empty), none)
    eq(array.tail(as), some([2, 3]))
  })

  it('take', () => {
    assert.deepEqual(array.take(2)(empty), [])
    assert.deepEqual(array.take(2)(as), [1, 2])
  })

  it('takeWhile', () => {
    assert.deepEqual(array.takeWhile((n: number) => n % 2 === 0)(as), [2])
  })

  it('drop', () => {
    assert.deepEqual(array.drop(2)(as), [3])
  })

  it('dropWhile', () => {
    assert.deepEqual(array.dropWhile((n: number) => n % 2 === 0)(as), [1, 3])
  })

  it('init', () => {
    eq(array.init(empty), none)
    eq(array.init(as), some([1, 2]))
  })

  it('slice', () => {
    assert.deepEqual(array.slice(1, 2)(as), [2])
  })

  it('findIndex', () => {
    eq(array.findIndex(x => x === 2)(empty), none)
    eq(array.findIndex(x => x === 2)(as), some(1))
  })

  it('insertAt', () => {
    eq(array.insertAt(1)(1)(empty), none)
    eq(array.insertAt(0)(1)(empty), some([1]))
  })

  it('updateAt', () => {
    eq(array.updateAt(1)(1)(empty), none)
    eq(array.updateAt(1)(1)(as), some([1, 1, 3]))
  })

  it('deleteAt', () => {
    eq(array.deleteAt(1)(empty), none)
    eq(array.deleteAt(0)(as), some([2, 3]))
  })

  it('modifyAt', () => {
    const double = (x: number) => 2 * x
    eq(array.modifyAt(1)(double)(empty), none)
    eq(array.modifyAt(1)(double)(as), some([1, 4, 3]))
  })

  it('mapOption', () => {
    const f = (a: number) => (a % 2 === 0 ? none : some(a))
    assert.deepEqual(array.mapOption(f)(as), [1, 3])
  })

  it('catOptions', () => {
    assert.deepEqual(array.catOptions([some(1), some(2), some(3)]), [1, 2, 3])
    assert.deepEqual(array.catOptions([some(1), none, some(3)]), [1, 3])
  })

  it('sort', () => {
    assert.deepEqual(array.sort(numberOrd)([3, 2, 1]), [1, 2, 3])
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
  })

  it('zip', () => {
    assert.deepEqual(array.zip([1, 2, 3])(['a', 'b', 'c', 'd']), [[1, 'a'], [2, 'b'], [3, 'c']])
  })
})
