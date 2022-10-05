import * as _ from '../../src/Result'
import { pipe } from '../../src/Function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean
declare const fsn: _.Result<boolean, string | number>
declare const fn: _.Result<boolean, number>

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.Result<string, (n: number) => boolean>
declare const fa: _.Result<Error, number>
// $ExpectType Result<string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType Result<never, number>
pipe(
  _.succeed('a'),
  _.flatMap(() => _.succeed(1))
)

// $ExpectType Result<number, number>
pipe(
  _.succeed('a'),
  _.flatMap(() => _.succeed(1) as _.Result<number, number>)
)

// $ExpectType Result<string | number, number>
pipe(
  _.succeed('a') as _.Result<string, string>,
  _.flatMap(() => _.succeed(1) as _.Result<number, number>)
)

// -------------------------------------------------------------------------------------
// liftPredicate
// -------------------------------------------------------------------------------------

// $ExpectType Result<Error, string>
pipe(sn, _.liftPredicate(isString, new Error()))

// $ExpectType Result<Error, number>
pipe(
  sn,
  _.liftPredicate(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    new Error()
  )
)

// $ExpectType Result<Error, string | number>
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

// $ExpectType Result<boolean | Error, string>
pipe(fsn, _.filter(isString, new Error()))

// $ExpectType Result<boolean | Error, number>
pipe(
  fsn,
  _.filter(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    new Error()
  )
)

// $ExpectType Result<boolean | Error, string | number>
pipe(fsn, _.filter(predicate, new Error()))

// $ExpectType Result<boolean | Error, number>
pipe(fn, _.filter(predicate, new Error()))

// $ExpectType Result<boolean | Error, number>
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
_.toUnion(_.succeed(1) as _.Result<number, string>)

//
// getOrElse
//

// $ExpectType string | null
pipe(_.succeed('a'), _.getOrElse(null))

//
// do notation
//

// $ExpectType Result<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.Result<string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.succeed('b')),
  _.bind('a3', () => _.succeed(true) as _.Result<number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType Result<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.Result<string, number>,
  _.bindTo('a1'),
  _.bindRight('a2', _.succeed('a3')),
  _.bindRight('a3', _.succeed(true) as _.Result<number, boolean>)
)

//
// Do
//

// $ExpectType Result<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.succeed(1) as _.Result<string, number>),
  _.bind('a2', () => _.succeed('b') as _.Result<string, string>)
)
