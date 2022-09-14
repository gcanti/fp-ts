import * as _ from '../../src/StateReaderTaskEither'
import * as E from '../../src/Either'
import * as TE from '../../src/TaskEither'
import * as RTE from '../../src/ReaderTaskEither'
import * as IOE from '../../src/IOEither'
import { pipe } from '../../src/function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.StateReaderTaskEither<null, { r1: 'r1' }, string, (n: number) => boolean>
declare const fa: _.StateReaderTaskEither<null, { r2: 'r2' }, Error, number>
// $ExpectType StateReaderTaskEither<null, { r1: "r1"; } & { r2: "r2"; }, string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// chain widening
// -------------------------------------------------------------------------------------

// $ExpectType StateReaderTaskEither<unknown, unknown, never, number>
pipe(
  _.right('a'),
  _.chain(() => _.right(1))
)

// $ExpectType StateReaderTaskEither<null, { a: string; } & { b: number; }, never, number>
pipe(
  _.right<string, null, { a: string }>('a'),
  _.chain(() => _.right<number, null, { b: number }>(1))
)

// $ExpectType StateReaderTaskEither<null, { a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<string, null, { a: string }, string>('a'),
  _.chain(() => _.right<number, null, { b: number }, number>(1))
)

//
// -------------------------------------------------------------------------------------
//

//
// chainEitherK
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.chainEitherK(() => E.right<number, number>(1))
)

//
// chainTaskEitherKW
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.chainTaskEitherKW(() => TE.right<number, number>(1))
)

//
// chainReaderTaskEitherKW
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.chainReaderTaskEitherKW(() => RTE.right<number, string, number>(1))
)

//
// chainIOEitherKW
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.chainIOEitherKW(() => IOE.right<number, number>(1))
)

//
// do notation
//

// $ExpectType StateReaderTaskEither<void, { readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, void, { readonly a: number }, string>(1),
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bindW('a3', () => _.right<boolean, void, { readonly b: string }, number>(true))
)

//
// pipeable sequence S
//

// $ExpectType StateReaderTaskEither<void, { readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, void, { readonly a: number }, string>(1),
  _.bindTo('a1'),
  _.apS('a2', _.right('b')),
  _.apSW('a3', _.right<boolean, void, { readonly b: string }, number>(true))
)

//
// filterOrElse
//

// $ExpectType StateReaderTaskEither<{ d: Date; }, { c: boolean; }, "a1" | "a2", number>
pipe(
  _.left<'a1', { d: Date }, { c: boolean }, number>('a1'),
  _.filterOrElse(
    (result) => result > 0,
    () => 'a2' as const
  )
)
