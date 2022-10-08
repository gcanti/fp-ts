import * as _ from '../../src/Console'
import { pipe } from '../../src/Function'
import * as AR from '../../src/AsyncResult'

// $ExpectType AsyncResult<never, string>
pipe(
  AR.succeed('a'),
  AR.tap((a) => AR.fromSync(_.error(a)))
)

// $ExpectType AsyncResult<never, string>
pipe(
  AR.succeed('a'),
  AR.tap((a) => AR.fromSync(_.info(a)))
)

// $ExpectType AsyncResult<never, string>
pipe(
  AR.succeed('a'),
  AR.tap((a) => AR.fromSync(_.log(a)))
)

// $ExpectType AsyncResult<never, string>
pipe(
  AR.succeed('a'),
  AR.tap((a) => AR.fromSync(_.warn(a)))
)
