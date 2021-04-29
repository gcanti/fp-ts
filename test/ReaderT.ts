import * as E from '../src/Either'
import * as IO from '../src/IO'
import * as _ from '../src/ReaderT'
import * as S from '../src/State'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import * as TH from '../src/These'
import * as U from './util'

describe('ReaderT', () => {
  it('fromNaturalTransformation', async () => {
    const fromReaderIO = _.fromNaturalTransformation<IO.URI, TE.URI>(TE.fromIO)
    const f = (s: string): IO.IO<number> => IO.of(s.length)
    const fa = fromReaderIO(f)
    U.deepStrictEqual(await fa('a')(), E.right(1))
  })

  it('asksEitherK', async () => {
    const fromReaderEither = _.asksEitherK(TE.FromEither)
    const f = (s: string): E.Either<string, number> => (s.length > 0 ? E.right(s.length) : E.left(s))
    const fa = fromReaderEither(f)
    U.deepStrictEqual(await fa('a')(), E.right(1))
    U.deepStrictEqual(await fa('')(), E.left(''))
  })

  it('asksIOK', async () => {
    const fromReaderIO = _.asksIOK(TE.FromIO)
    const f = (s: string): IO.IO<number> => IO.of(s.length)
    const fa = fromReaderIO(f)
    U.deepStrictEqual(await fa('a')(), E.right(1))
  })

  it('asksStateK', () => {
    const fromReaderState = _.asksStateK(S.FromState)
    const f = (s: string): S.State<string, number> => S.of(s.length)
    const fa = fromReaderState(f)
    U.deepStrictEqual(fa('aa')('b'), [2, 'b'])
  })

  it('asksTaskK', async () => {
    const fromReaderTask = _.asksTaskK(TE.FromTask)
    const f = (s: string): T.Task<number> => T.of(s.length)
    const fa = fromReaderTask(f)
    U.deepStrictEqual(await fa('a')(), E.right(1))
  })

  it('asksTheseK', () => {
    const fromReaderThese = _.asksTheseK(TH.FromThese)
    const f = (s: string): TH.These<string, number> => (s.length > 0 ? TH.right(s.length) : TH.left(s))
    const fa = fromReaderThese(f)
    U.deepStrictEqual(fa('a'), TH.right(1))
    U.deepStrictEqual(fa(''), TH.left(''))
  })
})
