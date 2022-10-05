import * as _ from '../../src/IO'
import { pipe } from '../../src/Function'

//
// Do
//

// $ExpectType IO<{ readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.succeed(1)),
  _.bind('a2', () => _.succeed('b'))
)
