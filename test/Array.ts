import * as assert from 'assert'
import * as fc from 'fast-check'
import {
  array,
  cons,
  copy,
  deleteAt,
  drop,
  dropWhile,
  findFirst,
  findIndex,
  findLast,
  flatten,
  fold,
  getMonoid,
  getOrd,
  head,
  init,
  insertAt,
  isEmpty,
  last,
  lefts,
  modifyAt,
  rights,
  rotate,
  scan,
  scanRight,
  snoc,
  sort,
  sortBy,
  span,
  tail,
  take,
  takeWhile,
  uniq,
  updateAt,
  zip,
  unzip,
  foldRight,
  chop,
  chunksOf,
  splitAt,
  takeRight,
  dropRight,
  range,
  makeBy,
  replicate,
  findLastIndex,
  zipWith,
  comprehension,
  union,
  intersection,
  difference,
  unsafeUpdateAt,
  findFirstMap,
  findLastMap,
  getShow,
  reverse,
  getEq
} from '../src/Array'
import { left, right } from '../src/Either'
import { fold as foldMonoid, monoidSum, monoidString } from '../src/Monoid'
import * as O from '../src/Option'
import { contramap as contramapOrd, ordNumber, ordString } from '../src/Ord'
import { contramap, eqBoolean, eqNumber, eqString, Eq } from '../src/Eq'
import { identity, tuple, Predicate } from '../src/function'
import * as I from '../src/Identity'
import * as C from '../src/Const'
import { showString } from '../src/Show'

const p = (n: number) => n > 2

describe('Array', () => {
  const as = [1, 2, 3]

  it('alt', () => {
    assert.deepStrictEqual(array.alt([1, 2], () => [3, 4]), [1, 2, 3, 4])
  })

  it('getMonoid', () => {
    const M = getMonoid<number>()
    assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
    assert.deepStrictEqual(M.concat([1, 2], M.empty), [1, 2])
    assert.deepStrictEqual(M.concat(M.empty, [1, 2]), [1, 2])
  })

  it('getEq', () => {
    const O = getEq(ordString)
    assert.strictEqual(O.equals([], []), true, '[] ]')
    assert.strictEqual(O.equals(['a'], ['a']), true, '[a], [a]')
    assert.strictEqual(O.equals(['a', 'b'], ['a', 'b']), true, '[a, b], [a, b]')
    assert.strictEqual(O.equals(['a'], []), false, '[a] []')
    assert.strictEqual(O.equals([], ['a']), false, '[], [a]')
    assert.strictEqual(O.equals(['a'], ['b']), false, '[a], [b]')
    assert.strictEqual(O.equals(['a', 'b'], ['b', 'a']), false, '[a, b], [b, a]')
    assert.strictEqual(O.equals(['a', 'a'], ['a']), false, '[a, a], [a]')
  })

  it('getOrd', () => {
    const O = getOrd(ordString)
    assert.strictEqual(O.compare([], []), 0, '[] ]')
    assert.strictEqual(O.compare(['a'], ['a']), 0, '[a], [a]')

    assert.strictEqual(O.compare(['b'], ['a']), 1, '[b], [a]')
    assert.strictEqual(O.compare(['a'], ['b']), -1, '[a], [b]')

    assert.strictEqual(O.compare(['a'], []), 1, '[a] []')
    assert.strictEqual(O.compare([], ['a']), -1, '[], [a]')
    assert.strictEqual(O.compare(['a', 'a'], ['a']), 1, '[a, a], [a]')
    assert.strictEqual(O.compare(['a', 'a'], ['b']), -1, '[a, a], [a]')

    assert.strictEqual(O.compare(['a', 'a'], ['a', 'a']), 0, '[a, a], [a, a]')
    assert.strictEqual(O.compare(['a', 'b'], ['a', 'b']), 0, '[a, b], [a, b]')

    assert.strictEqual(O.compare(['a', 'a'], ['a', 'b']), -1, '[a, a], [a, b]')
    assert.strictEqual(O.compare(['a', 'b'], ['a', 'a']), 1, '[a, b], [a, a]')

    assert.strictEqual(O.compare(['a', 'b'], ['b', 'a']), -1, '[a, b], [b, a]')
    assert.strictEqual(O.compare(['b', 'a'], ['a', 'a']), 1, '[b, a], [a, a]')
    assert.strictEqual(O.compare(['b', 'a'], ['a', 'b']), 1, '[b, b], [a, a]')
    assert.strictEqual(O.compare(['b', 'b'], ['b', 'a']), 1, '[b, b], [b, a]')
    assert.strictEqual(O.compare(['b', 'a'], ['b', 'b']), -1, '[b, a], [b, b]')
  })

  it('ap', () => {
    const as = array.ap([x => x * 2, x => x * 3], [1, 2, 3])
    assert.deepStrictEqual(as, [2, 4, 6, 3, 6, 9])
  })

  it('traverse', () => {
    const tfanone = [1, 2]
    const f = (n: number): O.Option<number> => (n % 2 === 0 ? O.none : O.some(n))
    const fasnone = array.traverse(O.option)(tfanone, f)
    assert.ok(O.isNone(fasnone))
    const tfa = [1, 3]
    const fas = array.traverse(O.option)(tfa, f)
    assert.deepStrictEqual(fas, O.some([1, 3]))
  })

  it('sequence', () => {
    assert.deepStrictEqual(array.sequence(O.option)([O.some(1), O.some(3)]), O.some([1, 3]))
    assert.deepStrictEqual(array.sequence(O.option)([O.some(1), O.none]), O.none)
  })

  it('unfold', () => {
    const as = array.unfold(5, n => (n > 0 ? O.some([n, n - 1]) : O.none))
    assert.deepStrictEqual(as, [5, 4, 3, 2, 1])
  })

  it('isEmpty', () => {
    assert.strictEqual(isEmpty(as), false)
    assert.strictEqual(isEmpty([]), true)
  })

  it('cons', () => {
    assert.deepStrictEqual(cons(0, as), [0, 1, 2, 3])
    assert.deepStrictEqual(cons([1], [[2]]), [[1], [2]])
  })

  it('snoc', () => {
    assert.deepStrictEqual(snoc(as, 4), [1, 2, 3, 4])
    assert.deepStrictEqual(snoc([[1]], [2]), [[1], [2]])
  })

  it('head', () => {
    assert.deepStrictEqual(head(as), O.some(1))
    assert.deepStrictEqual(head([]), O.none)
  })

  it('last', () => {
    assert.deepStrictEqual(last(as), O.some(3))
    assert.deepStrictEqual(last([]), O.none)
  })

  it('tail', () => {
    assert.deepStrictEqual(tail(as), O.some([2, 3]))
    assert.deepStrictEqual(tail([]), O.none)
  })

  it('take', () => {
    assert.deepStrictEqual(take(2, []), [])
    assert.deepStrictEqual(take(2, [1, 2, 3]), [1, 2])
    assert.deepStrictEqual(take(0, [1, 2, 3]), [])
  })

  it('takeRight', () => {
    assert.deepStrictEqual(takeRight(2, [1, 2, 3, 4, 5]), [4, 5])
    assert.deepStrictEqual(takeRight(0, [1, 2, 3, 4, 5]), [])
    assert.deepStrictEqual(takeRight(2, []), [])
    assert.deepStrictEqual(takeRight(5, [1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(takeRight(10, [1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
  })

  it('span', () => {
    assert.deepStrictEqual(span([1, 3, 2, 4, 5], n => n % 2 === 1), { init: [1, 3], rest: [2, 4, 5] })

    // refinements
    const xs: Array<string | number> = [1, 'a', 3]
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = span(xs, isNumber)
    assert.deepStrictEqual(actual, { init: [1], rest: ['a', 3] })
  })

  it('takeWhile', () => {
    assert.deepStrictEqual(takeWhile([2, 4, 3, 6], n => n % 2 === 0), [2, 4])
    assert.deepStrictEqual(takeWhile([], n => n % 2 === 0), [])
    assert.deepStrictEqual(takeWhile([1, 2, 4], n => n % 2 === 0), [])
    assert.deepStrictEqual(takeWhile([2, 4], n => n % 2 === 0), [2, 4])
  })

  it('drop', () => {
    assert.deepStrictEqual(drop(2, [1, 2, 3]), [3])
    assert.deepStrictEqual(drop(10, [1, 2, 3]), [])
    assert.deepStrictEqual(drop(0, [1, 2, 3]), [1, 2, 3])
  })

  it('dropRight', () => {
    assert.deepStrictEqual(dropRight(2, [1, 2, 3, 4, 5]), [1, 2, 3])
    assert.deepStrictEqual(dropRight(10, [1, 2, 3, 4, 5]), [])
    assert.deepStrictEqual(dropRight(0, [1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
  })

  it('dropWhile', () => {
    assert.deepStrictEqual(dropWhile([1, 3, 2, 4, 5], n => n % 2 === 0), [1, 3, 2, 4, 5])
    assert.deepStrictEqual(dropWhile([1, 3, 2, 4, 5], n => n % 2 === 1), [2, 4, 5])
    assert.deepStrictEqual(dropWhile([], n => n % 2 === 0), [])
    assert.deepStrictEqual(dropWhile([2, 4, 1], n => n % 2 === 0), [1])
    assert.deepStrictEqual(dropWhile([2, 4], n => n % 2 === 0), [])
  })

  it('init', () => {
    assert.deepStrictEqual(init(as), O.some([1, 2]))
    assert.deepStrictEqual(init([]), O.none)
  })

  it('findIndex', () => {
    assert.deepStrictEqual(findIndex([1, 2, 3], x => x === 2), O.some(1))
    assert.deepStrictEqual(findIndex([], x => x === 2), O.none)
  })

  it('findFirst', () => {
    assert.deepStrictEqual(findFirst([], x => x === 2), O.none)
    assert.deepStrictEqual(findFirst([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), O.some({ a: 1, b: 1 }))
    interface A {
      type: 'A'
      a: number
    }

    interface B {
      type: 'B'
    }

    type AOrB = A | B
    const isA = (x: AOrB): x is A => x.type === 'A'
    const xs1: Array<AOrB> = [{ type: 'B' }, { type: 'A', a: 1 }, { type: 'A', a: 2 }]
    assert.deepStrictEqual(findFirst(xs1, isA), O.some({ type: 'A', a: 1 }))
    const xs2: Array<AOrB> = [{ type: 'B' }]
    assert.deepStrictEqual(findFirst(xs2, isA), O.none)
    assert.deepStrictEqual(findFirst([null, 'a'], x => x === null), O.some(null))
  })

  const optionStringEq = O.getEq(eqString)
  const multipleOf3: Predicate<number> = (x: number) => x % 3 === 0
  const multipleOf3AsString = (x: number) => O.option.map(O.fromPredicate(multipleOf3)(x), x => `${x}`)

  it('`findFirstMap(arr, fun)` is equivalent to map and `head(mapOption(arr, fun)`', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), arr =>
        optionStringEq.equals(findFirstMap(arr, multipleOf3AsString), head(array.filterMap(arr, multipleOf3AsString)))
      )
    )
  })

  it('findLast', () => {
    assert.deepStrictEqual(findLast([], x => x === 2), O.none)
    assert.deepStrictEqual(findLast([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), O.some({ a: 1, b: 2 }))
    assert.deepStrictEqual(findLast([{ a: 1, b: 2 }, { a: 2, b: 1 }], x => x.a === 1), O.some({ a: 1, b: 2 }))
    assert.deepStrictEqual(findLast(['a', null], x => x === null), O.some(null))
  })

  it('`findLastMap(arr, fun)` is equivalent to `last(mapOption(arr, fun))`', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), arr =>
        optionStringEq.equals(findLastMap(arr, multipleOf3AsString), last(array.filterMap(arr, multipleOf3AsString)))
      )
    )
  })

  it('findLastIndex', () => {
    interface X {
      a: number
      b: number
    }
    const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
    assert.deepStrictEqual(findLastIndex(xs, x => x.a === 1), O.some(1))
    assert.deepStrictEqual(findLastIndex(xs, x => x.a === 4), O.none)
    assert.deepStrictEqual(findLastIndex([], (x: X) => x.a === 1), O.none)
  })

  it('insertAt', () => {
    assert.deepStrictEqual(insertAt(1, 1, []), O.none)
    assert.deepStrictEqual(insertAt(0, 1, []), O.some([1]))
    assert.deepStrictEqual(insertAt(2, 5, [1, 2, 3, 4]), O.some([1, 2, 5, 3, 4]))
  })

  it('unsafeUpdateAt', () => {
    // should return the same reference if nothing changed
    const x = { a: 1 }
    const as = [x]
    const result = unsafeUpdateAt(0, x, as)
    assert.strictEqual(result, as)
  })

  it('updateAt', () => {
    assert.deepStrictEqual(updateAt(1, 1, as), O.some([1, 1, 3]))
    assert.deepStrictEqual(updateAt(1, 1, []), O.none)
  })

  it('deleteAt', () => {
    assert.deepStrictEqual(deleteAt(0, as), O.some([2, 3]))
    assert.deepStrictEqual(deleteAt(1, []), O.none)
  })

  it('modifyAt', () => {
    const double = (x: number): number => x * 2
    assert.deepStrictEqual(modifyAt(1, as, double), O.some([1, 4, 3]))
    assert.deepStrictEqual(modifyAt(1, [], double), O.none)
  })

  it('sort', () => {
    assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
  })

  it('extend', () => {
    const sum = (as: Array<number>) => foldMonoid(monoidSum)(as)
    assert.deepStrictEqual(array.extend([1, 2, 3, 4], sum), [10, 9, 7, 4])
    assert.deepStrictEqual(array.extend([1, 2, 3, 4], identity), [[1, 2, 3, 4], [2, 3, 4], [3, 4], [4]])
  })

  it('zipWith', () => {
    assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
  })

  it('zip', () => {
    assert.deepStrictEqual(zip([1, 2, 3], ['a', 'b', 'c', 'd']), [[1, 'a'], [2, 'b'], [3, 'c']])
  })

  it('unzip', () => {
    assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
  })

  it('rights', () => {
    assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
    assert.deepStrictEqual(rights([]), [])
  })

  it('lefts', () => {
    assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
    assert.deepStrictEqual(lefts([]), [])
  })

  it('flatten', () => {
    assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
  })

  it('rotate', () => {
    assert.deepStrictEqual(rotate(1, []), [])
    assert.deepStrictEqual(rotate(1, [1]), [1])
    assert.deepStrictEqual(rotate(1, [1, 2]), [2, 1])
    assert.deepStrictEqual(rotate(2, [1, 2]), [1, 2])
    assert.deepStrictEqual(rotate(0, [1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(rotate(1, [1, 2, 3, 4, 5]), [5, 1, 2, 3, 4])
    assert.deepStrictEqual(rotate(2, [1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
    assert.deepStrictEqual(rotate(-1, [1, 2, 3, 4, 5]), [2, 3, 4, 5, 1])
    assert.deepStrictEqual(rotate(-2, [1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
  })

  it('map', () => {
    assert.deepStrictEqual(array.map([1, 2, 3], n => n * 2), [2, 4, 6])
  })

  it('mapWithIndex', () => {
    assert.deepStrictEqual(array.mapWithIndex([1, 2, 3], (i, n) => n + i), [1, 3, 5])
  })

  it('ap', () => {
    assert.deepStrictEqual(array.ap([(n: number) => n * 2, (n: number) => n + 1], [1, 2, 3]), [2, 4, 6, 2, 3, 4])
  })

  it('copy', () => {
    const xs = [1, 2, 3]
    const ys = copy([1, 2, 3])
    assert.deepStrictEqual(xs, ys)
    assert.strictEqual(xs !== ys, true)
  })

  it('chain', () => {
    assert.deepStrictEqual(array.chain([1, 2, 3], n => [n, n + 1]), [1, 2, 2, 3, 3, 4])
  })

  it('reverse', () => {
    assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
  })

  it('reduce', () => {
    assert.deepStrictEqual(array.reduce(['a', 'b', 'c'], '', (acc, a) => acc + a), 'abc')
  })

  it('foldMap', () => {
    const foldMap = array.foldMap(monoidString)
    const x1 = ['a', 'b', 'c']
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'abc')
    const x2: Array<string> = []
    assert.strictEqual(foldMap(x2, f1), '')
  })

  it('reduceRight', () => {
    const reduceRight = array.reduceRight
    const x1 = ['a', 'b', 'c']
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(reduceRight(x1, init1, f1), 'cba')
    const x2: Array<string> = []
    assert.strictEqual(reduceRight(x2, init1, f1), '')
  })

  it('fold', () => {
    const len = <A>(as: Array<A>): number => fold(as, () => 0, (_, tail) => 1 + len(tail))
    assert.strictEqual(len([1, 2, 3]), 3)
  })

  it('foldRight', () => {
    const len = <A>(as: Array<A>): number => foldRight(as, () => 0, (init, _) => 1 + len(init))
    assert.strictEqual(len([1, 2, 3]), 3)
  })

  it('scan', () => {
    const f = (b: number, a: number) => b - a
    assert.deepStrictEqual(scan([1, 2, 3], 10, f), [10, 9, 7, 4])
    assert.deepStrictEqual(scan([0], 10, f), [10, 10])
    assert.deepStrictEqual(scan([], 10, f), [10])
  })

  it('scanRight', () => {
    const f = (b: number, a: number) => b - a
    assert.deepStrictEqual(scanRight([1, 2, 3], 10, f), [-8, 9, -7, 10])
    assert.deepStrictEqual(scanRight([0], 10, f), [-10, 10])
    assert.deepStrictEqual(scanRight([], 10, f), [10])
  })

  it('uniq', () => {
    interface A {
      a: string
      b: number
    }

    const eqA = contramap(ordNumber, (f: A) => f.b)
    const arrA: A = { a: 'a', b: 1 }
    const arrB: A = { a: 'b', b: 1 }
    const arrC: A = { a: 'c', b: 2 }
    const arrD: A = { a: 'd', b: 2 }
    const arrUniq = [arrA, arrC]

    assert.deepStrictEqual(uniq(eqA)(arrUniq), arrUniq, 'Preserve original array')
    assert.deepStrictEqual(uniq(eqA)([arrA, arrB, arrC, arrD]), [arrA, arrC])
    assert.deepStrictEqual(uniq(eqA)([arrB, arrA, arrC, arrD]), [arrB, arrC])
    assert.deepStrictEqual(uniq(eqA)([arrA, arrA, arrC, arrD, arrA]), [arrA, arrC])
    assert.deepStrictEqual(uniq(eqA)([arrA, arrC]), [arrA, arrC])
    assert.deepStrictEqual(uniq(eqA)([arrC, arrA]), [arrC, arrA])
    assert.deepStrictEqual(uniq(eqBoolean)([true, false, true, false]), [true, false])
    assert.deepStrictEqual(uniq(eqNumber)([]), [])
    assert.deepStrictEqual(uniq(eqNumber)([-0, -0]), [-0])
    assert.deepStrictEqual(uniq(eqNumber)([0, -0]), [0])
    assert.deepStrictEqual(uniq(eqNumber)([1]), [1])
    assert.deepStrictEqual(uniq(eqNumber)([2, 1, 2]), [2, 1])
    assert.deepStrictEqual(uniq(eqNumber)([1, 2, 1]), [1, 2])
    assert.deepStrictEqual(uniq(eqNumber)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(uniq(eqNumber)([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(uniq(eqNumber)([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(uniq(eqString)(['a', 'b', 'a']), ['a', 'b'])
    assert.deepStrictEqual(uniq(eqString)(['a', 'b', 'A']), ['a', 'b', 'A'])
  })

  it('sortBy', () => {
    interface Person {
      name: string
      age: number
    }
    const byName = contramapOrd(ordString, (p: Person) => p.name)
    const byAge = contramapOrd(ordNumber, (p: Person) => p.age)
    const sortByNameByAge = sortBy([byName, byAge])
    const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
    assert.deepStrictEqual(sortByNameByAge(persons), [
      { name: 'a', age: 1 },
      { name: 'b', age: 2 },
      { name: 'b', age: 3 },
      { name: 'c', age: 2 }
    ])
    const sortByAgeByName = sortBy([byAge, byName])
    assert.deepStrictEqual(sortByAgeByName(persons), [
      { name: 'a', age: 1 },
      { name: 'b', age: 2 },
      { name: 'c', age: 2 },
      { name: 'b', age: 3 }
    ])
  })

  it('compact', () => {
    assert.deepStrictEqual(array.compact([]), [])
    assert.deepStrictEqual(array.compact([O.some(1), O.some(2), O.some(3)]), [1, 2, 3])
    assert.deepStrictEqual(array.compact([O.some(1), O.none, O.some(3)]), [1, 3])
  })

  it('separate', () => {
    assert.deepStrictEqual(array.separate([]), { left: [], right: [] })
    assert.deepStrictEqual(array.separate([left(123), right('123')]), { left: [123], right: ['123'] })
  })

  it('filter', () => {
    const filter = array.filter
    assert.deepStrictEqual(filter([1, 2, 3], n => n % 2 === 1), [1, 3])
    assert.deepStrictEqual(array.filter([1, 2, 3], n => n % 2 === 1), [1, 3])
    const x = filter([O.some(3), O.some(2), O.some(1)], O.isSome)
    assert.deepStrictEqual(x, [O.some(3), O.some(2), O.some(1)])
    const y = filter([O.some(3), O.none, O.some(1)], O.isSome)
    assert.deepStrictEqual(y, [O.some(3), O.some(1)])
  })

  it('filterWithIndex', () => {
    assert.deepStrictEqual(array.filterWithIndex(['a', 'b', 'c'], n => n % 2 === 0), ['a', 'c'])
  })

  it('filterMap', () => {
    const f = (n: number) => (n % 2 === 0 ? O.none : O.some(n))
    assert.deepStrictEqual(array.filterMap(as, f), [1, 3])
    assert.deepStrictEqual(array.filterMap([], f), [])
  })

  it('partitionMap', () => {
    assert.deepStrictEqual(array.partitionMap([], identity), { left: [], right: [] })
    assert.deepStrictEqual(array.partitionMap([right(1), left('foo'), right(2)], identity), {
      left: ['foo'],
      right: [1, 2]
    })
  })

  it('partition', () => {
    const partition = array.partition
    assert.deepStrictEqual(partition([], p), { left: [], right: [] })
    assert.deepStrictEqual(partition([1, 3], p), { left: [1], right: [3] })
    // refinements
    const xs: Array<string | number> = ['a', 'b', 1]
    const isNumber = (x: string | number): x is number => typeof x === 'number'
    const actual = partition(xs, isNumber)
    assert.deepStrictEqual(actual, { left: ['a', 'b'], right: [1] })
  })

  it('wither', () => {
    const witherIdentity = array.wither(I.identity)
    const f = (n: number) => I.identity.of(p(n) ? O.some(n + 1) : O.none)
    assert.deepStrictEqual(witherIdentity([], f), I.identity.of([]))
    assert.deepStrictEqual(witherIdentity([1, 3], f), I.identity.of([4]))
  })

  it('wilt', () => {
    const wiltIdentity = array.wilt(I.identity)
    const f = (n: number) => I.identity.of(p(n) ? right(n + 1) : left(n - 1))
    assert.deepStrictEqual(wiltIdentity([], f), I.identity.of({ left: [], right: [] }))
    assert.deepStrictEqual(wiltIdentity([1, 3], f), I.identity.of({ left: [0], right: [4] }))
  })

  it('chop', () => {
    const group = <A>(S: Eq<A>) => (as: Array<A>): Array<Array<A>> => {
      return chop(as, as => {
        const { init, rest } = span(as, a => S.equals(a, as[0]))
        return [init, rest]
      })
    }
    assert.deepStrictEqual(group(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
  })

  it('splitAt', () => {
    assert.deepStrictEqual(splitAt(2, [1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
    assert.deepStrictEqual(splitAt(2, []), [[], []])
    assert.deepStrictEqual(splitAt(2, [1]), [[1], []])
    assert.deepStrictEqual(splitAt(2, [1, 2]), [[1, 2], []])
    assert.deepStrictEqual(splitAt(-1, [1, 2]), [[1], [2]])
    assert.deepStrictEqual(splitAt(0, [1, 2]), [[], [1, 2]])
    assert.deepStrictEqual(splitAt(3, [1, 2]), [[1, 2], []])
  })

  it('chunksOf', () => {
    assert.deepStrictEqual(chunksOf(2, [1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
    assert.deepStrictEqual(chunksOf(2, [1, 2, 3, 4, 5, 6]), [[1, 2], [3, 4], [5, 6]])
    assert.deepStrictEqual(chunksOf(5, [1, 2, 3, 4, 5]), [[1, 2, 3, 4, 5]])
    assert.deepStrictEqual(chunksOf(6, [1, 2, 3, 4, 5]), [[1, 2, 3, 4, 5]])
    assert.deepStrictEqual(chunksOf(1, [1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])
    assert.deepStrictEqual(chunksOf(1, []), [[]])
    assert.deepStrictEqual(chunksOf(2, []), [[]])
    assert.deepStrictEqual(chunksOf(0, []), [[]])
    assert.deepStrictEqual(chunksOf(0, [1, 2]), [[1, 2]])
    assert.deepStrictEqual(chunksOf(10, [1, 2]), [[1, 2]])
    assert.deepStrictEqual(chunksOf(-1, [1, 2]), [[1, 2]])
  })

  it('makeBy', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
  })

  it('range', () => {
    assert.deepStrictEqual(range(0, 0), [0])
    assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(range(10, 15), [10, 11, 12, 13, 14, 15])
  })

  it('replicate', () => {
    assert.deepStrictEqual(replicate(0, 'a'), [])
    assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
  })

  it('comprehension', () => {
    assert.deepStrictEqual(comprehension([[1, 2, 3]], a => a * 2), [2, 4, 6])
    assert.deepStrictEqual(comprehension([[1, 2, 3], ['a', 'b']], tuple), [
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
      [2, 'b'],
      [3, 'a'],
      [3, 'b']
    ])
    assert.deepStrictEqual(comprehension([[1, 2, 3], ['a', 'b']], tuple, (a, b) => (a + b.length) % 2 === 0), [
      [1, 'a'],
      [1, 'b'],
      [3, 'a'],
      [3, 'b']
    ])
  })

  it('reduceWithIndex', () => {
    assert.deepStrictEqual(array.reduceWithIndex(['a', 'b'], '', (i, b, a) => b + i + a), '0a1b')
  })

  it('foldMapWithIndex', () => {
    assert.deepStrictEqual(array.foldMapWithIndex(monoidString)(['a', 'b'], (i, a) => i + a), '0a1b')
  })

  it('reduceRightWithIndex', () => {
    assert.deepStrictEqual(array.reduceRightWithIndex(['a', 'b'], '', (i, a, b) => b + i + a), '1b0a')
  })

  it('traverseWithIndex', () => {
    const ta = ['a', 'bb']
    assert.deepStrictEqual(
      array.traverseWithIndex(O.option)(ta, (i, s) => (s.length >= 1 ? O.some(s + i) : O.none)),
      O.some(['a0', 'bb1'])
    )
    assert.deepStrictEqual(
      array.traverseWithIndex(O.option)(ta, (i, s) => (s.length > 1 ? O.some(s + i) : O.none)),
      O.none
    )

    // FoldableWithIndex compatibility
    const M = monoidString
    const f = (i: number, s: string): string => s + i
    assert.deepStrictEqual(
      array.foldMapWithIndex(M)(ta, f),
      array.traverseWithIndex(C.getApplicative(M))(ta, (i, a) => C.make(f(i, a)))
    )

    // FunctorWithIndex compatibility
    assert.deepStrictEqual(
      array.mapWithIndex(ta, f),
      array.traverseWithIndex(I.identity)(ta, (i, a) => I.identity.of(f(i, a)))
    )
  })

  it('union', () => {
    assert.deepStrictEqual(union(eqNumber)([1, 2], [3, 4]), [1, 2, 3, 4])
    assert.deepStrictEqual(union(eqNumber)([1, 2], [2, 3]), [1, 2, 3])
    assert.deepStrictEqual(union(eqNumber)([1, 2], [1, 2]), [1, 2])
  })

  it('intersection', () => {
    assert.deepStrictEqual(intersection(eqNumber)([1, 2], [3, 4]), [])
    assert.deepStrictEqual(intersection(eqNumber)([1, 2], [2, 3]), [2])
    assert.deepStrictEqual(intersection(eqNumber)([1, 2], [1, 2]), [1, 2])
  })

  it('difference', () => {
    assert.deepStrictEqual(difference(eqNumber)([1, 2], [3, 4]), [1, 2])
    assert.deepStrictEqual(difference(eqNumber)([1, 2], [2, 3]), [1])
    assert.deepStrictEqual(difference(eqNumber)([1, 2], [1, 2]), [])
  })

  it('should be safe when calling map with a binary function', () => {
    interface Foo {
      bar: () => number
    }
    const f = (a: number, x?: Foo) => (x !== undefined ? `${a}${x.bar()}` : `${a}`)
    const res = array.map([1, 2], f)
    assert.deepStrictEqual(res, ['1', '2'])
  })

  it('getShow', () => {
    const S = getShow(showString)
    assert.strictEqual(S.show([]), `[]`)
    assert.strictEqual(S.show(['a']), `["a"]`)
    assert.strictEqual(S.show(['a', 'b']), `["a", "b"]`)
  })
})
