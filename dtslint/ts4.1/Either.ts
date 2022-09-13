import * as _ from '../../src/Either'
import { pipe } from '../../src/function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.Either<string, (n: number) => boolean>
declare const fa: _.Either<Error, number>
// $ExpectType Either<string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// chain widening
// -------------------------------------------------------------------------------------

// $ExpectType Either<never, number>
pipe(
  _.right('a'),
  _.chain(() => _.right(1))
)

// $ExpectType Either<number, number>
pipe(
  _.right('a'),
  _.chain(() => _.right<number, number>(1))
)

// $ExpectType Either<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chain(() => _.right<number, number>(1))
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
// getOrElseW
//

// $ExpectType string | null
pipe(
  _.right('a'),
  _.getOrElseW(() => null)
)

//
// do notation
//

// $ExpectType Either<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, string>(1),
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bindW('a3', () => _.right<boolean, number>(true))
)

//
// pipeable sequence S
//

// $ExpectType Either<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, string>(1),
  _.bindTo('a1'),
  _.apS('a2', _.right('a3')),
  _.apSW('a3', _.right<boolean, number>(true))
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
// filterOrElse
//

// $ExpectType Either<"a1" | "a2", number>
pipe(
  _.left<'a1', number>('a1'),
  _.filterOrElse(
    (result) => result > 0,
    () => 'a2' as const
  )
)

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const n: number
declare const sn: string | number
declare const en: _.Either<boolean, number>
declare const esn: _.Either<boolean, string | number>
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean

//
// fromPredicate
//

// $ExpectType Either<unknown, string>
pipe(sn, _.fromPredicate(isString))
// $ExpectType Either<number, number>
pipe(n, _.fromPredicate(predicate))
// $ExpectType Either<number, number>
pipe(
  n,
  _.fromPredicate(
    (
      _n // $ExpectType number
    ) => true
  )
)

//
// filterOrElse
//

// $ExpectType Either<boolean, string>
pipe(
  esn,
  _.filterOrElse(isString, () => false)
)
// $ExpectType Either<boolean, number>
pipe(
  en,
  _.filterOrElse(predicate, () => false)
)
// $ExpectType Either<boolean, number>
pipe(
  en,
  _.filterOrElse(
    (
      _n // $ExpectType number
    ) => true,
    () => false
  )
)
