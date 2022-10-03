import * as _ from '../../src/Either'
import { pipe } from '../../src/Function'

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
  _.flatMap(() => _.right(1) as _.Either<number, number>)
)

// $ExpectType Either<string | number, number>
pipe(
  _.right('a') as _.Either<string, string>,
  _.flatMap(() => _.right(1) as _.Either<number, number>)
)

// -------------------------------------------------------------------------------------
// liftPredicate
// -------------------------------------------------------------------------------------

// $ExpectType Either<Error, string>
pipe(sn, _.liftPredicate(isString, new Error()))

// $ExpectType Either<Error, number>
pipe(
  sn,
  _.liftPredicate(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    new Error()
  )
)

// $ExpectType Either<Error, string | number>
pipe(sn, _.liftPredicate(predicate, new Error()))

pipe(
  n,
  _.liftPredicate(
    (
      _n // $ExpectType number
    ) => true,
    new Error()
  )
)

// -------------------------------------------------------------------------------------
// filter
// -------------------------------------------------------------------------------------

// $ExpectType Either<boolean | Error, string>
pipe(fsn, _.filter(isString, new Error()))

// $ExpectType Either<boolean | Error, number>
pipe(
  fsn,
  _.filter(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    new Error()
  )
)

// $ExpectType Either<boolean | Error, string | number>
pipe(fsn, _.filter(predicate, new Error()))

// $ExpectType Either<boolean | Error, number>
pipe(fn, _.filter(predicate, new Error()))

// $ExpectType Either<boolean | Error, number>
pipe(
  fn,
  _.filter(
    (
      _n // $ExpectType number
    ) => true,
    new Error()
  )
)

//
// -------------------------------------------------------------------------------------
//

//
// toUnion
//

// $ExpectType string | number
_.toUnion(_.right(1) as _.Either<number, string>)

//
// getOrElse
//

// $ExpectType string | null
pipe(_.right('a'), _.getOrElse(null))

//
// do notation
//

// $ExpectType Either<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right(1) as _.Either<string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bind('a3', () => _.right(true) as _.Either<number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType Either<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right(1) as _.Either<string, number>,
  _.bindTo('a1'),
  _.bindRight('a2', _.right('a3')),
  _.bindRight('a3', _.right(true) as _.Either<number, boolean>)
)

//
// Do
//

// $ExpectType Either<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.right(1) as _.Either<string, number>),
  _.bind('a2', () => _.right('b') as _.Either<string, string>)
)
