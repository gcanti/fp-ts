import * as E from '../src/Either'
import * as IO from '../src/IO'
import * as _ from '../src/ReaderT'
import * as TE from '../src/TaskEither'
import * as U from './util'

describe.concurrent('ReaderT', () => {
  it('fromNaturalTransformation', async () => {
    const fromReaderIO = _.fromNaturalTransformation<'IO', 'TaskEither'>(TE.fromIO)
    const f = (s: string): IO.IO<number> => IO.of(s.length)
    const fa = fromReaderIO(f)
    U.deepStrictEqual(await fa('a')(), E.right(1))
  })
})
