import * as _ from '../../src/Console'
import { pipe } from '../../src/f'
import * as TE from '../../src/TaskEither'

// $ExpectType TaskEither<never, string>
pipe(
  TE.right('a'),
  TE.tap((a) => TE.fromIO(_.error(a)))
)

// $ExpectType TaskEither<never, string>
pipe(
  TE.right('a'),
  TE.tap((a) => TE.fromIO(_.info(a)))
)

// $ExpectType TaskEither<never, string>
pipe(
  TE.right('a'),
  TE.tap((a) => TE.fromIO(_.log(a)))
)

// $ExpectType TaskEither<never, string>
pipe(
  TE.right('a'),
  TE.tap((a) => TE.fromIO(_.warn(a)))
)
