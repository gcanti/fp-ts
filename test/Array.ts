import * as fc from 'fast-check'
import { isDeepStrictEqual } from 'util'
import * as _ from '../src/Array'
import * as B from '../src/boolean'
import * as E from '../src/Either'
import * as Eq from '../src/Eq'
import { identity, pipe, tuple } from '../src/function'
import * as M from '../src/Monoid'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as Ord from '../src/Ord'
import { Predicate } from '../src/Predicate'
import { Refinement } from '../src/Refinement'
import { separated } from '../src/Separated'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as U from './util'

/* tslint:disable:readonly-array */

describe('Array', () => {
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
  })

  describe('pipeables', () => {
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
      const f = _.chainWithIndex((i, n: number) => [n + i])
      U.deepStrictEqual(pipe([1, 2, 3], f), [1, 3, 5])
      U.deepStrictEqual(pipe([], f), [])
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
      const sum = (as: Array<number>) => M.concatAll(N.MonoidSum)(as)
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
      U.deepStrictEqual(x, [O.some(3), O.some(2), O.some(1)])
      const y = pipe([O.some(3), O.none, O.some(1)], _.filter(O.isSome))
      U.deepStrictEqual(y, [O.some(3), O.some(1)])
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
      const as: Array<string> = ['a', 'b', 'c']
      const b = ''
      const f = (a: string, acc: string) => acc + a
      U.deepStrictEqual(pipe(as, _.reduceRight(b, f)), 'cba')
      const x2: Array<string> = []
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
    const as: Array<number> = [1, 2, 3]
    U.deepStrictEqual(_.isEmpty(as), false)
    U.deepStrictEqual(_.isEmpty([]), true)
  })

  it('isNotEmpty', () => {
    const as: Array<number> = [1, 2, 3]
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
    const as: Array<number> = [1, 2, 3]
    U.deepStrictEqual(_.snoc(as, 4), [1, 2, 3, 4])
    U.deepStrictEqual(_.snoc([[1]], [2]), [[1], [2]])
  })

  it('head', () => {
    const as: Array<number> = [1, 2, 3]
    U.deepStrictEqual(_.head(as), O.some(1))
    U.deepStrictEqual(_.head([]), O.none)
  })

  it('last', () => {
    const as: Array<number> = [1, 2, 3]
    U.deepStrictEqual(_.last(as), O.some(3))
    U.deepStrictEqual(_.last([]), O.none)
  })

  it('tail', () => {
    const as: Array<number> = [1, 2, 3]
    U.deepStrictEqual(_.tail(as), O.some([2, 3]))
    U.deepStrictEqual(_.tail([]), O.none)
  })

  it('takeLeft', () => {
    // empty
    const empty: Array<number> = []
    U.deepStrictEqual(_.takeLeft(0)(empty), empty)
    const full: Array<number> = [1, 2]
    // non empty
    U.deepStrictEqual(_.takeLeft(0)(full), [])
    U.deepStrictEqual(_.takeLeft(1)(full), [1])
    // full
    U.deepStrictEqual(_.takeLeft(2)(full), full)
    // out of bound
    U.deepStrictEqual(_.takeLeft(1)(empty), empty)
    U.deepStrictEqual(_.takeLeft(3)(full), full)
    U.deepStrictEqual(_.takeLeft(-1)(empty), empty)
    U.deepStrictEqual(_.takeLeft(-1)(full), full)
  })

  it('takeRight', () => {
    // empty
    const empty: Array<number> = []
    U.deepStrictEqual(_.takeRight(0)(empty), empty)
    const full: Array<number> = [1, 2]
    // non empty
    U.deepStrictEqual(_.takeRight(0)(full), [])
    U.deepStrictEqual(_.takeRight(1)(full), [2])
    // full
    U.deepStrictEqual(_.takeRight(2)(full), full)
    // out of bound
    U.deepStrictEqual(_.takeRight(1)(empty), empty)
    U.deepStrictEqual(_.takeRight(3)(full), full)
    U.deepStrictEqual(_.takeRight(-1)(empty), empty)
    U.deepStrictEqual(_.takeRight(-1)(full), full)
  })

  it('spanLeft', () => {
    const f = _.spanLeft((n: number) => n % 2 === 1)
    const assertSpanLeft = (input: Array<number>, expectedInit: Array<number>, expectedRest: Array<number>) => {
      const { init, rest } = f(input)
      U.deepStrictEqual(init, expectedInit)
      U.deepStrictEqual(rest, expectedRest)
    }
    U.deepStrictEqual(f([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })
    const empty: Array<number> = []
    assertSpanLeft(empty, empty, [])
    assertSpanLeft([], [], [])
    const inputAll: Array<number> = [1, 3]
    assertSpanLeft(inputAll, inputAll, [])
    const inputNone: Array<number> = [2, 4]
    assertSpanLeft(inputNone, [], inputNone)
  })

  it('takeLeftWhile', () => {
    const f = (n: number) => n % 2 === 0
    U.deepStrictEqual(_.takeLeftWhile(f)([2, 4, 3, 6]), [2, 4])
    U.deepStrictEqual(_.takeLeftWhile(f)([]), [])
    U.deepStrictEqual(_.takeLeftWhile(f)([1, 2, 4]), [])
    U.deepStrictEqual(_.takeLeftWhile(f)([2, 4]), [2, 4])
  })

  it('dropLeft', () => {
    // empty
    const empty: Array<number> = []
    U.deepStrictEqual(_.dropLeft(0)(empty), empty)
    const full: Array<number> = [1, 2]
    // non empty
    U.deepStrictEqual(_.dropLeft(0)(full), full)
    U.deepStrictEqual(_.dropLeft(1)(full), [2])
    // full
    U.deepStrictEqual(_.dropLeft(2)(full), [])
    // out of bound
    U.deepStrictEqual(_.dropLeft(1)(empty), empty)
    U.deepStrictEqual(_.dropLeft(3)(full), [])
    U.deepStrictEqual(_.dropLeft(-1)(empty), empty)
    U.deepStrictEqual(_.dropLeft(-1)(full), full)
  })

  it('dropRight', () => {
    // empty
    const empty: Array<number> = []
    U.deepStrictEqual(_.dropRight(0)(empty), empty)
    const full: Array<number> = [1, 2]
    // non empty
    U.deepStrictEqual(_.dropRight(0)(full), full)
    U.deepStrictEqual(_.dropRight(1)(full), [1])
    // full
    U.deepStrictEqual(_.dropRight(2)(full), [])
    // out of bound
    U.deepStrictEqual(_.dropRight(1)(empty), empty)
    U.deepStrictEqual(_.dropRight(3)(full), [])
    U.deepStrictEqual(_.dropRight(-1)(empty), empty)
    U.deepStrictEqual(_.dropRight(-1)(full), full)
  })

  it('dropLeftWhile', () => {
    const f = _.dropLeftWhile((n: number) => n > 0)
    U.deepStrictEqual(f([]), [])
    U.deepStrictEqual(f([1, 2]), [])
    U.deepStrictEqual(f([-1, -2]), [-1, -2])
    U.deepStrictEqual(f([-1, 2]), [-1, 2])
    U.deepStrictEqual(f([1, -2, 3]), [-2, 3])
  })

  it('init', () => {
    const as: Array<number> = [1, 2, 3]
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
    const xs: Array<X> = [
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
    U.deepStrictEqual(pipe(_.unsafeUpdateAt(1, 2, []), _.isEmpty), true)
    // should not return the same reference if nothing changed
    const input: Array<number> = [1, 2, 3]
    U.deepStrictEqual(
      pipe(_.unsafeUpdateAt(1, 2, input), (out) => out === input),
      false
    )
  })

  it('updateAt', () => {
    const as: Array<number> = [1, 2, 3]
    U.deepStrictEqual(_.updateAt(1, 1)(as), O.some([1, 1, 3]))
    U.deepStrictEqual(_.updateAt(1, 1)([]), O.none)
  })

  it('deleteAt', () => {
    const as: Array<number> = [1, 2, 3]
    U.deepStrictEqual(_.deleteAt(0)(as), O.some([2, 3]))
    U.deepStrictEqual(_.deleteAt(1)([]), O.none)
  })

  it('modifyAt', () => {
    const as: Array<number> = [1, 2, 3]
    U.deepStrictEqual(_.modifyAt(1, U.double)(as), O.some([1, 4, 3]))
    U.deepStrictEqual(_.modifyAt(1, U.double)([]), O.none)
    // should not return the same reference if nothing changed
    const input: Array<number> = [1, 2, 3]
    U.deepStrictEqual(
      pipe(
        input,
        _.modifyAt(1, identity),
        O.map((out) => out === input)
      ),
      O.some(false)
    )
  })

  it('sort', () => {
    U.deepStrictEqual(_.sort(N.Ord)([3, 2, 1]), [1, 2, 3])
    U.deepStrictEqual(_.sort(N.Ord)([]), [])
    const byName = pipe(
      S.Ord,
      Ord.contramap((x: { readonly name: string }) => x.name)
    )
    U.deepStrictEqual(
      _.sort(byName)([
        { name: 'b', age: 0 },
        { name: 'a', age: 1 },
        { name: 'c', age: 2 }
      ]),
      [
        { name: 'a', age: 1 },
        { name: 'b', age: 0 },
        { name: 'c', age: 2 }
      ]
    )
  })

  it('prependAll', () => {
    U.deepStrictEqual(_.prependAll(0)([1, 2, 3]), [0, 1, 0, 2, 0, 3])
    U.deepStrictEqual(_.prependAll(0)([]), [])
    U.deepStrictEqual(_.prependAll(0)([1]), [0, 1])
    U.deepStrictEqual(_.prependAll(0)([1, 2, 3, 4]), [0, 1, 0, 2, 0, 3, 0, 4])
  })

  it('intersperse', () => {
    U.deepStrictEqual(_.intersperse(0)([]), [])
    U.deepStrictEqual(_.intersperse(0)([1]), [1])
    U.deepStrictEqual(_.intersperse(0)([1, 2, 3]), [1, 0, 2, 0, 3])
    U.deepStrictEqual(_.intersperse(0)([1, 2]), [1, 0, 2])
    U.deepStrictEqual(_.intersperse(0)([1, 2, 3, 4]), [1, 0, 2, 0, 3, 0, 4])
  })

  it('intercalate', () => {
    U.deepStrictEqual(_.intercalate(S.Monoid)('-')([]), '')
    U.deepStrictEqual(_.intercalate(S.Monoid)('-')(['a']), 'a')
    U.deepStrictEqual(_.intercalate(S.Monoid)('-')(['a', 'b', 'c']), 'a-b-c')
    U.deepStrictEqual(_.intercalate(S.Monoid)('-')(['a', '', 'c']), 'a--c')
    U.deepStrictEqual(_.intercalate(S.Monoid)('-')(['a', 'b']), 'a-b')
    U.deepStrictEqual(_.intercalate(S.Monoid)('-')(['a', 'b', 'c', 'd']), 'a-b-c-d')
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

  it('rotate', () => {
    U.deepStrictEqual(_.rotate(0)([]), [])
    U.deepStrictEqual(_.rotate(1)([]), [])

    U.deepStrictEqual(_.rotate(1)([1]), [1])
    U.deepStrictEqual(_.rotate(1)([1, 2]), [2, 1])
    U.deepStrictEqual(_.rotate(2)([1, 2]), [1, 2])
    U.deepStrictEqual(_.rotate(0)([1, 2]), [1, 2])
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
    U.deepStrictEqual(_.reverse([1, 2, 3]), [3, 2, 1])
    U.deepStrictEqual(_.reverse([]), [])
  })

  it('foldLeft', () => {
    const len: <A>(as: Array<A>) => number = _.foldLeft(
      () => 0,
      (_, tail) => 1 + len(tail)
    )
    U.deepStrictEqual(len([1, 2, 3]), 3)
  })

  it('foldRight', () => {
    const len: <A>(as: Array<A>) => number = _.foldRight(
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
    const arrUniq: Array<A> = [arrA, arrC]

    U.deepStrictEqual(_.uniq(eqA)(arrUniq), arrUniq)
    U.deepStrictEqual(_.uniq(eqA)([arrA, arrB, arrC, arrD]), [arrA, arrC])
    U.deepStrictEqual(_.uniq(eqA)([arrB, arrA, arrC, arrD]), [arrB, arrC])
    U.deepStrictEqual(_.uniq(eqA)([arrA, arrA, arrC, arrD, arrA]), [arrA, arrC])
    U.deepStrictEqual(_.uniq(eqA)([arrA, arrC]), [arrA, arrC])
    U.deepStrictEqual(_.uniq(eqA)([arrC, arrA]), [arrC, arrA])
    U.deepStrictEqual(_.uniq(B.Eq)([true, false, true, false]), [true, false])
    U.deepStrictEqual(_.uniq(N.Eq)([]), [])
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
  })

  it('sortBy', () => {
    interface Person {
      readonly name: string
      readonly age: number
    }
    const byName = pipe(
      S.Ord,
      Ord.contramap((p: Person) => p.name)
    )
    const byAge = pipe(
      N.Ord,
      Ord.contramap((p: Person) => p.age)
    )
    const f = _.sortBy([byName, byAge])
    const persons: Array<Person> = [
      { name: 'a', age: 1 },
      { name: 'b', age: 3 },
      { name: 'c', age: 2 },
      { name: 'b', age: 2 }
    ]
    U.deepStrictEqual(f(persons), [
      { name: 'a', age: 1 },
      { name: 'b', age: 2 },
      { name: 'b', age: 3 },
      { name: 'c', age: 2 }
    ])
    const sortByAgeByName = _.sortBy([byAge, byName])
    U.deepStrictEqual(sortByAgeByName(persons), [
      { name: 'a', age: 1 },
      { name: 'b', age: 2 },
      { name: 'c', age: 2 },
      { name: 'b', age: 3 }
    ])

    U.deepStrictEqual(f([]), [])
    U.deepStrictEqual(_.sortBy([])(persons), persons)
  })

  it('chop', () => {
    const group = <A>(E: Eq.Eq<A>): ((as: Array<A>) => Array<Array<A>>) => {
      return _.chop((as) => {
        const { init, rest } = _.spanLeft((a: A) => E.equals(a, as[0]))(as)
        return [init, rest]
      })
    }
    const f = group(N.Eq)
    U.deepStrictEqual(f([]), [])
    U.deepStrictEqual(f([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
  })

  it('splitAt', () => {
    const assertSplitAt = (
      input: Array<number>,
      index: number,
      expectedInit: Array<number>,
      expectedRest: Array<number>
    ) => {
      const [init, rest] = _.splitAt(index)(input)
      U.deepStrictEqual(init, expectedInit)
      U.deepStrictEqual(rest, expectedRest)
    }
    U.deepStrictEqual(_.splitAt(1)([1, 2]), [[1], [2]])
    const two: Array<number> = [1, 2]
    assertSplitAt(two, 2, two, [])
    U.deepStrictEqual(_.splitAt(2)([1, 2, 3, 4, 5]), [
      [1, 2],
      [3, 4, 5]
    ])
    // zero
    const empty: Array<number> = []
    assertSplitAt([], 0, [], [])
    assertSplitAt(empty, 0, empty, [])
    assertSplitAt(two, 0, [], two)
    // out of bounds
    assertSplitAt([], -1, [], [])
    assertSplitAt(empty, -1, empty, [])
    assertSplitAt(two, -1, [], two)
    assertSplitAt(two, 3, two, [])
    assertSplitAt([], 3, [], [])
    assertSplitAt(empty, 3, empty, [])
  })

  describe('chunksOf', () => {
    it('should split an array into length-n pieces', () => {
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

      const assertSingleChunk = (input: Array<number>, n: number) => {
        const chunks = _.chunksOf(n)(input)
        U.deepStrictEqual(chunks.length, 1)
        U.deepStrictEqual(chunks[0], input)
      }
      // n = length
      assertSingleChunk([1, 2], 2)
      // n out of bounds
      assertSingleChunk([1, 2], 3)
    })

    // #897
    it('returns an empty array if provided an empty array', () => {
      U.deepStrictEqual(_.chunksOf(1)([]), [])
      U.deepStrictEqual(_.chunksOf(2)([]), [])
      U.deepStrictEqual(_.chunksOf(0)([]), [])
    })

    // #897
    it('should respect the law: RA.chunksOf(n)(xs).concat(RA.chunksOf(n)(ys)) == RA.chunksOf(n)(xs.concat(ys)))', () => {
      const xs: Array<number> = []
      const ys: Array<number> = [1, 2]
      U.deepStrictEqual(_.chunksOf(2)(xs).concat(_.chunksOf(2)(ys)), _.chunksOf(2)(xs.concat(ys)))
      fc.assert(
        fc.property(
          fc.array(fc.integer()).filter((xs) => xs.length % 2 === 0), // Ensures `xs.length` is even
          fc.array(fc.integer()),
          fc.integer({ min: 1, max: 1 }).map((x) => x * 2), // Generates `n` to be even so that it evenly divides `xs`
          (xs, ys, n) => {
            const as = _.chunksOf(n)(xs).concat(_.chunksOf(n)(ys))
            const bs = _.chunksOf(n)(xs.concat(ys))
            isDeepStrictEqual(as, bs)
          }
        )
      )
    })
  })

  it('prepend', () => {
    U.deepStrictEqual(pipe(['a', 'b'], _.prepend('c')), ['c', 'a', 'b'])
    U.deepStrictEqual(pipe(['a', 'b'], _.prependW(3)), [3, 'a', 'b'])
  })

  it('append', () => {
    U.deepStrictEqual(pipe(['a', 'b'], _.append('c')), ['a', 'b', 'c'])
    U.deepStrictEqual(pipe(['a', 'b'], _.appendW(3)), ['a', 'b', 3])
  })

  it('makeBy', () => {
    U.deepStrictEqual(_.makeBy(5, U.double), [0, 2, 4, 6, 8])
    U.deepStrictEqual(_.makeBy(0, U.double), [])
    U.deepStrictEqual(_.makeBy(-1, U.double), [])
  })

  it('range', () => {
    U.deepStrictEqual(_.range(0, 0), [0])
    U.deepStrictEqual(_.range(0, 1), [0, 1])
    U.deepStrictEqual(_.range(1, 5), [1, 2, 3, 4, 5])
    U.deepStrictEqual(_.range(10, 15), [10, 11, 12, 13, 14, 15])
    U.deepStrictEqual(_.range(-1, 0), [-1, 0])
    U.deepStrictEqual(_.range(-5, -1), [-5, -4, -3, -2, -1])
    // out of bound
    U.deepStrictEqual(_.range(2, 1), [2])
    U.deepStrictEqual(_.range(-1, -2), [-1])
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
    const concat = _.union(N.Eq)
    const two: Array<number> = [1, 2]
    U.deepStrictEqual(concat(two, [3, 4]), [1, 2, 3, 4])
    U.deepStrictEqual(concat(two, [2, 3]), [1, 2, 3])
    U.deepStrictEqual(concat(two, [1, 2]), [1, 2])
    U.deepStrictEqual(pipe(two, concat([3, 4])), [1, 2, 3, 4])
    U.deepStrictEqual(pipe(two, concat([2, 3])), [1, 2, 3])
    U.deepStrictEqual(pipe(two, concat([1, 2])), [1, 2])

    U.deepStrictEqual(pipe(two, concat([])), two)
    U.deepStrictEqual(pipe([], concat(two)), two)
    U.deepStrictEqual(pipe([], concat([])), [])
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

  it('getUnionMonoid', () => {
    const concat = _.getUnionMonoid(N.Eq).concat
    const two: Array<number> = [1, 2]
    U.deepStrictEqual(concat(two, [3, 4]), [1, 2, 3, 4])
    U.deepStrictEqual(concat(two, [2, 3]), [1, 2, 3])
    U.deepStrictEqual(concat(two, [1, 2]), [1, 2])

    U.deepStrictEqual(concat(two, []), two)
    U.deepStrictEqual(concat([], two), two)
    U.deepStrictEqual(concat([], []), [])
  })

  it('getIntersectionSemigroup', () => {
    const concat = _.getIntersectionSemigroup(N.Eq).concat
    U.deepStrictEqual(concat([1, 2], [3, 4]), [])
    U.deepStrictEqual(concat([1, 2], [2, 3]), [2])
    U.deepStrictEqual(concat([1, 2], [1, 2]), [1, 2])
  })

  it('getDifferenceMagma', () => {
    const concat = _.getDifferenceMagma(N.Eq).concat
    U.deepStrictEqual(concat([1, 2], [3, 4]), [1, 2])
    U.deepStrictEqual(concat([1, 2], [2, 3]), [1])
    U.deepStrictEqual(concat([1, 2], [1, 2]), [])
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

  it('size', () => {
    U.deepStrictEqual(_.size([]), 0)
    U.deepStrictEqual(_.size(['a']), 1)
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

  it('copy', () => {
    U.deepStrictEqual(pipe([1, 2, 3], _.copy), [1, 2, 3])
  })

  describe('fromPredicate', () => {
    it('can create an array from a Refinement', () => {
      const refinement: Refinement<unknown, string> = (a): a is string => typeof a === 'string'
      U.deepStrictEqual(_.fromPredicate(refinement)('hello'), ['hello'])
      U.deepStrictEqual(_.fromPredicate(refinement)(null), [])
    })

    it('can create an array from a Predicate', () => {
      const predicate = (a: string) => a.length > 0
      U.deepStrictEqual(_.fromPredicate(predicate)('hi'), ['hi'])
      U.deepStrictEqual(_.fromPredicate(predicate)(''), [])
    })
  })

  it('fromOption', () => {
    U.deepStrictEqual(_.fromOption(O.some('hello')), ['hello'])
    U.deepStrictEqual(_.fromOption(O.none), [])
  })

  it('fromEither', () => {
    U.deepStrictEqual(_.fromEither(E.right(1)), [1])
    U.deepStrictEqual(_.fromEither(E.left('a')), [])
  })

  it('match', () => {
    const f = _.match(
      () => 'empty',
      (as) => `nonEmpty ${as.length}`
    )
    U.deepStrictEqual(pipe([], f), 'empty')
    U.deepStrictEqual(pipe([1, 2, 3], f), 'nonEmpty 3')
  })

  it('concatW', () => {
    U.deepStrictEqual(pipe([1], _.concatW(['a'])), [1, 'a'])
    const as = [1, 2, 3]
    const empty: Array<string> = []
    U.deepStrictEqual(pipe(empty, _.concatW(as)), as)
    U.deepStrictEqual(pipe(as, _.concatW(empty)), as)
  })

  it('fromOptionK', () => {
    const f = (n: number) => (n > 0 ? O.some(n) : O.none)
    const g = _.fromOptionK(f)
    U.deepStrictEqual(g(0), [])
    U.deepStrictEqual(g(1), [1])
  })

  it('isOutOfBound', () => {
    U.deepStrictEqual(_.isOutOfBound(0, ['a']), false)
    U.deepStrictEqual(_.isOutOfBound(100, ['a']), true)
    U.deepStrictEqual(_.isOutOfBound(-1, ['a']), true)
  })
})
