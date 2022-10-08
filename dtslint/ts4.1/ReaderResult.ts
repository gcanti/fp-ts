import * as _ from '../../src/ReaderResult'
import * as R from '../../src/Reader'
import * as E from '../../src/Result'
import { pipe } from '../../src/Function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderResult<{ r1: 'r1' }, string, (n: number) => boolean>
declare const fa: _.ReaderResult<{ r2: 'r2' }, Error, number>
// $ExpectType ReaderResult<{ r1: "r1"; } & { r2: "r2"; }, string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderResult<unknown, never, number>
pipe(
  _.succeed('a'),
  _.flatMap(() => _.succeed(1))
)

// $ExpectType ReaderResult<{ a: string; } & { b: number; }, never, number>
pipe(
  _.succeed('a') as _.ReaderResult<{ a: string }, never, string>,
  _.flatMap(() => _.succeed(1) as _.ReaderResult<{ b: number }, never, number>)
)

// $ExpectType ReaderResult<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.succeed('a') as _.ReaderResult<{ a: string }, string, string>,
  _.flatMap(() => _.succeed(1) as _.ReaderResult<{ b: number }, number, number>)
)

//
// -------------------------------------------------------------------------------------
//

//
// getOrElse
//

// $ExpectType Reader<{ a: string; }, string | null>
pipe(_.succeed('a') as _.ReaderResult<{ a: string }, string, string>, _.getOrElse(null))

//
// getOrElseReader
//

// $ExpectType Reader<{ a: string; } & { b: number; }, string | null>
pipe(
  _.succeed('a') as _.ReaderResult<{ a: string }, string, string>,
  _.getOrElseReader(R.of(null) as R.Reader<{ b: number }, null>)
)

//
// flatMapEitherK
//

// $ExpectType ReaderResult<string, string | number, number>
pipe(
  _.succeed('a') as _.ReaderResult<string, string, string>,
  _.flatMapResult(() => E.succeed(1) as E.Result<number, number>)
)

//
// do notation
//

// $ExpectType ReaderResult<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.ReaderResult<{ readonly a: number }, string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.succeed('b')),
  _.bind('a3', () => _.succeed(true) as _.ReaderResult<{ readonly b: string }, number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType ReaderResult<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.ReaderResult<{ readonly a: number }, string, number>,
  _.bindTo('a1'),
  _.bindRight('a2', _.succeed('b')),
  _.bindRight('a3', _.succeed(true) as _.ReaderResult<{ readonly b: string }, number, boolean>)
)

//
// Do
//

// $ExpectType ReaderResult<unknown, string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.succeed(1) as _.ReaderResult<unknown, string, number>),
  _.bind('a2', () => _.succeed('b') as _.ReaderResult<unknown, string, string>)
)
