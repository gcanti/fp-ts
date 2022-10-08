import * as _ from '../../src/Sync'
import { pipe } from '../../src/Function'

//
// Do
//

// $ExpectType Sync<{ readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of(1)),
  _.bind('a2', () => _.of('b'))
)
