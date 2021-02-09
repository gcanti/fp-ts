import * as assert from 'assert'
import * as fc from 'fast-check'
import { isDeepStrictEqual } from 'util'
import * as B from '../src/boolean'
import * as E from '../src/Either'
import * as Eq from '../src/Eq'
import { identity, pipe, Predicate, tuple } from '../src/function'
import * as M from '../src/Monoid'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as Ord from '../src/Ord'
import * as _ from '../src/ReadonlyArray'
import { separated } from '../src/Separated'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as U from './util'

describe('ReadonlyArray', () => {
  describe('pipeables', () => {
    it('traverse', () => {
      const traverse = _.traverse(O.Applicative)((n: number): O.Option<number> => (n % 2 === 0 ? O.none : O.some(n)))
      U.deepStrictEqual(traverse([1, 2]), O.none)
      U.deepStrictEqual(traverse([1, 3]), O.some([1, 3]))
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      U.deepStrictEqual(sequence([O.some(1), O.some(3)]), O.some([1, 3]))
      U.deepStrictEqual(sequence([O.some(1), O.none]), O.none)
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
      U.deepStrictEqual(_.lookup(0, [1, 2, 3]), O.some(1))
      U.deepStrictEqual(_.lookup(3, [1, 2, 3]), O.none)
      U.deepStrictEqual(pipe([1, 2, 3], _.lookup(0)), O.some(1))
      U.deepStrictEqual(pipe([1, 2, 3], _.lookup(3)), O.none)
    })

    it('elem', () => {
      U.deepStrictEqual(_.elem(N.Eq)(2, [1, 2, 3]), true)
      U.deepStrictEqual(_.elem(N.Eq)(0, [1, 2, 3]), false)
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
      U.deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.map((n) => n * 2)
        ),
        [2, 4, 6]
      )
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
      U.deepStrictEqual(
        pipe(
          [1, 2],
          _.alt(() => [3, 4])
        ),
        [1, 2, 3, 4]
      )
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
      U.deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.chainWithIndex((i, n) => [n + i])
        ),
        [1, 3, 5]
      )
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
      const sum = (as: ReadonlyArray<number>) => M.fold(N.MonoidSum)(as)
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
      const x = pipe([O.some(3), O.some(2), O.some(1)], _.filter(O.isSome))
      assert.deepStrictEqual(x, [O.some(3), O.some(2), O.some(1)])
      const y = pipe([O.some(3), O.none, O.some(1)], _.filter(O.isSome))
      assert.deepStrictEqual(y, [O.some(3), O.some(1)])
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
    U.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
    U.deepStrictEqual(M.concat([1, 2], M.empty), [1, 2])
    U.deepStrictEqual(M.concat(M.empty, [1, 2]), [1, 2])
  })

  it('getEq', () => {
    const O = _.getEq(S.Ord)
    U.deepStrictEqual(O.equals([], []), true)
    U.deepStrictEqual(O.equals(['a'], ['a']), true)
    U.deepStrictEqual(O.equals(['a', 'b'], ['a', 'b']), true)
    U.deepStrictEqual(O.equals(['a'], []), false)
    U.deepStrictEqual(O.equals([], ['a']), false)
    U.deepStrictEqual(O.equals(['a'], ['b']), false)
    U.deepStrictEqual(O.equals(['a', 'b'], ['b', 'a']), false)
    U.deepStrictEqual(O.equals(['a', 'a'], ['a']), false)
  })

  it('getOrd', () => {
    const O = _.getOrd(S.Ord)
    U.deepStrictEqual(O.compare([], []), 0)
    U.deepStrictEqual(O.compare(['a'], ['a']), 0)

    U.deepStrictEqual(O.compare(['b'], ['a']), 1)
    U.deepStrictEqual(O.compare(['a'], ['b']), -1)

    U.deepStrictEqual(O.compare(['a'], []), 1)
    U.deepStrictEqual(O.compare([], ['a']), -1)
    U.deepStrictEqual(O.compare(['a', 'a'], ['a']), 1)
    U.deepStrictEqual(O.compare(['a', 'a'], ['b']), -1)

    U.deepStrictEqual(O.compare(['a', 'a'], ['a', 'a']), 0)
    U.deepStrictEqual(O.compare(['a', 'b'], ['a', 'b']), 0)

    U.deepStrictEqual(O.compare(['a', 'a'], ['a', 'b']), -1)
    U.deepStrictEqual(O.compare(['a', 'b'], ['a', 'a']), 1)

    U.deepStrictEqual(O.compare(['a', 'b'], ['b', 'a']), -1)
    U.deepStrictEqual(O.compare(['b', 'a'], ['a', 'a']), 1)
    U.deepStrictEqual(O.compare(['b', 'a'], ['a', 'b']), 1)
    U.deepStrictEqual(O.compare(['b', 'b'], ['b', 'a']), 1)
    U.deepStrictEqual(O.compare(['b', 'a'], ['b', 'b']), -1)
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

  it('cons', () => {
    U.deepStrictEqual(_.cons(0, [1, 2, 3]), [0, 1, 2, 3])
    U.deepStrictEqual(_.cons([1], [[2]]), [[1], [2]])
    U.deepStrictEqual(pipe([1, 2, 3], _.cons(0)), [0, 1, 2, 3])
    U.deepStrictEqual(pipe([[2]], _.cons([1])), [[1], [2]])
  })

  it('snoc', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    U.deepStrictEqual(_.snoc(as, 4), [1, 2, 3, 4])
    U.deepStrictEqual(_.snoc([[1]], [2]), [[1], [2]])
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
    U.deepStrictEqual(_.takeLeft(2)([]), [])
    U.deepStrictEqual(_.takeLeft(2)([1, 2, 3]), [1, 2])
    U.deepStrictEqual(_.takeLeft(0)([1, 2, 3]), [])
  })

  it('takeRight', () => {
    U.deepStrictEqual(_.takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
    U.deepStrictEqual(_.takeRight(0)([1, 2, 3, 4, 5]), [])
    U.deepStrictEqual(_.takeRight(2)([]), [])
    U.deepStrictEqual(_.takeRight(5)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    U.deepStrictEqual(_.takeRight(10)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
  })

  it('spanLeft', () => {
    U.deepStrictEqual(_.spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })
  })

  it('takeLeftWhile', () => {
    const f = (n: number) => n % 2 === 0
    U.deepStrictEqual(_.takeLeftWhile(f)([2, 4, 3, 6]), [2, 4])
    U.deepStrictEqual(_.takeLeftWhile(f)([]), [])
    U.deepStrictEqual(_.takeLeftWhile(f)([1, 2, 4]), [])
    U.deepStrictEqual(_.takeLeftWhile(f)([2, 4]), [2, 4])
  })

  it('dropLeft', () => {
    U.deepStrictEqual(_.dropLeft(2)([1, 2, 3]), [3])
    U.deepStrictEqual(_.dropLeft(10)([1, 2, 3]), [])
    U.deepStrictEqual(_.dropLeft(0)([1, 2, 3]), [1, 2, 3])
  })

  it('dropRight', () => {
    U.deepStrictEqual(_.dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
    U.deepStrictEqual(_.dropRight(10)([1, 2, 3, 4, 5]), [])
    U.deepStrictEqual(_.dropRight(0)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
  })

  it('dropLeftWhile', () => {
    const f = (n: number) => n % 2 === 0
    const g = (n: number) => n % 2 === 1
    U.deepStrictEqual(_.dropLeftWhile(f)([1, 3, 2, 4, 5]), [1, 3, 2, 4, 5])
    U.deepStrictEqual(_.dropLeftWhile(g)([1, 3, 2, 4, 5]), [2, 4, 5])
    U.deepStrictEqual(_.dropLeftWhile(f)([]), [])
    U.deepStrictEqual(_.dropLeftWhile(f)([2, 4, 1]), [1])
    U.deepStrictEqual(_.dropLeftWhile(f)([2, 4]), [])
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
    U.deepStrictEqual(_.insertAt(1, 1)([]), O.none)
    U.deepStrictEqual(_.insertAt(0, 1)([]), O.some([1]))
    U.deepStrictEqual(_.insertAt(2, 5)([1, 2, 3, 4]), O.some([1, 2, 5, 3, 4]))
  })

  it('unsafeUpdateAt', () => {
    // should return the same reference if nothing changed
    const x = { a: 1 }
    const as: ReadonlyArray<{ readonly a: number }> = [x]
    const result = _.unsafeUpdateAt(0, x, as)
    U.deepStrictEqual(result, as)
  })

  it('updateAt', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    U.deepStrictEqual(_.updateAt(1, 1)(as), O.some([1, 1, 3]))
    U.deepStrictEqual(_.updateAt(1, 1)([]), O.none)
  })

  it('deleteAt', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    U.deepStrictEqual(_.deleteAt(0)(as), O.some([2, 3]))
    U.deepStrictEqual(_.deleteAt(1)([]), O.none)
  })

  it('modifyAt', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    const double = (x: number): number => x * 2
    U.deepStrictEqual(_.modifyAt(1, double)(as), O.some([1, 4, 3]))
    U.deepStrictEqual(_.modifyAt(1, double)([]), O.none)
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
    assert.strictEqual(_.sort(N.Ord)(_.empty), _.empty)
    const as: ReadonlyArray<number> = [1]
    assert.strictEqual(_.sort(N.Ord)(as), as)
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

  it('prependToAll', () => {
    U.deepStrictEqual(_.prependToAll(0)([1, 2, 3]), [0, 1, 0, 2, 0, 3])
    U.deepStrictEqual(_.prependToAll(0)([]), [])
    U.deepStrictEqual(_.prependToAll(0)([1]), [0, 1])
    U.deepStrictEqual(_.prependToAll(0)([1, 2, 3, 4]), [0, 1, 0, 2, 0, 3, 0, 4])
  })

  it('intersperse', () => {
    U.deepStrictEqual(_.intersperse(0)([1, 2, 3]), [1, 0, 2, 0, 3])
    U.deepStrictEqual(_.intersperse(0)([]), [])
    U.deepStrictEqual(_.intersperse(0)([1]), [1])
    U.deepStrictEqual(_.intersperse(0)([1, 2]), [1, 0, 2])
    U.deepStrictEqual(_.intersperse(0)([1, 2, 3, 4]), [1, 0, 2, 0, 3, 0, 4])
  })

  it('rotate', () => {
    U.deepStrictEqual(_.rotate(1)([]), [])
    U.deepStrictEqual(_.rotate(1)([1]), [1])
    U.deepStrictEqual(_.rotate(1)([1, 2]), [2, 1])
    U.deepStrictEqual(_.rotate(2)([1, 2]), [1, 2])
    U.deepStrictEqual(_.rotate(0)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    U.deepStrictEqual(_.rotate(1)([1, 2, 3, 4, 5]), [5, 1, 2, 3, 4])
    U.deepStrictEqual(_.rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
    U.deepStrictEqual(_.rotate(-1)([1, 2, 3, 4, 5]), [2, 3, 4, 5, 1])
    U.deepStrictEqual(_.rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
  })

  it('reverse', () => {
    U.deepStrictEqual(_.reverse([1, 2, 3]), [3, 2, 1])
    assert.strictEqual(_.reverse(_.empty), _.empty)
  })

  it('foldLeft', () => {
    const len: <A>(as: ReadonlyArray<A>) => number = _.foldLeft(
      () => 0,
      (_, tail) => 1 + len(tail)
    )
    U.deepStrictEqual(len([1, 2, 3]), 3)
  })

  it('foldRight', () => {
    const len: <A>(as: ReadonlyArray<A>) => number = _.foldRight(
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
      N.Ord,
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

    assert.strictEqual(_.uniq(N.Eq)(_.empty), _.empty)
    const as: ReadonlyArray<number> = [1]
    assert.strictEqual(_.uniq(N.Ord)(as), as)
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

    U.deepStrictEqual(_.sortBy([])(xs), xs)
  })

  it('chop', () => {
    const group = <A>(E: Eq.Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
      return _.chop((as) => {
        const { init, rest } = _.spanLeft((a: A) => E.equals(a, as[0]))(as)
        return [init, rest]
      })
    }
    U.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
  })

  it('splitAt', () => {
    U.deepStrictEqual(_.splitAt(2)([1, 2, 3, 4, 5]), [
      [1, 2],
      [3, 4, 5]
    ])
    U.deepStrictEqual(_.splitAt(2)([]), [[], []])
    U.deepStrictEqual(_.splitAt(2)([1]), [[1], []])
    U.deepStrictEqual(_.splitAt(2)([1, 2]), [[1, 2], []])
    U.deepStrictEqual(_.splitAt(-1)([1, 2]), [[1], [2]])
    U.deepStrictEqual(_.splitAt(0)([1, 2]), [[], [1, 2]])
    U.deepStrictEqual(_.splitAt(3)([1, 2]), [[1, 2], []])
  })

  describe('chunksOf', () => {
    it('should split an array into length-n pieces', () => {
      U.deepStrictEqual(_.chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
      U.deepStrictEqual(_.chunksOf(2)([1, 2, 3, 4, 5, 6]), [
        [1, 2],
        [3, 4],
        [5, 6]
      ])
      U.deepStrictEqual(_.chunksOf(5)([1, 2, 3, 4, 5]), [[1, 2, 3, 4, 5]])
      U.deepStrictEqual(_.chunksOf(6)([1, 2, 3, 4, 5]), [[1, 2, 3, 4, 5]])
      U.deepStrictEqual(_.chunksOf(1)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])
      U.deepStrictEqual(_.chunksOf(0)([1, 2]), [[1, 2]])
      U.deepStrictEqual(_.chunksOf(10)([1, 2]), [[1, 2]])
      U.deepStrictEqual(_.chunksOf(-1)([1, 2]), [[1, 2]])
    })

    // #897
    it('returns an empty array if provided an empty array', () => {
      U.deepStrictEqual(_.chunksOf(1)([]), [])
      U.deepStrictEqual(_.chunksOf(2)([]), [])
      U.deepStrictEqual(_.chunksOf(0)([]), [])
    })

    // #897
    it('should respect the law: RA.chunksOf(n)(xs).concat(RA.chunksOf(n)(ys)) == RA.chunksOf(n)(xs.concat(ys)))', () => {
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
    const double = (n: number): number => n * 2
    U.deepStrictEqual(_.makeBy(5, double), [0, 2, 4, 6, 8])
  })

  it('range', () => {
    U.deepStrictEqual(_.range(0, 0), [0])
    U.deepStrictEqual(_.range(1, 5), [1, 2, 3, 4, 5])
    U.deepStrictEqual(_.range(10, 15), [10, 11, 12, 13, 14, 15])
  })

  it('replicate', () => {
    U.deepStrictEqual(_.replicate(0, 'a'), [])
    U.deepStrictEqual(_.replicate(3, 'a'), ['a', 'a', 'a'])
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

  it('union', () => {
    U.deepStrictEqual(_.union(N.Eq)([1, 2], [3, 4]), [1, 2, 3, 4])
    U.deepStrictEqual(_.union(N.Eq)([1, 2], [2, 3]), [1, 2, 3])
    U.deepStrictEqual(_.union(N.Eq)([1, 2], [1, 2]), [1, 2])
    U.deepStrictEqual(pipe([1, 2], _.union(N.Eq)([3, 4])), [1, 2, 3, 4])
    U.deepStrictEqual(pipe([1, 2], _.union(N.Eq)([2, 3])), [1, 2, 3])
    U.deepStrictEqual(pipe([1, 2], _.union(N.Eq)([1, 2])), [1, 2])
  })

  it('intersection', () => {
    U.deepStrictEqual(_.intersection(N.Eq)([1, 2], [3, 4]), [])
    U.deepStrictEqual(_.intersection(N.Eq)([1, 2], [2, 3]), [2])
    U.deepStrictEqual(_.intersection(N.Eq)([1, 2], [1, 2]), [1, 2])
    U.deepStrictEqual(pipe([1, 2], _.intersection(N.Eq)([3, 4])), [])
    U.deepStrictEqual(pipe([1, 2], _.intersection(N.Eq)([2, 3])), [2])
    U.deepStrictEqual(pipe([1, 2], _.intersection(N.Eq)([1, 2])), [1, 2])
  })

  it('difference', () => {
    U.deepStrictEqual(_.difference(N.Eq)([1, 2], [3, 4]), [1, 2])
    U.deepStrictEqual(_.difference(N.Eq)([1, 2], [2, 3]), [1])
    U.deepStrictEqual(_.difference(N.Eq)([1, 2], [1, 2]), [])
    U.deepStrictEqual(pipe([1, 2], _.difference(N.Eq)([3, 4])), [1, 2])
    U.deepStrictEqual(pipe([1, 2], _.difference(N.Eq)([2, 3])), [1])
    U.deepStrictEqual(pipe([1, 2], _.difference(N.Eq)([1, 2])), [])
  })

  it('should be safe when calling map with a binary function', () => {
    interface Foo {
      readonly bar: () => number
    }
    const f = (a: number, x?: Foo) => (x !== undefined ? `${a}${x.bar()}` : `${a}`)
    U.deepStrictEqual(_.Functor.map([1, 2], f), ['1', '2'])
    U.deepStrictEqual(pipe([1, 2], _.map(f)), ['1', '2'])
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    U.deepStrictEqual(Sh.show([]), `[]`)
    U.deepStrictEqual(Sh.show(['a']), `["a"]`)
    U.deepStrictEqual(Sh.show(['a', 'b']), `["a", "b"]`)
  })

  it('fromArray', () => {
    assert.strictEqual(_.fromArray([]), _.empty)
    // tslint:disable-next-line: readonly-array
    const as = [1, 2, 3]
    const bs = _.fromArray(as)
    U.deepStrictEqual(bs, as)
    assert.notStrictEqual(bs, as)
  })

  it('toArray', () => {
    U.deepStrictEqual(_.toArray(_.empty), [])
    assert.notStrictEqual(_.toArray(_.empty), _.empty)
    // tslint:disable-next-line: readonly-array
    const as = [1, 2, 3]
    const bs = _.toArray(as)
    U.deepStrictEqual(bs, as)
    assert.notStrictEqual(bs, as)
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
})
