import * as assert from 'assert'
import { array } from '../src/Array'
import { either, Either, left, right } from '../src/Either'
import { eqNumber } from '../src/Eq'
import * as F from '../src/fluent'
import { IO, io } from '../src/IO'
import * as M from '../src/Monoid'
import { fromNonEmptyArray, nonEmptyArray } from '../src/NonEmptyArray'
import {
  getEq,
  getMonoid,
  getOrd,
  getShow,
  none,
  option,
  Option,
  some,
  URI,
  fold,
  mapNullable,
  fromNullable
} from '../src/Option'
import { ordNumber } from '../src/Ord'
import { reader } from '../src/Reader'
import { semigroupSum } from '../src/Semigroup'
import { showNumber } from '../src/Show'
import { tuple } from '../src/Tuple'

const fluent = F.fluent(option)

describe('fluent', () => {
  it('apply', () => {
    const fluent = F.fluent(option)
    assert.strictEqual(fluent(some(1)).apply(fold(() => 'none', a => `some(${a})`)), 'some(1)')
  })

  it('pipe', () => {
    const fluent = F.fluent(option)
    interface X {
      a?: {
        b?: {
          c?: number
        }
      }
    }
    const x: X = { a: { b: { c: 1 } } }
    assert.deepStrictEqual(
      fluent(fromNullable(x.a))
        .pipe(mapNullable(x => x.b))
        .apply(mapNullable(x => x.c)),
      some(1)
    )
  })

  it('show', () => {
    const S = getShow(showNumber)
    const fluent = F.fluent({ ...S, URI })
    assert.strictEqual(fluent(some(1)).show(), 'some(1)')
    assert.strictEqual(fluent(none).show(), 'none')
  })

  it('equals', () => {
    const S = getEq(eqNumber)
    const fluent = F.fluent({ ...S, URI })
    assert.strictEqual(fluent(some(1)).equals(some(1)), true)
    assert.strictEqual(fluent(some(1)).equals(some(2)), false)
    assert.strictEqual(fluent(some(1)).equals(none), false)
    assert.strictEqual(fluent(none).equals(none), true)
  })

  it('compare', () => {
    const O = getOrd(ordNumber)
    const fluent = F.fluent({ ...O, URI })
    assert.strictEqual(fluent(some(1)).compare(some(1)), 0)
    assert.strictEqual(fluent(some(1)).compare(some(2)), -1)
    assert.strictEqual(fluent(some(2)).compare(some(1)), 1)
  })

  it('concat', () => {
    const M = getMonoid(semigroupSum)
    const fluent = F.fluent({ ...M, URI })
    assert.deepStrictEqual(fluent(some(1)).concat(some(2)), some(3))
    assert.deepStrictEqual(fluent(none as Option<number>).concat(some(2)), some(2))
    assert.deepStrictEqual(fluent(some(1)).concat(none), some(1))
    assert.deepStrictEqual(fluent(none as Option<number>).concat(none), none)
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(fluent(some(1)).map(double).value, option.map(some(1), double))
    assert.deepStrictEqual(fluent(none).map(double).value, option.map(none, double))
  })

  it('mapWithIndex', () => {
    const fluent = F.fluent(array)
    assert.deepStrictEqual(fluent([1, 2, 3]).mapWithIndex((i, a) => i + a).value, [1, 3, 5])
  })

  it('bimap', () => {
    const fluent = F.fluent(either)
    const double = (n: number): number => n * 2
    const len = (s: string): number => s.length
    assert.deepStrictEqual(fluent(right(1) as Either<string, number>).bimap(len, double).value, right(2))
    assert.deepStrictEqual(fluent(left('err')).bimap(len, double).value, left(3))
  })

  it('mapLeft', () => {
    const fluent = F.fluent(either)
    const len = (s: string): number => s.length
    assert.deepStrictEqual(fluent(right(1) as Either<string, number>).mapLeft(len).value, right(1))
    assert.deepStrictEqual(fluent(left('err')).mapLeft(len).value, left(3))
  })

  it('ap', () => {
    const fab = some((s: string): number => s.length)
    assert.deepStrictEqual(fluent(some('foo')).ap(fab).value, option.ap(fab, some('foo')))
    assert.deepStrictEqual(fluent(none).ap(fab).value, option.ap(fab, none))
  })

  it('apFirst', () => {
    const log: Array<string> = []
    const append = (message: string): IO<number> => () => log.push(message)
    const fluent = F.fluent(io)
    assert.strictEqual(
      fluent(append('a'))
        .apFirst(append('b'))
        .value(),
      1
    )
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  it('apSecond', () => {
    const log: Array<string> = []
    const append = (message: string): IO<number> => () => log.push(message)
    const fluent = F.fluent(io)
    assert.strictEqual(
      fluent(append('a'))
        .apSecond(append('b'))
        .value(),
      2
    )
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  it('chain', () => {
    const f = (s: string): Option<number> => (s.length > 2 ? some(s.length * 2) : none)
    assert.deepStrictEqual(fluent(some('aaa')).chain(f).value, option.chain(some('aaa'), f))
    assert.deepStrictEqual(fluent(some('aa')).chain(f).value, option.chain(some('aa'), f))
    assert.deepStrictEqual(fluent(none).chain(f).value, option.chain(none, f))
  })

  it('flatten', () => {
    assert.deepStrictEqual(fluent(some(some(1))).flatten().value, some(1))
  })

  it('extend', () => {
    const fluent = F.fluent(nonEmptyArray)
    const sum = M.fold(M.monoidSum)
    assert.deepStrictEqual(fluent(fromNonEmptyArray([1, 2, 3, 4])).extend(sum).value, fromNonEmptyArray([10, 9, 7, 4]))
  })

  it('duplicate', () => {
    assert.deepStrictEqual(fluent(some(1)).duplicate().value, some(some(1)))
    assert.deepStrictEqual(fluent(none).duplicate().value, none)
  })

  it('reduce', () => {
    assert.strictEqual(
      fluent(some('aaa')).reduce(1, (acc, a) => acc + a.length),
      option.reduce(some('aaa'), 1, (acc, a) => acc + a.length)
    )
  })

  it('foldMap', () => {
    assert.strictEqual(
      fluent(some('aaa')).foldMap(M.monoidSum)(a => a.length),
      option.foldMap(M.monoidSum)(some('aaa'), a => a.length)
    )
  })

  it('foldr', () => {
    assert.strictEqual(
      fluent(some('aaa')).reduceRight(1, (a, acc) => acc + a.length),
      option.reduceRight(some('aaa'), 1, (a, acc) => acc + a.length)
    )
  })

  it('reduceWithIndex', () => {
    const fluent = F.fluent(array)
    assert.strictEqual(
      fluent([1, 2, 3]).reduceWithIndex(1, (i, acc, a) => i + acc + a),
      array.reduceWithIndex([1, 2, 3], 1, (i, acc, a) => i + acc + a)
    )
  })

  it('foldMapWithIndex', () => {
    const fluent = F.fluent(array)
    assert.strictEqual(
      fluent([1, 2, 3]).foldMapWithIndex(M.monoidSum)((i, a) => i + a),
      array.foldMapWithIndex(M.monoidSum)([1, 2, 3], (i, a) => i + a)
    )
  })

  it('foldrWithIndex', () => {
    const fluent = F.fluent(array)
    assert.strictEqual(
      fluent([1, 2, 3]).reduceRightWithIndex(1, (i, a, acc) => i + acc + a),
      array.reduceRightWithIndex([1, 2, 3], 1, (i, a, acc) => i + acc + a)
    )
  })

  it('alt', () => {
    assert.deepStrictEqual(fluent(some(1)).alt(() => some(2)).value, some(1))
    assert.deepStrictEqual(fluent(some(1)).alt(() => none).value, some(1))
    assert.deepStrictEqual(fluent(none as Option<number>).alt(() => some(2)).value, some(2))
    assert.deepStrictEqual(fluent(none as Option<number>).alt(() => none).value, none)
  })

  it('compact', () => {
    const fluent = F.fluent(array)
    assert.deepStrictEqual(fluent([some(1), none, some(3)]).compact().value, [1, 3])
  })

  it('separate', () => {
    const fluent = F.fluent(array)
    assert.deepStrictEqual(fluent([right(1), left('err'), right(3)]).separate(), { left: ['err'], right: [1, 3] })
  })

  it('filter', () => {
    const fluent = F.fluent(array)
    assert.deepStrictEqual(fluent([1, 2, 3]).filter(n => n > 2).value, [3])
  })

  it('filterMap', () => {
    const fluent = F.fluent(array)
    assert.deepStrictEqual(fluent(['a', 'bb', 'ccc']).filterMap(s => (s.length > 2 ? some(s.length) : none)).value, [3])
  })

  it('partition', () => {
    const fluent = F.fluent(array)
    assert.deepStrictEqual(fluent([1, 2, 3]).partition(n => n > 2), { left: [1, 2], right: [3] })
  })

  it('partitionMap', () => {
    const fluent = F.fluent(array)
    assert.deepStrictEqual(
      fluent(['a', 'bb', 'ccc']).partitionMap(s => (s.length > 2 ? right(s.length) : left(s.length < 2))),
      { left: [true, false], right: [3] }
    )
  })

  it('filterWithIndex', () => {
    const fluent = F.fluent(array)
    assert.deepStrictEqual(fluent(['a', 'bb', 'ccc']).filterWithIndex((i, s) => i + s.length > 2).value, ['bb', 'ccc'])
  })

  it('filterMapWithIndex', () => {
    const fluent = F.fluent(array)
    assert.deepStrictEqual(
      fluent(['a', 'bb', 'ccc']).filterMapWithIndex((i, s) => (i + s.length > 2 ? some(s.length) : none)).value,
      [2, 3]
    )
  })

  it('partitionWithIndex', () => {
    const fluent = F.fluent(array)
    assert.deepStrictEqual(fluent(['a', 'bb', 'ccc']).partitionWithIndex((i, s) => i + s.length > 2), {
      left: ['a'],
      right: ['bb', 'ccc']
    })
  })

  it('partitionMapWithIndex', () => {
    const fluent = F.fluent(array)
    assert.deepStrictEqual(
      fluent(['a', 'bb', 'ccc']).partitionMapWithIndex((i, s) =>
        i + s.length > 2 ? right(s.length) : left(s.length < 2)
      ),
      { left: [true], right: [2, 3] }
    )
  })

  it('promap', () => {
    const fluent = F.fluent(reader)
    interface E {
      count: number
    }
    const x = fluent((e: E) => e.count + 1).promap((s: string) => ({ count: s.length }), n => n > 2).value
    assert.deepStrictEqual(x('aa'), true)
    assert.deepStrictEqual(x('a'), false)
  })

  it('compose', () => {
    const fluent1 = F.fluent(tuple)
    assert.deepStrictEqual(fluent1(['a', 1]).compose([1, true]).value, ['a', true])
    const fluent2 = F.fluent(reader)
    assert.deepStrictEqual(
      fluent2((s: string) => s.length)
        .compose(n => n > 2)
        .value('aaa'),
      true
    )
  })
})
