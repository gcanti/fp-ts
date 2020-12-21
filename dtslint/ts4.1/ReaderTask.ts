import * as _ from '../../src/ReaderTask'
import { pipe } from '../../src/function'

//
// Do
//

// $ExpectType ReaderTask<unknown, { a: number; b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of<number, unknown>(1)),
  _.bind('b', () => _.of<string, unknown>('b'))
)
