import * as assert from 'assert'
import * as fc from 'fast-check'
import {
  array,
  catOptions,
  cons,
  copy,
  deleteAt,
  drop,
  dropWhile,
  filter,
  findFirst,
  findIndex,
  findLast,
  flatten,
  fold,
  foldL,
  getMonoid,
  getOrd,
  head,
  index,
  init,
  insertAt,
  isEmpty,
  last,
  lefts,
  mapOption,
  member,
  modifyAt,
  partitionMap,
  refine,
  reverse,
  rights,
  rotate,
  scanLeft,
  scanRight,
  snoc,
  sort,
  sortBy,
  sortBy1,
  span,
  tail,
  take,
  takeWhile,
  uniq,
  updateAt,
  zip,
  unzip,
  foldrL,
  foldr,
  chop,
  chunksOf,
  split,
  takeEnd,
  dropEnd,
  range,
  makeBy,
  replicate,
  findLastIndex,
  zipWith,
  comprehension,
  partition,
  union,
  intersection,
  difference,
  unsafeUpdateAt,
  findFirstMap,
  findLastMap,
  getShow
} from '../src/Array'
import { left, right } from '../src/Either'
import { fold as foldMonoid, monoidSum, monoidString } from '../src/Monoid'
import { option, Option, none, some, isSome, getSetoid, fromPredicate } from '../src/Option'
import { contramap as contramapOrd, ordNumber, ordString } from '../src/Ord'
import { contramap, getArraySetoid, setoidBoolean, setoidNumber, setoidString, Setoid } from '../src/Setoid'
import { identity, tuple, constTrue, Predicate } from '../src/function'
import * as I from '../src/Identity'
import * as F from '../src/Foldable'
import * as C from '../src/Const'
import { showString } from '../src/Show'

const p = (n: number) => n > 2

describe('Array', () => {
  const as = [1, 2, 3]

  it('getMonoid', () => {
    const M = getMonoid<number>()
    assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
  })

  it('getSetoid', () => {
    const O = getArraySetoid(ordString)
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
    const f = (n: number): Option<number> => (n % 2 === 0 ? none : some(n))
    const fasnone = array.traverse(option)(tfanone, f)
    assert.ok(fasnone.isNone())
    const tfa = [1, 3]
    const fas = array.traverse(option)(tfa, f)
    assert.deepStrictEqual(fas, some([1, 3]))
  })

  it('sequence', () => {
    assert.deepStrictEqual(array.sequence(option)([some(1), some(3)]), some([1, 3]))
    assert.deepStrictEqual(array.sequence(option)([some(1), none]), none)
  })

  it('unfoldr', () => {
    const as = array.unfoldr(5, n => (n > 0 ? some([n, n - 1]) : none))
    assert.deepStrictEqual(as, [5, 4, 3, 2, 1])
  })

  it('isEmpty', () => {
    assert.strictEqual(isEmpty(as), false)
    assert.strictEqual(isEmpty([]), true)
  })

  it('index', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(index(1, as), some(2))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(index(3, as), none)
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
    assert.deepStrictEqual(head(as), some(1))
    assert.deepStrictEqual(head([]), none)
  })

  it('last', () => {
    assert.deepStrictEqual(last(as), some(3))
    assert.deepStrictEqual(last([]), none)
  })

  it('tail', () => {
    assert.deepStrictEqual(tail(as), some([2, 3]))
    assert.deepStrictEqual(tail([]), none)
  })

  it('take', () => {
    assert.deepStrictEqual(take(2, []), [])
    assert.deepStrictEqual(take(2, [1, 2, 3]), [1, 2])
    assert.deepStrictEqual(take(0, [1, 2, 3]), [])
  })

  it('takeEnd', () => {
    assert.deepStrictEqual(takeEnd(2, [1, 2, 3, 4, 5]), [4, 5])
    assert.deepStrictEqual(takeEnd(0, [1, 2, 3, 4, 5]), [])
    assert.deepStrictEqual(takeEnd(2, []), [])
    assert.deepStrictEqual(takeEnd(5, [1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(takeEnd(10, [1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
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

    // refinements
    const xs: Array<string | number> = [1, 'a', 3]
    const isString = (u: string | number): u is string => typeof u === 'string'
    assert.deepStrictEqual(filter(xs, isString), ['a'])
  })

  it('drop', () => {
    assert.deepStrictEqual(drop(2, [1, 2, 3]), [3])
    assert.deepStrictEqual(drop(10, [1, 2, 3]), [])
    assert.deepStrictEqual(drop(0, [1, 2, 3]), [1, 2, 3])
  })

  it('dropEnd', () => {
    assert.deepStrictEqual(dropEnd(2, [1, 2, 3, 4, 5]), [1, 2, 3])
    assert.deepStrictEqual(dropEnd(10, [1, 2, 3, 4, 5]), [])
    assert.deepStrictEqual(dropEnd(0, [1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
  })

  it('dropWhile', () => {
    assert.deepStrictEqual(dropWhile([1, 3, 2, 4, 5], n => n % 2 === 0), [1, 3, 2, 4, 5])
    assert.deepStrictEqual(dropWhile([1, 3, 2, 4, 5], n => n % 2 === 1), [2, 4, 5])
    assert.deepStrictEqual(dropWhile([], n => n % 2 === 0), [])
    assert.deepStrictEqual(dropWhile([2, 4, 1], n => n % 2 === 0), [1])
    assert.deepStrictEqual(dropWhile([2, 4], n => n % 2 === 0), [])
  })

  it('init', () => {
    assert.deepStrictEqual(init(as), some([1, 2]))
    assert.deepStrictEqual(init([]), none)
  })

  it('findIndex', () => {
    assert.deepStrictEqual(findIndex([1, 2, 3], x => x === 2), some(1))
    assert.deepStrictEqual(findIndex([], x => x === 2), none)
  })

  it('findFirst', () => {
    assert.deepStrictEqual(findFirst([], x => x === 2), none)
    assert.deepStrictEqual(findFirst([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 1 }))
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
    assert.deepStrictEqual(findFirst(xs1, isA), some({ type: 'A', a: 1 }))
    const xs2: Array<AOrB> = [{ type: 'B' }]
    assert.deepStrictEqual(findFirst(xs2, isA), none)
    assert.deepStrictEqual(findFirst([null, 'a'], x => x === null), some(null))
  })

  const optionStringSetoid = getSetoid(setoidString)
  const multipleOf3: Predicate<number> = (x: number) => x % 3 === 0
  const multipleOf3AsString = (x: number) => fromPredicate(multipleOf3)(x).map(x => `${x}`)

  it('`findFirstMap(arr, fun)` is equivalent to map and `head(mapOption(arr, fun)`', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), arr =>
        optionStringSetoid.equals(findFirstMap(arr, multipleOf3AsString), head(mapOption(arr, multipleOf3AsString)))
      )
    )
  })

  it('findLast', () => {
    assert.deepStrictEqual(findLast([], x => x === 2), none)
    assert.deepStrictEqual(findLast([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 2 }))
    assert.deepStrictEqual(findLast([{ a: 1, b: 2 }, { a: 2, b: 1 }], x => x.a === 1), some({ a: 1, b: 2 }))
    assert.deepStrictEqual(findLast(['a', null], x => x === null), some(null))
  })

  it('`findLastMap(arr, fun)` is equivalent to `last(mapOption(arr, fun))`', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), arr =>
        optionStringSetoid.equals(findLastMap(arr, multipleOf3AsString), last(mapOption(arr, multipleOf3AsString)))
      )
    )
  })

  it('findLastIndex', () => {
    interface X {
      a: number
      b: number
    }
    const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
    assert.deepStrictEqual(findLastIndex(xs, x => x.a === 1), some(1))
    assert.deepStrictEqual(findLastIndex(xs, x => x.a === 4), none)
    assert.deepStrictEqual(findLastIndex([], (x: X) => x.a === 1), none)
  })

  it('insertAt', () => {
    assert.deepStrictEqual(insertAt(1, 1, []), none)
    assert.deepStrictEqual(insertAt(0, 1, []), some([1]))
    assert.deepStrictEqual(insertAt(2, 5, [1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
  })

  it('unsafeUpdateAt', () => {
    // should return the same reference if nothing changed
    const x = { a: 1 }
    const as = [x]
    const result = unsafeUpdateAt(0, x, as)
    assert.strictEqual(result, as)
  })

  it('updateAt', () => {
    assert.deepStrictEqual(updateAt(1, 1, as), some([1, 1, 3]))
    assert.deepStrictEqual(updateAt(1, 1, []), none)
  })

  it('deleteAt', () => {
    assert.deepStrictEqual(deleteAt(0, as), some([2, 3]))
    assert.deepStrictEqual(deleteAt(1, []), none)
  })

  it('modifyAt', () => {
    const double = (x: number): number => x * 2
    assert.deepStrictEqual(modifyAt(as, 1, double), some([1, 4, 3]))
    assert.deepStrictEqual(modifyAt([], 1, double), none)
  })

  it('sort', () => {
    assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
  })

  it('refine', () => {
    // tslint:disable-next-line: deprecation
    const x = refine([some(3), some(2), some(1)], (o): o is Option<number> => o.isSome())
    assert.deepStrictEqual(x, [some(3), some(2), some(1)])
    // tslint:disable-next-line: deprecation
    const y = refine([some(3), none, some(1)], (o): o is Option<number> => o.isSome())
    assert.deepStrictEqual(y, [some(3), some(1)])
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
    const old = F.foldMap(array, monoidString)
    const foldMap = array.foldMap(monoidString)
    const x1 = ['a', 'b', 'c']
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'abc')
    assert.strictEqual(foldMap(x1, f1), old(x1, f1))
    const x2: Array<string> = []
    assert.strictEqual(foldMap(x2, f1), '')
    assert.strictEqual(foldMap(x2, f1), old(x2, f1))
  })

  it('foldr', () => {
    const old = F.foldr(array)
    const foldr = array.foldr
    const x1 = ['a', 'b', 'c']
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'cba')
    assert.strictEqual(foldr(x1, init1, f1), old(x1, init1, f1))
    const x2: Array<string> = []
    assert.strictEqual(foldr(x2, init1, f1), '')
    assert.strictEqual(foldr(x2, init1, f1), old(x2, init1, f1))
  })

  it('fold', () => {
    const len = <A>(as: Array<A>): number => fold(as, 0, (_, tail) => 1 + len(tail))
    assert.strictEqual(len([1, 2, 3]), 3)
  })

  it('foldL', () => {
    const len = <A>(as: Array<A>): number => foldL(as, () => 0, (_, tail) => 1 + len(tail))
    assert.strictEqual(len([1, 2, 3]), 3)
  })

  it('foldr', () => {
    const len = <A>(as: Array<A>): number => foldr(as, 0, (init, _) => 1 + len(init))
    assert.strictEqual(len([1, 2, 3]), 3)
  })

  it('foldrL', () => {
    const len = <A>(as: Array<A>): number => foldrL(as, () => 0, (init, _) => 1 + len(init))
    assert.strictEqual(len([1, 2, 3]), 3)
  })

  it('scanLeft', () => {
    const f = (b: number, a: number) => b - a
    assert.deepStrictEqual(scanLeft([1, 2, 3], 10, f), [10, 9, 7, 4])
    assert.deepStrictEqual(scanLeft([0], 10, f), [10, 10])
    assert.deepStrictEqual(scanLeft([], 10, f), [10])
  })

  it('scanRight', () => {
    const f = (b: number, a: number) => b - a
    assert.deepStrictEqual(scanRight([1, 2, 3], 10, f), [-8, 9, -7, 10])
    assert.deepStrictEqual(scanRight([0], 10, f), [-10, 10])
    assert.deepStrictEqual(scanRight([], 10, f), [10])
  })

  it('member', () => {
    // tslint:disable-next-line: deprecation
    assert.strictEqual(member(setoidNumber)([1, 2, 3], 1), true)
    // tslint:disable-next-line: deprecation
    assert.strictEqual(member(setoidNumber)([1, 2, 3], 4), false)
    // tslint:disable-next-line: deprecation
    assert.strictEqual(member(setoidNumber)([], 4), false)
  })

  it('uniq', () => {
    interface A {
      a: string
      b: number
    }

    const setoidA = contramap((f: A) => f.b, ordNumber)
    const arrA: A = { a: 'a', b: 1 }
    const arrB: A = { a: 'b', b: 1 }
    const arrC: A = { a: 'c', b: 2 }
    const arrD: A = { a: 'd', b: 2 }
    const arrUniq = [arrA, arrC]

    assert.deepStrictEqual(uniq(setoidA)(arrUniq), arrUniq, 'Preserve original array')
    assert.deepStrictEqual(uniq(setoidA)([arrA, arrB, arrC, arrD]), [arrA, arrC])
    assert.deepStrictEqual(uniq(setoidA)([arrB, arrA, arrC, arrD]), [arrB, arrC])
    assert.deepStrictEqual(uniq(setoidA)([arrA, arrA, arrC, arrD, arrA]), [arrA, arrC])
    assert.deepStrictEqual(uniq(setoidA)([arrA, arrC]), [arrA, arrC])
    assert.deepStrictEqual(uniq(setoidA)([arrC, arrA]), [arrC, arrA])
    assert.deepStrictEqual(uniq(setoidBoolean)([true, false, true, false]), [true, false])
    assert.deepStrictEqual(uniq(setoidNumber)([]), [])
    assert.deepStrictEqual(uniq(setoidNumber)([-0, -0]), [-0])
    assert.deepStrictEqual(uniq(setoidNumber)([0, -0]), [0])
    assert.deepStrictEqual(uniq(setoidNumber)([1]), [1])
    assert.deepStrictEqual(uniq(setoidNumber)([2, 1, 2]), [2, 1])
    assert.deepStrictEqual(uniq(setoidNumber)([1, 2, 1]), [1, 2])
    assert.deepStrictEqual(uniq(setoidNumber)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(uniq(setoidNumber)([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(uniq(setoidNumber)([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(uniq(setoidString)(['a', 'b', 'a']), ['a', 'b'])
    assert.deepStrictEqual(uniq(setoidString)(['a', 'b', 'A']), ['a', 'b', 'A'])
  })

  it('sortBy', () => {
    interface Person {
      name: string
      age: number
    }
    const byName = contramapOrd((p: Person) => p.name, ordString)
    const byAge = contramapOrd((p: Person) => p.age, ordNumber)
    const sortByNameByAge = sortBy([byName, byAge])
    assert.ok(sortByNameByAge.isSome())
    if (sortByNameByAge.isSome()) {
      const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
      assert.deepStrictEqual(sortByNameByAge.value(persons), [
        { name: 'a', age: 1 },
        { name: 'b', age: 2 },
        { name: 'b', age: 3 },
        { name: 'c', age: 2 }
      ])
    }
  })

  it('sortBy1', () => {
    interface Person {
      name: string
      age: number
    }
    const byName = contramapOrd((p: Person) => p.name, ordString)
    const byAge = contramapOrd((p: Person) => p.age, ordNumber)
    const sortByNameByAge = sortBy1(byName, [byAge])
    const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
    assert.deepStrictEqual(sortByNameByAge(persons), [
      { name: 'a', age: 1 },
      { name: 'b', age: 2 },
      { name: 'b', age: 3 },
      { name: 'c', age: 2 }
    ])
    const sortByAgeByName = sortBy1(byAge, [byName])
    assert.deepStrictEqual(sortByAgeByName(persons), [
      { name: 'a', age: 1 },
      { name: 'b', age: 2 },
      { name: 'c', age: 2 },
      { name: 'b', age: 3 }
    ])
  })

  it('compact/catOptions', () => {
    assert.deepStrictEqual(array.compact([]), [])
    assert.deepStrictEqual(array.compact([some(1), some(2), some(3)]), [1, 2, 3])
    assert.deepStrictEqual(array.compact([some(1), none, some(3)]), [1, 3])
    assert.deepStrictEqual(catOptions([]), [])
    assert.deepStrictEqual(catOptions([some(1), some(2), some(3)]), [1, 2, 3])
    assert.deepStrictEqual(catOptions([some(1), none, some(3)]), [1, 3])
  })

  it('separate', () => {
    assert.deepStrictEqual(array.separate([]), { left: [], right: [] })
    assert.deepStrictEqual(array.separate([left(123), right('123')]), { left: [123], right: ['123'] })
  })

  it('filter', () => {
    assert.deepStrictEqual(filter([1, 2, 3], n => n % 2 === 1), [1, 3])
    assert.deepStrictEqual(array.filter([1, 2, 3], n => n % 2 === 1), [1, 3])
    const x = filter([some(3), some(2), some(1)], isSome)
    assert.deepStrictEqual(x, [some(3), some(2), some(1)])
    const y = filter([some(3), none, some(1)], isSome)
    assert.deepStrictEqual(y, [some(3), some(1)])
  })

  it('filterWithIndex', () => {
    assert.deepStrictEqual(array.filterWithIndex(['a', 'b', 'c'], n => n % 2 === 0), ['a', 'c'])
  })

  it('filterMap/mapOption', () => {
    const f = (n: number) => (n % 2 === 0 ? none : some(n))
    assert.deepStrictEqual(mapOption(as, f), [1, 3])
    assert.deepStrictEqual(mapOption([], f), [])
    assert.deepStrictEqual(array.filterMap([], f), [])
    assert.deepStrictEqual(array.filterMap(as, f), [1, 3])
  })

  it('partitionMap', () => {
    assert.deepStrictEqual(partitionMap([], identity), { left: [], right: [] })
    assert.deepStrictEqual(partitionMap([right(1), left('foo'), right(2)], identity), { left: ['foo'], right: [1, 2] })
    assert.deepStrictEqual(array.partitionMap([], identity), { left: [], right: [] })
    assert.deepStrictEqual(array.partitionMap([right(1), left('foo'), right(2)], identity), {
      left: ['foo'],
      right: [1, 2]
    })
  })

  it('partition', () => {
    assert.deepStrictEqual(array.partition([], p), { left: [], right: [] })
    assert.deepStrictEqual(array.partition([1, 3], p), { left: [1], right: [3] })
    // refinements
    const xs: Array<string | number> = ['a', 'b', 1]
    const isNumber = (x: string | number): x is number => typeof x === 'number'
    const actual = partition(xs, isNumber)
    assert.deepStrictEqual(actual, { left: ['a', 'b'], right: [1] })
  })

  it('wither', () => {
    const witherIdentity = array.wither(I.identity)
    const f = (n: number) => new I.Identity(p(n) ? some(n + 1) : none)
    assert.deepStrictEqual(witherIdentity([], f), new I.Identity([]))
    assert.deepStrictEqual(witherIdentity([1, 3], f), new I.Identity([4]))
  })

  it('wilt', () => {
    const wiltIdentity = array.wilt(I.identity)
    const f = (n: number) => new I.Identity(p(n) ? right(n + 1) : left(n - 1))
    assert.deepStrictEqual(wiltIdentity([], f), new I.Identity({ left: [], right: [] }))
    assert.deepStrictEqual(wiltIdentity([1, 3], f), new I.Identity({ left: [0], right: [4] }))
  })

  it('chop', () => {
    const group = <A>(S: Setoid<A>) => (as: Array<A>): Array<Array<A>> => {
      return chop(as, as => {
        const { init, rest } = span(as, a => S.equals(a, as[0]))
        return [init, rest]
      })
    }
    assert.deepStrictEqual(group(setoidNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
  })

  it('split', () => {
    assert.deepStrictEqual(split(2, [1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
    assert.deepStrictEqual(split(2, []), [[], []])
    assert.deepStrictEqual(split(2, [1]), [[1], []])
    assert.deepStrictEqual(split(2, [1, 2]), [[1, 2], []])
    assert.deepStrictEqual(split(-1, [1, 2]), [[1], [2]])
    assert.deepStrictEqual(split(0, [1, 2]), [[], [1, 2]])
    assert.deepStrictEqual(split(3, [1, 2]), [[1, 2], []])
  })

  it('chunksOf', () => {
    assert.deepStrictEqual(chunksOf([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]])
    assert.deepStrictEqual(chunksOf([1, 2, 3, 4, 5, 6], 2), [[1, 2], [3, 4], [5, 6]])
    assert.deepStrictEqual(chunksOf([1, 2, 3, 4, 5], 5), [[1, 2, 3, 4, 5]])
    assert.deepStrictEqual(chunksOf([1, 2, 3, 4, 5], 6), [[1, 2, 3, 4, 5]])
    assert.deepStrictEqual(chunksOf([1, 2, 3, 4, 5], 1), [[1], [2], [3], [4], [5]])
    assert.deepStrictEqual(chunksOf([], 1), [[]])
    assert.deepStrictEqual(chunksOf([], 2), [[]])
    assert.deepStrictEqual(chunksOf([], 0), [[]])
    assert.deepStrictEqual(chunksOf([1, 2], 0), [[1, 2]])
    assert.deepStrictEqual(chunksOf([1, 2], 10), [[1, 2]])
    assert.deepStrictEqual(chunksOf([1, 2], -1), [[1, 2]])
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
    assert.deepStrictEqual(comprehension([[1, 2, 3]], constTrue, a => a * 2), [2, 4, 6])
    assert.deepStrictEqual(comprehension([[1, 2, 3], ['a', 'b']], constTrue, tuple), [
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
      [2, 'b'],
      [3, 'a'],
      [3, 'b']
    ])
    assert.deepStrictEqual(comprehension([[1, 2, 3], ['a', 'b']], (a, b) => (a + b.length) % 2 === 0, tuple), [
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

  it('foldrWithIndex', () => {
    assert.deepStrictEqual(array.foldrWithIndex(['a', 'b'], '', (i, a, b) => b + i + a), '1b0a')
  })

  it('traverseWithIndex', () => {
    const ta = ['a', 'bb']
    assert.deepStrictEqual(
      array.traverseWithIndex(option)(ta, (i, s) => (s.length >= 1 ? some(s + i) : none)),
      some(['a0', 'bb1'])
    )
    assert.deepStrictEqual(array.traverseWithIndex(option)(ta, (i, s) => (s.length > 1 ? some(s + i) : none)), none)

    // FoldableWithIndex compatibility
    const M = monoidString
    const f = (i: number, s: string): string => s + i
    assert.deepStrictEqual(
      array.foldMapWithIndex(M)(ta, f),
      array.traverseWithIndex(C.getApplicative(M))(ta, (i, a) => new C.Const<string, unknown>(f(i, a))).value
    )

    // FunctorWithIndex compatibility
    assert.deepStrictEqual(
      array.mapWithIndex(ta, f),
      array.traverseWithIndex(I.identity)(ta, (i, a) => new I.Identity(f(i, a))).value
    )
  })

  it('union', () => {
    assert.deepStrictEqual(union(setoidNumber)([1, 2], [3, 4]), [1, 2, 3, 4])
    assert.deepStrictEqual(union(setoidNumber)([1, 2], [2, 3]), [1, 2, 3])
    assert.deepStrictEqual(union(setoidNumber)([1, 2], [1, 2]), [1, 2])
  })

  it('intersection', () => {
    assert.deepStrictEqual(intersection(setoidNumber)([1, 2], [3, 4]), [])
    assert.deepStrictEqual(intersection(setoidNumber)([1, 2], [2, 3]), [2])
    assert.deepStrictEqual(intersection(setoidNumber)([1, 2], [1, 2]), [1, 2])
  })

  it('difference', () => {
    assert.deepStrictEqual(difference(setoidNumber)([1, 2], [3, 4]), [1, 2])
    assert.deepStrictEqual(difference(setoidNumber)([1, 2], [2, 3]), [1])
    assert.deepStrictEqual(difference(setoidNumber)([1, 2], [1, 2]), [])
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
