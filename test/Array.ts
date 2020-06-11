import * as assert from 'assert'
import * as fc from 'fast-check'
import { isDeepStrictEqual } from 'util'
import * as _ from '../src/Array'
import * as C from '../src/Const'
import { left, right } from '../src/Either'
import { eq, Eq, eqBoolean, eqNumber, eqString } from '../src/Eq'
import { identity, pipe, Predicate, tuple } from '../src/function'
import * as I from '../src/Identity'
import { fold as foldMonoid, monoidString, monoidSum } from '../src/Monoid'
import * as O from '../src/Option'
import { ord, ordNumber, ordString } from '../src/Ord'
import { showString } from '../src/Show'
import * as T from '../src/Task'

// tslint:disable:readonly-array

const p = (n: number) => n > 2

describe('Array', () => {
  describe('pipeables', () => {
    it('traverse', () => {
      const traverse = _.traverse(O.option)((n: number): O.Option<number> => (n % 2 === 0 ? O.none : O.some(n)))
      assert.deepStrictEqual(traverse([1, 2]), O.none)
      assert.deepStrictEqual(traverse([1, 3]), O.some([1, 3]))
    })

    it('sequence', () => {
      const sequence = _.sequence(O.option)
      assert.deepStrictEqual(sequence([O.some(1), O.some(3)]), O.some([1, 3]))
      assert.deepStrictEqual(sequence([O.some(1), O.none]), O.none)
    })

    it('wither', async () => {
      const wither = _.wither(T.task)
      const f = (n: number) => T.of(p(n) ? O.some(n + 1) : O.none)
      assert.deepStrictEqual(await pipe([], wither(f))(), [])
      assert.deepStrictEqual(await pipe([1, 3], wither(f))(), [4])
    })

    it('wilt', async () => {
      const wilt = _.wilt(T.task)
      const f = (n: number) => T.of(p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(await pipe([], wilt(f))(), { left: [], right: [] })
      assert.deepStrictEqual(await pipe([1, 3], wilt(f))(), { left: [0], right: [4] })
    })
  })

  const as = [1, 2, 3]

  it('alt', () => {
    assert.deepStrictEqual(
      pipe(
        [1, 2],
        _.alt(() => [3, 4])
      ),
      [1, 2, 3, 4]
    )
  })

  it('getMonoid', () => {
    const M = _.getMonoid<number>()
    assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
    assert.deepStrictEqual(M.concat([1, 2], M.empty), [1, 2])
    assert.deepStrictEqual(M.concat(M.empty, [1, 2]), [1, 2])
  })

  it('getEq', () => {
    const O = _.getEq(ordString)
    assert.deepStrictEqual(O.equals([], []), true, '[] ]')
    assert.deepStrictEqual(O.equals(['a'], ['a']), true, '[a], [a]')
    assert.deepStrictEqual(O.equals(['a', 'b'], ['a', 'b']), true, '[a, b], [a, b]')
    assert.deepStrictEqual(O.equals(['a'], []), false, '[a] []')
    assert.deepStrictEqual(O.equals([], ['a']), false, '[], [a]')
    assert.deepStrictEqual(O.equals(['a'], ['b']), false, '[a], [b]')
    assert.deepStrictEqual(O.equals(['a', 'b'], ['b', 'a']), false, '[a, b], [b, a]')
    assert.deepStrictEqual(O.equals(['a', 'a'], ['a']), false, '[a, a], [a]')
  })

  it('getOrd', () => {
    const O = _.getOrd(ordString)
    assert.deepStrictEqual(O.compare([], []), 0, '[] ]')
    assert.deepStrictEqual(O.compare(['a'], ['a']), 0, '[a], [a]')

    assert.deepStrictEqual(O.compare(['b'], ['a']), 1, '[b], [a]')
    assert.deepStrictEqual(O.compare(['a'], ['b']), -1, '[a], [b]')

    assert.deepStrictEqual(O.compare(['a'], []), 1, '[a] []')
    assert.deepStrictEqual(O.compare([], ['a']), -1, '[], [a]')
    assert.deepStrictEqual(O.compare(['a', 'a'], ['a']), 1, '[a, a], [a]')
    assert.deepStrictEqual(O.compare(['a', 'a'], ['b']), -1, '[a, a], [a]')

    assert.deepStrictEqual(O.compare(['a', 'a'], ['a', 'a']), 0, '[a, a], [a, a]')
    assert.deepStrictEqual(O.compare(['a', 'b'], ['a', 'b']), 0, '[a, b], [a, b]')

    assert.deepStrictEqual(O.compare(['a', 'a'], ['a', 'b']), -1, '[a, a], [a, b]')
    assert.deepStrictEqual(O.compare(['a', 'b'], ['a', 'a']), 1, '[a, b], [a, a]')

    assert.deepStrictEqual(O.compare(['a', 'b'], ['b', 'a']), -1, '[a, b], [b, a]')
    assert.deepStrictEqual(O.compare(['b', 'a'], ['a', 'a']), 1, '[b, a], [a, a]')
    assert.deepStrictEqual(O.compare(['b', 'a'], ['a', 'b']), 1, '[b, b], [a, a]')
    assert.deepStrictEqual(O.compare(['b', 'b'], ['b', 'a']), 1, '[b, b], [b, a]')
    assert.deepStrictEqual(O.compare(['b', 'a'], ['b', 'b']), -1, '[b, a], [b, b]')
  })

  it('ap', () => {
    const as = pipe([(x: number) => x * 2, (x: number) => x * 3], _.ap([1, 2, 3]))
    assert.deepStrictEqual(as, [2, 4, 6, 3, 6, 9])
  })

  it('unfold', () => {
    const as = _.array.unfold(5, (n) => (n > 0 ? O.some([n, n - 1]) : O.none))
    assert.deepStrictEqual(as, [5, 4, 3, 2, 1])
  })

  it('isEmpty', () => {
    assert.deepStrictEqual(_.isEmpty(as), false)
    assert.deepStrictEqual(_.isEmpty([]), true)
  })

  it('isNotEmpty', () => {
    assert.deepStrictEqual(_.isNonEmpty(as), true)
    assert.deepStrictEqual(_.isNonEmpty([]), false)
  })

  it('cons', () => {
    assert.deepStrictEqual(_.cons(0, as), [0, 1, 2, 3])
    assert.deepStrictEqual(_.cons([1], [[2]]), [[1], [2]])
  })

  it('snoc', () => {
    assert.deepStrictEqual(_.snoc(as, 4), [1, 2, 3, 4])
    assert.deepStrictEqual(_.snoc([[1]], [2]), [[1], [2]])
  })

  it('head', () => {
    assert.deepStrictEqual(_.head(as), O.some(1))
    assert.deepStrictEqual(_.head([]), O.none)
  })

  it('last', () => {
    assert.deepStrictEqual(_.last(as), O.some(3))
    assert.deepStrictEqual(_.last([]), O.none)
  })

  it('tail', () => {
    assert.deepStrictEqual(_.tail(as), O.some([2, 3]))
    assert.deepStrictEqual(_.tail([]), O.none)
  })

  it('takeLeft', () => {
    assert.deepStrictEqual(_.takeLeft(2)([]), [])
    assert.deepStrictEqual(_.takeLeft(2)([1, 2, 3]), [1, 2])
    assert.deepStrictEqual(_.takeLeft(0)([1, 2, 3]), [])
  })

  it('takeRight', () => {
    assert.deepStrictEqual(_.takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
    assert.deepStrictEqual(_.takeRight(0)([1, 2, 3, 4, 5]), [])
    assert.deepStrictEqual(_.takeRight(2)([]), [])
    assert.deepStrictEqual(_.takeRight(5)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(_.takeRight(10)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
  })

  it('spanLeft', () => {
    assert.deepStrictEqual(_.spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })

    // refinements
    const xs: Array<string | number> = [1, 'a', 3]
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = _.spanLeft(isNumber)(xs)
    assert.deepStrictEqual(actual, { init: [1], rest: ['a', 3] })
  })

  it('takeLeftWhile', () => {
    const f = (n: number) => n % 2 === 0
    assert.deepStrictEqual(_.takeLeftWhile(f)([2, 4, 3, 6]), [2, 4])
    assert.deepStrictEqual(_.takeLeftWhile(f)([]), [])
    assert.deepStrictEqual(_.takeLeftWhile(f)([1, 2, 4]), [])
    assert.deepStrictEqual(_.takeLeftWhile(f)([2, 4]), [2, 4])
  })

  it('dropLeft', () => {
    assert.deepStrictEqual(_.dropLeft(2)([1, 2, 3]), [3])
    assert.deepStrictEqual(_.dropLeft(10)([1, 2, 3]), [])
    assert.deepStrictEqual(_.dropLeft(0)([1, 2, 3]), [1, 2, 3])
  })

  it('dropRight', () => {
    assert.deepStrictEqual(_.dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
    assert.deepStrictEqual(_.dropRight(10)([1, 2, 3, 4, 5]), [])
    assert.deepStrictEqual(_.dropRight(0)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
  })

  it('dropLeftWhile', () => {
    const f = (n: number) => n % 2 === 0
    const g = (n: number) => n % 2 === 1
    assert.deepStrictEqual(_.dropLeftWhile(f)([1, 3, 2, 4, 5]), [1, 3, 2, 4, 5])
    assert.deepStrictEqual(_.dropLeftWhile(g)([1, 3, 2, 4, 5]), [2, 4, 5])
    assert.deepStrictEqual(_.dropLeftWhile(f)([]), [])
    assert.deepStrictEqual(_.dropLeftWhile(f)([2, 4, 1]), [1])
    assert.deepStrictEqual(_.dropLeftWhile(f)([2, 4]), [])
  })

  it('init', () => {
    assert.deepStrictEqual(_.init(as), O.some([1, 2]))
    assert.deepStrictEqual(_.init([]), O.none)
  })

  it('findIndex', () => {
    assert.deepStrictEqual(_.findIndex((x) => x === 2)([1, 2, 3]), O.some(1))
    assert.deepStrictEqual(_.findIndex((x) => x === 2)([]), O.none)
  })

  it('findFirst', () => {
    assert.deepStrictEqual(_.findFirst((x) => x === 2)([]), O.none)
    assert.deepStrictEqual(
      _.findFirst((x: { readonly a: number; readonly b: number }) => x.a === 1)([
        { a: 1, b: 1 },
        { a: 1, b: 2 }
      ]),
      O.some({ a: 1, b: 1 })
    )
    interface A {
      readonly type: 'A'
      readonly a: number
    }

    interface B {
      readonly type: 'B'
    }

    type AOrB = A | B
    const isA = (x: AOrB): x is A => x.type === 'A'
    const xs1: Array<AOrB> = [{ type: 'B' }, { type: 'A', a: 1 }, { type: 'A', a: 2 }]
    assert.deepStrictEqual(_.findFirst(isA)(xs1), O.some({ type: 'A', a: 1 }))
    const xs2: Array<AOrB> = [{ type: 'B' }]
    assert.deepStrictEqual(_.findFirst(isA)(xs2), O.none)
    assert.deepStrictEqual(_.findFirst((x: string | null) => x === null)([null, 'a']), O.some(null))
  })

  const optionStringEq = O.getEq(eqString)
  const multipleOf3: Predicate<number> = (x: number) => x % 3 === 0
  const multipleOf3AsString = (x: number) => O.option.map(O.fromPredicate(multipleOf3)(x), (x) => `${x}`)

  it('`findFirstMap(arr, fun)` is equivalent to map and `head(mapOption(arr, fun)`', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) =>
        optionStringEq.equals(
          _.findFirstMap(multipleOf3AsString)(arr),
          _.head(_.array.filterMap(arr, multipleOf3AsString))
        )
      )
    )
  })

  it('findLast', () => {
    assert.deepStrictEqual(_.findLast((x) => x === 2)([]), O.none)
    assert.deepStrictEqual(
      _.findLast((x: { readonly a: number; readonly b: number }) => x.a === 1)([
        { a: 1, b: 1 },
        { a: 1, b: 2 }
      ]),
      O.some({ a: 1, b: 2 })
    )
    assert.deepStrictEqual(
      _.findLast((x: { readonly a: number; readonly b: number }) => x.a === 1)([
        { a: 1, b: 2 },
        { a: 2, b: 1 }
      ]),
      O.some({ a: 1, b: 2 })
    )
    assert.deepStrictEqual(_.findLast((x: string | null) => x === null)(['a', null]), O.some(null))
  })

  it('`findLastMap(arr, fun)` is equivalent to `last(mapOption(arr, fun))`', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) =>
        optionStringEq.equals(
          _.findLastMap(multipleOf3AsString)(arr),
          _.last(_.array.filterMap(arr, multipleOf3AsString))
        )
      )
    )
  })

  it('findLastIndex', () => {
    interface X {
      readonly a: number
      readonly b: number
    }
    const xs: Array<X> = [
      { a: 1, b: 0 },
      { a: 1, b: 1 }
    ]
    assert.deepStrictEqual(_.findLastIndex((x: X) => x.a === 1)(xs), O.some(1))
    assert.deepStrictEqual(_.findLastIndex((x: X) => x.a === 4)(xs), O.none)
    assert.deepStrictEqual(_.findLastIndex((x: X) => x.a === 1)([]), O.none)
  })

  it('insertAt', () => {
    assert.deepStrictEqual(_.insertAt(1, 1)([]), O.none)
    assert.deepStrictEqual(_.insertAt(0, 1)([]), O.some([1]))
    assert.deepStrictEqual(_.insertAt(2, 5)([1, 2, 3, 4]), O.some([1, 2, 5, 3, 4]))
  })

  it('unsafeUpdateAt', () => {
    // should return the same reference if nothing changed
    const x = { a: 1 }
    const as = [x]
    const result = _.unsafeUpdateAt(0, x, as)
    assert.deepStrictEqual(result, as)
  })

  it('updateAt', () => {
    assert.deepStrictEqual(_.updateAt(1, 1)(as), O.some([1, 1, 3]))
    assert.deepStrictEqual(_.updateAt(1, 1)([]), O.none)
  })

  it('deleteAt', () => {
    assert.deepStrictEqual(_.deleteAt(0)(as), O.some([2, 3]))
    assert.deepStrictEqual(_.deleteAt(1)([]), O.none)
  })

  it('modifyAt', () => {
    const double = (x: number): number => x * 2
    assert.deepStrictEqual(_.modifyAt(1, double)(as), O.some([1, 4, 3]))
    assert.deepStrictEqual(_.modifyAt(1, double)([]), O.none)
  })

  it('sort', () => {
    assert.deepStrictEqual(_.sort(ordNumber)([3, 2, 1]), [1, 2, 3])
  })

  it('extend', () => {
    const sum = (as: Array<number>) => foldMonoid(monoidSum)(as)
    assert.deepStrictEqual(_.array.extend([1, 2, 3, 4], sum), [10, 9, 7, 4])
    assert.deepStrictEqual(_.array.extend([1, 2, 3, 4], identity), [[1, 2, 3, 4], [2, 3, 4], [3, 4], [4]])
  })

  it('zipWith', () => {
    assert.deepStrictEqual(
      _.zipWith([], [], (n, s) => s + n),
      []
    )
    assert.deepStrictEqual(
      _.zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n),
      ['a1', 'b2', 'c3']
    )
  })

  it('zip', () => {
    assert.deepStrictEqual(_.zip([], []), [])
    assert.deepStrictEqual(_.zip([1, 2, 3], ['a', 'b', 'c', 'd']), [
      [1, 'a'],
      [2, 'b'],
      [3, 'c']
    ])
  })

  it('unzip', () => {
    assert.deepStrictEqual(_.unzip([]), [[], []])
    assert.deepStrictEqual(
      _.unzip([
        [1, 'a'],
        [2, 'b'],
        [3, 'c']
      ]),
      [
        [1, 2, 3],
        ['a', 'b', 'c']
      ]
    )
  })

  it('rights', () => {
    assert.deepStrictEqual(_.rights([right(1), left('foo'), right(2)]), [1, 2])
    assert.deepStrictEqual(_.rights([]), [])
  })

  it('lefts', () => {
    assert.deepStrictEqual(_.lefts([right(1), left('foo'), right(2)]), ['foo'])
    assert.deepStrictEqual(_.lefts([]), [])
  })

  it('flatten', () => {
    assert.deepStrictEqual(_.flatten([[1], [2], [3]]), [1, 2, 3])
  })

  it('rotate', () => {
    assert.deepStrictEqual(_.rotate(1)([]), [])
    assert.deepStrictEqual(_.rotate(1)([1]), [1])
    assert.deepStrictEqual(_.rotate(1)([1, 2]), [2, 1])
    assert.deepStrictEqual(_.rotate(2)([1, 2]), [1, 2])
    assert.deepStrictEqual(_.rotate(0)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(_.rotate(1)([1, 2, 3, 4, 5]), [5, 1, 2, 3, 4])
    assert.deepStrictEqual(_.rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
    assert.deepStrictEqual(_.rotate(-1)([1, 2, 3, 4, 5]), [2, 3, 4, 5, 1])
    assert.deepStrictEqual(_.rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
  })

  it('map', () => {
    assert.deepStrictEqual(
      _.array.map([1, 2, 3], (n) => n * 2),
      [2, 4, 6]
    )
  })

  it('mapWithIndex', () => {
    assert.deepStrictEqual(
      _.array.mapWithIndex([1, 2, 3], (i, n) => n + i),
      [1, 3, 5]
    )
  })

  it('ap', () => {
    assert.deepStrictEqual(_.array.ap([(n: number) => n * 2, (n: number) => n + 1], [1, 2, 3]), [2, 4, 6, 2, 3, 4])
  })

  it('copy', () => {
    const xs = [1, 2, 3]
    const ys = _.copy([1, 2, 3])
    assert.deepStrictEqual(xs, ys)
    assert.deepStrictEqual(xs !== ys, true)
  })

  it('chain', () => {
    assert.deepStrictEqual(
      _.array.chain([1, 2, 3], (n) => [n, n + 1]),
      [1, 2, 2, 3, 3, 4]
    )
  })

  it('reverse', () => {
    assert.deepStrictEqual(_.reverse([1, 2, 3]), [3, 2, 1])
  })

  it('reduce', () => {
    assert.deepStrictEqual(
      _.array.reduce(['a', 'b', 'c'], '', (acc, a) => acc + a),
      'abc'
    )
  })

  it('foldMap', () => {
    const foldMap = _.array.foldMap(monoidString)
    const x1 = ['a', 'b', 'c']
    const f1 = identity
    assert.deepStrictEqual(foldMap(x1, f1), 'abc')
    const x2: Array<string> = []
    assert.deepStrictEqual(foldMap(x2, f1), '')
  })

  it('reduceRight', () => {
    const reduceRight = _.array.reduceRight
    const x1 = ['a', 'b', 'c']
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.deepStrictEqual(reduceRight(x1, init1, f1), 'cba')
    const x2: Array<string> = []
    assert.deepStrictEqual(reduceRight(x2, init1, f1), '')
  })

  it('foldLeft', () => {
    const len: <A>(as: Array<A>) => number = _.foldLeft(
      () => 0,
      (_, tail) => 1 + len(tail)
    )
    assert.deepStrictEqual(len([1, 2, 3]), 3)
  })

  it('foldRight', () => {
    const len: <A>(as: Array<A>) => number = _.foldRight(
      () => 0,
      (init, _) => 1 + len(init)
    )
    assert.deepStrictEqual(len([1, 2, 3]), 3)
  })

  it('scanLeft', () => {
    const f = (b: number, a: number) => b - a
    assert.deepStrictEqual(_.scanLeft(10, f)([1, 2, 3]), [10, 9, 7, 4])
    assert.deepStrictEqual(_.scanLeft(10, f)([0]), [10, 10])
    assert.deepStrictEqual(_.scanLeft(10, f)([]), [10])
  })

  it('scanRight', () => {
    const f = (b: number, a: number) => b - a
    assert.deepStrictEqual(_.scanRight(10, f)([1, 2, 3]), [-8, 9, -7, 10])
    assert.deepStrictEqual(_.scanRight(10, f)([0]), [-10, 10])
    assert.deepStrictEqual(_.scanRight(10, f)([]), [10])
  })

  it('uniq', () => {
    interface A {
      readonly a: string
      readonly b: number
    }

    const eqA = eq.contramap(ordNumber, (f: A) => f.b)
    const arrA: A = { a: 'a', b: 1 }
    const arrB: A = { a: 'b', b: 1 }
    const arrC: A = { a: 'c', b: 2 }
    const arrD: A = { a: 'd', b: 2 }
    const arrUniq = [arrA, arrC]

    assert.deepStrictEqual(_.uniq(eqA)(arrUniq), arrUniq, 'Preserve original array')
    assert.deepStrictEqual(_.uniq(eqA)([arrA, arrB, arrC, arrD]), [arrA, arrC])
    assert.deepStrictEqual(_.uniq(eqA)([arrB, arrA, arrC, arrD]), [arrB, arrC])
    assert.deepStrictEqual(_.uniq(eqA)([arrA, arrA, arrC, arrD, arrA]), [arrA, arrC])
    assert.deepStrictEqual(_.uniq(eqA)([arrA, arrC]), [arrA, arrC])
    assert.deepStrictEqual(_.uniq(eqA)([arrC, arrA]), [arrC, arrA])
    assert.deepStrictEqual(_.uniq(eqBoolean)([true, false, true, false]), [true, false])
    assert.deepStrictEqual(_.uniq(eqNumber)([]), [])
    assert.deepStrictEqual(_.uniq(eqNumber)([-0, -0]), [-0])
    assert.deepStrictEqual(_.uniq(eqNumber)([0, -0]), [0])
    assert.deepStrictEqual(_.uniq(eqNumber)([1]), [1])
    assert.deepStrictEqual(_.uniq(eqNumber)([2, 1, 2]), [2, 1])
    assert.deepStrictEqual(_.uniq(eqNumber)([1, 2, 1]), [1, 2])
    assert.deepStrictEqual(_.uniq(eqNumber)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(_.uniq(eqNumber)([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(_.uniq(eqNumber)([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(_.uniq(eqString)(['a', 'b', 'a']), ['a', 'b'])
    assert.deepStrictEqual(_.uniq(eqString)(['a', 'b', 'A']), ['a', 'b', 'A'])
  })

  it('sortBy', () => {
    interface Person {
      readonly name: string
      readonly age: number
    }
    const byName = ord.contramap(ordString, (p: Person) => p.name)
    const byAge = ord.contramap(ordNumber, (p: Person) => p.age)
    const sortByNameByAge = _.sortBy([byName, byAge])
    const persons = [
      { name: 'a', age: 1 },
      { name: 'b', age: 3 },
      { name: 'c', age: 2 },
      { name: 'b', age: 2 }
    ]
    assert.deepStrictEqual(sortByNameByAge(persons), [
      { name: 'a', age: 1 },
      { name: 'b', age: 2 },
      { name: 'b', age: 3 },
      { name: 'c', age: 2 }
    ])
    const sortByAgeByName = _.sortBy([byAge, byName])
    assert.deepStrictEqual(sortByAgeByName(persons), [
      { name: 'a', age: 1 },
      { name: 'b', age: 2 },
      { name: 'c', age: 2 },
      { name: 'b', age: 3 }
    ])

    assert.deepStrictEqual(_.sortBy([])(persons), persons)
  })

  it('compact', () => {
    assert.deepStrictEqual(_.array.compact([]), [])
    assert.deepStrictEqual(_.array.compact([O.some(1), O.some(2), O.some(3)]), [1, 2, 3])
    assert.deepStrictEqual(_.array.compact([O.some(1), O.none, O.some(3)]), [1, 3])
  })

  it('separate', () => {
    assert.deepStrictEqual(_.array.separate([]), { left: [], right: [] })
    assert.deepStrictEqual(_.array.separate([left(123), right('123')]), { left: [123], right: ['123'] })
  })

  it('filter', () => {
    const filter = _.array.filter
    const g = (n: number) => n % 2 === 1
    assert.deepStrictEqual(filter([1, 2, 3], g), [1, 3])
    assert.deepStrictEqual(_.array.filter([1, 2, 3], g), [1, 3])
    const x = filter([O.some(3), O.some(2), O.some(1)], O.isSome)
    assert.deepStrictEqual(x, [O.some(3), O.some(2), O.some(1)])
    const y = filter([O.some(3), O.none, O.some(1)], O.isSome)
    assert.deepStrictEqual(y, [O.some(3), O.some(1)])
  })

  it('filterWithIndex', () => {
    const f = (n: number) => n % 2 === 0
    assert.deepStrictEqual(_.array.filterWithIndex(['a', 'b', 'c'], f), ['a', 'c'])
  })

  it('filterMap', () => {
    const f = (n: number) => (n % 2 === 0 ? O.none : O.some(n))
    assert.deepStrictEqual(_.array.filterMap(as, f), [1, 3])
    assert.deepStrictEqual(_.array.filterMap([], f), [])
  })

  it('partitionMap', () => {
    assert.deepStrictEqual(_.array.partitionMap([], identity), { left: [], right: [] })
    assert.deepStrictEqual(_.array.partitionMap([right(1), left('foo'), right(2)], identity), {
      left: ['foo'],
      right: [1, 2]
    })
  })

  it('partition', () => {
    const partition = _.array.partition
    assert.deepStrictEqual(partition([], p), { left: [], right: [] })
    assert.deepStrictEqual(partition([1, 3], p), { left: [1], right: [3] })
    // refinements
    const xs: Array<string | number> = ['a', 'b', 1]
    const isNumber = (x: string | number): x is number => typeof x === 'number'
    const actual = partition(xs, isNumber)
    assert.deepStrictEqual(actual, { left: ['a', 'b'], right: [1] })
  })

  it('chop', () => {
    const group = <A>(S: Eq<A>): ((as: Array<A>) => Array<Array<A>>) => {
      return _.chop((as) => {
        const { init, rest } = _.spanLeft((a: A) => S.equals(a, as[0]))(as)
        return [init, rest]
      })
    }
    assert.deepStrictEqual(group(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
  })

  it('splitAt', () => {
    assert.deepStrictEqual(_.splitAt(2)([1, 2, 3, 4, 5]), [
      [1, 2],
      [3, 4, 5]
    ])
    assert.deepStrictEqual(_.splitAt(2)([]), [[], []])
    assert.deepStrictEqual(_.splitAt(2)([1]), [[1], []])
    assert.deepStrictEqual(_.splitAt(2)([1, 2]), [[1, 2], []])
    assert.deepStrictEqual(_.splitAt(-1)([1, 2]), [[1], [2]])
    assert.deepStrictEqual(_.splitAt(0)([1, 2]), [[], [1, 2]])
    assert.deepStrictEqual(_.splitAt(3)([1, 2]), [[1, 2], []])
  })

  describe('chunksOf', () => {
    it('should split an array into length-n pieces', () => {
      assert.deepStrictEqual(_.chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
      assert.deepStrictEqual(_.chunksOf(2)([1, 2, 3, 4, 5, 6]), [
        [1, 2],
        [3, 4],
        [5, 6]
      ])
      assert.deepStrictEqual(_.chunksOf(5)([1, 2, 3, 4, 5]), [[1, 2, 3, 4, 5]])
      assert.deepStrictEqual(_.chunksOf(6)([1, 2, 3, 4, 5]), [[1, 2, 3, 4, 5]])
      assert.deepStrictEqual(_.chunksOf(1)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])
      assert.deepStrictEqual(_.chunksOf(0)([1, 2]), [[1, 2]])
      assert.deepStrictEqual(_.chunksOf(10)([1, 2]), [[1, 2]])
      assert.deepStrictEqual(_.chunksOf(-1)([1, 2]), [[1, 2]])
    })

    // #897
    it('returns an empty array if provided an empty array', () => {
      assert.deepStrictEqual(_.chunksOf(1)([]), [])
      assert.deepStrictEqual(_.chunksOf(2)([]), [])
      assert.deepStrictEqual(_.chunksOf(0)([]), [])
    })

    // #897
    it('should respect the law: _.chunksOf(n)(xs).concat(_.chunksOf(n)(ys)) == _.chunksOf(n)(xs.concat(ys)))', () => {
      const xs: Array<number> = []
      const ys = [1, 2]
      assert.deepStrictEqual(_.chunksOf(2)(xs).concat(_.chunksOf(2)(ys)), _.chunksOf(2)(xs.concat(ys)))
      fc.assert(
        fc.property(
          fc.array(fc.integer()).filter((xs) => xs.length % 2 === 0), // Ensures `xs.length` is even
          fc.array(fc.integer()),
          fc.integer(1, 1).map((x) => x * 2), // Generates `n` to be even so that it evenly divides `xs`
          (xs, ys, n) => {
            const as = _.chunksOf(n)(xs).concat(_.chunksOf(n)(ys))
            const bs = _.chunksOf(n)(xs.concat(ys))
            isDeepStrictEqual(as, bs)
          }
        )
      )
    })
  })

  it('makeBy', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(_.makeBy(5, double), [0, 2, 4, 6, 8])
  })

  it('range', () => {
    assert.deepStrictEqual(_.range(0, 0), [0])
    assert.deepStrictEqual(_.range(1, 5), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(_.range(10, 15), [10, 11, 12, 13, 14, 15])
  })

  it('replicate', () => {
    assert.deepStrictEqual(_.replicate(0, 'a'), [])
    assert.deepStrictEqual(_.replicate(3, 'a'), ['a', 'a', 'a'])
  })

  it('comprehension', () => {
    assert.deepStrictEqual(
      _.comprehension([[1, 2, 3]], (a) => a * 2),
      [2, 4, 6]
    )
    assert.deepStrictEqual(
      _.comprehension(
        [
          [1, 2, 3],
          ['a', 'b']
        ],
        tuple
      ),
      [
        [1, 'a'],
        [1, 'b'],
        [2, 'a'],
        [2, 'b'],
        [3, 'a'],
        [3, 'b']
      ]
    )
    assert.deepStrictEqual(
      _.comprehension(
        [
          [1, 2, 3],
          ['a', 'b']
        ],
        tuple,
        (a, b) => (a + b.length) % 2 === 0
      ),
      [
        [1, 'a'],
        [1, 'b'],
        [3, 'a'],
        [3, 'b']
      ]
    )
  })

  it('reduceWithIndex', () => {
    assert.deepStrictEqual(
      _.array.reduceWithIndex(['a', 'b'], '', (i, b, a) => b + i + a),
      '0a1b'
    )
  })

  it('foldMapWithIndex', () => {
    assert.deepStrictEqual(
      _.array.foldMapWithIndex(monoidString)(['a', 'b'], (i, a) => i + a),
      '0a1b'
    )
  })

  it('reduceRightWithIndex', () => {
    assert.deepStrictEqual(
      _.array.reduceRightWithIndex(['a', 'b'], '', (i, a, b) => b + i + a),
      '1b0a'
    )
  })

  it('traverseWithIndex', () => {
    const ta = ['a', 'bb']
    assert.deepStrictEqual(
      pipe(
        ta,
        _.traverseWithIndex(O.option)((i, s) => (s.length >= 1 ? O.some(s + i) : O.none))
      ),
      O.some(['a0', 'bb1'])
    )
    assert.deepStrictEqual(
      pipe(
        ta,
        _.traverseWithIndex(O.option)((i, s) => (s.length > 1 ? O.some(s + i) : O.none))
      ),
      O.none
    )

    // FoldableWithIndex compatibility
    const M = monoidString
    const f = (i: number, s: string): string => s + i
    assert.deepStrictEqual(
      _.array.foldMapWithIndex(M)(ta, f),
      pipe(
        ta,
        _.traverseWithIndex(C.getApplicative(M))((i, a) => C.make(f(i, a)))
      )
    )

    // FunctorWithIndex compatibility
    assert.deepStrictEqual(
      _.array.mapWithIndex(ta, f),
      pipe(
        ta,
        _.traverseWithIndex(I.identity)((i, a) => f(i, a))
      )
    )
  })

  it('union', () => {
    assert.deepStrictEqual(_.union(eqNumber)([1, 2], [3, 4]), [1, 2, 3, 4])
    assert.deepStrictEqual(_.union(eqNumber)([1, 2], [2, 3]), [1, 2, 3])
    assert.deepStrictEqual(_.union(eqNumber)([1, 2], [1, 2]), [1, 2])
  })

  it('intersection', () => {
    assert.deepStrictEqual(_.intersection(eqNumber)([1, 2], [3, 4]), [])
    assert.deepStrictEqual(_.intersection(eqNumber)([1, 2], [2, 3]), [2])
    assert.deepStrictEqual(_.intersection(eqNumber)([1, 2], [1, 2]), [1, 2])
  })

  it('difference', () => {
    assert.deepStrictEqual(_.difference(eqNumber)([1, 2], [3, 4]), [1, 2])
    assert.deepStrictEqual(_.difference(eqNumber)([1, 2], [2, 3]), [1])
    assert.deepStrictEqual(_.difference(eqNumber)([1, 2], [1, 2]), [])
  })

  it('should be safe when calling map with a binary function', () => {
    interface Foo {
      readonly bar: () => number
    }
    const f = (a: number, x?: Foo) => (x !== undefined ? `${a}${x.bar()}` : `${a}`)
    const res = _.array.map([1, 2], f)
    assert.deepStrictEqual(res, ['1', '2'])
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    assert.deepStrictEqual(S.show([]), `[]`)
    assert.deepStrictEqual(S.show(['a']), `["a"]`)
    assert.deepStrictEqual(S.show(['a', 'b']), `["a", "b"]`)
  })
})
