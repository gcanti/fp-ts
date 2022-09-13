import * as _ from '../../src/ReaderTask'
import { pipe } from '../../src/function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderTask<{ r1: 'r1' }, (n: number) => boolean>
declare const fa: _.ReaderTask<{ r2: 'r2' }, number>
// $ExpectType ReaderTask<{ r1: "r1"; } & { r2: "r2"; }, boolean>
_.ap(fa)(fab)

//
// -------------------------------------------------------------------------------------
//

//
// Do
//

// $ExpectType ReaderTask<unknown, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of<number, unknown>(1)),
  _.bind('a2', () => _.of<string, unknown>('b'))
)
