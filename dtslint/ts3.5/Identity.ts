import * as _ from '../../src/Identity'
import { pipe } from '../../src/function'

//
// Do
//

// $ExpectType { a: number; b: string; }
pipe(
  _.Do,
  _.bind('a', () => _.of(1)),
  _.bind('b', () => _.of('b'))
)
