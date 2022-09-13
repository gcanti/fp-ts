import * as _ from '../../src/TaskEither'
import * as T from '../../src/Task'
import * as E from '../../src/Either'
import * as IOE from '../../src/IOEither'
import { pipe } from '../../src/function'
import * as IO from '../../src/IO'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.TaskEither<string, (n: number) => boolean>
declare const fa: _.TaskEither<Error, number>
// $ExpectType TaskEither<string | Error, boolean>
_.ap(fa)(fab)

//
// -------------------------------------------------------------------------------------
//

// -------------------------------------------------------------------------------------
// chain widening
// -------------------------------------------------------------------------------------

// $ExpectType TaskEither<never, number>
pipe(
  _.right('a'),
  _.chain(() => _.right(1))
)

// $ExpectType TaskEither<number, number>
pipe(
  _.right('a'),
  _.chain(() => _.right<number, number>(1))
)

// $ExpectType TaskEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chain(() => _.right<number, number>(1))
)

//
// getOrElseW
//

// $ExpectType Task<string | null>
pipe(
  _.right('a'),
  _.getOrElseW(() => null)
)

//
// getOrElseEW
//

// $ExpectType Task<string | null>
pipe(
  _.right('a'),
  _.getOrElseEW(() => T.of(null))
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
// taskify
//

declare function apiForTaskify(path: string, callback: (err: Error | null | undefined, result?: string) => void): void

_.taskify(apiForTaskify) // $ExpectType (a: string) => TaskEither<Error, string>

//
// do notation
//

// $ExpectType TaskEither<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, string>(1),
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bindW('a3', () => _.right<boolean, number>(true))
)

//
// pipeable sequence S
//

// $ExpectType TaskEither<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, string>(1),
  _.bindTo('a1'),
  _.apS('a2', _.right('b')),
  _.apSW('a3', _.right<boolean, number>(true))
)

//
// Do
//

// $ExpectType TaskEither<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.right<number, string>(1)),
  _.bind('a2', () => _.right<string, string>('b'))
)

//
// filterOrElse
//

// $ExpectType TaskEither<"a1" | "a2", number>
pipe(
  _.left<'a1', number>('a1'),
  _.filterOrElse(
    (result) => result > 0,
    () => 'a2' as const
  )
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
