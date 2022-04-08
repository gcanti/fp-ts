import { pipe, SK } from '../src/function'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import { ReadonlyNonEmptyArray } from '../src/ReadonlyNonEmptyArray'
import * as I from '../src/IO'
import * as IE from '../src/IOEither'
import * as _ from '../src/IOOption'
import * as U from './util'
import * as E from '../src/Either'

describe('IOOption', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', () => {
    U.deepStrictEqual(pipe(_.some(1), _.map(U.double))(), O.some(2))
  })

  it('ap', () => {
    U.deepStrictEqual(pipe(_.some(U.double), _.ap(_.some(2)))(), O.some(4))
    U.deepStrictEqual(pipe(_.some(U.double), _.ap(_.none))(), O.none)
    U.deepStrictEqual(pipe(_.none, _.ap(_.some(2)))(), O.none)
    U.deepStrictEqual(pipe(_.none, _.ap(_.none))(), O.none)
  })

  it('chain', () => {
    const f = (n: number) => _.some(n * 2)
    const g = () => _.none
    U.deepStrictEqual(pipe(_.some(1), _.chain(f))(), O.some(2))
    U.deepStrictEqual(pipe(_.none, _.chain(f))(), O.none)
    U.deepStrictEqual(pipe(_.some(1), _.chain(g))(), O.none)
    U.deepStrictEqual(pipe(_.none, _.chain(g))(), O.none)
  })

  it('alt', () => {
    U.deepStrictEqual(
      pipe(
        _.some(1),
        _.alt(() => _.some(2))
      )(),
      O.some(1)
    )
    U.deepStrictEqual(
      pipe(
        _.some(2),
        _.alt(() => _.none as _.IOOption<number>)
      )(),
      O.some(2)
    )
    U.deepStrictEqual(
      pipe(
        _.none,
        _.alt(() => _.some(1))
      )(),
      O.some(1)
    )
    U.deepStrictEqual(
      pipe(
        _.none,
        _.alt(() => _.none)
      )(),
      O.none
    )
  })

  it('zero', () => {
    U.deepStrictEqual(_.zero()(), O.none)
  })

  it('fromIO', () => {
    U.deepStrictEqual(_.fromIO(() => 1)(), O.some(1))
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('fromNullable', () => {
    U.deepStrictEqual(_.fromNullable(1)(), O.some(1))
    U.deepStrictEqual(_.fromNullable(null)(), O.none)
    U.deepStrictEqual(_.fromNullable(undefined)(), O.none)
  })

  it('fromNullableK', () => {
    const f = _.fromNullableK((n: number) => (n > 0 ? n : n === 0 ? null : undefined))
    U.deepStrictEqual(f(1)(), O.some(1))
    U.deepStrictEqual(f(0)(), O.none)
    U.deepStrictEqual(f(-1)(), O.none)
  })

  it('chainNullableK', () => {
    const f = _.chainNullableK((n: number) => (n > 0 ? n : n === 0 ? null : undefined))
    U.deepStrictEqual(f(_.of(1))(), O.some(1))
    U.deepStrictEqual(f(_.of(0))(), O.none)
    U.deepStrictEqual(f(_.of(-1))(), O.none)
  })

  it('fromPredicate', () => {
    const p = (n: number): boolean => n > 2
    const f = _.fromPredicate(p)
    U.deepStrictEqual(f(1)(), O.none)
    U.deepStrictEqual(f(3)(), O.some(3))
  })

  it('fromIOEither', () => {
    const pl = IE.left('a')
    const pr = IE.right('a')
    const fl = _.fromIOEither(pl)
    const fr = _.fromIOEither(pr)
    U.deepStrictEqual(fl(), O.none)
    U.deepStrictEqual(fr(), O.some('a'))
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('getOrElse', () => {
    U.deepStrictEqual(
      pipe(
        _.some(1),
        _.getOrElse(() => I.of(2))
      )(),
      1
    )
    U.deepStrictEqual(
      pipe(
        _.none,
        _.getOrElse(() => I.of(2))
      )(),
      2
    )
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('fromOptionK', () => {
    const f = _.fromOptionK((n: number) => (n > 0 ? O.some(n) : O.none))
    U.deepStrictEqual(f(1)(), O.some(1))
    U.deepStrictEqual(f(-1)(), O.none)
  })

  it('chainOptionK', () => {
    const f = _.chainOptionK((n: number) => (n > 0 ? O.some(n) : O.none))
    U.deepStrictEqual(f(_.some(1))(), O.some(1))
    U.deepStrictEqual(f(_.some(-1))(), O.none)
    U.deepStrictEqual(f(_.none)(), O.none)
  })

  describe('array utils', () => {
    const input: ReadonlyNonEmptyArray<string> = ['a', 'b']

    it('traverseReadonlyArrayWithIndex', () => {
      const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.some(a + i) : _.none))
      U.deepStrictEqual(pipe(RA.empty, f)(), O.some(RA.empty))
      U.deepStrictEqual(pipe(input, f)(), O.some(['a0', 'b1']))
      U.deepStrictEqual(pipe(['a', ''], f)(), O.none)
    })

    it('traverseReadonlyArrayWithIndex', () => {
      const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.some(a + i) : _.none))
      U.deepStrictEqual(pipe(RA.empty, f)(), O.some(RA.empty))
      U.deepStrictEqual(pipe(input, f)(), O.some(['a0', 'b1']))
      U.deepStrictEqual(pipe(['a', ''], f)(), O.none)
    })

    it('sequenceReadonlyArray', () => {
      const log: Array<number | string> = []
      const some = (n: number): _.IOOption<number> =>
        _.fromIO(() => {
          log.push(n)
          return n
        })
      const none = (s: string): _.IOOption<number> =>
        pipe(
          () => {
            log.push(s)
            return s
          },
          I.map(() => O.none)
        )
      U.deepStrictEqual(pipe([some(1), some(2)], _.traverseReadonlyArrayWithIndex(SK))(), O.some([1, 2]))
      U.deepStrictEqual(pipe([some(3), none('a')], _.traverseReadonlyArrayWithIndex(SK))(), O.none)
      U.deepStrictEqual(pipe([none('b'), some(4)], _.traverseReadonlyArrayWithIndex(SK))(), O.none)
      U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
    })
  })

  it('match', () => {
    const f = _.match(
      () => 'none',
      (a) => `some(${a})`
    )
    U.deepStrictEqual(pipe(_.some(1), f)(), 'some(1)')
    U.deepStrictEqual(pipe(_.none, f)(), 'none')
  })

  it('matchE', () => {
    const f = _.matchE(
      () => I.of('none'),
      (a) => I.of(`some(${a})`)
    )
    U.deepStrictEqual(pipe(_.some(1), f)(), 'some(1)')
    U.deepStrictEqual(pipe(_.none, f)(), 'none')
  })

  it('fromEitherK', () => {
    const f = (s: string) => (s.length <= 2 ? E.right(s + '!') : E.left(s.length))
    const g = _.fromEitherK(f)
    U.deepStrictEqual(g('')(), O.some('!'))
    U.deepStrictEqual(g('a')(), O.some('a!'))
    U.deepStrictEqual(g('aa')(), O.some('aa!'))
    U.deepStrictEqual(g('aaa')(), O.none)
  })

  it('chainEitherK', () => {
    const f = (s: string) => (s.length <= 2 ? E.right(s + '!') : E.left(s.length))
    const g = _.chainEitherK(f)
    U.deepStrictEqual(g(_.of(''))(), O.some('!'))
    U.deepStrictEqual(g(_.of('a'))(), O.some('a!'))
    U.deepStrictEqual(g(_.of('aa'))(), O.some('aa!'))
    U.deepStrictEqual(g(_.of('aaa'))(), O.none)
  })

  it('chainFirstEitherK', () => {
    const f = (s: string) => (s.length <= 2 ? E.right(s + '!') : E.left(s.length))
    const g = _.chainFirstEitherK(f)
    U.deepStrictEqual(g(_.of(''))(), O.some(''))
    U.deepStrictEqual(g(_.of('a'))(), O.some('a'))
    U.deepStrictEqual(g(_.of('aa'))(), O.some('aa'))
    U.deepStrictEqual(g(_.of('aaa'))(), O.none)
  })
})
