import * as _ from '../../src/ReaderTaskEither'
import * as RT from '../../src/ReaderTask'
import * as E from '../../src/Either'
import * as TE from '../../src/TaskEither'
import * as IOE from '../../src/IOEither'
import { pipe } from '../../src/function'

//
// getOrElseW
//

// $ExpectType ReaderTask<{ a: string; } & { b: number; }, string | null>
pipe(
  _.right<{ a: string }, string, string>('a'),
  _.getOrElseW(() => RT.of<{ b: number }, null>(null))
)

//
// chainW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<{ a: string }, string, string>('a'),
  _.chainW(() => _.right<{ b: number }, number, number>(1))
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

// $ExpectType ReaderTaskEither<{ readonly b: string; } & { readonly a: number; }, string | number, { a: number; b: string; c: boolean; }>
pipe(
  _.right<{ readonly a: number }, string, number>(1),
  _.bindTo('a'),
  _.bind('b', () => _.right('b')),
  _.bindW('c', () => _.right<{ readonly b: string }, number, boolean>(true))
)

//
// pipeable sequence S
//

// $ExpectType ReaderTaskEither<{ readonly b: string; } & { readonly a: number; }, string | number, { a: number; b: string; c: boolean; }>
pipe(
  _.right<{ readonly a: number }, string, number>(1),
  _.bindTo('a'),
  _.apS('b', _.right('b')),
  _.apSW('c', _.right<{ readonly b: string }, number, boolean>(true))
)

//
// Do
//

// $ExpectType ReaderTaskEither<unknown, string, { a: number; b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of<unknown, string, number>(1)),
  _.bind('b', () => _.of<unknown, string, string>('b'))
)

//
// filterOrElseW
//

// $ExpectType ReaderTaskEither<{ c: boolean; }, "a" | "b", number>
pipe(
  _.left<{ c: boolean }, 'a', number>('a'),
  _.filterOrElseW(
    (result) => result > 0,
    () => 'b' as const
  )
)
