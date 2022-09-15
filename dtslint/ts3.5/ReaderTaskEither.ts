import * as _ from '../../src/ReaderTaskEither'
import * as RIO from '../../src/ReaderIO'
import * as RT from '../../src/ReaderTask'
import * as E from '../../src/Either'
import * as TE from '../../src/TaskEither'
import * as IOE from '../../src/IOEither'
import { pipe } from '../../src/function'

//
// rightReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, never, boolean>
_.rightReaderIO(RIO.of<{ a: string }, boolean>(true))

//
// leftReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, boolean, never>
_.leftReaderIO(RIO.of<{ a: string }, boolean>(true))

//
// getOrElseW
//

// $ExpectType ReaderTask<{ a: string; } & { b: number; }, string | null>
pipe(
  _.right<{ a: string }, string, string>('a'),
  _.getOrElseW(() => RT.of<{ b: number }, null>(null))
)

//
// orElse
//

// $ExpectType ReaderTaskEither<{ a: string; }, number, never>
pipe(
  _.left<{ a: string }, string, never>('a'),
  _.orElse((a) => _.left(a.length))
)

//
// orElseW
//

// $ExpectType ReaderTaskEither<{ b: number; } & { a: string; }, never, string | number>
pipe(
  _.left<{ a: string }, string, string>('a'),
  _.orElseW((a) => _.right<{ b: number }, never, string | number>(a.length))
)

//
// orElseFirst
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, never>
pipe(
  _.left<{ a: string }, string, never>('a'),
  _.orElseFirst((a) => _.right(a.length))
)

//
// orElseFirstW
//

// $ExpectType ReaderTaskEither<{ a: string; }, string | number, never>
pipe(
  _.left<{ a: string }, string, never>('a'),
  _.orElseFirstW((a) => _.left(a.length))
)

//
// orLeft
//

// $ExpectType ReaderTaskEither<{ a: string; }, number, never>
pipe(
  _.left<{ a: string }, string, never>('a'),
  _.orLeft((a) => RT.of(a.length))
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
// fromReaderIOK
//

// $ExpectType <E = never>(a: boolean) => ReaderTaskEither<{ a: string; }, E, boolean>
_.fromReaderIOK((a: boolean) => RIO.of<{ a: string }, boolean>(a))

//
// chainReaderIOKW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string, boolean>
pipe(
  _.right<{ a: string }, string, number>(1),
  _.chainReaderIOKW(() => RIO.of<{ b: number }, boolean>(true))
)

//
// chainReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, number>
pipe(
  _.right<{ a: string }, string, number>(1),
  _.chainReaderIOK(() => RIO.of(1))
)

pipe(
  _.right<{ a: string }, string, number>(1),
  _.chainReaderIOK(() => RIO.of<{ b: number }, boolean>(true)) // $ExpectError
)

//
// chainFirstReaderIOKW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string, number>
pipe(
  _.right<{ a: string }, string, number>(1),
  _.chainFirstReaderIOKW(() => RIO.of<{ b: number }, boolean>(true))
)

//
// chainFirstReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, number>
pipe(
  _.right<{ a: string }, string, number>(1),
  _.chainFirstReaderIOK(() => RIO.of(true))
)

pipe(
  _.right<{ a: string }, string, number>(1),
  _.chainFirstReaderIOK(() => RIO.of<{ b: number }, boolean>(true)) // $ExpectError
)

//
// rightReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, never, boolean>
_.rightReaderIO(RIO.of<{ a: string }, boolean>(true))

//
// leftReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, boolean, never>
_.leftReaderIO(RIO.of<{ a: string }, boolean>(true))

//
// fromReaderIOK
//

// $ExpectType <E = never>(a: boolean) => ReaderTaskEither<{ a: string; }, E, boolean>
_.fromReaderIOK((a: boolean) => RIO.of<{ a: string }, boolean>(a))

//
// chainReaderIOKW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string, boolean>
pipe(
  _.right<{ a: string }, string, number>(1),
  _.chainReaderIOKW(() => RIO.of<{ b: number }, boolean>(true))
)

//
// chainReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, number>
pipe(
  _.right<{ a: string }, string, number>(1),
  _.chainReaderIOK(() => RIO.of(1))
)

pipe(
  _.right<{ a: string }, string, number>(1),
  _.chainReaderIOK(() => RIO.of<{ b: number }, boolean>(true)) // $ExpectError
)

//
// chainFirstReaderIOKW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string, number>
pipe(
  _.right<{ a: string }, string, number>(1),
  _.chainFirstReaderIOKW(() => RIO.of<{ b: number }, boolean>(true))
)

//
// chainFirstReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, number>
pipe(
  _.right<{ a: string }, string, number>(1),
  _.chainFirstReaderIOK(() => RIO.of(true))
)

pipe(
  _.right<{ a: string }, string, number>(1),
  _.chainFirstReaderIOK(() => RIO.of<{ b: number }, boolean>(true)) // $ExpectError
)

//
// do notation
//

// $ExpectType ReaderTaskEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<{ readonly a: number }, string, number>(1),
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bindW('a3', () => _.right<{ readonly b: string }, number, boolean>(true))
)

//
// pipeable sequence S
//

// $ExpectType ReaderTaskEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<{ readonly a: number }, string, number>(1),
  _.bindTo('a1'),
  _.apS('a2', _.right('b')),
  _.apSW('a3', _.right<{ readonly b: string }, number, boolean>(true))
)

//
// Do
//

// $ExpectType ReaderTaskEither<unknown, string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of<unknown, string, number>(1)),
  _.bind('a2', () => _.of<unknown, string, string>('b'))
)

//
// filterOrElseW
//

// $ExpectType ReaderTaskEither<{ c: boolean; }, "a1" | "a2", number>
pipe(
  _.left<{ c: boolean }, 'a1', number>('a1'),
  _.filterOrElseW(
    (result) => result > 0,
    () => 'a2' as const
  )
)
