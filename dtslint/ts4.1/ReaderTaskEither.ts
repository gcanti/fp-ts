import * as _ from '../../src/ReaderTaskEither'
import * as RIO from '../../src/ReaderIO'
import * as RT from '../../src/ReaderTask'
import * as E from '../../src/Result'
import * as TE from '../../src/TaskEither'
import * as IOE from '../../src/SyncResult'
import { pipe } from '../../src/Function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderTaskEither<{ r1: 'r1' }, string, (n: number) => boolean>
declare const fa: _.ReaderTaskEither<{ r2: 'r2' }, Error, number>
// $ExpectType ReaderTaskEither<{ r1: "r1"; } & { r2: "r2"; }, string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTaskEither<unknown, never, number>
pipe(
  _.succeed('a'),
  _.flatMap(() => _.succeed(1))
)

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, never, number>
pipe(
  _.succeed('a') as _.ReaderTaskEither<{ a: string }, never, string>,
  _.flatMap(() => _.succeed(1) as _.ReaderTaskEither<{ b: number }, never, number>)
)

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.succeed('a') as _.ReaderTaskEither<{ a: string }, string, string>,
  _.flatMap(() => _.succeed(1) as _.ReaderTaskEither<{ b: number }, number, number>)
)

//
// -------------------------------------------------------------------------------------
//

//
// fromReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, never, boolean>
_.fromReaderIO(RIO.succeed(true) as RIO.ReaderIO<{ a: string }, boolean>)

//
// leftReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, boolean, never>
_.failReaderIO(RIO.succeed(true) as RIO.ReaderIO<{ a: string }, boolean>)

//
// getOrElse
//

// $ExpectType ReaderTask<{ a: string; }, string | null>
pipe(_.succeed('a') as _.ReaderTaskEither<{ a: string }, string, string>, _.getOrElse(null))

//
// getOrElseReaderTask
//

// $ExpectType ReaderTask<{ a: string; } & { b: number; }, string | null>
pipe(
  _.succeed('a') as _.ReaderTaskEither<{ a: string }, string, string>,
  _.getOrElseReaderTask(RT.succeed(null) as RT.ReaderTask<{ b: number }, null>)
)

//
// flatMapEitherK
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.succeed('a') as _.ReaderTaskEither<string, string, string>,
  _.flatMapEither(() => E.succeed(1) as E.Result<number, number>)
)

//
// flatMapTaskEitherK
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.succeed('a') as _.ReaderTaskEither<string, string, string>,
  _.flatMapTaskEither(() => TE.succeed(1) as TE.TaskEither<number, number>)
)

//
// flatMapSyncResult
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.succeed('a') as _.ReaderTaskEither<string, string, string>,
  _.flatMapSyncResult(() => IOE.succeed(1) as IOE.SyncResult<number, number>)
)

//
// do notation
//

// $ExpectType ReaderTaskEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.ReaderTaskEither<{ readonly a: number }, string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.succeed('b')),
  _.bind('a3', () => _.succeed(true) as _.ReaderTaskEither<{ readonly b: string }, number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType ReaderTaskEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.ReaderTaskEither<{ readonly a: number }, string, number>,
  _.bindTo('a1'),
  _.bindRight('a2', _.succeed('b')),
  _.bindRight('a3', _.succeed(true) as _.ReaderTaskEither<{ readonly b: string }, number, boolean>)
)

//
// Do
//

// $ExpectType ReaderTaskEither<unknown, string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.succeed(1) as _.ReaderTaskEither<unknown, string, number>),
  _.bind('a2', () => _.succeed('b') as _.ReaderTaskEither<unknown, string, string>)
)

//
// fromReaderIOK
//

// $ExpectType (a: boolean) => ReaderTaskEither<{ a: string; }, never, boolean>
_.liftReaderIO(
  (a: boolean) =>
    // tslint:disable-next-line: no-unnecessary-type-assertion
    RIO.succeed(a) as RIO.ReaderIO<{ a: string }, boolean>
)

//
// flatMapReaderIOKW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string, boolean>
pipe(
  _.succeed(1) as _.ReaderTaskEither<{ a: string }, string, number>,
  _.flatMapReaderIO(() => RIO.succeed(true) as RIO.ReaderIO<{ b: number }, boolean>)
)

//
// flatMapReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, number>
pipe(
  _.succeed(1) as _.ReaderTaskEither<{ a: string }, string, number>,
  _.flatMapReaderIO(() => RIO.succeed(1))
)

//
// fromReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, never, boolean>
_.fromReaderIO(RIO.succeed(true) as RIO.ReaderIO<{ a: string }, boolean>)

//
// leftReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, boolean, never>
_.failReaderIO(RIO.succeed(true) as RIO.ReaderIO<{ a: string }, boolean>)

//
// fromReaderIOK
//

// $ExpectType (a: boolean) => ReaderTaskEither<{ a: string; }, never, boolean>
_.liftReaderIO(
  (a: boolean) =>
    // tslint:disable-next-line: no-unnecessary-type-assertion
    RIO.succeed(a) as RIO.ReaderIO<{ a: string }, boolean>
)

//
// flatMapReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string, boolean>
pipe(
  _.succeed(1) as _.ReaderTaskEither<{ a: string }, string, number>,
  _.flatMapReaderIO(() => RIO.succeed(true) as RIO.ReaderIO<{ b: number }, boolean>)
)

//
// flatMapReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, number>
pipe(
  _.succeed(1) as _.ReaderTaskEither<{ a: string }, string, number>,
  _.flatMapReaderIO(() => RIO.succeed(1))
)
