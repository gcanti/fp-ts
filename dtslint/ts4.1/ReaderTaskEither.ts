import * as _ from '../../src/ReaderTaskEither'
import * as RIO from '../../src/ReaderIO'
import * as RT from '../../src/ReaderTask'
import * as E from '../../src/Either'
import * as TE from '../../src/TaskEither'
import * as IOE from '../../src/IOEither'
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
  _.right('a'),
  _.flatMap(() => _.right(1))
)

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, never, number>
pipe(
  _.right('a') as _.ReaderTaskEither<{ a: string }, never, string>,
  _.flatMap(() => _.right(1) as _.ReaderTaskEither<{ b: number }, never, number>)
)

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.right('a') as _.ReaderTaskEither<{ a: string }, string, string>,
  _.flatMap(() => _.right(1) as _.ReaderTaskEither<{ b: number }, number, number>)
)

//
// -------------------------------------------------------------------------------------
//

//
// rightReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, never, boolean>
_.rightReaderIO(RIO.of(true) as RIO.ReaderIO<{ a: string }, boolean>)

//
// leftReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, boolean, never>
_.leftReaderIO(RIO.of(true) as RIO.ReaderIO<{ a: string }, boolean>)

//
// getOrElse
//

// $ExpectType ReaderTask<{ a: string; }, string | null>
pipe(_.right('a') as _.ReaderTaskEither<{ a: string }, string, string>, _.getOrElse(null))

//
// getOrElseReaderTask
//

// $ExpectType ReaderTask<{ a: string; } & { b: number; }, string | null>
pipe(
  _.right('a') as _.ReaderTaskEither<{ a: string }, string, string>,
  _.getOrElseReaderTask(RT.of(null) as RT.ReaderTask<{ b: number }, null>)
)

//
// flatMapEitherK
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.right('a') as _.ReaderTaskEither<string, string, string>,
  _.flatMapEither(() => E.right(1) as E.Either<number, number>)
)

//
// flatMapTaskEitherK
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.right('a') as _.ReaderTaskEither<string, string, string>,
  _.flatMapTaskEither(() => TE.right(1) as TE.TaskEither<number, number>)
)

//
// flatMapIOEitherK
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.right('a') as _.ReaderTaskEither<string, string, string>,
  _.flatMapIOEither(() => IOE.right(1) as IOE.IOEither<number, number>)
)

//
// do notation
//

// $ExpectType ReaderTaskEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right(1) as _.ReaderTaskEither<{ readonly a: number }, string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bind('a3', () => _.right(true) as _.ReaderTaskEither<{ readonly b: string }, number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType ReaderTaskEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right(1) as _.ReaderTaskEither<{ readonly a: number }, string, number>,
  _.bindTo('a1'),
  _.bindRight('a2', _.right('b')),
  _.bindRight('a3', _.right(true) as _.ReaderTaskEither<{ readonly b: string }, number, boolean>)
)

//
// Do
//

// $ExpectType ReaderTaskEither<unknown, string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.right(1) as _.ReaderTaskEither<unknown, string, number>),
  _.bind('a2', () => _.right('b') as _.ReaderTaskEither<unknown, string, string>)
)

//
// fromReaderIOK
//

// $ExpectType (a: boolean) => ReaderTaskEither<{ a: string; }, never, boolean>
_.liftReaderIO(
  (a: boolean) =>
    // tslint:disable-next-line: no-unnecessary-type-assertion
    RIO.of(a) as RIO.ReaderIO<{ a: string }, boolean>
)

//
// flatMapReaderIOKW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string, boolean>
pipe(
  _.right(1) as _.ReaderTaskEither<{ a: string }, string, number>,
  _.flatMapReaderIO(() => RIO.of(true) as RIO.ReaderIO<{ b: number }, boolean>)
)

//
// flatMapReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, number>
pipe(
  _.right(1) as _.ReaderTaskEither<{ a: string }, string, number>,
  _.flatMapReaderIO(() => RIO.of(1))
)

//
// rightReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, never, boolean>
_.rightReaderIO(RIO.of(true) as RIO.ReaderIO<{ a: string }, boolean>)

//
// leftReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, boolean, never>
_.leftReaderIO(RIO.of(true) as RIO.ReaderIO<{ a: string }, boolean>)

//
// fromReaderIOK
//

// $ExpectType (a: boolean) => ReaderTaskEither<{ a: string; }, never, boolean>
_.liftReaderIO(
  (a: boolean) =>
    // tslint:disable-next-line: no-unnecessary-type-assertion
    RIO.of(a) as RIO.ReaderIO<{ a: string }, boolean>
)

//
// flatMapReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string, boolean>
pipe(
  _.right(1) as _.ReaderTaskEither<{ a: string }, string, number>,
  _.flatMapReaderIO(() => RIO.of(true) as RIO.ReaderIO<{ b: number }, boolean>)
)

//
// flatMapReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, number>
pipe(
  _.right(1) as _.ReaderTaskEither<{ a: string }, string, number>,
  _.flatMapReaderIO(() => RIO.of(1))
)
