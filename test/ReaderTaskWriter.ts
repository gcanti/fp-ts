import { pipe } from '../src/function'
import * as IO from '../src/IO'
import * as R from '../src/Reader'
import * as RT from '../src/ReaderTask'
import * as _ from '../src/ReaderTaskWriter'
import * as string from '../src/string'
import * as T from '../src/Task'
import { tuple } from '../src/tuple'
import * as U from './util'

const make = <A, W, R>(a: A, w: W): _.ReaderTaskWriter<R, W, A> => RT.of([a, w])

describe('ReaderTaskWriter', () => {
  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('fromReader', async () => {
    U.deepStrictEqual(await pipe(R.of(1), _.fromReader('a'))(undefined)(), [1, 'a'])
  })

  it('fromReaderTask', async () => {
    U.deepStrictEqual(await pipe(RT.of(1), _.fromReaderTask('a'))(undefined)(), [1, 'a'])
  })

  it('fromIO', async () => {
    U.deepStrictEqual(await pipe(IO.of(1), _.fromIO('a'))(undefined)(), [1, 'a'])
  })

  it('fromTask', async () => {
    U.deepStrictEqual(await pipe(T.of(1), _.fromTask('a'))(undefined)(), [1, 'a'])
  })

  it('tell', async () => {
    U.deepStrictEqual(await _.tell(1)(undefined)(), [undefined, 1])
  })

  // -------------------------------------------------------------------------------------
  // natural transformations
  // -------------------------------------------------------------------------------------

  it('fromWriter', async () => {
    U.deepStrictEqual(await _.fromWriter([1, 'a'])(undefined)(), [1, 'a'])
  })

  it('fromReaderWriter', async () => {
    U.deepStrictEqual(await _.fromReaderWriter(R.of([1, 'a']))(undefined)(), [1, 'a'])
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('swap', async () => {
    U.deepStrictEqual(await pipe(make(1, 'a'), _.swap)(undefined)(), ['a', 1])
  })

  it('listen', async () => {
    U.deepStrictEqual(await _.listen(make(1, 'a'))(undefined)(), [[1, 'a'], 'a'])
  })

  it('pass', async () => {
    U.deepStrictEqual(
      await _.pass(
        make(
          tuple(1, (w: string) => w + 'b'),
          'a'
        )
      )(undefined)(),
      [1, 'ab']
    )
  })

  it('listens', async () => {
    const fa: _.ReaderTaskWriter<unknown, string, number> = make(1, 'a')
    U.deepStrictEqual(
      await pipe(
        fa,
        _.listens((w) => w.length)
      )(undefined)(),
      [[1, 1], 'a']
    )
  })

  it('censor', async () => {
    const fa: _.ReaderTaskWriter<unknown, ReadonlyArray<string>, number> = make(1, ['a', 'b'])
    U.deepStrictEqual(
      await pipe(
        fa,
        _.censor((w) => w.filter((a) => a !== 'a'))
      )(undefined)(),
      [1, ['b']]
    )
  })

  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    U.deepStrictEqual(await pipe(make(1, 'a'), _.map(U.double))(undefined)(), [2, 'a'])
  })

  it('mapLeft', async () => {
    U.deepStrictEqual(await pipe(make('a', 1), _.mapLeft(U.double))(undefined)(), ['a', 2])
  })

  it('bimap', async () => {
    U.deepStrictEqual(await pipe(make(1, 2), _.bimap(U.double, U.double))(undefined)(), [2, 4])
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getPointed', async () => {
    const P = _.getPointed(string.Monoid)
    U.deepStrictEqual(await P.of(1)(undefined)(), [1, ''])
  })

  it('getApply', async () => {
    const A = _.getApply(RT.ApplyPar, string.Semigroup)
    const f = (s: string) => (n: number): boolean => s.length > n
    U.deepStrictEqual(await pipe(make('aa', 'a'), A.map(f), A.ap(make(1, 'b')))(undefined)(), [true, 'ab'])
  })

  it('getApplicative', async () => {
    const A = _.getApplicative(RT.ApplyPar, string.Monoid)
    const f = (s: string) => (n: number): boolean => s.length > n
    U.deepStrictEqual(await pipe(A.of('aa'), A.map(f), A.ap(A.of(1)))(undefined)(), [true, ''])
  })

  it('getChain', async () => {
    const C = _.getChain(string.Semigroup)
    const double = (n: number): _.ReaderTaskWriter<unknown, string, number> => make(n * 2, 'double')
    U.deepStrictEqual(await pipe(make(1, 'start'), C.chain(double))(undefined)(), [2, 'startdouble'])
  })

  it('getMonad', async () => {
    const M = _.getMonad(string.Monoid)
    const double = (n: number): _.ReaderTaskWriter<unknown, string, number> => M.of(n * 2)
    U.deepStrictEqual(await pipe(make(1, 'start'), M.chain(double))(undefined)(), [2, 'start'])
  })

  it('getFromIO', async () => {
    const F = _.getFromIO(string.Monoid)
    U.deepStrictEqual(await pipe(() => 1, F.fromIO)(undefined)(), [1, ''])
  })

  it('getFromTask', async () => {
    const F = _.getFromTask(string.Monoid)
    U.deepStrictEqual(await pipe(() => Promise.resolve(1), F.fromTask)(undefined)(), [1, ''])
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('evaluate', async () => {
    U.deepStrictEqual(await pipe(make(1, 'a'), _.evaluate)(undefined)(), 1)
  })

  it('execute', async () => {
    U.deepStrictEqual(await pipe(make(1, 'a'), _.execute)(undefined)(), 'a')
  })
})
