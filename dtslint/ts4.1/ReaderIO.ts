import * as _ from '../../src/ReaderIO'
import { pipe } from '../../src/Function'
// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderIO<{ r1: 'r1' }, (n: number) => boolean>
declare const fa: _.ReaderIO<{ r2: 'r2' }, number>
// $ExpectType ReaderIO<{ r1: "r1"; } & { r2: "r2"; }, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderIO<unknown, number>
pipe(
  _.of('a'),
  _.flatMap(() => _.of(1))
)

// $ExpectType ReaderIO<{ b: number; }, number>
pipe(
  _.of('a'),
  _.flatMap(() => _.of(1) as _.ReaderIO<{ b: number }, number>)
)

// $ExpectType ReaderIO<{ a: string; } & { b: number; }, number>
pipe(
  _.of('a') as _.ReaderIO<{ a: string }, string>,
  _.flatMap(() => _.of(1) as _.ReaderIO<{ b: number }, number>)
)
