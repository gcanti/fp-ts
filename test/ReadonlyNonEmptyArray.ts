import * as assert from 'assert'
import { identity, pipe } from '../src/function'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as _ from '../src/ReadonlyNonEmptyArray'
import * as Se from '../src/Semigroup'
import * as S from '../src/string'
import * as U from './util'

describe('ReadonlyNonEmptyArray', () => {
  describe('pipeables', () => {
    it('traverse', () => {
      assert.deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.traverse(O.Applicative)((n) => (n >= 0 ? O.some(n) : O.none))
        ),
        O.some([1, 2, 3])
      )
      U.deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.traverse(O.Applicative)((n) => (n >= 2 ? O.some(n) : O.none))
        ),
        O.none
      )
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      assert.deepStrictEqual(sequence([O.some(1), O.some(2), O.some(3)]), O.some([1, 2, 3]))
      U.deepStrictEqual(sequence([O.none, O.some(2), O.some(3)]), O.none)
    })

    it('traverseWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          ['a', 'bb'],
          _.traverseWithIndex(O.Applicative)((i, s) => (s.length >= 1 ? O.some(s + i) : O.none))
        ),
        O.some(['a0', 'bb1'])
      )
      U.deepStrictEqual(
        pipe(
          ['a', 'bb'],
          _.traverseWithIndex(O.Applicative)((i, s) => (s.length > 1 ? O.some(s + i) : O.none))
        ),
        O.none
      )
    })
  })

  it('head', () => {
    U.deepStrictEqual(_.head([1, 2]), 1)
  })

  it('tail', () => {
    U.deepStrictEqual(_.tail([1, 2]), [2])
  })

  it('map', () => {
    U.deepStrictEqual(
      pipe(
        [1, 2],
        _.map((n) => n * 2)
      ),
      [2, 4]
    )
  })

  it('mapWithIndex', () => {
    const add = (i: number, n: number) => n + i
    U.deepStrictEqual(pipe([1, 2], _.mapWithIndex(add)), [1, 3])
  })

  it('of', () => {
    U.deepStrictEqual(_.of(1), [1])
  })

  it('ap', () => {
    const double = (n: number) => n * 2
    const fab: _.ReadonlyNonEmptyArray<(n: number) => number> = [double, double]
    U.deepStrictEqual(pipe(fab, _.ap([1, 2])), [2, 4, 2, 4])
  })

  it('chain', () => {
    const f = (a: number): _.ReadonlyNonEmptyArray<number> => [a, 4]
    U.deepStrictEqual(pipe([1, 2], _.chain(f)), [1, 4, 2, 4])
  })

  it('extend', () => {
    const sum = (as: _.ReadonlyNonEmptyArray<number>): number => {
      const head = _.head(as)
      assert.ok(typeof (head as any) === 'number')
      return Se.concatAll(N.MonoidSum)(head)(_.tail(as))
    }
    U.deepStrictEqual(pipe([1, 2, 3, 4], _.extend(sum)), [10, 9, 7, 4])
    U.deepStrictEqual(pipe([1], _.extend(sum)), [1])
  })

  it('extract', () => {
    U.deepStrictEqual(_.extract([1, 2, 3]), 1)
  })

  it('min', () => {
    U.deepStrictEqual(_.min(N.Ord)([2, 1, 3]), 1)
    U.deepStrictEqual(_.min(N.Ord)([3]), 3)
  })

  it('max', () => {
    U.deepStrictEqual(_.max(N.Ord)([1, 2, 3]), 3)
    U.deepStrictEqual(_.max(N.Ord)([1]), 1)
  })

  it('reduce', () => {
    U.deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.reduce('', (b, a) => b + a)
      ),
      'ab'
    )
  })

  it('foldMap', () => {
    U.deepStrictEqual(pipe(['a', 'b', 'c'], _.foldMap(S.Monoid)(identity)), 'abc')
  })

  it('reduceRight', () => {
    const f = (a: string, acc: string) => acc + a
    U.deepStrictEqual(pipe(['a', 'b', 'c'], _.reduceRight('', f)), 'cba')
  })

  it('fromReadonlyArray', () => {
    U.deepStrictEqual(_.fromReadonlyArray([]), O.none)
    assert.deepStrictEqual(_.fromReadonlyArray([1]), O.some([1]))
    assert.deepStrictEqual(_.fromReadonlyArray([1, 2]), O.some([1, 2]))
  })

  it('getSemigroup', () => {
    const S = _.getSemigroup<number>()
    U.deepStrictEqual(S.concat([1], [2]), [1, 2])
    U.deepStrictEqual(S.concat([1, 2], [3, 4]), [1, 2, 3, 4])
  })

  it('getEq', () => {
    const S = _.getEq(N.Eq)
    U.deepStrictEqual(S.equals([1], [1]), true)
    U.deepStrictEqual(S.equals([1], [1, 2]), false)
  })

  it('group', () => {
    U.deepStrictEqual(_.group(N.Eq)([]), [])

    U.deepStrictEqual(_.group(N.Eq)([1, 2, 1, 1]), [[1], [2], [1, 1]])

    U.deepStrictEqual(_.group(N.Eq)([1, 2, 1, 1, 3]), [[1], [2], [1, 1], [3]])
  })

  it('groupSort', () => {
    U.deepStrictEqual(_.groupSort(N.Ord)([]), [])
    U.deepStrictEqual(_.groupSort(N.Ord)([1, 2, 1, 1]), [[1, 1, 1], [2]])
  })

  it('last', () => {
    U.deepStrictEqual(_.last([1, 2, 3]), 3)
    U.deepStrictEqual(_.last([1]), 1)
  })

  it('init', () => {
    U.deepStrictEqual(_.init([1, 2, 3]), [1, 2])
    U.deepStrictEqual(_.init([1]), [])
  })

  it('sort', () => {
    const sort = _.sort(N.Ord)
    U.deepStrictEqual(sort([3, 2, 1]), [1, 2, 3])
    // should optimize `1`-length `ReadonlyNonEmptyArray`s
    const singleton: _.ReadonlyNonEmptyArray<number> = [1]
    assert.strictEqual(sort(singleton), singleton)
  })

  it('prependAll', () => {
    U.deepStrictEqual(_.prependAll(0)([1, 2, 3]), [0, 1, 0, 2, 0, 3])
    U.deepStrictEqual(_.prependAll(0)([1]), [0, 1])
    U.deepStrictEqual(_.prependAll(0)([1, 2, 3, 4]), [0, 1, 0, 2, 0, 3, 0, 4])
  })

  it('intersperse', () => {
    U.deepStrictEqual(_.intersperse(0)([1, 2, 3]), [1, 0, 2, 0, 3])
    U.deepStrictEqual(_.intersperse(0)([1]), [1])
    U.deepStrictEqual(_.intersperse(0)([1, 2]), [1, 0, 2])
    U.deepStrictEqual(_.intersperse(0)([1, 2, 3, 4]), [1, 0, 2, 0, 3, 0, 4])
  })

  it('reverse', () => {
    const singleton: _.ReadonlyNonEmptyArray<number> = [1]
    assert.strictEqual(_.reverse(singleton), singleton)
    U.deepStrictEqual(_.reverse([1, 2, 3]), [3, 2, 1])
  })

  it('groupBy', () => {
    U.deepStrictEqual(_.groupBy((_) => '')([]), {})
    U.deepStrictEqual(_.groupBy(String)([1]), { '1': [1] })
    U.deepStrictEqual(_.groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
      '3': ['foo', 'bar'],
      '6': ['foobar']
    })
  })

  it('insertAt', () => {
    const make = (x: number) => ({ x })
    const a1 = make(1)
    const a2 = make(1)
    const a3 = make(2)
    const a4 = make(3)
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(pipe([], _.insertAt(1, 1)), O.none)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(_.insertAt(0, a4)([a1, a2, a3]), O.some([a4, a1, a2, a3]))
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.insertAt(-1, a4)([a1, a2, a3]), O.none)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(_.insertAt(3, a4)([a1, a2, a3]), O.some([a1, a2, a3, a4]))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(_.insertAt(1, a4)([a1, a2, a3]), O.some([a1, a4, a2, a3]))
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.insertAt(4, a4)([a1, a2, a3]), O.none)
  })

  it('updateAt', () => {
    const make2 = (x: number) => ({ x })
    const a1 = make2(1)
    const a2 = make2(1)
    const a3 = make2(2)
    const a4 = make2(3)
    const arr: _.ReadonlyNonEmptyArray<{ readonly x: number }> = [a1, a2, a3]
    assert.deepStrictEqual(_.updateAt(0, a4)(arr), O.some([a4, a2, a3]))
    U.deepStrictEqual(_.updateAt(-1, a4)(arr), O.none)
    U.deepStrictEqual(_.updateAt(3, a4)(arr), O.none)
    assert.deepStrictEqual(_.updateAt(1, a4)(arr), O.some([a1, a4, a3]))
    // should return the same reference if nothing changed
    const r1 = _.updateAt(0, a1)(arr)
    if (O.isSome(r1)) {
      U.deepStrictEqual(r1.value, arr)
    } else {
      assert.fail('is not a Some')
    }
    const r2 = _.updateAt(2, a3)(arr)
    if (O.isSome(r2)) {
      U.deepStrictEqual(r2.value, arr)
    } else {
      assert.fail('is not a Some')
    }
  })

  it('modifyAt', () => {
    const double = (n: number): number => n * 2
    U.deepStrictEqual(_.modifyAt(1, double)([1]), O.none)
    U.deepStrictEqual(_.modifyAt(1, double)([1, 2]), O.some([1, 4] as const))
    // should return the same reference if nothing changed
    const input: _.ReadonlyNonEmptyArray<number> = [1, 2, 3]
    U.deepStrictEqual(
      pipe(
        input,
        _.modifyAt(1, identity),
        O.map((out) => out === input)
      ),
      O.some(true)
    )
  })

  it('filter', () => {
    const make = (x: number) => ({ x })
    const a1 = make(1)
    const a2 = make(1)
    const a3 = make(2)
    assert.deepStrictEqual(_.filter(({ x }) => x !== 1)([a1, a2, a3]), O.some([a3]))
    assert.deepStrictEqual(_.filter(({ x }) => x !== 2)([a1, a2, a3]), O.some([a1, a2]))
    U.deepStrictEqual(
      _.filter(({ x }) => {
        return !(x === 1 || x === 2)
      })([a1, a2, a3]),
      O.none
    )
    assert.deepStrictEqual(_.filter(({ x }) => x !== 10)([a1, a2, a3]), O.some([a1, a2, a3]))

    // refinements
    // tslint:disable-next-line: deprecation
    const actual1 = _.filter(O.isSome)([O.some(3), O.some(2), O.some(1)])
    assert.deepStrictEqual(actual1, O.some([O.some(3), O.some(2), O.some(1)]))
    // tslint:disable-next-line: deprecation
    const actual2 = _.filter(O.isSome)([O.some(3), O.none, O.some(1)])
    assert.deepStrictEqual(actual2, O.some([O.some(3), O.some(1)]))
  })

  it('filterWithIndex', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(_.filterWithIndex((i) => i % 2 === 0)([1, 2, 3]), O.some([1, 3]))
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.filterWithIndex((i, a: number) => i % 2 === 1 && a > 2)([1, 2, 3]), O.none)
  })

  it('reduceWithIndex', () => {
    U.deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.reduceWithIndex('', (i, b, a) => b + i + a)
      ),
      '0a1b'
    )
  })

  it('foldMapWithIndex', () => {
    U.deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.foldMapWithIndex(S.Monoid)((i, a) => i + a)
      ),
      '0a1b'
    )
  })

  it('reduceRightWithIndex', () => {
    U.deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.reduceRightWithIndex('', (i, a, b) => b + i + a)
      ),
      '1b0a'
    )
  })

  it('cons', () => {
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.cons(1, [2, 3, 4]), [1, 2, 3, 4])
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(pipe([2, 3, 4], _.cons(1)), [1, 2, 3, 4])
  })

  it('snoc', () => {
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.snoc([], 0), [0])
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.snoc([1, 2, 3], 4), [1, 2, 3, 4])
  })

  it('unprepend', () => {
    U.deepStrictEqual(_.unprepend([0]), [0, []])
    U.deepStrictEqual(_.unprepend([1, 2, 3, 4]), [1, [2, 3, 4]])
  })

  it('unappend', () => {
    U.deepStrictEqual(_.unappend([0]), [[], 0])
    U.deepStrictEqual(_.unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
    U.deepStrictEqual(_.unappend([0]), [[], 0])
    U.deepStrictEqual(_.unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    U.deepStrictEqual(Sh.show(['a']), `["a"]`)
    U.deepStrictEqual(Sh.show(['a', 'b', 'c']), `["a", "b", "c"]`)
  })

  it('alt / concat', () => {
    U.deepStrictEqual(_.concat(['a'], []), ['a'])
    U.deepStrictEqual(
      pipe(
        ['a'],
        _.alt(() => ['b'])
      ),
      ['a', 'b']
    )
  })

  it('foldMap', () => {
    const f = _.foldMap(N.SemigroupSum)((s: string) => s.length)
    U.deepStrictEqual(f(['a']), 1)
    U.deepStrictEqual(f(['a', 'bb']), 3)
  })

  it('foldMapWithIndex', () => {
    const f = _.foldMapWithIndex(N.SemigroupSum)((i: number, s: string) => s.length + i)
    U.deepStrictEqual(f(['a']), 1)
    U.deepStrictEqual(f(['a', 'bb']), 4)
  })

  it('fromArray', () => {
    assert.strictEqual(_.fromArray([]), O.none)
    // tslint:disable-next-line: readonly-array
    const as = [1, 2, 3]
    const bs = _.fromArray(as)
    assert.deepStrictEqual(bs, O.some(as))
    assert.notStrictEqual((bs as any).value, as)
  })

  it('fromReadonlyArray', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    const bs = _.fromReadonlyArray(as)
    U.deepStrictEqual(bs, O.some(as))
    assert.strictEqual((bs as any).value, as)
  })

  it('concatAll', () => {
    const f = _.concatAll(S.Semigroup)
    U.deepStrictEqual(f(['a']), 'a')
    U.deepStrictEqual(f(['a', 'bb']), 'abb')
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      ),
      [{ a: 1, b: 'b' }]
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b'))), [{ a: 1, b: 'b' }])
  })

  it('zipWith', () => {
    U.deepStrictEqual(
      _.zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n),
      ['a1', 'b2', 'c3']
    )
  })

  it('zip', () => {
    U.deepStrictEqual(_.zip([1, 2, 3], ['a', 'b', 'c', 'd']), [
      [1, 'a'],
      [2, 'b'],
      [3, 'c']
    ])
    U.deepStrictEqual(pipe([1, 2, 3] as const, _.zip(['a', 'b', 'c', 'd'])), [
      [1, 'a'],
      [2, 'b'],
      [3, 'c']
    ])
  })

  it('unzip', () => {
    U.deepStrictEqual(
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

  it('splitAt', () => {
    const assertEmptySecond = (input: _.ReadonlyNonEmptyArray<number>, n: number) => {
      const [first, second] = _.splitAt(n)(input)
      assert.strictEqual(first, input)
      assert.strictEqual(second, _.empty)
    }

    U.deepStrictEqual(_.splitAt(1)([1, 2]), [[1], [2]])
    U.deepStrictEqual(_.splitAt(2)([1, 2, 3, 4, 5]), [
      [1, 2],
      [3, 4, 5]
    ])
    U.deepStrictEqual(_.splitAt(2.2)([1, 2, 3, 4, 5]), [
      [1, 2],
      [3, 4, 5]
    ])
    // n = 0
    assertEmptySecond([1, 2], 0)
    // n = length
    assertEmptySecond([1, 2], 2)
    // n out of bounds
    assertEmptySecond([1], 2)
    assertEmptySecond([1], -1)
  })

  it('chunksOf', () => {
    U.deepStrictEqual(_.chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
    U.deepStrictEqual(_.chunksOf(2)([1, 2, 3, 4, 5, 6]), [
      [1, 2],
      [3, 4],
      [5, 6]
    ])
    U.deepStrictEqual(_.chunksOf(1)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])

    const assertSingleChunk = (input: _.ReadonlyNonEmptyArray<number>, n: number) => {
      const chunks = _.chunksOf(n)(input)
      assert.strictEqual(chunks.length, 1)
      assert.strictEqual(_.head(chunks), input)
    }
    // n = 0
    assertSingleChunk([1, 2], 0)
    // n = length
    assertSingleChunk([1, 2], 2)
    // n out of bounds
    assertSingleChunk([1, 2], -1)
    assertSingleChunk([1, 2], 3)
  })
})
