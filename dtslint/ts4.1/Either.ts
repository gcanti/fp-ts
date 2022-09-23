import * as _ from '../../src/Either'
import { identity, pipe } from '../../src/function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean
declare const fsn: _.Either<boolean, string | number>
declare const fn: _.Either<boolean, number>

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.Either<string, (n: number) => boolean>
declare const fa: _.Either<Error, number>
// $ExpectType Either<string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType Either<never, number>
pipe(
  _.right('a'),
  _.flatMap(() => _.right(1))
)

// $ExpectType Either<number, number>
pipe(
  _.right('a'),
  _.flatMap(() => _.right<number, number>(1))
)

// $ExpectType Either<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.flatMap(() => _.right<number, number>(1))
)

// -------------------------------------------------------------------------------------
// fromRefinement
// -------------------------------------------------------------------------------------

// $ExpectType Either<string | number, string>
pipe(sn, _.fromPredicate(isString, identity))

// $ExpectType Either<Error, string>
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

// $ExpectType Either<string | number, string | number>
pipe(sn, _.fromPredicate(predicate, identity))

// $ExpectType Either<Error, string | number>
pipe(
  sn,
  _.fromPredicate(predicate, () => new Error())
)

// $ExpectType Either<number, number>
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

// $ExpectType Either<string | number | boolean, string>
pipe(fsn, _.filter(isString, identity))

// $ExpectType Either<boolean | Error, string>
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

// $ExpectType Either<string | number | boolean, string | number>
pipe(fsn, _.filter(predicate, identity))

// $ExpectType Either<boolean | Error, string | number>
pipe(
  fsn,
  _.filter(predicate, () => new Error())
)

// $ExpectType Either<number | boolean, number>
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
// toUnion
//

// $ExpectType string | number
_.toUnion(_.right<number, string>(1))

//
// getOrElse
//

// $ExpectType string | null
pipe(
  _.right('a'),
  _.getOrElse(() => null)
)

//
// do notation
//

// $ExpectType Either<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, string>(1),
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bind('a3', () => _.right<boolean, number>(true))
)

//
// pipeable sequence S
//

// $ExpectType Either<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, string>(1),
  _.bindTo('a1'),
  _.bindPar('a2', _.right('a3')),
  _.bindPar('a3', _.right<boolean, number>(true))
)

//
// Do
//

// $ExpectType Either<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.right<number, string>(1)),
  _.bind('a2', () => _.right<string, string>('b'))
)

//
// filter
//

// $ExpectType Either<"a1" | "a2", number>
pipe(
  _.left<'a1', number>('a1'),
  _.filter(
    (result) => result > 0,
    () => 'a2' as const
  )
)
