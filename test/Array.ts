import * as arr from '../src/Array'
import { some, none } from '../src/Option'
import * as option from '../src/Option'
import * as assert from 'assert'
import { numberOrd } from '../src/Ord'
import { eqOptions as eq } from './helpers'

describe('Arr', () => {

  const as = [1, 2, 3]
  const empty = arr.empty()

  it('traverse', () => {
    const tfanone = [1, 2]
    const f = (n: number): option.Option<number> => n % 2 === 0 ? none : some(n)
    const fasnone = arr.traverse(option, f, tfanone)
    assert.ok(option.isNone(fasnone))
    const tfa = [1, 3]
    const fas = arr.traverse(option, f, tfa)
    eq(fas, some([1, 3]))
  })

  it('unfoldr', () => {
    const as = arr.unfoldr(n => n > 0 ? some([n, n - 1]) : none, 5)
    assert.deepEqual(as, [5, 4, 3, 2, 1])
  })

  it('isEmpty', () => {
    assert.strictEqual(arr.isEmpty(as), false)
    assert.strictEqual(arr.isEmpty(empty), true)
  })

  it('length', () => {
    assert.strictEqual(arr.length(as), 3)
    assert.strictEqual(arr.length(empty), 0)
  })

  it('index', () => {
    eq(arr.index(as, 1), some(2))
  })

  it('cons', () => {
    assert.deepEqual(arr.cons(0, as), [0, 1, 2, 3])
  })

  it('snoc', () => {
    assert.deepEqual(arr.snoc(as, 4), [1, 2, 3, 4])
  })

  it('curriedSnoc', () => {
    assert.deepEqual(arr.curriedSnoc(as)(4), [1, 2, 3, 4])
  })

  it('head', () => {
    eq(arr.head(as), some(1))
  })

  it('last', () => {
    eq(arr.last(as), some(3))
  })

  it('tail', () => {
    assert.strictEqual(arr.tail(empty), none)
    eq(arr.tail(as), some([2, 3]))
  })

  it('take', () => {
    assert.deepEqual(arr.take(2, empty), [])
    assert.deepEqual(arr.take(2, as), [1, 2])
  })

  it('takeWhile', () => {
    assert.deepEqual(arr.takeWhile((n) => n % 2 === 0, as), [2])
  })

  it('drop', () => {
    assert.deepEqual(arr.drop(2, as), [3])
  })

  it('dropWhile', () => {
    assert.deepEqual(arr.dropWhile((n) => n % 2 === 0, as), [1, 3])
  })

  it('init', () => {
    eq(arr.init(empty), none)
    eq(arr.init(as), some([1, 2]))
  })

  it('slice', () => {
    assert.deepEqual(arr.slice(1, 2, as), [2])
  })

  it('findIndex', () => {
    eq(arr.findIndex((x) => x === 2, empty), none)
    eq(arr.findIndex((x) => x === 2, as), some(1))
  })

  it('insertAt', () => {
    eq(arr.insertAt(1, 1, empty), none)
    eq(arr.insertAt(0, 1, empty), some([1]))
  })

  it('updateAt', () => {
    eq(arr.updateAt(1, 1, empty), none)
    eq(arr.updateAt(1, 1, as), some([1, 1, 3]))
  })

  it('deleteAt', () => {
    eq(arr.deleteAt(1, empty), none)
    eq(arr.deleteAt(0, as), some([2, 3]))
  })

  it('modifyAt', () => {
    eq(arr.modifyAt(1, x => 2 * x, empty), none)
    eq(arr.modifyAt(1, x => 2 * x, as), some([1, 4, 3]))
  })

  it('mapOption', () => {
    const f = (a: number) => a % 2 === 0 ? none : some(a)
    assert.deepEqual(arr.mapOption(f, as), [1, 3])
  })

  it('catOptions', () => {
    assert.deepEqual(arr.catOptions([some(1), some(2), some(3)]), [1, 2, 3])
    assert.deepEqual(arr.catOptions([some(1), none, some(3)]), [1, 3])
  })

  it('sort', () => {
    assert.deepEqual(arr.sort(numberOrd, [3, 2, 1]), [1, 2, 3])
  })

})
