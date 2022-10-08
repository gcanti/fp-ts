import * as _ from '../../src/ReaderSync'
import { pipe } from '../../src/Function'
// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderSync<{ r1: 'r1' }, (n: number) => boolean>
declare const fa: _.ReaderSync<{ r2: 'r2' }, number>
// $ExpectType ReaderSync<{ r1: "r1"; } & { r2: "r2"; }, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderSync<unknown, number>
pipe(
  _.of('a'),
  _.flatMap(() => _.of(1))
)

// $ExpectType ReaderSync<{ b: number; }, number>
pipe(
  _.of('a'),
  _.flatMap(() => _.of(1) as _.ReaderSync<{ b: number }, number>)
)

// $ExpectType ReaderSync<{ a: string; } & { b: number; }, number>
pipe(
  _.of('a') as _.ReaderSync<{ a: string }, string>,
  _.flatMap(() => _.of(1) as _.ReaderSync<{ b: number }, number>)
)
