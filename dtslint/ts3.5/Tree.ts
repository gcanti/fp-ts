import * as _ from '../../src/Tree'
import { pipe } from '../../src/function'

//
// Do
//

// $ExpectType Tree<{ a: number; b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of(1)),
  _.bind('b', () => _.of('b'))
)
