import * as _ from '../../src/Async'
import { pipe } from '../../src/Function'

//
// Do
//

// $ExpectType Async<{ readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.succeed(1)),
  _.bind('a2', () => _.succeed('b'))
)
