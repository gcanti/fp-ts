import { pipe } from '../../src/Function'
import * as AR from '../../src/AsyncResult'

// $ExpectType AsyncResult<never, string>
pipe(AR.of('a'), AR.tap(AR.log))

// $ExpectType AsyncResult<never, string>
pipe(AR.of('a'), AR.tap(AR.logError))
