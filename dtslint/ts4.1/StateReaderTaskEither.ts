import * as _ from '../../src/StateReaderTaskEither'
import * as E from '../../src/Either'
import * as TE from '../../src/TaskEither'
import * as RTE from '../../src/ReaderTaskEither'
import * as IOE from '../../src/IOEither'
import { pipe } from '../../src/function'

declare function modifyA<R extends { a: string }>(r: R): R

//
// local
//

// $ExpectType StateReaderTaskEither<boolean, { a: string; }, number, string>
pipe(
  _.of<string, boolean, { a: string }, number>('a'),
  _.local((env) => ({
    a: env.a
  }))
)

// $ExpectType StateReaderTaskEither<boolean, { b: string; }, number, string>
pipe(
  _.of<string, boolean, { a: string }, number>('a'),
  _.local((env: { b: string }) => ({
    a: env.b
  }))
)

// $ExpectType StateReaderTaskEither<boolean, { b: string; }, number, string>
pipe(
  _.of<string, boolean, { a: string; b: string }, number>('a'),
  _.local((env: { b: string }) => ({
    ...env,
    a: env.b
  }))
)

// $ExpectType StateReaderTaskEither<boolean, { a: string; b: string; }, number, string>
pipe(_.of<string, boolean, { a: string; b: string }, number>('a'), _.local(modifyA))

//
// chainW
//

// $ExpectType StateReaderTaskEither<boolean, { a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<string, boolean, { a: string }, string>('a'),
  _.chainW(() => _.right<number, boolean, { b: number }, number>(1))
)

//
// chainEitherKW
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.chainEitherKW(() => E.right<number, number>(1))
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
// filterOrElseW
//

// $ExpectType StateReaderTaskEither<{ d: Date; }, { c: boolean; }, "a1" | "a2", number>
pipe(
  _.left<'a1', { d: Date }, { c: boolean }, number>('a1'),
  _.filterOrElseW(
    (result) => result > 0,
    () => 'a2' as const
  )
)
