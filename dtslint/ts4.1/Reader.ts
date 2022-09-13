import * as _ from '../../src/Reader'
import { pipe } from '../../src/function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.Reader<{ r1: 'r1' }, (n: number) => boolean>
declare const fa: _.Reader<{ r2: 'r2' }, number>
// $ExpectType Reader<{ r1: "r1"; } & { r2: "r2"; }, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// chain widening
// -------------------------------------------------------------------------------------

// $ExpectType Reader<unknown, number>
pipe(
  _.of('a'),
  _.chain(() => _.of(1))
)

// $ExpectType Reader<{ b: number; }, number>
pipe(
  _.of('a'),
  _.chain(() => _.of<number, { b: number }>(1))
)

// $ExpectType Reader<{ a: string; } & { b: number; }, number>
pipe(
  _.of<string, { a: string }>('a'),
  _.chain(() => _.of<number, { b: number }>(1))
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
  _.bind('a1', () => _.of<number, string>(1)),
  _.bind('a2', () => _.of<string, string>('b'))
)
