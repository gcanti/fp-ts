import * as _ from '../../src/StateReaderTaskEither'
import * as E from '../../src/Either'
import * as TE from '../../src/TaskEither'
import * as RTE from '../../src/ReaderTaskEither'
import * as IOE from '../../src/IOEither'
import { identity, pipe } from '../../src/f'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean
declare const fsn: _.StateReaderTaskEither<undefined, null, boolean, string | number>
declare const fn: _.StateReaderTaskEither<undefined, null, boolean, number>

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

// -------------------------------------------------------------------------------------
// fromRefinement
// -------------------------------------------------------------------------------------

// $ExpectType StateReaderTaskEither<unknown, unknown, string | number, string>
pipe(sn, _.liftPredicate(isString, identity))

// $ExpectType StateReaderTaskEither<unknown, unknown, Error, string>
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

// $ExpectType StateReaderTaskEither<unknown, unknown, string | number, string | number>
pipe(sn, _.liftPredicate(predicate, identity))

// $ExpectType StateReaderTaskEither<unknown, unknown, Error, string | number>
pipe(
  sn,
  _.liftPredicate(predicate, () => new Error())
)

// $ExpectType StateReaderTaskEither<unknown, unknown, number, number>
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

// $ExpectType StateReaderTaskEither<undefined, null, string | number | boolean, string>
pipe(fsn, _.filter(isString, identity))

// $ExpectType StateReaderTaskEither<undefined, null, boolean | Error, string>
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

// $ExpectType StateReaderTaskEither<undefined, null, string | number | boolean, string | number>
pipe(fsn, _.filter(predicate, identity))

// $ExpectType StateReaderTaskEither<undefined, null, boolean | Error, string | number>
pipe(
  fsn,
  _.filter(predicate, () => new Error())
)

// $ExpectType StateReaderTaskEither<undefined, null, number | boolean, number>
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

//
// filter
//

// $ExpectType StateReaderTaskEither<{ d: Date; }, { c: boolean; }, "a1" | "a2", number>
pipe(
  _.left('a1') as _.StateReaderTaskEither<{ d: Date }, { c: boolean }, 'a1', number>,
  _.filter(
    (result) => result > 0,
    () => 'a2' as const
  )
)
