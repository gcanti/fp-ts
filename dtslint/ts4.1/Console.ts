import * as _ from '../../src/Console'
import { flow, pipe } from '../../src/function'
import * as TE from '../../src/TaskEither'

// $ExpectType TaskEither<never, string>
pipe(TE.right('a'), TE.tap(flow(_.error, TE.fromIO)))

// $ExpectType TaskEither<never, string>
pipe(TE.right('a'), TE.tap(flow(_.info, TE.fromIO)))

// $ExpectType TaskEither<never, string>
pipe(TE.right('a'), TE.tap(flow(_.log, TE.fromIO)))

// $ExpectType TaskEither<never, string>
pipe(TE.right('a'), TE.tap(flow(_.warn, TE.fromIO)))
