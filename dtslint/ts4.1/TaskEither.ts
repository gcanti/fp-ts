import * as _ from '../../src/TaskEither'
import * as T from '../../src/Task'
import * as E from '../../src/Result'
import * as IOE from '../../src/IOEither'
import { pipe } from '../../src/Function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.TaskEither<string, (n: number) => boolean>
declare const fa: _.TaskEither<Error, number>
// $ExpectType TaskEither<string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType TaskEither<never, number>
pipe(
  _.succeed('a'),
  _.flatMap(() => _.succeed(1))
)

// $ExpectType TaskEither<number, number>
pipe(
  _.succeed('a'),
  _.flatMap(() => _.succeed(1) as _.TaskEither<number, number>)
)

// $ExpectType TaskEither<string | number, number>
pipe(
  _.succeed('a') as _.TaskEither<string, string>,
  _.flatMap(() => _.succeed(1) as _.TaskEither<number, number>)
)

//
// -------------------------------------------------------------------------------------
//

//
// getOrElse
//

// $ExpectType Task<string | null>
pipe(_.succeed('a'), _.getOrElse(null))

//
// getOrElseTask
//

// $ExpectType Task<string | null>
pipe(_.succeed('a'), _.getOrElseTask(T.succeed(null)))

//
// flatMapEitherK
//

// $ExpectType TaskEither<string | number, number>
pipe(
  _.succeed('a') as _.TaskEither<string, string>,
  _.flatMapEither(() => E.succeed(1) as E.Result<number, number>)
)

//
// flatMapIOEitherK
//

// $ExpectType TaskEither<string | number, number>
pipe(
  _.succeed('a') as _.TaskEither<string, string>,
  _.flatMapIOEither(() => IOE.succeed(1) as IOE.IOEither<number, number>)
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
  _.succeed(1) as _.TaskEither<string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.succeed('b')),
  _.bind('a3', () => _.succeed(true) as _.TaskEither<number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType TaskEither<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.TaskEither<string, number>,
  _.bindTo('a1'),
  _.bindRight('a2', _.succeed('b')),
  _.bindRight('a3', _.succeed(true) as _.TaskEither<number, boolean>)
)

//
// Do
//

// $ExpectType TaskEither<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.succeed(1) as _.TaskEither<string, number>),
  _.bind('a2', () => _.succeed('b') as _.TaskEither<string, string>)
)
