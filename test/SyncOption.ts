import * as E from '../src/Result'
import { pipe } from '../src/Function'
import * as I from '../src/Sync'
import * as IE from '../src/SyncResult'
import * as _ from '../src/SyncOption'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as U from './util'

describe('SyncOption', () => {
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

  it('flatMap', () => {
    const f = (n: number) => _.some(n * 2)
    const g = () => _.none
    U.deepStrictEqual(pipe(_.some(1), _.flatMap(f))(), O.some(2))
    U.deepStrictEqual(pipe(_.none, _.flatMap(f))(), O.none)
    U.deepStrictEqual(pipe(_.some(1), _.flatMap(g))(), O.none)
    U.deepStrictEqual(pipe(_.none, _.flatMap(g))(), O.none)
  })

  it('orElse', () => {
    U.deepStrictEqual(pipe(_.some(1), _.orElse(_.some(2)))(), O.some(1))
    U.deepStrictEqual(pipe(_.some(2), _.orElse(_.none as _.SyncOption<number>))(), O.some(2))
    U.deepStrictEqual(pipe(_.none, _.orElse(_.some(1)))(), O.some(1))
    U.deepStrictEqual(pipe(_.none, _.orElse(_.none))(), O.none)
  })

  it('fromSync', () => {
    U.deepStrictEqual(_.fromSync(() => 1)(), O.some(1))
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('fromNullable', () => {
    U.deepStrictEqual(_.fromNullable(1)(), O.some(1))
    U.deepStrictEqual(_.fromNullable(null)(), O.none)
    U.deepStrictEqual(_.fromNullable(undefined)(), O.none)
  })

  it('liftNullable', () => {
    const f = _.liftNullable((n: number) => (n > 0 ? n : n === 0 ? null : undefined))
    U.deepStrictEqual(f(1)(), O.some(1))
    U.deepStrictEqual(f(0)(), O.none)
    U.deepStrictEqual(f(-1)(), O.none)
  })

  it('flatMapNullable', () => {
    const f = _.flatMapNullable((n: number) => (n > 0 ? n : n === 0 ? null : undefined))
    U.deepStrictEqual(f(_.succeed(1))(), O.some(1))
    U.deepStrictEqual(f(_.succeed(0))(), O.none)
    U.deepStrictEqual(f(_.succeed(-1))(), O.none)
  })

  it('fromPredicate', () => {
    const p = (n: number): boolean => n > 2
    const f = _.liftPredicate(p)
    U.deepStrictEqual(f(1)(), O.none)
    U.deepStrictEqual(f(3)(), O.some(3))
  })

  it('fromSyncResult', () => {
    const pl = IE.fail('a')
    const pr = IE.succeed('a')
    const fl = _.fromSyncResult(pl)
    const fr = _.fromSyncResult(pr)
    U.deepStrictEqual(fl(), O.none)
    U.deepStrictEqual(fr(), O.some('a'))
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('getOrElseIO', () => {
    U.deepStrictEqual(pipe(_.some(1), _.getOrElseSync(I.succeed(2)))(), 1)
    U.deepStrictEqual(pipe(_.none, _.getOrElseSync(I.succeed(2)))(), 2)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('liftOption', () => {
    const f = _.liftOption((n: number) => (n > 0 ? O.some(n) : O.none))
    U.deepStrictEqual(f(1)(), O.some(1))
    U.deepStrictEqual(f(-1)(), O.none)
  })

  it('match', () => {
    const f = _.match(
      () => 'none',
      (a) => `some(${a})`
    )
    U.deepStrictEqual(pipe(_.some(1), f)(), 'some(1)')
    U.deepStrictEqual(pipe(_.none, f)(), 'none')
  })

  it('matchIO', () => {
    const f = _.matchSync(
      () => I.succeed('none'),
      (a) => I.succeed(`some(${a})`)
    )
    U.deepStrictEqual(pipe(_.some(1), f)(), 'some(1)')
    U.deepStrictEqual(pipe(_.none, f)(), 'none')
  })

  it('liftResult', () => {
    const f = (s: string) => (s.length <= 2 ? E.succeed(s + '!') : E.fail(s.length))
    const g = _.liftResult(f)
    U.deepStrictEqual(g('')(), O.some('!'))
    U.deepStrictEqual(g('a')(), O.some('a!'))
    U.deepStrictEqual(g('aa')(), O.some('aa!'))
    U.deepStrictEqual(g('aaa')(), O.none)
  })

  it('flatMapResult', () => {
    const f = (s: string) => (s.length <= 2 ? E.succeed(s + '!') : E.fail(s.length))
    const g = _.flatMapResult(f)
    U.deepStrictEqual(g(_.succeed(''))(), O.some('!'))
    U.deepStrictEqual(g(_.succeed('a'))(), O.some('a!'))
    U.deepStrictEqual(g(_.succeed('aa'))(), O.some('aa!'))
    U.deepStrictEqual(g(_.succeed('aaa'))(), O.none)
  })

  it('tapError', () => {
    const log: Array<number> = []
    U.deepStrictEqual(pipe(_.succeed(1), _.tapError(_.succeed(2)))(), O.some(1))
    U.deepStrictEqual(pipe(_.succeed(1), _.tapError(_.none))(), O.some(1))
    U.deepStrictEqual(
      pipe(
        _.none,
        _.tapError(() => {
          log.push(2)
          return O.some(2)
        })
      )(),
      O.none
    )
    U.deepStrictEqual(pipe(_.none, _.tapError(_.none))(), O.none)
    U.deepStrictEqual(log, [2])
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyArrayWithIndex', () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.some(a + i) : _.none))
    U.deepStrictEqual(pipe(RA.empty, f)(), O.some(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), O.some(['a0', 'b1']))
    U.deepStrictEqual(pipe(['a', ''], f)(), O.none)
  })

  it('traverseNonEmptyReadonlyArray', () => {
    const f = _.traverseNonEmptyReadonlyArray((a: string) => (a.length > 0 ? _.some(a) : _.none))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), O.some(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f)(), O.none)
  })

  it('sequenceReadonlyArray', () => {
    const log: Array<number | string> = []
    const some = (n: number): _.SyncOption<number> =>
      _.fromSync(() => {
        log.push(n)
        return n
      })
    const none = (s: string): _.SyncOption<number> =>
      pipe(
        () => {
          log.push(s)
          return s
        },
        I.map(() => O.none)
      )
    U.deepStrictEqual(pipe([some(1), some(2)], _.sequenceReadonlyArray)(), O.some([1, 2]))
    U.deepStrictEqual(pipe([some(3), none('a')], _.sequenceReadonlyArray)(), O.none)
    U.deepStrictEqual(pipe([none('b'), some(4)], _.sequenceReadonlyArray)(), O.none)
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
  })
})
