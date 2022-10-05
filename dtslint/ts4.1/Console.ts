import * as _ from '../../src/Console'
import { pipe } from '../../src/Function'
import * as TE from '../../src/AsyncResult'

// $ExpectType AsyncResult<never, string>
pipe(
  TE.succeed('a'),
  TE.tap((a) => TE.fromSync(_.error(a)))
)

// $ExpectType AsyncResult<never, string>
pipe(
  TE.succeed('a'),
  TE.tap((a) => TE.fromSync(_.info(a)))
)

// $ExpectType AsyncResult<never, string>
pipe(
  TE.succeed('a'),
  TE.tap((a) => TE.fromSync(_.log(a)))
)

// $ExpectType AsyncResult<never, string>
pipe(
  TE.succeed('a'),
  TE.tap((a) => TE.fromSync(_.warn(a)))
)
