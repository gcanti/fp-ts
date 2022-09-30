import * as _ from '../../src/ReaderTaskEither'
import * as RIO from '../../src/ReaderIO'
import * as RT from '../../src/ReaderTask'
import * as E from '../../src/Either'
import * as TE from '../../src/TaskEither'
import * as IOE from '../../src/IOEither'
import { identity, pipe } from '../../src/function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean
declare const fsn: _.ReaderTaskEither<null, boolean, string | number>
declare const fn: _.ReaderTaskEither<null, boolean, number>

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

// -------------------------------------------------------------------------------------
// fromRefinement
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTaskEither<unknown, string | number, string>
pipe(sn, _.liftPredicate(isString, identity))

// $ExpectType ReaderTaskEither<unknown, Error, string>
pipe(
  sn,
  _.liftPredicate(
    isString,
    (
      _n // $ExpectType string | number
    ) => new Error()
  )
)

pipe(
  sn,
  _.liftPredicate(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    identity
  )
)

// -------------------------------------------------------------------------------------
// fromPredicate
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTaskEither<unknown, string | number, string | number>
pipe(sn, _.liftPredicate(predicate, identity))

// $ExpectType ReaderTaskEither<unknown, Error, string | number>
pipe(
  sn,
  _.liftPredicate(predicate, () => new Error())
)

// $ExpectType ReaderTaskEither<unknown, number, number>
pipe(n, _.liftPredicate(predicate, identity))

pipe(
  n,
  _.liftPredicate(
    (
      _n // $ExpectType number
    ) => true,
    identity
  )
)

// -------------------------------------------------------------------------------------
// refine
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTaskEither<null, string | number | boolean, string>
pipe(fsn, _.filter(isString, identity))

// $ExpectType ReaderTaskEither<null, boolean | Error, string>
pipe(
  fsn,
  _.filter(
    isString,
    (
      _n // $ExpectType string | number
    ) => new Error()
  )
)

pipe(
  fsn,
  _.filter(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    identity
  )
)

// -------------------------------------------------------------------------------------
// filter
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTaskEither<null, string | number | boolean, string | number>
pipe(fsn, _.filter(predicate, identity))

// $ExpectType ReaderTaskEither<null, boolean | Error, string | number>
pipe(
  fsn,
  _.filter(predicate, () => new Error())
)

// $ExpectType ReaderTaskEither<null, number | boolean, number>
pipe(fn, _.filter(predicate, identity))

pipe(
  fn,
  _.filter(
    (
      _n // $ExpectType number
    ) => true,
    identity
  )
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
pipe(
  _.right('a') as _.ReaderTaskEither<{ a: string }, string, string>,
  _.getOrElse(() => null)
)

//
// getOrElseReaderTask
//

// $ExpectType ReaderTask<{ a: string; } & { b: number; }, string | null>
pipe(
  _.right('a') as _.ReaderTaskEither<{ a: string }, string, string>,
  _.getOrElseReaderTask(() => RT.of(null) as RT.ReaderTask<{ b: number }, null>)
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
// filter
//

// $ExpectType ReaderTaskEither<{ c: boolean; }, "a1" | "a2", number>
pipe(
  _.left('a1') as _.ReaderTaskEither<{ c: boolean }, 'a1', number>,
  _.filter(
    (result) => result > 0,
    () => 'a2' as const
  )
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
