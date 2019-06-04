import * as assert from 'assert'
import * as fc from 'fast-check'
import {
  array,
  catOptions,
  chop,
  chunksOf,
  comprehension,
  cons,
  copy,
  deleteAt,
  difference,
  filter,
  findFirst,
  findFirstMap,
  findIndex,
  findLast,
  findLastIndex,
  findLastMap,
  flatten,
  fold,
  foldLeft,
  foldr,
  foldRight,
  getEq,
  getMonoid,
  getOrd,
  getShow,
  head,
  index,
  init,
  insertAt,
  intersection,
  isEmpty,
  last,
  lefts,
  makeBy,
  mapOption,
  member,
  modifyAt,
  partition,
  partitionMap,
  range,
  refine,
  replicate,
  reverse,
  rights,
  rotate,
  scanLeft,
  scanRight,
  snoc,
  sort,
  sortBy,
  sortBy1,
  tail,
  takeLeft,
  takeRight,
  traverse,
  union,
  uniq,
  unsafeUpdateAt,
  unzip,
  updateAt,
  zip,
  zipWith,
  takeLeftWhile,
  spanLeft,
  dropLeft,
  dropRight,
  dropLeftWhile,
  splitAt,
  isNonEmpty
} from '../src/Array'
import * as C from '../src/Const'
import { Either, left, right } from '../src/Either'
import { contramap, Eq, eqBoolean, eqNumber, eqString } from '../src/Eq'
import * as F from '../src/Foldable'
import { constTrue, identity, Predicate, tuple } from '../src/function'
import * as I from '../src/Identity'
import { fold as foldMonoid, monoidString, monoidSum } from '../src/Monoid'
import { fromPredicate, getEq as getOptionEq, none, option, Option, some } from '../src/Option'
import { contramap as contramapOrd, ordNumber, ordString } from '../src/Ord'
import { showString } from '../src/Show'

const p = (n: number) => n > 2

describe('Array', () => {
  const as = [1, 2, 3]

  it('getMonoid', () => {
    const M = getMonoid<number>()
    assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
  })

  it('getEq', () => {
    const E = getEq(ordString)
    assert.strictEqual(E.equals([], []), true, '[] ]')
    assert.strictEqual(E.equals(['a'], ['a']), true, '[a], [a]')
    assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true, '[a, b], [a, b]')
    assert.strictEqual(E.equals(['a'], []), false, '[a] []')
    assert.strictEqual(E.equals([], ['a']), false, '[], [a]')
    assert.strictEqual(E.equals(['a'], ['b']), false, '[a], [b]')
    assert.strictEqual(E.equals(['a', 'b'], ['b', 'a']), false, '[a, b], [b, a]')
    assert.strictEqual(E.equals(['a', 'a'], ['a']), false, '[a, a], [a]')
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
    // tslint:disable-next-line: deprecation
    const fasnone = traverse(option)(tfanone, f)
    assert.ok(fasnone.isNone())
    const tfa = [1, 3]
    // tslint:disable-next-line: deprecation
    const fas = traverse(option)(tfa, f)
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

  it('isNotEmpty', () => {
    assert.strictEqual(isNonEmpty(as), true)
    assert.strictEqual(isNonEmpty([]), false)
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

  it('takeLeft', () => {
    assert.deepStrictEqual(takeLeft(2)([]), [])
    assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
    assert.deepStrictEqual(takeLeft(0)([1, 2, 3]), [])
  })

  it('takeRight', () => {
    assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
    assert.deepStrictEqual(takeRight(0)([1, 2, 3, 4, 5]), [])
    assert.deepStrictEqual(takeRight(2)([]), [])
    assert.deepStrictEqual(takeRight(5)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(takeRight(10)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
  })

  it('spanLeft', () => {
    assert.deepStrictEqual(spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })

    // refinements
    const xs: Array<string | number> = [1, 'a', 3]
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = spanLeft(isNumber)(xs)
    assert.deepStrictEqual(actual, { init: [1], rest: ['a', 3] })
  })

  it('takeLeftWhile', () => {
    assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
    assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([]), [])
    assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([1, 2, 4]), [])
    assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([2, 4]), [2, 4])
  })

  it('dropLeft', () => {
    assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
    assert.deepStrictEqual(dropLeft(10)([1, 2, 3]), [])
    assert.deepStrictEqual(dropLeft(0)([1, 2, 3]), [1, 2, 3])
  })

  it('dropRight', () => {
    assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
    assert.deepStrictEqual(dropRight(10)([1, 2, 3, 4, 5]), [])
    assert.deepStrictEqual(dropRight(0)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
  })

  it('dropLeftWhile', () => {
    assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 0)([1, 3, 2, 4, 5]), [1, 3, 2, 4, 5])
    assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
    assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 0)([]), [])
    assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 0)([2, 4, 1]), [1])
    assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 0)([2, 4]), [])
  })

  it('init', () => {
    assert.deepStrictEqual(init(as), some([1, 2]))
    assert.deepStrictEqual(init([]), none)
  })

  it('findIndex', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(findIndex([1, 2, 3], x => x === 2), some(1))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(findIndex([], x => x === 2), none)

    assert.deepStrictEqual(findIndex(x => x === 2)([1, 2, 3]), some(1))
    assert.deepStrictEqual(findIndex(x => x === 2)([]), none)
  })

  it('findFirst', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(findFirst([], x => x === 2), none)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(findFirst([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 1 }))

    assert.deepStrictEqual(findFirst(x => x === 2)([]), none)
    assert.deepStrictEqual(
      findFirst((x: { a: number; b: number }) => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]),
      some({ a: 1, b: 1 })
    )
  })

  const optionStringEq = getOptionEq(eqString)
  const multipleOf3: Predicate<number> = (x: number) => x % 3 === 0
  const multipleOf3AsString = (x: number) => fromPredicate(multipleOf3)(x).map(x => `${x}`)

  it('`findFirstMap(arr, fun)` is equivalent to map and `head(mapOption(arr, fun)`', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), arr =>
        // tslint:disable-next-line: deprecation
        optionStringEq.equals(findFirstMap(arr, multipleOf3AsString), head(array.filterMap(arr, multipleOf3AsString)))
      )
    )
    fc.assert(
      fc.property(fc.array(fc.integer()), arr =>
        optionStringEq.equals(findFirstMap(multipleOf3AsString)(arr), head(array.filterMap(arr, multipleOf3AsString)))
      )
    )
  })

  it('findLast', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(findLast([], x => x === 2), none)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(findLast([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 2 }))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(findLast([{ a: 1, b: 2 }, { a: 2, b: 1 }], x => x.a === 1), some({ a: 1, b: 2 }))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(findLast(['a', null], x => x === null), some(null))

    assert.deepStrictEqual(findLast(x => x === 2)([]), none)
    assert.deepStrictEqual(
      findLast((x: { a: number; b: number }) => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]),
      some({ a: 1, b: 2 })
    )
    assert.deepStrictEqual(
      findLast((x: { a: number; b: number }) => x.a === 1)([{ a: 1, b: 2 }, { a: 2, b: 1 }]),
      some({ a: 1, b: 2 })
    )
    assert.deepStrictEqual(findLast((x: string | null) => x === null)(['a', null]), some(null))
  })

  it('`findLastMap(arr, fun)` is equivalent to `last(mapOption(arr, fun))`', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), arr =>
        // tslint:disable-next-line: deprecation
        optionStringEq.equals(findLastMap(arr, multipleOf3AsString), last(mapOption(arr, multipleOf3AsString)))
      )
    )
    fc.assert(
      fc.property(fc.array(fc.integer()), arr =>
        optionStringEq.equals(findLastMap(multipleOf3AsString)(arr), last(array.filterMap(arr, multipleOf3AsString)))
      )
    )
  })

  it('findLastIndex', () => {
    interface X {
      a: number
      b: number
    }
    const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(findLastIndex(xs, (x: X) => x.a === 1), some(1))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(findLastIndex(xs, (x: X) => x.a === 4), none)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(findLastIndex([], (x: X) => x.a === 1), none)

    assert.deepStrictEqual(findLastIndex((x: X) => x.a === 1)(xs), some(1))
    assert.deepStrictEqual(findLastIndex((x: X) => x.a === 4)(xs), none)
    assert.deepStrictEqual(findLastIndex((x: X) => x.a === 1)([]), none)
  })

  it('insertAt', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(insertAt(1, 1, []), none)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(insertAt(0, 1, []), some([1]))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(insertAt(2, 5, [1, 2, 3, 4]), some([1, 2, 5, 3, 4]))

    assert.deepStrictEqual(insertAt(1, 1)([]), none)
    assert.deepStrictEqual(insertAt(0, 1)([]), some([1]))
    assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
  })

  it('unsafeUpdateAt', () => {
    // should return the same reference if nothing changed
    const x = { a: 1 }
    const as = [x]
    const result = unsafeUpdateAt(0, x, as)
    assert.strictEqual(result, as)
  })

  it('updateAt', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(updateAt(1, 1, as), some([1, 1, 3]))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(updateAt(1, 1, []), none)

    assert.deepStrictEqual(updateAt(1, 1)(as), some([1, 1, 3]))
    assert.deepStrictEqual(updateAt(1, 1)([]), none)
  })

  it('deleteAt', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(deleteAt(0, as), some([2, 3]))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(deleteAt(1, []), none)

    assert.deepStrictEqual(deleteAt(0)(as), some([2, 3]))
    assert.deepStrictEqual(deleteAt(1)([]), none)
  })

  it('modifyAt', () => {
    const double = (x: number): number => x * 2
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(modifyAt(as, 1, double), some([1, 4, 3]))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(modifyAt([], 1, double), none)

    assert.deepStrictEqual(modifyAt(1, double)(as), some([1, 4, 3]))
    assert.deepStrictEqual(modifyAt(1, double)([]), none)
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
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(rotate(1, []), [])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(rotate(1, [1]), [1])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(rotate(1, [1, 2]), [2, 1])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(rotate(2, [1, 2]), [1, 2])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(rotate(0, [1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(rotate(1, [1, 2, 3, 4, 5]), [5, 1, 2, 3, 4])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(rotate(2, [1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(rotate(-1, [1, 2, 3, 4, 5]), [2, 3, 4, 5, 1])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(rotate(-2, [1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])

    assert.deepStrictEqual(rotate(1)([]), [])
    assert.deepStrictEqual(rotate(1)([1]), [1])
    assert.deepStrictEqual(rotate(1)([1, 2]), [2, 1])
    assert.deepStrictEqual(rotate(2)([1, 2]), [1, 2])
    assert.deepStrictEqual(rotate(0)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(rotate(1)([1, 2, 3, 4, 5]), [5, 1, 2, 3, 4])
    assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
    assert.deepStrictEqual(rotate(-1)([1, 2, 3, 4, 5]), [2, 3, 4, 5, 1])
    assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
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
    // tslint:disable-next-line: deprecation
    const len = <A>(as: Array<A>): number => fold(as, 0, (_, tail) => 1 + len(tail))
    assert.strictEqual(len([1, 2, 3]), 3)
  })

  it('foldLeft', () => {
    const len: <A>(as: Array<A>) => number = foldLeft(() => 0, (_, tail) => 1 + len(tail))
    assert.strictEqual(len([1, 2, 3]), 3)
  })

  it('foldr', () => {
    // tslint:disable-next-line: deprecation
    const len = <A>(as: Array<A>): number => foldr(as, 0, (init, _) => 1 + len(init))
    assert.strictEqual(len([1, 2, 3]), 3)
  })

  it('foldRight', () => {
    const len: <A>(as: Array<A>) => number = foldRight(() => 0, (init, _) => 1 + len(init))
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
    assert.strictEqual(member(eqNumber)([1, 2, 3], 1), true)
    // tslint:disable-next-line: deprecation
    assert.strictEqual(member(eqNumber)([1, 2, 3], 4), false)
    // tslint:disable-next-line: deprecation
    assert.strictEqual(member(eqNumber)([], 4), false)
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
    const byName = contramapOrd(ordString, (p: Person) => p.name)
    const byAge = contramapOrd(ordNumber, (p: Person) => p.age)
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
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(catOptions([]), [])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(catOptions([some(1), some(2), some(3)]), [1, 2, 3])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(catOptions([some(1), none, some(3)]), [1, 3])
  })

  it('separate', () => {
    assert.deepStrictEqual(array.separate([]), { left: [], right: [] })
    assert.deepStrictEqual(array.separate([left(123), right('123')]), { left: [123], right: ['123'] })
  })

  it('filter', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(filter([1, 2, 3], n => n % 2 === 1), [1, 3])
    assert.deepStrictEqual(filter((n: number) => n % 2 === 1)([1, 2, 3]), [1, 3])
  })

  it('filterWithIndex', () => {
    assert.deepStrictEqual(array.filterWithIndex(['a', 'b', 'c'], n => n % 2 === 0), ['a', 'c'])
  })

  it('filterMap/mapOption', () => {
    const f = (n: number) => (n % 2 === 0 ? none : some(n))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(mapOption(as, f), [1, 3])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(mapOption([], f), [])
    assert.deepStrictEqual(array.filterMap([], f), [])
    assert.deepStrictEqual(array.filterMap(as, f), [1, 3])
  })

  it('partitionMap', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(partitionMap([], identity), { left: [], right: [] })
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(partitionMap([right(1), left('foo'), right(2)], identity), { left: ['foo'], right: [1, 2] })
    assert.deepStrictEqual(array.partitionMap([], identity), { left: [], right: [] })
    assert.deepStrictEqual(array.partitionMap([right(1), left('foo'), right(2)], identity), {
      left: ['foo'],
      right: [1, 2]
    })

    const id = <L, A>(e: Either<L, A>): Either<L, A> => e
    assert.deepStrictEqual(partitionMap(id)([]), { left: [], right: [] })
    assert.deepStrictEqual(partitionMap(id)([right(1), left('foo'), right(2)]), { left: ['foo'], right: [1, 2] })
  })

  it('partition', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(partition([], p), { left: [], right: [] })
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(partition([1, 3], p), { left: [1], right: [3] })
    assert.deepStrictEqual(partition(p)([]), { left: [], right: [] })
    assert.deepStrictEqual(partition(p)([1, 3]), { left: [1], right: [3] })
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
    const group1 = <A>(E: Eq<A>) => (as: Array<A>): Array<Array<A>> => {
      // tslint:disable-next-line: deprecation
      return chop(as, as => {
        const { init, rest } = spanLeft((a: A) => E.equals(a, as[0]))(as)
        return [init, rest]
      })
    }
    assert.deepStrictEqual(group1(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
    const group2 = <A>(E: Eq<A>): ((as: Array<A>) => Array<Array<A>>) => {
      return chop(as => {
        const { init, rest } = spanLeft((a: A) => E.equals(a, as[0]))(as)
        return [init, rest]
      })
    }
    assert.deepStrictEqual(group2(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
  })

  it('splitAt', () => {
    assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
    assert.deepStrictEqual(splitAt(2)([]), [[], []])
    assert.deepStrictEqual(splitAt(2)([1]), [[1], []])
    assert.deepStrictEqual(splitAt(2)([1, 2]), [[1, 2], []])
    assert.deepStrictEqual(splitAt(-1)([1, 2]), [[1], [2]])
    assert.deepStrictEqual(splitAt(0)([1, 2]), [[], [1, 2]])
    assert.deepStrictEqual(splitAt(3)([1, 2]), [[1, 2], []])
  })

  it('chunksOf', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(chunksOf([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(chunksOf([1, 2, 3, 4, 5, 6], 2), [[1, 2], [3, 4], [5, 6]])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(chunksOf([1, 2, 3, 4, 5], 5), [[1, 2, 3, 4, 5]])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(chunksOf([1, 2, 3, 4, 5], 6), [[1, 2, 3, 4, 5]])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(chunksOf([1, 2, 3, 4, 5], 1), [[1], [2], [3], [4], [5]])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(chunksOf([], 1), [[]])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(chunksOf([], 2), [[]])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(chunksOf([], 0), [[]])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(chunksOf([1, 2], 0), [[1, 2]])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(chunksOf([1, 2], 10), [[1, 2]])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(chunksOf([1, 2], -1), [[1, 2]])

    assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
    assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5, 6]), [[1, 2], [3, 4], [5, 6]])
    assert.deepStrictEqual(chunksOf(5)([1, 2, 3, 4, 5]), [[1, 2, 3, 4, 5]])
    assert.deepStrictEqual(chunksOf(6)([1, 2, 3, 4, 5]), [[1, 2, 3, 4, 5]])
    assert.deepStrictEqual(chunksOf(1)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])
    assert.deepStrictEqual(chunksOf(1)([]), [[]])
    assert.deepStrictEqual(chunksOf(2)([]), [[]])
    assert.deepStrictEqual(chunksOf(0)([]), [[]])
    assert.deepStrictEqual(chunksOf(0)([1, 2]), [[1, 2]])
    assert.deepStrictEqual(chunksOf(10)([1, 2]), [[1, 2]])
    assert.deepStrictEqual(chunksOf(-1)([1, 2]), [[1, 2]])
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
      array.traverseWithIndex(C.getApplicative(M))(ta, (i, a) => C.make(f(i, a))).value
    )

    // FunctorWithIndex compatibility
    assert.deepStrictEqual(
      array.mapWithIndex(ta, f),
      array.traverseWithIndex(I.identity)(ta, (i, a) => new I.Identity(f(i, a))).value
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
