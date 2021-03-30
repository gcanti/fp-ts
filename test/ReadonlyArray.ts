import * as fc from 'fast-check'
import { isDeepStrictEqual } from 'util'
import * as B from '../src/boolean'
import * as E from '../src/Either'
import * as Eq from '../src/Eq'
import { identity, pipe } from '../src/function'
import * as M from '../src/Monoid'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as Ord from '../src/Ord'
import { Predicate } from '../src/Predicate'
import * as _ from '../src/ReadonlyArray'
import { separated } from '../src/Separated'
import * as S from '../src/string'
import * as T from '../src/Task'
import { tuple } from '../src/tuple'
import * as U from './util'

describe('ReadonlyArray', () => {
  describe('pipeables', () => {
    it('traverse', () => {
      const traverse = _.traverse(O.Applicative)((n: number): O.Option<number> => (n % 2 === 0 ? O.none : O.some(n)))
      U.deepStrictEqual(traverse([1, 2]), O.none)
      U.deepStrictEqual(traverse([1, 3]), O.some([1, 3]))
    })

    it('traverseWithIndex', () => {
      U.deepStrictEqual(
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

    it('lookup', () => {
      U.deepStrictEqual(pipe([1, 2, 3], _.lookup(0)), O.some(1))
      U.deepStrictEqual(pipe([1, 2, 3], _.lookup(3)), O.none)
    })

    it('elem', () => {
      U.deepStrictEqual(pipe([1, 2, 3], _.elem(N.Eq)(2)), true)
      U.deepStrictEqual(pipe([1, 2, 3], _.elem(N.Eq)(0)), false)
    })

    it('unfold', () => {
      const as = _.unfold(5, (n) => (n > 0 ? O.some([n, n - 1]) : O.none))
      U.deepStrictEqual(as, [5, 4, 3, 2, 1])
    })

    it('wither', async () => {
      const wither = _.wither(T.ApplicativePar)((n: number) => T.of(n > 2 ? O.some(n + 1) : O.none))
      U.deepStrictEqual(await pipe([], wither)(), [])
      U.deepStrictEqual(await pipe([1, 3], wither)(), [4])
    })

    it('wilt', async () => {
      const wilt = _.wilt(T.ApplicativePar)((n: number) => T.of(n > 2 ? E.right(n + 1) : E.left(n - 1)))
      U.deepStrictEqual(await pipe([], wilt)(), separated([], []))
      U.deepStrictEqual(await pipe([1, 3], wilt)(), separated([0], [4]))
    })

    it('map', () => {
      U.deepStrictEqual(pipe([1, 2, 3], _.map(U.double)), [2, 4, 6])
    })

    it('mapWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.mapWithIndex((i, n) => n + i)
        ),
        [1, 3, 5]
      )
    })

    it('alt', () => {
      const assertAlt = (a: ReadonlyArray<number>, b: ReadonlyArray<number>, expected: ReadonlyArray<number>) => {
        U.deepStrictEqual(
          pipe(
            a,
            _.alt(() => b)
          ),
          expected
        )
      }
      assertAlt([1, 2], [3, 4], [1, 2, 3, 4])
    })

    it('ap', () => {
      U.deepStrictEqual(pipe([(x: number) => x * 2, (x: number) => x * 3], _.ap([1, 2, 3])), [2, 4, 6, 3, 6, 9])
    })

    it('apFirst', () => {
      U.deepStrictEqual(pipe([1, 2], _.apFirst(['a', 'b', 'c'])), [1, 1, 1, 2, 2, 2])
    })

    it('apSecond', () => {
      U.deepStrictEqual(pipe([1, 2], _.apSecond(['a', 'b', 'c'])), ['a', 'b', 'c', 'a', 'b', 'c'])
    })

    it('chain', () => {
      U.deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.chain((n) => [n, n + 1])
        ),
        [1, 2, 2, 3, 3, 4]
      )
    })

    it('chainWithIndex', () => {
      const f = _.chainWithIndex((i, n: number) => [n + i])
      U.deepStrictEqual(pipe([1, 2, 3], f), [1, 3, 5])
      U.strictEqual(pipe(_.empty, f), _.empty)
      const empty: ReadonlyArray<number> = []
      U.strictEqual(pipe(empty, f), _.empty)
    })

    it('chainFirst', () => {
      U.deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.chainFirst((n) => [n, n + 1])
        ),
        [1, 1, 2, 2, 3, 3]
      )
    })

    it('extend', () => {
      const sum = (as: ReadonlyArray<number>) => M.concatAll(N.MonoidSum)(as)
      U.deepStrictEqual(pipe([1, 2, 3, 4], _.extend(sum)), [10, 9, 7, 4])
      U.deepStrictEqual(pipe([1, 2, 3, 4], _.extend(identity)), [[1, 2, 3, 4], [2, 3, 4], [3, 4], [4]])
    })

    it('foldMap', () => {
      U.deepStrictEqual(pipe(['a', 'b', 'c'], _.foldMap(S.Monoid)(identity)), 'abc')
      U.deepStrictEqual(pipe([], _.foldMap(S.Monoid)(identity)), '')
    })

    it('compact', () => {
      U.deepStrictEqual(_.compact([]), [])
      U.deepStrictEqual(_.compact([O.some(1), O.some(2), O.some(3)]), [1, 2, 3])
      U.deepStrictEqual(_.compact([O.some(1), O.none, O.some(3)]), [1, 3])
    })

    it('separate', () => {
      U.deepStrictEqual(_.separate([]), separated([], []))
      U.deepStrictEqual(_.separate([E.left(123), E.right('123')]), separated([123], ['123']))
    })

    it('filter', () => {
      const g = (n: number) => n % 2 === 1
      U.deepStrictEqual(pipe([1, 2, 3], _.filter(g)), [1, 3])
      U.deepStrictEqual(pipe([O.some(3), O.none, O.some(2), O.some(1)], _.filter(O.isSome)), [
        O.some(3),
        O.some(2),
        O.some(1)
      ] as ReadonlyArray<O.Some<number>>)
    })

    it('filterWithIndex', () => {
      const f = (n: number) => n % 2 === 0
      U.deepStrictEqual(pipe(['a', 'b', 'c'], _.filterWithIndex(f)), ['a', 'c'])
    })

    it('filterMap', () => {
      const f = (n: number) => (n % 2 === 0 ? O.none : O.some(n))
      U.deepStrictEqual(pipe([1, 2, 3], _.filterMap(f)), [1, 3])
      U.deepStrictEqual(pipe([], _.filterMap(f)), [])
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

    it('filterMapWithIndex', () => {
      const f = (i: number, n: number) => ((i + n) % 2 === 0 ? O.none : O.some(n))
      U.deepStrictEqual(pipe([1, 2, 4], _.filterMapWithIndex(f)), [1, 2])
      U.deepStrictEqual(pipe([], _.filterMapWithIndex(f)), [])
    })

    it('partitionMap', () => {
      U.deepStrictEqual(pipe([], _.partitionMap(identity)), separated([], []))
      U.deepStrictEqual(
        pipe([E.right(1), E.left('foo'), E.right(2)], _.partitionMap(identity)),
        separated(['foo'], [1, 2])
      )
    })

    it('partition', () => {
      U.deepStrictEqual(
        pipe(
          [],
          _.partition((n) => n > 2)
        ),
        separated([], [])
      )
      U.deepStrictEqual(
        pipe(
          [1, 3],
          _.partition((n) => n > 2)
        ),
        separated([1], [3])
      )
    })

    it('partitionMapWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          [],
          _.partitionMapWithIndex((_, a) => a)
        ),
        separated([], [])
      )
      U.deepStrictEqual(
        pipe(
          [E.right(1), E.left('foo'), E.right(2)],
          _.partitionMapWithIndex((i, a) =>
            pipe(
              a,
              E.filterOrElse(
                (n) => n > i,
                () => 'err'
              )
            )
          )
        ),
        separated(['foo', 'err'], [1])
      )
    })

    it('partitionWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          [],
          _.partitionWithIndex((i, n) => i + n > 2)
        ),
        separated([], [])
      )
      U.deepStrictEqual(
        pipe(
          [1, 2],
          _.partitionWithIndex((i, n) => i + n > 2)
        ),
        separated([1], [2])
      )
    })

    it('reduce', () => {
      U.deepStrictEqual(
        pipe(
          ['a', 'b', 'c'],
          _.reduce('', (acc, a) => acc + a)
        ),
        'abc'
      )
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

    it('reduceRight', () => {
      const as: ReadonlyArray<string> = ['a', 'b', 'c']
      const b = ''
      const f = (a: string, acc: string) => acc + a
      U.deepStrictEqual(pipe(as, _.reduceRight(b, f)), 'cba')
      const x2: ReadonlyArray<string> = []
      U.deepStrictEqual(pipe(x2, _.reduceRight(b, f)), '')
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

    it('duplicate', () => {
      U.deepStrictEqual(pipe(['a', 'b'], _.duplicate), [['a', 'b'], ['b']])
    })
  })

  it('getMonoid', () => {
    const M = _.getMonoid<number>()
    U.deepStrictEqual(pipe([1, 2], M.concat([3, 4])), [1, 2, 3, 4])
    const x = [1, 2]
    U.strictEqual(pipe(x, M.concat(M.empty)), x)
    U.strictEqual(pipe(M.empty, M.concat(x)), x)
  })

  it('getEq', () => {
    const O = _.getEq(S.Eq)
    U.deepStrictEqual(O.equals([])([]), true)
    U.deepStrictEqual(O.equals(['a'])(['a']), true)
    U.deepStrictEqual(O.equals(['a', 'b'])(['a', 'b']), true)
    U.deepStrictEqual(O.equals(['a'])([]), false)
    U.deepStrictEqual(O.equals([])(['a']), false)
    U.deepStrictEqual(O.equals(['a'])(['b']), false)
    U.deepStrictEqual(O.equals(['a', 'b'])(['b', 'a']), false)
    U.deepStrictEqual(O.equals(['a', 'a'])(['a']), false)
  })

  it('getOrd', () => {
    const O = _.getOrd(S.Ord)
    U.deepStrictEqual(pipe([], O.compare([])), 0)
    U.deepStrictEqual(pipe(['a'], O.compare(['a'])), 0)

    U.deepStrictEqual(pipe(['b'], O.compare(['a'])), 1)
    U.deepStrictEqual(pipe(['a'], O.compare(['b'])), -1)

    U.deepStrictEqual(pipe(['a'], O.compare([])), 1)
    U.deepStrictEqual(pipe([], O.compare(['a'])), -1)
    U.deepStrictEqual(pipe(['a', 'a'], O.compare(['a'])), 1)
    U.deepStrictEqual(pipe(['a', 'a'], O.compare(['b'])), -1)

    U.deepStrictEqual(pipe(['a', 'a'], O.compare(['a', 'a'])), 0)
    U.deepStrictEqual(pipe(['a', 'b'], O.compare(['a', 'b'])), 0)

    U.deepStrictEqual(pipe(['a', 'a'], O.compare(['a', 'b'])), -1)
    U.deepStrictEqual(pipe(['a', 'b'], O.compare(['a', 'a'])), 1)

    U.deepStrictEqual(pipe(['a', 'b'], O.compare(['b', 'a'])), -1)
    U.deepStrictEqual(pipe(['b', 'a'], O.compare(['a', 'a'])), 1)
    U.deepStrictEqual(pipe(['b', 'a'], O.compare(['a', 'b'])), 1)
    U.deepStrictEqual(pipe(['b', 'b'], O.compare(['b', 'a'])), 1)
    U.deepStrictEqual(pipe(['b', 'a'], O.compare(['b', 'b'])), -1)
  })

  it('isEmpty', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    U.deepStrictEqual(_.isEmpty(as), false)
    U.deepStrictEqual(_.isEmpty([]), true)
  })

  it('isNotEmpty', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    U.deepStrictEqual(_.isNonEmpty(as), true)
    U.deepStrictEqual(_.isNonEmpty([]), false)
  })

  it('prepend', () => {
    U.deepStrictEqual(pipe([1, 2, 3], _.prepend(0)), [0, 1, 2, 3])
    U.deepStrictEqual(pipe([[2]], _.prepend([1])), [[1], [2]])
  })

  it('append', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    U.deepStrictEqual(pipe(as, _.append(4)), [1, 2, 3, 4])
    U.deepStrictEqual(pipe([[1]], _.append([2])), [[1], [2]])
  })

  it('head', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    U.deepStrictEqual(_.head(as), O.some(1))
    U.deepStrictEqual(_.head([]), O.none)
  })

  it('last', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    U.deepStrictEqual(_.last(as), O.some(3))
    U.deepStrictEqual(_.last([]), O.none)
  })

  it('tail', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    U.deepStrictEqual(_.tail(as), O.some([2, 3]))
    U.deepStrictEqual(_.tail([]), O.none)
  })

  it('takeLeft', () => {
    // _.empty
    U.strictEqual(_.takeLeft(0)(_.empty), _.empty)
    // empty
    const empty: ReadonlyArray<number> = []
    U.strictEqual(_.takeLeft(0)(empty), empty)
    const full: ReadonlyArray<number> = [1, 2]
    // non empty
    U.strictEqual(_.takeLeft(0)(full), _.empty)
    U.deepStrictEqual(_.takeLeft(1)(full), [1])
    // full
    U.strictEqual(_.takeLeft(2)(full), full)
    // out of bound
    U.strictEqual(_.takeLeft(1)(_.empty), _.empty)
    U.strictEqual(_.takeLeft(1)(empty), empty)
    U.strictEqual(_.takeLeft(3)(full), full)
    U.strictEqual(_.takeLeft(-1)(_.empty), _.empty)
    U.strictEqual(_.takeLeft(-1)(empty), empty)
    U.strictEqual(_.takeLeft(-1)(full), full)
  })

  it('takeRight', () => {
    // _.empty
    U.strictEqual(_.takeRight(0)(_.empty), _.empty)
    // empty
    const empty: ReadonlyArray<number> = []
    U.strictEqual(_.takeRight(0)(empty), empty)
    const full: ReadonlyArray<number> = [1, 2]
    // non empty
    U.strictEqual(_.takeRight(0)(full), _.empty)
    U.deepStrictEqual(_.takeRight(1)(full), [2])
    // full
    U.strictEqual(_.takeRight(2)(full), full)
    // out of bound
    U.strictEqual(_.takeRight(1)(_.empty), _.empty)
    U.strictEqual(_.takeRight(1)(empty), empty)
    U.strictEqual(_.takeRight(3)(full), full)
    U.strictEqual(_.takeRight(-1)(_.empty), _.empty)
    U.strictEqual(_.takeRight(-1)(empty), empty)
    U.strictEqual(_.takeRight(-1)(full), full)
  })

  it('spanLeft', () => {
    const f = _.spanLeft((n: number) => n % 2 === 1)
    const assertSpanLeft = (
      input: ReadonlyArray<number>,
      expectedInit: ReadonlyArray<number>,
      expectedRest: ReadonlyArray<number>
    ) => {
      const [init, rest] = f(input)
      U.strictEqual(init, expectedInit)
      U.strictEqual(rest, expectedRest)
    }
    U.deepStrictEqual(f([1, 3, 2, 4, 5]), [
      [1, 3],
      [2, 4, 5]
    ])
    const empty: ReadonlyArray<number> = []
    assertSpanLeft(empty, empty, _.empty)
    assertSpanLeft(_.empty, _.empty, _.empty)
    const inputAll: ReadonlyArray<number> = [1, 3]
    assertSpanLeft(inputAll, inputAll, _.empty)
    const inputNone: ReadonlyArray<number> = [2, 4]
    assertSpanLeft(inputNone, _.empty, inputNone)
  })

  it('takeLeftWhile', () => {
    const f = (n: number) => n % 2 === 0
    U.deepStrictEqual(_.takeLeftWhile(f)([2, 4, 3, 6]), [2, 4])
    const empty: ReadonlyArray<number> = []
    U.strictEqual(_.takeLeftWhile(f)(empty), empty)
    U.strictEqual(_.takeLeftWhile(f)(_.empty), _.empty)
    U.strictEqual(_.takeLeftWhile(f)([1, 2, 4]), _.empty)
    const input: ReadonlyArray<number> = [2, 4]
    U.strictEqual(_.takeLeftWhile(f)(input), input)
  })

  it('dropLeft', () => {
    // _.empty
    U.strictEqual(_.dropLeft(0)(_.empty), _.empty)
    // empty
    const empty: ReadonlyArray<number> = []
    U.strictEqual(_.dropLeft(0)(empty), empty)
    const full: ReadonlyArray<number> = [1, 2]
    // non empty
    U.strictEqual(_.dropLeft(0)(full), full)
    U.deepStrictEqual(_.dropLeft(1)(full), [2])
    // full
    U.strictEqual(_.dropLeft(2)(full), _.empty)
    // out of bound
    U.strictEqual(_.dropLeft(1)(_.empty), _.empty)
    U.strictEqual(_.dropLeft(1)(empty), empty)
    U.strictEqual(_.dropLeft(3)(full), _.empty)
    U.strictEqual(_.dropLeft(-1)(_.empty), _.empty)
    U.strictEqual(_.dropLeft(-1)(empty), empty)
    U.strictEqual(_.dropLeft(-1)(full), full)
  })

  it('dropRight', () => {
    // _.empty
    U.strictEqual(_.dropRight(0)(_.empty), _.empty)
    // empty
    const empty: ReadonlyArray<number> = []
    U.strictEqual(_.dropRight(0)(empty), empty)
    const full: ReadonlyArray<number> = [1, 2]
    // non empty
    U.strictEqual(_.dropRight(0)(full), full)
    U.deepStrictEqual(_.dropRight(1)(full), [1])
    // full
    U.strictEqual(_.dropRight(2)(full), _.empty)
    // out of bound
    U.strictEqual(_.dropRight(1)(_.empty), _.empty)
    U.strictEqual(_.dropRight(1)(empty), empty)
    U.strictEqual(_.dropRight(3)(full), _.empty)
    U.strictEqual(_.dropRight(-1)(_.empty), _.empty)
    U.strictEqual(_.dropRight(-1)(empty), empty)
    U.strictEqual(_.dropRight(-1)(full), full)
  })

  it('dropLeftWhile', () => {
    const f = _.dropLeftWhile((n: number) => n > 0)
    U.strictEqual(f(_.empty), _.empty)
    const empty: ReadonlyArray<number> = []
    U.strictEqual(f(empty), empty)
    U.strictEqual(f([1, 2]), _.empty)
    const x1: ReadonlyArray<number> = [-1, -2]
    U.strictEqual(f(x1), x1)
    const x2: ReadonlyArray<number> = [-1, 2]
    U.strictEqual(f(x2), x2)
    U.deepStrictEqual(f([1, -2, 3]), [-2, 3])
  })

  it('init', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    U.deepStrictEqual(_.init(as), O.some([1, 2]))
    U.deepStrictEqual(_.init([]), O.none)
  })

  it('findIndex', () => {
    U.deepStrictEqual(_.findIndex((x) => x === 2)([1, 2, 3]), O.some(1))
    U.deepStrictEqual(_.findIndex((x) => x === 2)([]), O.none)
  })

  it('findFirst', () => {
    U.deepStrictEqual(
      pipe(
        [],
        _.findFirst((x: { readonly a: number }) => x.a > 1)
      ),
      O.none
    )
    U.deepStrictEqual(
      pipe(
        [{ a: 1 }, { a: 2 }, { a: 3 }],
        _.findFirst((x) => x.a > 1)
      ),
      O.some({ a: 2 })
    )
    U.deepStrictEqual(
      pipe(
        [{ a: 1 }, { a: 2 }, { a: 3 }],
        _.findFirst((x) => x.a > 3)
      ),
      O.none
    )
  })

  it('findFirstMap', () => {
    U.deepStrictEqual(
      pipe(
        [1, 2, 3],
        _.findFirstMap((n) => (n > 1 ? O.some(n * 2) : O.none))
      ),
      O.some(4)
    )
    U.deepStrictEqual(
      pipe(
        [1],
        _.findFirstMap((n) => (n < 1 ? O.some(n * 2) : O.none))
      ),
      O.none
    )
  })

  it('findLast', () => {
    U.deepStrictEqual(
      pipe(
        [],
        _.findLast((x: { readonly a: number }) => x.a > 1)
      ),
      O.none
    )
    U.deepStrictEqual(
      pipe(
        [{ a: 1 }, { a: 2 }, { a: 3 }],
        _.findLast((x) => x.a > 1)
      ),
      O.some({ a: 3 })
    )
    U.deepStrictEqual(
      pipe(
        [{ a: 1 }, { a: 2 }, { a: 3 }],
        _.findLast((x) => x.a > 3)
      ),
      O.none
    )
  })

  it('findLastMap', () => {
    U.deepStrictEqual(
      pipe(
        [1, 2, 3],
        _.findLastMap((n) => (n > 1 ? O.some(n * 2) : O.none))
      ),
      O.some(6)
    )
    U.deepStrictEqual(
      pipe(
        [1],
        _.findLastMap((n) => (n > 1 ? O.some(n * 2) : O.none))
      ),
      O.none
    )
  })

  it('findLastIndex', () => {
    interface X {
      readonly a: number
      readonly b: number
    }
    const xs: ReadonlyArray<X> = [
      { a: 1, b: 0 },
      { a: 1, b: 1 }
    ]
    U.deepStrictEqual(_.findLastIndex((x: X) => x.a === 1)(xs), O.some(1))
    U.deepStrictEqual(_.findLastIndex((x: X) => x.a === 4)(xs), O.none)
    U.deepStrictEqual(_.findLastIndex((x: X) => x.a === 1)([]), O.none)
  })

  it('insertAt', () => {
    U.deepStrictEqual(pipe([], _.insertAt(1, 1)), O.none)
    U.deepStrictEqual(pipe([], _.insertAt(0, 1)), O.some([1] as const))
    U.deepStrictEqual(pipe([1, 2, 3, 4], _.insertAt(2, 5)), O.some([1, 2, 5, 3, 4] as const))
  })

  it('updateAt', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    U.deepStrictEqual(pipe(as, _.updateAt(1, 1)), O.some([1, 1, 3]))
    U.deepStrictEqual(pipe([], _.updateAt(1, 1)), O.none)
    const empty: ReadonlyArray<number> = []
    U.deepStrictEqual(pipe(_.empty, _.updateAt(1, 1)), O.none)
    U.deepStrictEqual(pipe(empty, _.updateAt(1, 1)), O.none)
    // should return the same reference if nothing changed
    U.deepStrictEqual(
      pipe(
        as,
        _.updateAt(1, 2),
        O.map((bs) => bs === as)
      ),
      O.some(true)
    )
  })

  it('deleteAt', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    U.deepStrictEqual(pipe(as, _.deleteAt(0)), O.some([2, 3]))
    U.deepStrictEqual(pipe(as, _.deleteAt(1)), O.some([1, 3]))
    U.deepStrictEqual(pipe(as, _.deleteAt(2)), O.some([1, 2]))
    U.deepStrictEqual(pipe(as, _.deleteAt(3)), O.none)
    U.deepStrictEqual(pipe([], _.deleteAt(1)), O.none)
  })

  it('modifyAt', () => {
    U.deepStrictEqual(_.modifyAt(1, U.double)([1, 2, 3]), O.some([1, 4, 3]))
    U.deepStrictEqual(_.modifyAt(1, U.double)([]), O.none)
    // should return the same reference if nothing changed
    const input: ReadonlyArray<number> = [1, 2, 3]
    U.deepStrictEqual(
      pipe(
        input,
        _.modifyAt(1, identity),
        O.map((out) => out === input)
      ),
      O.some(true)
    )
  })

  it('sort', () => {
    const O = pipe(
      N.Ord,
      Ord.contramap((x: { readonly a: number }) => x.a)
    )
    U.deepStrictEqual(
      pipe(
        [
          { a: 3, b: 'b1' },
          { a: 2, b: 'b2' },
          { a: 1, b: 'b3' }
        ],
        _.sort(O)
      ),
      [
        { a: 1, b: 'b3' },
        { a: 2, b: 'b2' },
        { a: 3, b: 'b1' }
      ]
    )
    U.strictEqual(_.sort(N.Ord)(_.empty), _.empty)
    const as: ReadonlyArray<number> = [1]
    U.strictEqual(_.sort(N.Ord)(as), as)
  })

  it('zipWith', () => {
    U.deepStrictEqual(
      pipe(
        [1, 2, 3],
        _.zipWith(['a', 'b', 'c', 'd'], (n, s) => s + n)
      ),
      ['a1', 'b2', 'c3']
    )
  })

  it('zip', () => {
    U.deepStrictEqual(pipe([1, 2, 3], _.zip(['a', 'b', 'c', 'd'])), [
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

  it('rights', () => {
    U.deepStrictEqual(_.rights([E.right(1), E.left('foo'), E.right(2)]), [1, 2])
    U.deepStrictEqual(_.rights([]), [])
  })

  it('lefts', () => {
    U.deepStrictEqual(_.lefts([E.right(1), E.left('foo'), E.right(2)]), ['foo'])
    U.deepStrictEqual(_.lefts([]), [])
  })

  it('flatten', () => {
    U.deepStrictEqual(_.flatten([[1], [2], [3]]), [1, 2, 3])
  })

  it('prependAll', () => {
    const empty: ReadonlyArray<number> = []
    U.strictEqual(_.prependAll(0)(empty), empty)
    U.strictEqual(_.prependAll(0)(_.empty), _.empty)
    U.deepStrictEqual(_.prependAll(0)([1, 2, 3]), [0, 1, 0, 2, 0, 3])
    U.deepStrictEqual(_.prependAll(0)([1]), [0, 1])
    U.deepStrictEqual(_.prependAll(0)([1, 2, 3, 4]), [0, 1, 0, 2, 0, 3, 0, 4])
  })

  it('intersperse', () => {
    const empty: ReadonlyArray<number> = []
    U.strictEqual(_.intersperse(0)(empty), empty)
    U.strictEqual(_.intersperse(0)(_.empty), _.empty)
    const singleton = [1]
    U.strictEqual(_.intersperse(0)(singleton), singleton)
    U.deepStrictEqual(_.intersperse(0)([1, 2, 3]), [1, 0, 2, 0, 3])
    U.deepStrictEqual(_.intersperse(0)([1, 2]), [1, 0, 2])
    U.deepStrictEqual(_.intersperse(0)([1, 2, 3, 4]), [1, 0, 2, 0, 3, 0, 4])
  })

  it('rotate', () => {
    U.strictEqual(_.rotate(0)(_.empty), _.empty)
    U.strictEqual(_.rotate(1)(_.empty), _.empty)

    const singleton: ReadonlyArray<number> = [1]
    U.strictEqual(_.rotate(1)(singleton), singleton)
    U.strictEqual(_.rotate(2)(singleton), singleton)
    U.strictEqual(_.rotate(-1)(singleton), singleton)
    U.strictEqual(_.rotate(-2)(singleton), singleton)
    const two: ReadonlyArray<number> = [1, 2]
    U.strictEqual(_.rotate(2)(two), two)
    U.strictEqual(_.rotate(0)(two), two)
    U.strictEqual(_.rotate(-2)(two), two)

    U.deepStrictEqual(_.rotate(1)([1, 2]), [2, 1])
    U.deepStrictEqual(_.rotate(1)([1, 2, 3, 4, 5]), [5, 1, 2, 3, 4])
    U.deepStrictEqual(_.rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
    U.deepStrictEqual(_.rotate(-1)([1, 2, 3, 4, 5]), [2, 3, 4, 5, 1])
    U.deepStrictEqual(_.rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])

    U.deepStrictEqual(_.rotate(7)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
    U.deepStrictEqual(_.rotate(-7)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])

    U.deepStrictEqual(_.rotate(2.2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
    U.deepStrictEqual(_.rotate(-2.2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
  })

  it('reverse', () => {
    const empty: ReadonlyArray<number> = []
    U.strictEqual(_.reverse(empty), empty)
    U.strictEqual(_.reverse(_.empty), _.empty)
    const singleton: ReadonlyArray<number> = [1]
    U.strictEqual(_.reverse(singleton), singleton)
    U.deepStrictEqual(_.reverse([1, 2, 3]), [3, 2, 1])
  })

  it('foldLeft', () => {
    const len: <A>(as: ReadonlyArray<A>) => number = _.matchLeft(
      () => 0,
      (_, tail) => 1 + len(tail)
    )
    U.deepStrictEqual(len([1, 2, 3]), 3)
  })

  it('foldRight', () => {
    const len: <A>(as: ReadonlyArray<A>) => number = _.matchRight(
      () => 0,
      (init, _) => 1 + len(init)
    )
    U.deepStrictEqual(len([1, 2, 3]), 3)
  })

  it('scanLeft', () => {
    const f = (b: number, a: number) => b - a
    U.deepStrictEqual(_.scanLeft(10, f)([1, 2, 3]), [10, 9, 7, 4])
    U.deepStrictEqual(_.scanLeft(10, f)([0]), [10, 10])
    U.deepStrictEqual(_.scanLeft(10, f)([]), [10])
  })

  it('scanRight', () => {
    const f = (b: number, a: number) => b - a
    U.deepStrictEqual(_.scanRight(10, f)([1, 2, 3]), [-8, 9, -7, 10])
    U.deepStrictEqual(_.scanRight(10, f)([0]), [-10, 10])
    U.deepStrictEqual(_.scanRight(10, f)([]), [10])
  })

  it('uniq', () => {
    interface A {
      readonly a: string
      readonly b: number
    }

    const eqA = pipe(
      N.Eq,
      Eq.contramap((f: A) => f.b)
    )
    const arrA: A = { a: 'a', b: 1 }
    const arrB: A = { a: 'b', b: 1 }
    const arrC: A = { a: 'c', b: 2 }
    const arrD: A = { a: 'd', b: 2 }
    const arrUniq: ReadonlyArray<A> = [arrA, arrC]

    U.deepStrictEqual(_.uniq(eqA)(arrUniq), arrUniq)
    U.deepStrictEqual(_.uniq(eqA)([arrA, arrB, arrC, arrD]), [arrA, arrC])
    U.deepStrictEqual(_.uniq(eqA)([arrB, arrA, arrC, arrD]), [arrB, arrC])
    U.deepStrictEqual(_.uniq(eqA)([arrA, arrA, arrC, arrD, arrA]), [arrA, arrC])
    U.deepStrictEqual(_.uniq(eqA)([arrA, arrC]), [arrA, arrC])
    U.deepStrictEqual(_.uniq(eqA)([arrC, arrA]), [arrC, arrA])
    U.deepStrictEqual(_.uniq(B.Eq)([true, false, true, false]), [true, false])
    U.deepStrictEqual(_.uniq(N.Eq)([-0, -0]), [-0])
    U.deepStrictEqual(_.uniq(N.Eq)([0, -0]), [0])
    U.deepStrictEqual(_.uniq(N.Eq)([1]), [1])
    U.deepStrictEqual(_.uniq(N.Eq)([2, 1, 2]), [2, 1])
    U.deepStrictEqual(_.uniq(N.Eq)([1, 2, 1]), [1, 2])
    U.deepStrictEqual(_.uniq(N.Eq)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    U.deepStrictEqual(_.uniq(N.Eq)([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]), [1, 2, 3, 4, 5])
    U.deepStrictEqual(_.uniq(N.Eq)([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    U.deepStrictEqual(_.uniq(S.Eq)(['a', 'b', 'a']), ['a', 'b'])
    U.deepStrictEqual(_.uniq(S.Eq)(['a', 'b', 'A']), ['a', 'b', 'A'])

    U.strictEqual(_.uniq(N.Eq)(_.empty), _.empty)
    const as: ReadonlyArray<number> = [1]
    U.strictEqual(_.uniq(N.Eq)(as), as)
  })

  it('sortBy', () => {
    interface X {
      readonly a: string
      readonly b: number
      readonly c: boolean
    }
    const byName = pipe(
      S.Ord,
      Ord.contramap((p: { readonly a: string; readonly b: number }) => p.a)
    )
    const byAge = pipe(
      N.Ord,
      Ord.contramap((p: { readonly a: string; readonly b: number }) => p.b)
    )
    const f = _.sortBy([byName, byAge])
    const xs: ReadonlyArray<X> = [
      { a: 'a', b: 1, c: true },
      { a: 'b', b: 3, c: true },
      { a: 'c', b: 2, c: true },
      { a: 'b', b: 2, c: true }
    ]
    U.deepStrictEqual(f(xs), [
      { a: 'a', b: 1, c: true },
      { a: 'b', b: 2, c: true },
      { a: 'b', b: 3, c: true },
      { a: 'c', b: 2, c: true }
    ])
    const sortByAgeByName = _.sortBy([byAge, byName])
    U.deepStrictEqual(sortByAgeByName(xs), [
      { a: 'a', b: 1, c: true },
      { a: 'b', b: 2, c: true },
      { a: 'c', b: 2, c: true },
      { a: 'b', b: 3, c: true }
    ])

    U.strictEqual(f(_.empty), _.empty)
    U.strictEqual(_.sortBy([])(xs), xs)
  })

  it('chop', () => {
    const f = _.chop<number, number>((as) => [as[0] * 2, as.slice(1)])
    const empty: ReadonlyArray<number> = []
    U.strictEqual(f(empty), _.empty)
    U.strictEqual(f(_.empty), _.empty)
    U.deepStrictEqual(f([1, 2, 3]), [2, 4, 6])
  })

  it('splitAt', () => {
    const assertSplitAt = (
      input: ReadonlyArray<number>,
      index: number,
      expectedInit: ReadonlyArray<number>,
      expectedRest: ReadonlyArray<number>
    ) => {
      const [init, rest] = _.splitAt(index)(input)
      U.strictEqual(init, expectedInit)
      U.strictEqual(rest, expectedRest)
    }
    U.deepStrictEqual(_.splitAt(1)([1, 2]), [[1], [2]])
    const two: ReadonlyArray<number> = [1, 2]
    assertSplitAt(two, 2, two, _.empty)
    U.deepStrictEqual(_.splitAt(2)([1, 2, 3, 4, 5]), [
      [1, 2],
      [3, 4, 5]
    ])
    // zero
    const empty: ReadonlyArray<number> = []
    assertSplitAt(_.empty, 0, _.empty, _.empty)
    assertSplitAt(empty, 0, empty, _.empty)
    assertSplitAt(two, 0, _.empty, two)
    // out of bounds
    assertSplitAt(_.empty, -1, _.empty, _.empty)
    assertSplitAt(empty, -1, empty, _.empty)
    assertSplitAt(two, -1, _.empty, two)
    assertSplitAt(two, 3, two, _.empty)
    assertSplitAt(_.empty, 3, _.empty, _.empty)
    assertSplitAt(empty, 3, empty, _.empty)
  })

  describe('chunksOf', () => {
    it('should split a `ReadonlyArray` into length-n pieces', () => {
      U.deepStrictEqual(_.chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
      U.deepStrictEqual(_.chunksOf(2)([1, 2, 3, 4, 5, 6]), [
        [1, 2],
        [3, 4],
        [5, 6]
      ])
      U.deepStrictEqual(_.chunksOf(1)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])
      U.deepStrictEqual(_.chunksOf(5)([1, 2, 3, 4, 5]), [[1, 2, 3, 4, 5]])
      // out of bounds
      U.deepStrictEqual(_.chunksOf(0)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])
      U.deepStrictEqual(_.chunksOf(-1)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])

      const assertSingleChunk = (input: ReadonlyArray<number>, n: number) => {
        const chunks = _.chunksOf(n)(input)
        U.strictEqual(chunks.length, 1)
        U.strictEqual(chunks[0], input)
      }
      // n = length
      assertSingleChunk([1, 2], 2)
      // n out of bounds
      assertSingleChunk([1, 2], 3)
    })

    // #897
    it('returns an empty array if provided an empty array', () => {
      const empty: ReadonlyArray<number> = []
      U.strictEqual(_.chunksOf(0)(empty), _.empty)
      U.strictEqual(_.chunksOf(0)(_.empty), _.empty)
      U.strictEqual(_.chunksOf(1)(empty), _.empty)
      U.strictEqual(_.chunksOf(1)(_.empty), _.empty)
      U.strictEqual(_.chunksOf(2)(empty), _.empty)
      U.strictEqual(_.chunksOf(2)(_.empty), _.empty)
    })

    // #897
    it('should respect the law: chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))', () => {
      const xs: ReadonlyArray<number> = []
      const ys: ReadonlyArray<number> = [1, 2]
      U.deepStrictEqual(_.chunksOf(2)(xs).concat(_.chunksOf(2)(ys)), _.chunksOf(2)(xs.concat(ys)))
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
    const f = _.makeBy(U.double)
    U.deepStrictEqual(pipe(5, f), [0, 2, 4, 6, 8])
    U.strictEqual(pipe(0, f), _.empty)
    U.strictEqual(pipe(-1, f), _.empty)
    U.deepStrictEqual(pipe(2.2, f), [0, 2])
  })

  it('replicate', () => {
    const f = _.replicate('a')
    U.strictEqual(pipe(0, f), _.empty)
    U.deepStrictEqual(pipe(3, f), ['a', 'a', 'a'])
    U.strictEqual(pipe(-1, f), _.empty)
    U.deepStrictEqual(pipe(2.2, f), ['a', 'a'])
  })

  it('comprehension', () => {
    U.deepStrictEqual(
      _.comprehension([[1, 2, 3]], (a) => a * 2),
      [2, 4, 6]
    )
    U.deepStrictEqual(
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
    U.deepStrictEqual(
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

  it('getUnionMonoid', () => {
    const M = _.getUnionMonoid(N.Eq)
    const two: ReadonlyArray<number> = [1, 2]
    U.deepStrictEqual(pipe(two, M.concat([3, 4])), [1, 2, 3, 4])
    U.deepStrictEqual(pipe(two, M.concat([2, 3])), [1, 2, 3])
    U.deepStrictEqual(pipe(two, M.concat([1, 2])), [1, 2])
    U.strictEqual(pipe(two, M.concat(M.empty)), two)
    U.strictEqual(pipe(M.empty, M.concat(two)), two)
    U.strictEqual(pipe(M.empty, M.concat(M.empty)), M.empty)
  })

  it('getIntersectionSemigroup', () => {
    const S = _.getIntersectionSemigroup(N.Eq)
    U.deepStrictEqual(pipe([1, 2], S.concat([3, 4])), [])
    U.deepStrictEqual(pipe([1, 2], S.concat([2, 3])), [2])
    U.deepStrictEqual(pipe([1, 2], S.concat([1, 2])), [1, 2])
  })

  it('getDifferenceMagma', () => {
    const M = _.getDifferenceMagma(N.Eq)
    U.deepStrictEqual(pipe([1, 2], M.concat([3, 4])), [1, 2])
    U.deepStrictEqual(pipe([1, 2], M.concat([2, 3])), [1])
    U.deepStrictEqual(pipe([1, 2], M.concat([1, 2])), [])
    // is not a semigroup -> Counterexample: [[1],[],[1]]
  })

  it('should be safe when calling map with a binary function', () => {
    interface Foo {
      readonly bar: () => number
    }
    const f = (a: number, x?: Foo) => (x !== undefined ? `${a}${x.bar()}` : `${a}`)
    U.deepStrictEqual(pipe([1, 2], _.map(f)), ['1', '2'])
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    U.deepStrictEqual(Sh.show([]), `[]`)
    U.deepStrictEqual(Sh.show(['a']), `["a"]`)
    U.deepStrictEqual(Sh.show(['a', 'b']), `["a", "b"]`)
  })

  it('empty', () => {
    U.deepStrictEqual(_.empty.length, 0)
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

  it('apT', () => {
    U.deepStrictEqual(pipe(_.of(1), _.tupled, _.apT(_.of('b'))), [[1, 'b']])
  })

  it('every', () => {
    const isPositive: Predicate<number> = (n) => n > 0
    U.deepStrictEqual(pipe([1, 2, 3], _.every(isPositive)), true)
    U.deepStrictEqual(pipe([1, 2, -3], _.every(isPositive)), false)
  })

  it('some', () => {
    const isPositive: Predicate<number> = (n) => n > 0
    U.deepStrictEqual(pipe([-1, -2, 3], _.some(isPositive)), true)
    U.deepStrictEqual(pipe([-1, -2, -3], _.some(isPositive)), false)
  })

  it('size', () => {
    U.deepStrictEqual(_.size(_.empty), 0)
    U.deepStrictEqual(_.size([]), 0)
    U.deepStrictEqual(_.size(['a']), 1)
  })

  it('fromEither', () => {
    U.deepStrictEqual(_.fromEither(E.right(1)), [1])
    U.strictEqual(_.fromEither(E.left('a')), _.empty)
  })

  it('match', () => {
    const f = _.match(
      () => 'empty',
      (as) => `nonEmpty ${as.length}`
    )
    U.deepStrictEqual(pipe(_.empty, f), 'empty')
    U.deepStrictEqual(pipe([1, 2, 3], f), 'nonEmpty 3')
  })

  it('fromOption', () => {
    U.strictEqual(_.fromOption(O.none), _.empty)
    U.deepStrictEqual(_.fromOption(O.some(1)), [1])
  })

  it('fromOptionK', () => {
    const f = (n: number) => (n > 0 ? O.some(n) : O.none)
    const g = _.fromOptionK(f)
    U.strictEqual(g(0), _.empty)
    U.deepStrictEqual(g(1), [1])
  })

  it('concatW', () => {
    U.deepStrictEqual(pipe([1], _.concatW(['a'])), [1, 'a'])
    const as = [1, 2, 3]
    U.strictEqual(pipe(_.empty, _.concatW(as)), as)
    U.strictEqual(pipe(as, _.concatW(_.empty)), as)
    const empty: ReadonlyArray<string> = []
    U.strictEqual(pipe(empty, _.concatW(as)), as)
    U.strictEqual(pipe(as, _.concatW(empty)), as)
  })

  it('filterE', async () => {
    const f = (n: number) => T.of(n % 2 === 0)
    U.deepStrictEqual(await pipe([1, 2], _.filterE(T.ApplicativePar)(f))(), [2])
  })

  describe('ChainRec', () => {
    it('chainRecDepthFirst', () => {
      const chainRec = _.chainRecDepthFirst
      U.deepStrictEqual(
        pipe(
          1,
          chainRec(() => [])
        ),
        []
      )
      U.deepStrictEqual(
        pipe(
          1,
          chainRec(() => [E.right('a')])
        ),
        ['a']
      )
      U.deepStrictEqual(
        pipe(
          1,
          chainRec((a) => {
            if (a < 5) {
              return [E.right(a), E.left(a + 1)]
            } else {
              return [E.right(a)]
            }
          })
        ),
        [1, 2, 3, 4, 5]
      )
      U.deepStrictEqual(
        pipe(
          1,
          chainRec((a) => {
            if (a < 5) {
              return [E.left(a + 1), E.right(a)]
            } else {
              return [E.right(a)]
            }
          })
        ),
        [5, 4, 3, 2, 1]
      )
      U.deepStrictEqual(
        pipe(
          1,
          chainRec((a) => {
            if (a < 5) {
              return a % 2 === 0 ? [E.right(a), E.left(a + 1)] : [E.left(a + 1), E.right(a)]
            } else {
              return [E.right(a)]
            }
          })
        ),
        [2, 4, 5, 3, 1]
      )
      U.deepStrictEqual(
        pipe(
          0,
          chainRec((a) => {
            if (a === 0) {
              return [E.right(a), E.left(a - 1), E.left(a + 1)]
            } else if (0 < a && a < 5) {
              return [E.right(a), E.left(a + 1)]
            } else if (-5 < a && a < 0) {
              return [E.right(a), E.left(a - 1)]
            } else {
              return [E.right(a)]
            }
          })
        ),
        [0, -1, -2, -3, -4, -5, 1, 2, 3, 4, 5]
      )
      U.deepStrictEqual(
        pipe(
          0,
          chainRec((a) => {
            if (a === 0) {
              return [E.left(a - 1), E.right(a), E.left(a + 1)]
            } else if (0 < a && a < 5) {
              return [E.right(a), E.left(a + 1)]
            } else if (-5 < a && a < 0) {
              return [E.left(a - 1), E.right(a)]
            } else {
              return [E.right(a)]
            }
          })
        ),
        [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
      )
    })

    it('chainRecBreadthFirst', () => {
      const chainRec = _.chainRecBreadthFirst
      U.deepStrictEqual(
        pipe(
          1,
          chainRec(() => [])
        ),
        []
      )
      U.deepStrictEqual(
        pipe(
          1,
          chainRec(() => [E.right('a')])
        ),
        ['a']
      )
      U.deepStrictEqual(
        pipe(
          1,
          chainRec((a) => {
            if (a < 5) {
              return [E.right(a), E.left(a + 1)]
            } else {
              return [E.right(a)]
            }
          })
        ),
        [1, 2, 3, 4, 5]
      )
      U.deepStrictEqual(
        pipe(
          1,
          chainRec((a) => {
            if (a < 5) {
              return [E.left(a + 1), E.right(a)]
            } else {
              return [E.right(a)]
            }
          })
        ),
        [1, 2, 3, 4, 5]
      )
      U.deepStrictEqual(
        pipe(
          1,
          chainRec((a) => {
            if (a < 5) {
              return a % 2 === 0 ? [E.right(a), E.left(a + 1)] : [E.left(a + 1), E.right(a)]
            } else {
              return [E.right(a)]
            }
          })
        ),
        [1, 2, 3, 4, 5]
      )
      U.deepStrictEqual(
        pipe(
          0,
          chainRec((a) => {
            if (a === 0) {
              return [E.right(a), E.left(a - 1), E.left(a + 1)]
            } else if (0 < a && a < 5) {
              return [E.right(a), E.left(a + 1)]
            } else if (-5 < a && a < 0) {
              return [E.right(a), E.left(a - 1)]
            } else {
              return [E.right(a)]
            }
          })
        ),
        [0, -1, 1, -2, 2, -3, 3, -4, 4, -5, 5]
      )
      U.deepStrictEqual(
        pipe(
          0,
          chainRec((a) => {
            if (a === 0) {
              return [E.left(a - 1), E.right(a), E.left(a + 1)]
            } else if (0 < a && a < 5) {
              return [E.right(a), E.left(a + 1)]
            } else if (-5 < a && a < 0) {
              return [E.left(a - 1), E.right(a)]
            } else {
              return [E.right(a)]
            }
          })
        ),
        [0, -1, 1, -2, 2, -3, 3, -4, 4, -5, 5]
      )
    })
  })
})
