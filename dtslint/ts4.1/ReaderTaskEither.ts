import * as _ from '../../src/ReaderTaskEither'
import * as RT from '../../src/ReaderTask'
import * as E from '../../src/Either'
import * as TE from '../../src/TaskEither'
import * as IOE from '../../src/IOEither'
import { pipe } from '../../src/function'

//
// getOrElseW
//

// $ExpectType ReaderTask<{ a: string; }, string | null>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.getOrElseW(() => null)
)

//
// getOrElseEW
//

// $ExpectType ReaderTask<{ a: string; } & { b: number; }, string | null>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.getOrElseEW(() => RT.of<null, { b: number }>(null))
)

//
// chainW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.chainW(() => _.right<number, { b: number }, number>(1))
)

//
// chainEitherKW
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.right<string, string, string>('a'),
  _.chainEitherKW(() => E.right<number, number>(1))
)

//
// chainTaskEitherKW
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.right<string, string, string>('a'),
  _.chainTaskEitherKW(() => TE.right<number, number>(1))
)

//
// chainIOEitherKW
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.right<string, string, string>('a'),
  _.chainIOEitherKW(() => IOE.right<number, number>(1))
)

//
// do notation
//

// $ExpectType ReaderTaskEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a: number; readonly b: string; readonly c: boolean; }>
pipe(
  _.right<number, { readonly a: number }, string>(1),
  _.bindTo('a'),
  _.bind('b', () => _.right('b')),
  _.bindW('c', () => _.right<boolean, { readonly b: string }, number>(true))
)

//
// pipeable sequence S
//

// $ExpectType ReaderTaskEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a: number; readonly b: string; readonly c: boolean; }>
pipe(
  _.right<number, { readonly a: number }, string>(1),
  _.bindTo('a'),
  _.apS('b', _.right('b')),
  _.apSW('c', _.right<boolean, { readonly b: string }, number>(true))
)

//
// Do
//

// $ExpectType ReaderTaskEither<unknown, string, { readonly a: number; readonly b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.right<number, unknown, string>(1)),
  _.bind('b', () => _.right<string, unknown, string>('b'))
)

//
// filterOrElseW
//

// $ExpectType ReaderTaskEither<{ c: boolean; }, "a" | "b", number>
pipe(
  _.left<'a', { c: boolean }, number>('a'),
  _.filterOrElseW(
    (result) => result > 0,
    () => 'b' as const
  )
)
