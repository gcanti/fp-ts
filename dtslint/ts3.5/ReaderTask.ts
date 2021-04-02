import * as _ from '../../src/ReaderTask'
import { pipe } from '../../src/function'

//
// Do
//

// $ExpectType ReaderTask<unknown, { readonly a: number; readonly b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of<unknown, number>(1)),
  _.bind('b', () => _.of<unknown, string>('b'))
)
