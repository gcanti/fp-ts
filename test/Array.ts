import * as assert from 'assert'
import * as fc from 'fast-check'
import { isDeepStrictEqual } from 'util'
import * as E from '../src/Either'
import * as Eq from '../src/Eq'
import { identity, pipe, tuple } from '../src/function'
import * as M from '../src/Monoid'
import * as O from '../src/Option'
import * as Ord from '../src/Ord'
import * as _ from '../src/Array'
import * as Show from '../src/Show'
import * as T from '../src/Task'

/* tslint:disable:readonly-array */

describe('Array', () => {
  describe('pipeables', () => {
    it('traverse', () => {
      const traverse = _.traverse(O.Applicative)((n: number): O.Option<number> => (n % 2 === 0 ? O.none : O.some(n)))
      assert.deepStrictEqual(traverse([1, 2]), O.none)
      assert.deepStrictEqual(traverse([1, 3]), O.some([1, 3]))
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      assert.deepStrictEqual(sequence([O.some(1), O.some(3)]), O.some([1, 3]))
      assert.deepStrictEqual(sequence([O.some(1), O.none]), O.none)
    })

    it('traverseWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          ['a', 'bb'],
          _.traverseWithIndex(O.Applicative)((i, s) => (s.length >= 1 ? O.some(s + i) : O.none))
        ),
        O.some(['a0', 'bb1'])
      )
      assert.deepStrictEqual(
        pipe(
          ['a', 'bb'],
          _.traverseWithIndex(O.Applicative)((i, s) => (s.length > 1 ? O.some(s + i) : O.none))
        ),
        O.none
      )
    })

    it('lookup', () => {
      assert.deepStrictEqual(_.lookup(0, [1, 2, 3]), O.some(1))
      assert.deepStrictEqual(_.lookup(3, [1, 2, 3]), O.none)
      assert.deepStrictEqual(pipe([1, 2, 3], _.lookup(0)), O.some(1))
      assert.deepStrictEqual(pipe([1, 2, 3], _.lookup(3)), O.none)
    })

    it('elem', () => {
      assert.deepStrictEqual(_.elem(Eq.eqNumber)(2, [1, 2, 3]), true)
      assert.deepStrictEqual(_.elem(Eq.eqNumber)(0, [1, 2, 3]), false)
      assert.deepStrictEqual(pipe([1, 2, 3], _.elem(Eq.eqNumber)(2)), true)
      assert.deepStrictEqual(pipe([1, 2, 3], _.elem(Eq.eqNumber)(0)), false)
    })

    it('unfold', () => {
      const as = _.unfold(5, (n) => (n > 0 ? O.some([n, n - 1]) : O.none))
      assert.deepStrictEqual(as, [5, 4, 3, 2, 1])
    })

    it('wither', async () => {
      const wither = _.wither(T.ApplicativePar)((n: number) => T.of(n > 2 ? O.some(n + 1) : O.none))
      assert.deepStrictEqual(await pipe([], wither)(), [])
      assert.deepStrictEqual(await pipe([1, 3], wither)(), [4])
    })

    it('wilt', async () => {
      const wilt = _.wilt(T.ApplicativePar)((n: number) => T.of(n > 2 ? E.right(n + 1) : E.left(n - 1)))
      assert.deepStrictEqual(await pipe([], wilt)(), { left: [], right: [] })
      assert.deepStrictEqual(await pipe([1, 3], wilt)(), { left: [0], right: [4] })
    })
  })

  describe('pipeables', () => {
    it('map', () => {
      assert.deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.map((n) => n * 2)
        ),
        [2, 4, 6]
      )
    })

    it('mapWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.mapWithIndex((i, n) => n + i)
        ),
        [1, 3, 5]
      )
    })

    it('alt', () => {
      assert.deepStrictEqual(
        pipe(
          [1, 2],
          _.alt(() => [3, 4])
        ),
        [1, 2, 3, 4]
      )
    })

    it('ap', () => {
      assert.deepStrictEqual(pipe([(x: number) => x * 2, (x: number) => x * 3], _.ap([1, 2, 3])), [2, 4, 6, 3, 6, 9])
    })

    it('apFirst', () => {
      assert.deepStrictEqual(pipe([1, 2], _.apFirst(['a', 'b', 'c'])), [1, 1, 1, 2, 2, 2])
    })

    it('apSecond', () => {
      assert.deepStrictEqual(pipe([1, 2], _.apSecond(['a', 'b', 'c'])), ['a', 'b', 'c', 'a', 'b', 'c'])
    })

    it('chain', () => {
      assert.deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.chain((n) => [n, n + 1])
        ),
        [1, 2, 2, 3, 3, 4]
      )
    })

    it('chainWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.chainWithIndex((i, n) => [n + i])
        ),
        [1, 3, 5]
      )
    })

    it('chainFirst', () => {
      assert.deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.chainFirst((n) => [n, n + 1])
        ),
        [1, 1, 2, 2, 3, 3]
      )
    })

    it('extend', () => {
      const sum = (as: Array<number>) => M.fold(M.monoidSum)(as)
      assert.deepStrictEqual(pipe([1, 2, 3, 4], _.extend(sum)), [10, 9, 7, 4])
      assert.deepStrictEqual(pipe([1, 2, 3, 4], _.extend(identity)), [[1, 2, 3, 4], [2, 3, 4], [3, 4], [4]])
    })

    it('foldMap', () => {
      assert.deepStrictEqual(pipe(['a', 'b', 'c'], _.foldMap(M.monoidString)(identity)), 'abc')
      assert.deepStrictEqual(pipe([], _.foldMap(M.monoidString)(identity)), '')
    })

    it('compact', () => {
      assert.deepStrictEqual(_.compact([]), [])
      assert.deepStrictEqual(_.compact([O.some(1), O.some(2), O.some(3)]), [1, 2, 3])
      assert.deepStrictEqual(_.compact([O.some(1), O.none, O.some(3)]), [1, 3])
    })

    it('separate', () => {
      assert.deepStrictEqual(_.separate([]), { left: [], right: [] })
      assert.deepStrictEqual(_.separate([E.left(123), E.right('123')]), { left: [123], right: ['123'] })
    })

    it('filter', () => {
      const g = (n: number) => n % 2 === 1
      assert.deepStrictEqual(pipe([1, 2, 3], _.filter(g)), [1, 3])
      const x = pipe([O.some(3), O.some(2), O.some(1)], _.filter(O.isSome))
      assert.deepStrictEqual(x, [O.some(3), O.some(2), O.some(1)])
      const y = pipe([O.some(3), O.none, O.some(1)], _.filter(O.isSome))
      assert.deepStrictEqual(y, [O.some(3), O.some(1)])
    })

    it('filterWithIndex', () => {
      const f = (n: number) => n % 2 === 0
      assert.deepStrictEqual(pipe(['a', 'b', 'c'], _.filterWithIndex(f)), ['a', 'c'])
    })

    it('filterMap', () => {
      const f = (n: number) => (n % 2 === 0 ? O.none : O.some(n))
      assert.deepStrictEqual(pipe([1, 2, 3], _.filterMap(f)), [1, 3])
      assert.deepStrictEqual(pipe([], _.filterMap(f)), [])
    })

    it('foldMapWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          ['a', 'b'],
          _.foldMapWithIndex(M.monoidString)((i, a) => i + a)
        ),
        '0a1b'
      )
    })

    it('filterMapWithIndex', () => {
      const f = (i: number, n: number) => ((i + n) % 2 === 0 ? O.none : O.some(n))
      assert.deepStrictEqual(pipe([1, 2, 4], _.filterMapWithIndex(f)), [1, 2])
      assert.deepStrictEqual(pipe([], _.filterMapWithIndex(f)), [])
    })

    it('partitionMap', () => {
      assert.deepStrictEqual(pipe([], _.partitionMap(identity)), { left: [], right: [] })
      assert.deepStrictEqual(pipe([E.right(1), E.left('foo'), E.right(2)], _.partitionMap(identity)), {
        left: ['foo'],
        right: [1, 2]
      })
    })

    it('partition', () => {
      assert.deepStrictEqual(
        pipe(
          [],
          _.partition((n) => n > 2)
        ),
        { left: [], right: [] }
      )
      assert.deepStrictEqual(
        pipe(
          [1, 3],
          _.partition((n) => n > 2)
        ),
        { left: [1], right: [3] }
      )
    })

    it('partitionMapWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          [],
          _.partitionMapWithIndex((_, a) => a)
        ),
        { left: [], right: [] }
      )
      assert.deepStrictEqual(
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
        {
          left: ['foo', 'err'],
          right: [1]
        }
      )
    })

    it('partitionWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          [],
          _.partitionWithIndex((i, n) => i + n > 2)
        ),
        { left: [], right: [] }
      )
      assert.deepStrictEqual(
        pipe(
          [1, 2],
          _.partitionWithIndex((i, n) => i + n > 2)
        ),
        { left: [1], right: [2] }
      )
    })

    it('reduce', () => {
      assert.deepStrictEqual(
        pipe(
          ['a', 'b', 'c'],
          _.reduce('', (acc, a) => acc + a)
        ),
        'abc'
      )
    })

    it('reduceWithIndex', () => {
      assert.deepStrictEqual(
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
      assert.deepStrictEqual(pipe(as, _.reduceRight(b, f)), 'cba')
      const x2: Array<string> = []
      assert.deepStrictEqual(pipe(x2, _.reduceRight(b, f)), '')
    })

    it('reduceRightWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          ['a', 'b'],
          _.reduceRightWithIndex('', (i, a, b) => b + i + a)
        ),
        '1b0a'
      )
    })

    it('duplicate', () => {
      assert.deepStrictEqual(pipe(['a', 'b'], _.duplicate), [['a', 'b'], ['b']])
    })
  })

  it('getMonoid', () => {
    const M = _.getMonoid<number>()
    assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
    assert.deepStrictEqual(M.concat([1, 2], M.empty), [1, 2])
    assert.deepStrictEqual(M.concat(M.empty, [1, 2]), [1, 2])
  })

  it('getEq', () => {
    const O = _.getEq(Ord.ordString)
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
    const O = _.getOrd(Ord.ordString)
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

  it('isEmpty', () => {
    const as: Array<number> = [1, 2, 3]
    assert.deepStrictEqual(_.isEmpty(as), false)
    assert.deepStrictEqual(_.isEmpty([]), true)
  })

  it('isNotEmpty', () => {
    const as: Array<number> = [1, 2, 3]
    assert.deepStrictEqual(_.isNonEmpty(as), true)
    assert.deepStrictEqual(_.isNonEmpty([]), false)
  })

  it('cons', () => {
    assert.deepStrictEqual(_.cons(0, [1, 2, 3]), [0, 1, 2, 3])
    assert.deepStrictEqual(_.cons([1], [[2]]), [[1], [2]])
    assert.deepStrictEqual(pipe([1, 2, 3], _.cons(0)), [0, 1, 2, 3])
    assert.deepStrictEqual(pipe([[2]], _.cons([1])), [[1], [2]])
  })

  it('snoc', () => {
    const as: Array<number> = [1, 2, 3]
    assert.deepStrictEqual(_.snoc(as, 4), [1, 2, 3, 4])
    assert.deepStrictEqual(_.snoc([[1]], [2]), [[1], [2]])
  })

  it('head', () => {
    const as: Array<number> = [1, 2, 3]
    assert.deepStrictEqual(_.head(as), O.some(1))
    assert.deepStrictEqual(_.head([]), O.none)
  })

  it('last', () => {
    const as: Array<number> = [1, 2, 3]
    assert.deepStrictEqual(_.last(as), O.some(3))
    assert.deepStrictEqual(_.last([]), O.none)
  })

  it('tail', () => {
    const as: Array<number> = [1, 2, 3]
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
    const as: Array<number> = [1, 2, 3]
    assert.deepStrictEqual(_.init(as), O.some([1, 2]))
    assert.deepStrictEqual(_.init([]), O.none)
  })

  it('findIndex', () => {
    assert.deepStrictEqual(_.findIndex((x) => x === 2)([1, 2, 3]), O.some(1))
    assert.deepStrictEqual(_.findIndex((x) => x === 2)([]), O.none)
  })

  it('findFirst', () => {
    assert.deepStrictEqual(
      pipe(
        [],
        _.findFirst((x: { readonly a: number }) => x.a > 1)
      ),
      O.none
    )
    assert.deepStrictEqual(
      pipe(
        [{ a: 1 }, { a: 2 }, { a: 3 }],
        _.findFirst((x) => x.a > 1)
      ),
      O.some({ a: 2 })
    )
    assert.deepStrictEqual(
      pipe(
        [{ a: 1 }, { a: 2 }, { a: 3 }],
        _.findFirst((x) => x.a > 3)
      ),
      O.none
    )
  })

  it('findFirstMap', () => {
    assert.deepStrictEqual(
      pipe(
        [1, 2, 3],
        _.findFirstMap((n) => (n > 1 ? O.some(n * 2) : O.none))
      ),
      O.some(4)
    )
    assert.deepStrictEqual(
      pipe(
        [1],
        _.findFirstMap((n) => (n < 1 ? O.some(n * 2) : O.none))
      ),
      O.none
    )
  })

  it('findLast', () => {
    assert.deepStrictEqual(
      pipe(
        [],
        _.findLast((x: { readonly a: number }) => x.a > 1)
      ),
      O.none
    )
    assert.deepStrictEqual(
      pipe(
        [{ a: 1 }, { a: 2 }, { a: 3 }],
        _.findLast((x) => x.a > 1)
      ),
      O.some({ a: 3 })
    )
    assert.deepStrictEqual(
      pipe(
        [{ a: 1 }, { a: 2 }, { a: 3 }],
        _.findLast((x) => x.a > 3)
      ),
      O.none
    )
  })

  it('findLastMap', () => {
    assert.deepStrictEqual(
      pipe(
        [1, 2, 3],
        _.findLastMap((n) => (n > 1 ? O.some(n * 2) : O.none))
      ),
      O.some(6)
    )
    assert.deepStrictEqual(
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
    const as: Array<{ readonly a: number }> = [x]
    const result = _.unsafeUpdateAt(0, x, as)
    assert.deepStrictEqual(result, as)
  })

  it('updateAt', () => {
    const as: Array<number> = [1, 2, 3]
    assert.deepStrictEqual(_.updateAt(1, 1)(as), O.some([1, 1, 3]))
    assert.deepStrictEqual(_.updateAt(1, 1)([]), O.none)
  })

  it('deleteAt', () => {
    const as: Array<number> = [1, 2, 3]
    assert.deepStrictEqual(_.deleteAt(0)(as), O.some([2, 3]))
    assert.deepStrictEqual(_.deleteAt(1)([]), O.none)
  })

  it('modifyAt', () => {
    const as: Array<number> = [1, 2, 3]
    const double = (x: number): number => x * 2
    assert.deepStrictEqual(_.modifyAt(1, double)(as), O.some([1, 4, 3]))
    assert.deepStrictEqual(_.modifyAt(1, double)([]), O.none)
  })

  it('sort', () => {
    assert.deepStrictEqual(_.sort(Ord.ordNumber)([3, 2, 1]), [1, 2, 3])
    assert.strictEqual(_.sort(Ord.ordNumber)(_.empty), _.empty)
    const byName = pipe(
      Ord.ordString,
      Ord.contramap((x: { readonly name: string }) => x.name)
    )
    assert.deepStrictEqual(
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

  it('prependToAll', () => {
    assert.deepStrictEqual(_.prependToAll(0)([1, 2, 3]), [0, 1, 0, 2, 0, 3])
    assert.deepStrictEqual(_.prependToAll(0)([]), [])
    assert.deepStrictEqual(_.prependToAll(0)([1]), [0, 1])
    assert.deepStrictEqual(_.prependToAll(0)([1, 2, 3, 4]), [0, 1, 0, 2, 0, 3, 0, 4])
  })

  it('intersperse', () => {
    assert.deepStrictEqual(_.intersperse(0)([1, 2, 3]), [1, 0, 2, 0, 3])
    assert.deepStrictEqual(_.intersperse(0)([]), [])
    assert.deepStrictEqual(_.intersperse(0)([1]), [1])
    assert.deepStrictEqual(_.intersperse(0)([1, 2]), [1, 0, 2])
    assert.deepStrictEqual(_.intersperse(0)([1, 2, 3, 4]), [1, 0, 2, 0, 3, 0, 4])
  })

  it('zipWith', () => {
    assert.deepStrictEqual(
      _.zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n),
      ['a1', 'b2', 'c3']
    )
  })

  it('zip', () => {
    assert.deepStrictEqual(_.zip([1, 2, 3], ['a', 'b', 'c', 'd']), [
      [1, 'a'],
      [2, 'b'],
      [3, 'c']
    ])
    assert.deepStrictEqual(pipe([1, 2, 3], _.zip(['a', 'b', 'c', 'd'])), [
      [1, 'a'],
      [2, 'b'],
      [3, 'c']
    ])
  })

  it('unzip', () => {
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
    assert.deepStrictEqual(_.rights([E.right(1), E.left('foo'), E.right(2)]), [1, 2])
    assert.deepStrictEqual(_.rights([]), [])
  })

  it('lefts', () => {
    assert.deepStrictEqual(_.lefts([E.right(1), E.left('foo'), E.right(2)]), ['foo'])
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

  it('reverse', () => {
    assert.deepStrictEqual(_.reverse([1, 2, 3]), [3, 2, 1])
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

    const eqA = pipe(
      Ord.ordNumber,
      Eq.contramap((f: A) => f.b)
    )
    const arrA: A = { a: 'a', b: 1 }
    const arrB: A = { a: 'b', b: 1 }
    const arrC: A = { a: 'c', b: 2 }
    const arrD: A = { a: 'd', b: 2 }
    const arrUniq: Array<A> = [arrA, arrC]

    assert.deepStrictEqual(_.uniq(eqA)(arrUniq), arrUniq, 'Preserve original array')
    assert.deepStrictEqual(_.uniq(eqA)([arrA, arrB, arrC, arrD]), [arrA, arrC])
    assert.deepStrictEqual(_.uniq(eqA)([arrB, arrA, arrC, arrD]), [arrB, arrC])
    assert.deepStrictEqual(_.uniq(eqA)([arrA, arrA, arrC, arrD, arrA]), [arrA, arrC])
    assert.deepStrictEqual(_.uniq(eqA)([arrA, arrC]), [arrA, arrC])
    assert.deepStrictEqual(_.uniq(eqA)([arrC, arrA]), [arrC, arrA])
    assert.deepStrictEqual(_.uniq(Eq.eqBoolean)([true, false, true, false]), [true, false])
    assert.deepStrictEqual(_.uniq(Eq.eqNumber)([]), [])
    assert.deepStrictEqual(_.uniq(Eq.eqNumber)([-0, -0]), [-0])
    assert.deepStrictEqual(_.uniq(Eq.eqNumber)([0, -0]), [0])
    assert.deepStrictEqual(_.uniq(Eq.eqNumber)([1]), [1])
    assert.deepStrictEqual(_.uniq(Eq.eqNumber)([2, 1, 2]), [2, 1])
    assert.deepStrictEqual(_.uniq(Eq.eqNumber)([1, 2, 1]), [1, 2])
    assert.deepStrictEqual(_.uniq(Eq.eqNumber)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(_.uniq(Eq.eqNumber)([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(_.uniq(Eq.eqNumber)([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(_.uniq(Eq.eqString)(['a', 'b', 'a']), ['a', 'b'])
    assert.deepStrictEqual(_.uniq(Eq.eqString)(['a', 'b', 'A']), ['a', 'b', 'A'])
  })

  it('sortBy', () => {
    interface Person {
      readonly name: string
      readonly age: number
    }
    const byName = pipe(
      Ord.ordString,
      Ord.contramap((p: Person) => p.name)
    )
    const byAge = pipe(
      Ord.ordNumber,
      Ord.contramap((p: Person) => p.age)
    )
    const sortByNameByAge = _.sortBy([byName, byAge])
    const persons: Array<Person> = [
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

  it('chop', () => {
    const group = <A>(E: Eq.Eq<A>): ((as: Array<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
      return _.chop((as) => {
        const { init, rest } = _.spanLeft((a: A) => E.equals(a, as[0]))(as)
        return [init, rest]
      })
    }
    assert.deepStrictEqual(group(Eq.eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
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
    it('should respect the law: RA.chunksOf(n)(xs).concat(RA.chunksOf(n)(ys)) == RA.chunksOf(n)(xs.concat(ys)))', () => {
      const xs: Array<number> = []
      const ys: Array<number> = [1, 2]
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

  it('union', () => {
    assert.deepStrictEqual(_.union(Eq.eqNumber)([1, 2], [3, 4]), [1, 2, 3, 4])
    assert.deepStrictEqual(_.union(Eq.eqNumber)([1, 2], [2, 3]), [1, 2, 3])
    assert.deepStrictEqual(_.union(Eq.eqNumber)([1, 2], [1, 2]), [1, 2])
    assert.deepStrictEqual(pipe([1, 2], _.union(Eq.eqNumber)([3, 4])), [1, 2, 3, 4])
    assert.deepStrictEqual(pipe([1, 2], _.union(Eq.eqNumber)([2, 3])), [1, 2, 3])
    assert.deepStrictEqual(pipe([1, 2], _.union(Eq.eqNumber)([1, 2])), [1, 2])
  })

  it('intersection', () => {
    assert.deepStrictEqual(_.intersection(Eq.eqNumber)([1, 2], [3, 4]), [])
    assert.deepStrictEqual(_.intersection(Eq.eqNumber)([1, 2], [2, 3]), [2])
    assert.deepStrictEqual(_.intersection(Eq.eqNumber)([1, 2], [1, 2]), [1, 2])
    assert.deepStrictEqual(pipe([1, 2], _.intersection(Eq.eqNumber)([3, 4])), [])
    assert.deepStrictEqual(pipe([1, 2], _.intersection(Eq.eqNumber)([2, 3])), [2])
    assert.deepStrictEqual(pipe([1, 2], _.intersection(Eq.eqNumber)([1, 2])), [1, 2])
  })

  it('difference', () => {
    assert.deepStrictEqual(_.difference(Eq.eqNumber)([1, 2], [3, 4]), [1, 2])
    assert.deepStrictEqual(_.difference(Eq.eqNumber)([1, 2], [2, 3]), [1])
    assert.deepStrictEqual(_.difference(Eq.eqNumber)([1, 2], [1, 2]), [])
    assert.deepStrictEqual(pipe([1, 2], _.difference(Eq.eqNumber)([3, 4])), [1, 2])
    assert.deepStrictEqual(pipe([1, 2], _.difference(Eq.eqNumber)([2, 3])), [1])
    assert.deepStrictEqual(pipe([1, 2], _.difference(Eq.eqNumber)([1, 2])), [])
  })

  it('should be safe when calling map with a binary function', () => {
    interface Foo {
      readonly bar: () => number
    }
    const f = (a: number, x?: Foo) => (x !== undefined ? `${a}${x.bar()}` : `${a}`)
    assert.deepStrictEqual(_.Functor.map([1, 2], f), ['1', '2'])
    assert.deepStrictEqual(pipe([1, 2], _.map(f)), ['1', '2'])
  })

  it('getShow', () => {
    const S = _.getShow(Show.showString)
    assert.deepStrictEqual(S.show([]), `[]`)
    assert.deepStrictEqual(S.show(['a']), `["a"]`)
    assert.deepStrictEqual(S.show(['a', 'b']), `["a", "b"]`)
  })
})
