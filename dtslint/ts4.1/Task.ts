import * as _ from '../../src/Task'
import { pipe } from '../../src/function'

//
// Do
//

// $ExpectType Task<{ readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of(1)),
  _.bind('a2', () => _.of('b'))
)
