import * as _ from '../../src/TaskEither'
import * as T from '../../src/Task'
import * as E from '../../src/Either'
import * as IOE from '../../src/IOEither'
import { identity, pipe } from '../../src/function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean
declare const fsn: _.TaskEither<boolean, string | number>
declare const fn: _.TaskEither<boolean, number>

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.TaskEither<string, (n: number) => boolean>
declare const fa: _.TaskEither<Error, number>
// $ExpectType TaskEither<string | Error, boolean>
_.apPar(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType TaskEither<never, number>
pipe(
  _.right('a'),
  _.flatMap(() => _.right(1))
)

// $ExpectType TaskEither<number, number>
pipe(
  _.right('a'),
  _.flatMap(() => _.right(1) as _.TaskEither<number, number>)
)

// $ExpectType TaskEither<string | number, number>
pipe(
  _.right('a') as _.TaskEither<string, string>,
  _.flatMap(() => _.right(1) as _.TaskEither<number, number>)
)

// -------------------------------------------------------------------------------------
// fromRefinement
// -------------------------------------------------------------------------------------

// $ExpectType TaskEither<string | number, string>
pipe(sn, _.fromPredicate(isString, identity))

// $ExpectType TaskEither<Error, string>
pipe(
  sn,
  _.fromPredicate(
    isString,
    (
      _n // $ExpectType string | number
    ) => new Error()
  )
)

pipe(
  sn,
  _.fromPredicate(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    identity
  )
)

// -------------------------------------------------------------------------------------
// fromPredicate
// -------------------------------------------------------------------------------------

// $ExpectType TaskEither<string | number, string | number>
pipe(sn, _.fromPredicate(predicate, identity))

// $ExpectType TaskEither<Error, string | number>
pipe(
  sn,
  _.fromPredicate(predicate, () => new Error())
)

// $ExpectType TaskEither<number, number>
pipe(n, _.fromPredicate(predicate, identity))

pipe(
  n,
  _.fromPredicate(
    (
      _n // $ExpectType number
    ) => true,
    identity
  )
)

// -------------------------------------------------------------------------------------
// refine
// -------------------------------------------------------------------------------------

// $ExpectType TaskEither<string | number | boolean, string>
pipe(fsn, _.filter(isString, identity))

// $ExpectType TaskEither<boolean | Error, string>
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

// $ExpectType TaskEither<string | number | boolean, string | number>
pipe(fsn, _.filter(predicate, identity))

// $ExpectType TaskEither<boolean | Error, string | number>
pipe(
  fsn,
  _.filter(predicate, () => new Error())
)

// $ExpectType TaskEither<number | boolean, number>
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
// getOrElse
//

// $ExpectType Task<string | null>
pipe(
  _.right('a'),
  _.getOrElse(() => null)
)

//
// getOrElseWithEffect
//

// $ExpectType Task<string | null>
pipe(
  _.right('a'),
  _.getOrElseWithEffect(() => T.of(null))
)

//
// flatMapEitherK
//

// $ExpectType TaskEither<string | number, number>
pipe(
  _.right('a') as _.TaskEither<string, string>,
  _.flatMapEitherK(() => E.right(1) as E.Either<number, number>)
)

//
// flatMapIOEitherK
//

// $ExpectType TaskEither<string | number, number>
pipe(
  _.right('a') as _.TaskEither<string, string>,
  _.flatMapIOEitherK(() => IOE.right(1) as IOE.IOEither<number, number>)
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
  _.right(1) as _.TaskEither<string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bind('a3', () => _.right(true) as _.TaskEither<number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType TaskEither<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right(1) as _.TaskEither<string, number>,
  _.bindTo('a1'),
  _.bindPar('a2', _.right('b')),
  _.bindPar('a3', _.right(true) as _.TaskEither<number, boolean>)
)

//
// Do
//

// $ExpectType TaskEither<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.right(1) as _.TaskEither<string, number>),
  _.bind('a2', () => _.right('b') as _.TaskEither<string, string>)
)

//
// filter
//

// $ExpectType TaskEither<"a1" | "a2", number>
pipe(
  _.left('a1') as _.TaskEither<'a1', number>,
  _.filter(
    (result) => result > 0,
    () => 'a2' as const
  )
)
