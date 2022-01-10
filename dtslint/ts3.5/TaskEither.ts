import * as _ from '../../src/TaskEither'
import * as T from '../../src/Task'
import * as E from '../../src/Either'
import * as TO from '../../src/TaskOption'
import * as IO from '../../src/IO'
import * as IOE from '../../src/IOEither'
import { pipe } from '../../src/function'

//
// getOrElseW
//

// $ExpectType Task<string | null>
pipe(
  _.right('a'),
  _.getOrElseW(() => T.of(null))
)

//
// orElse
//

// $ExpectType TaskEither<number, never>
pipe(
  _.left('a'),
  _.orElse((a) => _.left(a.length))
)

//
// orElseW
//

// $ExpectType TaskEither<never, string | number>
pipe(
  _.left<string, string>('a'),
  _.orElseW((a) => _.right(a.length))
)

//
// orElseFirst
//

// $ExpectType TaskEither<string, never>
pipe(
  _.left('a'),
  _.orElseFirst((a) => _.right(a.length))
)

//
// orElseFirstW
//

// $ExpectType TaskEither<string | number, never>
pipe(
  _.left('a'),
  _.orElseFirstW((a) => _.left(a.length))
)

//
// orElseFirstIOK
//

// $ExpectType TaskEither<string, never>
pipe(
  _.left('a'),
  _.orElseFirstIOK((a) => IO.of(a.length))
)

//
// orElseFirstTaskK
//

// $ExpectType TaskEither<string, never>
pipe(
  _.left('a'),
  _.orElseFirstTaskK((a) => T.of(a.length))
)

//
// orLeft
//

// $ExpectType TaskEither<number, never>
pipe(
  _.left('a'),
  _.orLeft((a) => T.of(a.length))
)

//
// chainW
//

// $ExpectType TaskEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chainW(() => _.right<number, number>(1))
)

//
// chainEitherKW
//

// $ExpectType TaskEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chainEitherKW(() => E.right<number, number>(1))
)

//
// chainIOEitherKW
//

// $ExpectType TaskEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chainIOEitherKW(() => IOE.right<number, number>(1))
)

//
// fromTaskOption
//

// $ExpectType TaskEither<string, number>
pipe(
  TO.some(1),
  _.fromTaskOption(() => 'a')
)

//
// taskify
//

declare function apiForTaskify(path: string, callback: (err: Error | null | undefined, result?: string) => void): void

_.taskify(apiForTaskify) // $ExpectType (a: string) => TaskEither<Error, string>

//
// do notation
//

// $ExpectType TaskEither<string | number, { readonly a: number; readonly b: string; readonly c: boolean; }>
pipe(
  _.right<string, number>(1),
  _.bindTo('a'),
  _.bind('b', () => _.right('b')),
  _.bindW('c', () => _.right<number, boolean>(true))
)

//
// pipeable sequence S
//

// $ExpectType TaskEither<string | number, { readonly a: number; readonly b: string; readonly c: boolean; }>
pipe(_.right<string, number>(1), _.bindTo('a'), _.apS('b', _.right('b')), _.apSW('c', _.right<number, boolean>(true)))

//
// Do
//

// $ExpectType TaskEither<string, { readonly a: number; readonly b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of<string, number>(1)),
  _.bind('b', () => _.of<string, string>('b'))
)

//
// filterOrElseW
//

// $ExpectType TaskEither<"a" | "b", number>
pipe(
  _.left<'a', number>('a'),
  _.filterOrElseW(
    (result) => result > 0,
    () => 'b' as const
  )
)
