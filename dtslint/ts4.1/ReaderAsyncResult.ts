import * as _ from '../../src/ReaderAsyncResult'
import * as RIO from '../../src/ReaderSync'
import * as RT from '../../src/ReaderAsync'
import * as E from '../../src/Result'
import * as TE from '../../src/AsyncResult'
import * as IOE from '../../src/SyncResult'
import { pipe } from '../../src/Function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderAsyncResult<{ r1: 'r1' }, string, (n: number) => boolean>
declare const fa: _.ReaderAsyncResult<{ r2: 'r2' }, Error, number>
// $ExpectType ReaderAsyncResult<{ r1: "r1"; } & { r2: "r2"; }, string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderAsyncResult<unknown, never, number>
pipe(
  _.succeed('a'),
  _.flatMap(() => _.succeed(1))
)

// $ExpectType ReaderAsyncResult<{ a: string; } & { b: number; }, never, number>
pipe(
  _.succeed('a') as _.ReaderAsyncResult<{ a: string }, never, string>,
  _.flatMap(() => _.succeed(1) as _.ReaderAsyncResult<{ b: number }, never, number>)
)

// $ExpectType ReaderAsyncResult<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.succeed('a') as _.ReaderAsyncResult<{ a: string }, string, string>,
  _.flatMap(() => _.succeed(1) as _.ReaderAsyncResult<{ b: number }, number, number>)
)

//
// -------------------------------------------------------------------------------------
//

//
// fromReaderSync
//

// $ExpectType ReaderAsyncResult<{ a: string; }, never, boolean>
_.fromReaderSync(RIO.of(true) as RIO.ReaderSync<{ a: string }, boolean>)

//
// leftReaderSync
//

// $ExpectType ReaderAsyncResult<{ a: string; }, boolean, never>
_.failReaderSync(RIO.of(true) as RIO.ReaderSync<{ a: string }, boolean>)

//
// getOrElse
//

// $ExpectType ReaderAsync<{ a: string; }, string | null>
pipe(_.succeed('a') as _.ReaderAsyncResult<{ a: string }, string, string>, _.getOrElse(null))

//
// getOrElseReaderAsync
//

// $ExpectType ReaderAsync<{ a: string; } & { b: number; }, string | null>
pipe(
  _.succeed('a') as _.ReaderAsyncResult<{ a: string }, string, string>,
  _.getOrElseReaderAsync(RT.of(null) as RT.ReaderAsync<{ b: number }, null>)
)

//
// flatMapEitherK
//

// $ExpectType ReaderAsyncResult<string, string | number, number>
pipe(
  _.succeed('a') as _.ReaderAsyncResult<string, string, string>,
  _.flatMapResult(() => E.succeed(1) as E.Result<number, number>)
)

//
// flatMapAsyncResultK
//

// $ExpectType ReaderAsyncResult<string, string | number, number>
pipe(
  _.succeed('a') as _.ReaderAsyncResult<string, string, string>,
  _.flatMapAsyncResult(() => TE.succeed(1) as TE.AsyncResult<number, number>)
)

//
// flatMapSyncResult
//

// $ExpectType ReaderAsyncResult<string, string | number, number>
pipe(
  _.succeed('a') as _.ReaderAsyncResult<string, string, string>,
  _.flatMapSyncResult(() => IOE.succeed(1) as IOE.SyncResult<number, number>)
)

//
// do notation
//

// $ExpectType ReaderAsyncResult<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.ReaderAsyncResult<{ readonly a: number }, string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.succeed('b')),
  _.bind('a3', () => _.succeed(true) as _.ReaderAsyncResult<{ readonly b: string }, number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType ReaderAsyncResult<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.ReaderAsyncResult<{ readonly a: number }, string, number>,
  _.bindTo('a1'),
  _.bindRight('a2', _.succeed('b')),
  _.bindRight('a3', _.succeed(true) as _.ReaderAsyncResult<{ readonly b: string }, number, boolean>)
)

//
// Do
//

// $ExpectType ReaderAsyncResult<unknown, string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.succeed(1) as _.ReaderAsyncResult<unknown, string, number>),
  _.bind('a2', () => _.succeed('b') as _.ReaderAsyncResult<unknown, string, string>)
)

//
// fromReaderSyncK
//

// $ExpectType (a: boolean) => ReaderAsyncResult<{ a: string; }, never, boolean>
_.liftReaderSync(
  (a: boolean) =>
    // tslint:disable-next-line: no-unnecessary-type-assertion
    RIO.of(a) as RIO.ReaderSync<{ a: string }, boolean>
)

//
// flatMapReaderSyncKW
//

// $ExpectType ReaderAsyncResult<{ a: string; } & { b: number; }, string, boolean>
pipe(
  _.succeed(1) as _.ReaderAsyncResult<{ a: string }, string, number>,
  _.flatMapReaderSync(() => RIO.of(true) as RIO.ReaderSync<{ b: number }, boolean>)
)

//
// flatMapReaderSyncK
//

// $ExpectType ReaderAsyncResult<{ a: string; }, string, number>
pipe(
  _.succeed(1) as _.ReaderAsyncResult<{ a: string }, string, number>,
  _.flatMapReaderSync(() => RIO.of(1))
)

//
// fromReaderSync
//

// $ExpectType ReaderAsyncResult<{ a: string; }, never, boolean>
_.fromReaderSync(RIO.of(true) as RIO.ReaderSync<{ a: string }, boolean>)

//
// leftReaderSync
//

// $ExpectType ReaderAsyncResult<{ a: string; }, boolean, never>
_.failReaderSync(RIO.of(true) as RIO.ReaderSync<{ a: string }, boolean>)

//
// fromReaderSyncK
//

// $ExpectType (a: boolean) => ReaderAsyncResult<{ a: string; }, never, boolean>
_.liftReaderSync(
  (a: boolean) =>
    // tslint:disable-next-line: no-unnecessary-type-assertion
    RIO.of(a) as RIO.ReaderSync<{ a: string }, boolean>
)

//
// flatMapReaderSyncK
//

// $ExpectType ReaderAsyncResult<{ a: string; } & { b: number; }, string, boolean>
pipe(
  _.succeed(1) as _.ReaderAsyncResult<{ a: string }, string, number>,
  _.flatMapReaderSync(() => RIO.of(true) as RIO.ReaderSync<{ b: number }, boolean>)
)

//
// flatMapReaderSyncK
//

// $ExpectType ReaderAsyncResult<{ a: string; }, string, number>
pipe(
  _.succeed(1) as _.ReaderAsyncResult<{ a: string }, string, number>,
  _.flatMapReaderSync(() => RIO.of(1))
)
