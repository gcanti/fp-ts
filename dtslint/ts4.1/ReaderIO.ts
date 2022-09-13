import * as _ from '../../src/ReaderIO'
import { pipe } from '../../src/function'
// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderIO<{ r1: 'r1' }, (n: number) => boolean>
declare const fa: _.ReaderIO<{ r2: 'r2' }, number>
// $ExpectType ReaderIO<{ r1: "r1"; } & { r2: "r2"; }, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// chain widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderIO<unknown, number>
pipe(
  _.of('a'),
  _.chain(() => _.of(1))
)

// $ExpectType ReaderIO<{ b: number; }, number>
pipe(
  _.of('a'),
  _.chain(() => _.of<number, { b: number }>(1))
)

// $ExpectType ReaderIO<{ a: string; } & { b: number; }, number>
pipe(
  _.of<string, { a: string }>('a'),
  _.chain(() => _.of<number, { b: number }>(1))
)
