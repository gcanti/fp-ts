import * as _ from '../../src/StateReaderAsyncResult'
import * as E from '../../src/Result'
import * as TE from '../../src/AsyncResult'
import * as RTE from '../../src/ReaderAsyncResult'
import * as IOE from '../../src/SyncResult'
import { pipe } from '../../src/Function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.StateReaderAsyncResult<null, { r1: 'r1' }, string, (n: number) => boolean>
declare const fa: _.StateReaderAsyncResult<null, { r2: 'r2' }, Error, number>
// $ExpectType StateReaderAsyncResult<null, { r1: "r1"; } & { r2: "r2"; }, string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType StateReaderAsyncResult<unknown, unknown, never, number>
pipe(
  _.succeed('a'),
  _.flatMap(() => _.succeed(1))
)

// $ExpectType StateReaderAsyncResult<null, { a: string; } & { b: number; }, never, number>
pipe(
  _.succeed('a') as _.StateReaderAsyncResult<null, { a: string }, never, string>,
  _.flatMap(() => _.succeed(1) as _.StateReaderAsyncResult<null, { b: number }, never, number>)
)

// $ExpectType StateReaderAsyncResult<null, { a: string; } & { b: number; }, string | number, number>
pipe(
  _.succeed('a') as _.StateReaderAsyncResult<null, { a: string }, string, string>,
  _.flatMap(() => _.succeed(1) as _.StateReaderAsyncResult<null, { b: number }, number, number>)
)

//
// -------------------------------------------------------------------------------------
//

//
// flatMapEitherK
//

// $ExpectType StateReaderAsyncResult<string, string, string | number, number>
pipe(
  _.succeed('a') as _.StateReaderAsyncResult<string, string, string, string>,
  _.flatMapResult(() => E.succeed(1) as E.Result<number, number>)
)

//
// flatMapAsyncResultK
//

// $ExpectType StateReaderAsyncResult<string, string, string | number, number>
pipe(
  _.succeed('a') as _.StateReaderAsyncResult<string, string, string, string>,
  _.flatMapAsyncResult(() => TE.succeed(1) as TE.AsyncResult<number, number>)
)

//
// flatMapReaderAsyncResultK
//

// $ExpectType StateReaderAsyncResult<string, string, string | number, number>
pipe(
  _.succeed('a') as _.StateReaderAsyncResult<string, string, string, string>,
  _.flatMapReaderAsyncResult(() => RTE.succeed(1) as RTE.ReaderAsyncResult<string, number, number>)
)

//
// flatMapSyncResultK
//

// $ExpectType StateReaderAsyncResult<string, string, string | number, number>
pipe(
  _.succeed('a') as _.StateReaderAsyncResult<string, string, string, string>,
  _.flatMapSyncResult(() => IOE.succeed(1) as IOE.SyncResult<number, number>)
)

//
// do notation
//

// $ExpectType StateReaderAsyncResult<void, { readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.StateReaderAsyncResult<void, { readonly a: number }, string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.succeed('b')),
  _.bind('a3', () => _.succeed(true) as _.StateReaderAsyncResult<void, { readonly b: string }, number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType StateReaderAsyncResult<void, { readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.StateReaderAsyncResult<void, { readonly a: number }, string, number>,
  _.bindTo('a1'),
  _.bindRight('a2', _.succeed('b')),
  _.bindRight('a3', _.succeed(true) as _.StateReaderAsyncResult<void, { readonly b: string }, number, boolean>)
)
