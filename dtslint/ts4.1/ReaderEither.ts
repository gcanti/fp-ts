import * as _ from '../../src/ReaderEither'
import * as R from '../../src/Reader'
import * as E from '../../src/Either'
import { pipe } from '../../src/Function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderEither<{ r1: 'r1' }, string, (n: number) => boolean>
declare const fa: _.ReaderEither<{ r2: 'r2' }, Error, number>
// $ExpectType ReaderEither<{ r1: "r1"; } & { r2: "r2"; }, string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderEither<unknown, never, number>
pipe(
  _.succeed('a'),
  _.flatMap(() => _.succeed(1))
)

// $ExpectType ReaderEither<{ a: string; } & { b: number; }, never, number>
pipe(
  _.succeed('a') as _.ReaderEither<{ a: string }, never, string>,
  _.flatMap(() => _.succeed(1) as _.ReaderEither<{ b: number }, never, number>)
)

// $ExpectType ReaderEither<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.succeed('a') as _.ReaderEither<{ a: string }, string, string>,
  _.flatMap(() => _.succeed(1) as _.ReaderEither<{ b: number }, number, number>)
)

//
// -------------------------------------------------------------------------------------
//

//
// getOrElse
//

// $ExpectType Reader<{ a: string; }, string | null>
pipe(_.succeed('a') as _.ReaderEither<{ a: string }, string, string>, _.getOrElse(null))

//
// getOrElseReader
//

// $ExpectType Reader<{ a: string; } & { b: number; }, string | null>
pipe(
  _.succeed('a') as _.ReaderEither<{ a: string }, string, string>,
  _.getOrElseReader(R.succeed(null) as R.Reader<{ b: number }, null>)
)

//
// flatMapEitherK
//

// $ExpectType ReaderEither<string, string | number, number>
pipe(
  _.succeed('a') as _.ReaderEither<string, string, string>,
  _.flatMapEither(() => E.succeed(1) as E.Either<number, number>)
)

//
// do notation
//

// $ExpectType ReaderEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.ReaderEither<{ readonly a: number }, string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.succeed('b')),
  _.bind('a3', () => _.succeed(true) as _.ReaderEither<{ readonly b: string }, number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType ReaderEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.ReaderEither<{ readonly a: number }, string, number>,
  _.bindTo('a1'),
  _.bindRight('a2', _.succeed('b')),
  _.bindRight('a3', _.succeed(true) as _.ReaderEither<{ readonly b: string }, number, boolean>)
)

//
// Do
//

// $ExpectType ReaderEither<unknown, string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.succeed(1) as _.ReaderEither<unknown, string, number>),
  _.bind('a2', () => _.succeed('b') as _.ReaderEither<unknown, string, string>)
)
