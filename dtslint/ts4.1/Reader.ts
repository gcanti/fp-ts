import * as _ from '../../src/Reader'
import { pipe } from '../../src/Function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.Reader<{ r1: 'r1' }, (n: number) => boolean>
declare const fa: _.Reader<{ r2: 'r2' }, number>
// $ExpectType Reader<{ r1: "r1"; } & { r2: "r2"; }, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType Reader<unknown, number>
pipe(
  _.of('a'),
  _.flatMap(() => _.of(1))
)

// $ExpectType Reader<{ b: number; }, number>
pipe(
  _.of('a'),
  _.flatMap(() => _.of(1) as _.Reader<{ b: number }, number>)
)

// $ExpectType Reader<{ a: string; } & { b: number; }, number>
pipe(
  _.of('a') as _.Reader<{ a: string }, string>,
  _.flatMap(() => _.of(1) as _.Reader<{ b: number }, number>)
)

//
// -------------------------------------------------------------------------------------
//

//
// Do
//

// $ExpectType Reader<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of(1) as _.Reader<string, number>),
  _.bind('a2', () => _.of('b') as _.Reader<string, string>)
)
