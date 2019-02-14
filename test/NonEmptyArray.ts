import * as assert from 'assert'
import { fold, monoidSum, monoidString } from '../src/Monoid'
import {
  NonEmptyArray,
  nonEmptyArray,
  fromArray,
  getSemigroup,
  group,
  groupSort,
  groupBy,
  getSetoid
} from '../src/NonEmptyArray'
import { none, option, some, isSome } from '../src/Option'
import { ordNumber } from '../src/Ord'
import * as F from '../src/Foldable'
import { identity } from '../src/function'
import * as T from '../src/Traversable'
import * as I from '../src/Identity'
import * as C from '../src/Const'
import { setoidNumber } from '../src/Setoid'

describe('NonEmptyArray', () => {
  it('concat', () => {
    const x = new NonEmptyArray(1, [2])
    const y = new NonEmptyArray(3, [4])
    assert.deepStrictEqual(x.concat(y).toArray(), [1, 2, 3, 4])
  })

  it('map', () => {
    const x = new NonEmptyArray(1, [2])
    const double = (n: number) => n * 2
    assert.deepStrictEqual(x.map(double).toArray(), [2, 4])
    assert.deepStrictEqual(nonEmptyArray.map(x, double).toArray(), [2, 4])
  })

  it('mapWithIndex', () => {
    const x = new NonEmptyArray(1, [2])
    const add = (i: number, n: number) => n + i
    assert.deepStrictEqual(x.mapWithIndex(add).toArray(), [1, 3])
    assert.deepStrictEqual(nonEmptyArray.mapWithIndex(x, add).toArray(), [1, 3])
  })

  it('ap', () => {
    assert.deepStrictEqual(nonEmptyArray.of(1), new NonEmptyArray(1, []))
  })

  it('ap', () => {
    const x = new NonEmptyArray(1, [2])
    const double = (n: number) => n * 2
    assert.deepStrictEqual(x.ap(new NonEmptyArray(double, [double])).toArray(), [2, 4, 2, 4])
    assert.deepStrictEqual(nonEmptyArray.ap(new NonEmptyArray(double, [double]), x).toArray(), [2, 4, 2, 4])
    assert.deepStrictEqual(new NonEmptyArray(double, [double]).ap_(x).toArray(), [2, 4, 2, 4])
  })

  it('chain', () => {
    const x = new NonEmptyArray(1, [2])
    const f = (a: number) => new NonEmptyArray(a, [4])
    assert.deepStrictEqual(x.chain(f).toArray(), [1, 4, 2, 4])
    assert.deepStrictEqual(nonEmptyArray.chain(x, f).toArray(), [1, 4, 2, 4])
  })

  it('extend', () => {
    const sum = (as: NonEmptyArray<number>) => fold(monoidSum)(as.toArray())
    assert.deepStrictEqual(new NonEmptyArray(1, [2, 3, 4]).extend(sum), new NonEmptyArray(10, [9, 7, 4]))
    assert.deepStrictEqual(nonEmptyArray.extend(new NonEmptyArray(1, [2, 3, 4]), sum), new NonEmptyArray(10, [9, 7, 4]))
  })

  it('extract', () => {
    assert.strictEqual(new NonEmptyArray(1, [2, 3]).extract(), 1)
    assert.strictEqual(nonEmptyArray.extract(new NonEmptyArray(1, [2, 3])), 1)
  })

  it('traverse', () => {
    assert.deepStrictEqual(
      nonEmptyArray.traverse(option)(new NonEmptyArray(1, [2, 3]), n => (n >= 0 ? some(n) : none)),
      some(new NonEmptyArray(1, [2, 3]))
    )
    assert.deepStrictEqual(
      nonEmptyArray.traverse(option)(new NonEmptyArray(1, [2, 3]), n => (n >= 2 ? some(n) : none)),
      none
    )
  })

  it('sequence', () => {
    const old = T.sequence(option, nonEmptyArray)
    const sequence = nonEmptyArray.sequence(option)
    const x1 = new NonEmptyArray(some(1), [some(2), some(3)])
    assert.deepStrictEqual(sequence(x1), some(new NonEmptyArray(1, [2, 3])))
    assert.deepStrictEqual(sequence(x1), old(x1))
    const x2 = new NonEmptyArray(none, [some(2), some(3)])
    assert.deepStrictEqual(sequence(x2), none)
    assert.deepStrictEqual(sequence(x2), old(x2))
  })

  it('min', () => {
    assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).min(ordNumber), 1)
    assert.deepStrictEqual(new NonEmptyArray(3, []).min(ordNumber), 3)
  })

  it('max', () => {
    assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).max(ordNumber), 3)
    assert.deepStrictEqual(new NonEmptyArray(1, []).max(ordNumber), 1)
  })

  it('reduce', () => {
    const x = new NonEmptyArray('a', ['b'])
    assert.strictEqual(x.reduce('', (b, a) => b + a), 'ab')
    assert.strictEqual(nonEmptyArray.reduce(x, '', (b, a) => b + a), 'ab')
  })

  it('foldMap', () => {
    const old = F.foldMap(nonEmptyArray, monoidString)
    const foldMap = nonEmptyArray.foldMap(monoidString)
    const x1 = new NonEmptyArray('a', ['b', 'c'])
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'abc')
    assert.strictEqual(foldMap(x1, f1), old(x1, f1))
  })

  it('foldr', () => {
    const old = F.foldr(nonEmptyArray)
    const foldr = nonEmptyArray.foldr
    const x1 = new NonEmptyArray('a', ['b', 'c'])
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'cba')
    assert.strictEqual(foldr(x1, init1, f1), old(x1, init1, f1))
  })

  it('toString', () => {
    const x = new NonEmptyArray(1, [2])
    assert.strictEqual(x.toString(), 'new NonEmptyArray(1, [2])')
    assert.strictEqual(x.inspect(), 'new NonEmptyArray(1, [2])')
  })

  it('fromArray', () => {
    assert.deepStrictEqual(fromArray([]), none)
    assert.deepStrictEqual(fromArray([1]), some(new NonEmptyArray(1, [])))
    assert.deepStrictEqual(fromArray([1, 2]), some(new NonEmptyArray(1, [2])))
  })

  it('getSemigroup', () => {
    const S = getSemigroup<number>()
    assert.deepStrictEqual(S.concat(new NonEmptyArray(1, []), new NonEmptyArray(2, [])), new NonEmptyArray(1, [2]))
    assert.deepStrictEqual(
      S.concat(new NonEmptyArray(1, [2]), new NonEmptyArray(3, [4])),
      new NonEmptyArray(1, [2, 3, 4])
    )
  })

  it('getSetoid', () => {
    const S = getSetoid(setoidNumber)
    assert.strictEqual(S.equals(new NonEmptyArray(1, []), new NonEmptyArray(1, [])), true)
    assert.strictEqual(S.equals(new NonEmptyArray(1, []), new NonEmptyArray(1, [2])), false)
  })

  it('group', () => {
    assert.deepStrictEqual(group(ordNumber)([]), [])

    assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
      new NonEmptyArray(1, []),
      new NonEmptyArray(2, []),
      new NonEmptyArray(1, [1])
    ])

    assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1, 3]), [
      new NonEmptyArray(1, []),
      new NonEmptyArray(2, []),
      new NonEmptyArray(1, [1]),
      new NonEmptyArray(3, [])
    ])
  })

  it('groupSort', () => {
    assert.deepStrictEqual(groupSort(ordNumber)([]), [])
    assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [new NonEmptyArray(1, [1, 1]), new NonEmptyArray(2, [])])
  })

  it('last', () => {
    assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).last(), 3)
    assert.deepStrictEqual(new NonEmptyArray(1, []).last(), 1)
  })

  it('sort', () => {
    assert.deepStrictEqual(new NonEmptyArray(3, [2, 1]).sort(ordNumber), new NonEmptyArray(1, [2, 3]))
  })

  it('reverse', () => {
    const result = new NonEmptyArray(1, [2, 3]).reverse()
    const expected = new NonEmptyArray(3, [2, 1])
    assert.deepStrictEqual(result, expected)
  })

  it('length', () => {
    assert.strictEqual(new NonEmptyArray(1, [2, 3]).length(), 3)
  })

  it('groupBy', () => {
    assert.deepStrictEqual(groupBy([], _ => ''), {})
    assert.deepStrictEqual(groupBy([1], String), { '1': new NonEmptyArray(1, []) })
    assert.deepStrictEqual(groupBy(['foo', 'bar', 'foobar'], a => String(a.length)), {
      '3': new NonEmptyArray('foo', ['bar']),
      '6': new NonEmptyArray('foobar', [])
    })
  })

  it('index', () => {
    const arr = new NonEmptyArray(1, [2, 3])
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(arr.index(-1), none)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(arr.index(0), some(1))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(arr.index(3), none)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(arr.index(1), some(2))
  })

  it('findFirst', () => {
    const make = (x: number) => ({ x })
    const a1 = make(1)
    const a2 = make(1)
    const a3 = make(2)
    const arr = new NonEmptyArray(a1, [a2, a3])
    assert.deepStrictEqual(arr.findFirst(({ x }) => x === 1).map(x => x === a1), some(true))
    assert.deepStrictEqual(arr.findFirst(({ x }) => x === 2), some(a3))
    assert.deepStrictEqual(arr.findFirst(({ x }) => x === 10), none)
  })

  it('findLast', () => {
    const make = (x: number) => ({ x })
    const a1 = make(1)
    const a2 = make(1)
    const a3 = make(2)
    const arr = new NonEmptyArray(a1, [a2, a3])
    assert.deepStrictEqual(arr.findLast(({ x }) => x === 1).map(x => x === a2), some(true))
    assert.deepStrictEqual(arr.findLast(({ x }) => x === 2), some(a3))
    assert.deepStrictEqual(arr.findLast(({ x }) => x === 10), none)
    assert.deepStrictEqual(new NonEmptyArray(a1, []).findLast(({ x }) => x === 1), some(a1))
  })

  it('findIndex', () => {
    const make = (x: number) => ({ x })
    const a1 = make(1)
    const a2 = make(1)
    const a3 = make(2)
    const arr = new NonEmptyArray(a1, [a2, a3])
    assert.deepStrictEqual(arr.findIndex(({ x }) => x === 1), some(0))
    assert.deepStrictEqual(arr.findIndex(({ x }) => x === 2), some(2))
    assert.deepStrictEqual(arr.findIndex(({ x }) => x === 10), none)
  })

  it('findLastIndex', () => {
    const make = (x: number) => ({ x })
    const a1 = make(1)
    const a2 = make(1)
    const a3 = make(2)
    const arr = new NonEmptyArray(a1, [a2, a3])
    assert.deepStrictEqual(arr.findLastIndex(({ x }) => x === 1), some(1))
    assert.deepStrictEqual(arr.findLastIndex(({ x }) => x === 2), some(2))
    assert.deepStrictEqual(arr.findLastIndex(({ x }) => x === 10), none)
    assert.deepStrictEqual(new NonEmptyArray(a1, []).findLastIndex(({ x }) => x === 1), some(0))
  })

  it('insertAt', () => {
    const make = (x: number) => ({ x })
    const a1 = make(1)
    const a2 = make(1)
    const a3 = make(2)
    const a4 = make(3)
    const arr = new NonEmptyArray(a1, [a2, a3])
    assert.deepStrictEqual(arr.insertAt(0, a4), some(new NonEmptyArray(a4, [a1, a2, a3])))
    assert.deepStrictEqual(arr.insertAt(-1, a4), none)
    assert.deepStrictEqual(arr.insertAt(3, a4), some(new NonEmptyArray(a1, [a2, a3, a4])))
    assert.deepStrictEqual(arr.insertAt(1, a4), some(new NonEmptyArray(a1, [a4, a2, a3])))
    assert.deepStrictEqual(arr.insertAt(4, a4), none)
  })

  it('updateAt', () => {
    const make = (x: number) => ({ x })
    const a1 = make(1)
    const a2 = make(1)
    const a3 = make(2)
    const a4 = make(3)
    const arr = new NonEmptyArray(a1, [a2, a3])
    assert.deepStrictEqual(arr.updateAt(0, a4), some(new NonEmptyArray(a4, [a2, a3])))
    assert.deepStrictEqual(arr.updateAt(-1, a4), none)
    assert.deepStrictEqual(arr.updateAt(3, a4), none)
    assert.deepStrictEqual(arr.updateAt(1, a4), some(new NonEmptyArray(a1, [a4, a3])))
    // should return the same reference if nothing changed
    const r1 = arr.updateAt(0, a1)
    if (r1.isSome()) {
      assert.strictEqual(r1.value, arr)
    } else {
      assert.fail('is not a Some')
    }
    const r2 = arr.updateAt(2, a3)
    if (r2.isSome()) {
      assert.strictEqual(r2.value, arr)
    } else {
      assert.fail('is not a Some')
    }
  })

  it('filter', () => {
    const make = (x: number) => ({ x })
    const a1 = make(1)
    const a2 = make(1)
    const a3 = make(2)
    const arr = new NonEmptyArray(a1, [a2, a3])
    assert.deepStrictEqual(arr.filter(({ x }) => x !== 1), some(new NonEmptyArray(a3, [])))
    assert.deepStrictEqual(arr.filter(({ x }) => x !== 2), some(new NonEmptyArray(a1, [a2])))
    assert.deepStrictEqual(
      arr.filter(({ x }) => {
        return !(x === 1 || x === 2)
      }),
      none
    )
    assert.deepStrictEqual(arr.filter(({ x }) => x !== 10), some(new NonEmptyArray(a1, [a2, a3])))

    // refinements
    const actual1 = new NonEmptyArray(some(3), [some(2), some(1)]).filter(isSome)
    assert.deepStrictEqual(actual1, some(new NonEmptyArray(some(3), [some(2), some(1)])))
    const actual2 = new NonEmptyArray(some(3), [none, some(1)]).filter(isSome)
    assert.deepStrictEqual(actual2, some(new NonEmptyArray(some(3), [some(1)])))
  })

  it('filterWithIndex', () => {
    assert.deepStrictEqual(
      new NonEmptyArray(1, [2, 3]).filterWithIndex(i => i % 2 === 0),
      some(new NonEmptyArray(1, [3]))
    )
    assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).filterWithIndex((i, a) => i % 2 === 1 && a > 2), none)
  })

  it('reduceWithIndex', () => {
    assert.deepStrictEqual(
      nonEmptyArray.reduceWithIndex(new NonEmptyArray('a', ['b']), '', (i, b, a) => b + i + a),
      '0a1b'
    )
  })

  it('foldMapWithIndex', () => {
    assert.deepStrictEqual(
      nonEmptyArray.foldMapWithIndex(monoidString)(new NonEmptyArray('a', ['b']), (i, a) => i + a),
      '0a1b'
    )
  })

  it('foldrWithIndex', () => {
    assert.deepStrictEqual(
      nonEmptyArray.foldrWithIndex(new NonEmptyArray('a', ['b']), '', (i, a, b) => b + i + a),
      '1b0a'
    )
  })

  it('traverseWithIndex', () => {
    const ta = new NonEmptyArray('a', ['bb'])
    assert.deepStrictEqual(
      nonEmptyArray.traverseWithIndex(option)(ta, (i, s) => (s.length >= 1 ? some(s + i) : none)),
      some(new NonEmptyArray('a0', ['bb1']))
    )
    assert.deepStrictEqual(
      nonEmptyArray.traverseWithIndex(option)(ta, (i, s) => (s.length > 1 ? some(s + i) : none)),
      none
    )

    // FoldableWithIndex compatibility
    const M = monoidString
    const f = (i: number, s: string) => s + i
    assert.deepStrictEqual(
      nonEmptyArray.foldMapWithIndex(M)(ta, f),
      nonEmptyArray.traverseWithIndex(C.getApplicative(M))(ta, (i, a) => new C.Const(f(i, a))).value
    )

    // FunctorWithIndex compatibility
    assert.deepStrictEqual(
      nonEmptyArray.mapWithIndex(ta, f),
      nonEmptyArray.traverseWithIndex(I.identity)(ta, (i, a) => new I.Identity(f(i, a))).value
    )
  })

  it('toArrayMap', () => {
    assert.deepStrictEqual(new NonEmptyArray('a', ['bb', 'ccc']).toArrayMap(s => s.length), [1, 2, 3])
  })

  it('some', () => {
    assert.deepStrictEqual(new NonEmptyArray('a', ['bb', 'ccc']).some(s => s.length === 1), true)
    assert.deepStrictEqual(new NonEmptyArray('a', ['bb', 'ccc']).some(s => s.length === 2), true)
    assert.deepStrictEqual(new NonEmptyArray('a', ['bb', 'ccc']).some(s => s.length === 4), false)
  })

  it('every', () => {
    assert.deepStrictEqual(new NonEmptyArray('a', ['bb', 'ccc']).every(s => s.length >= 1), true)
    assert.deepStrictEqual(new NonEmptyArray('a', ['bb', 'ccc']).every(s => s.length >= 2), false)
    assert.deepStrictEqual(new NonEmptyArray('a', ['bb', 'ccc']).every(s => s.length >= 1 && s.length < 3), false)
  })
})
