import * as _ from '../../src/StateReaderTaskEither'
import * as E from '../../src/Either'
import * as TE from '../../src/TaskEither'
import * as RTE from '../../src/ReaderTaskEither'
import * as IOE from '../../src/IOEither'
import { pipe } from '../../src/Function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.StateReaderTaskEither<null, { r1: 'r1' }, string, (n: number) => boolean>
declare const fa: _.StateReaderTaskEither<null, { r2: 'r2' }, Error, number>
// $ExpectType StateReaderTaskEither<null, { r1: "r1"; } & { r2: "r2"; }, string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType StateReaderTaskEither<unknown, unknown, never, number>
pipe(
  _.right('a'),
  _.flatMap(() => _.right(1))
)

// $ExpectType StateReaderTaskEither<null, { a: string; } & { b: number; }, never, number>
pipe(
  _.right('a') as _.StateReaderTaskEither<null, { a: string }, never, string>,
  _.flatMap(() => _.right(1) as _.StateReaderTaskEither<null, { b: number }, never, number>)
)

// $ExpectType StateReaderTaskEither<null, { a: string; } & { b: number; }, string | number, number>
pipe(
  _.right('a') as _.StateReaderTaskEither<null, { a: string }, string, string>,
  _.flatMap(() => _.right(1) as _.StateReaderTaskEither<null, { b: number }, number, number>)
)

//
// -------------------------------------------------------------------------------------
//

//
// flatMapEitherK
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right('a') as _.StateReaderTaskEither<string, string, string, string>,
  _.flatMapEither(() => E.right(1) as E.Either<number, number>)
)

//
// flatMapTaskEitherK
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right('a') as _.StateReaderTaskEither<string, string, string, string>,
  _.flatMapTaskEither(() => TE.right(1) as TE.TaskEither<number, number>)
)

//
// flatMapReaderTaskEitherK
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right('a') as _.StateReaderTaskEither<string, string, string, string>,
  _.flatMapReaderTaskEither(() => RTE.right(1) as RTE.ReaderTaskEither<string, number, number>)
)

//
// flatMapIOEitherK
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right('a') as _.StateReaderTaskEither<string, string, string, string>,
  _.flatMapIOEither(() => IOE.right(1) as IOE.IOEither<number, number>)
)

//
// do notation
//

// $ExpectType StateReaderTaskEither<void, { readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right(1) as _.StateReaderTaskEither<void, { readonly a: number }, string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bind('a3', () => _.right(true) as _.StateReaderTaskEither<void, { readonly b: string }, number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType StateReaderTaskEither<void, { readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right(1) as _.StateReaderTaskEither<void, { readonly a: number }, string, number>,
  _.bindTo('a1'),
  _.bindRight('a2', _.right('b')),
  _.bindRight('a3', _.right(true) as _.StateReaderTaskEither<void, { readonly b: string }, number, boolean>)
)
