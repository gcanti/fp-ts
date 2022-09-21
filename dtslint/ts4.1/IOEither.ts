import * as _ from '../../src/IOEither'
import * as IO from '../../src/IO'
import * as E from '../../src/Either'
import { identity, pipe } from '../../src/function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean
declare const fsn: _.IOEither<boolean, string | number>
declare const fn: _.IOEither<boolean, number>

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.IOEither<string, (n: number) => boolean>
declare const fa: _.IOEither<Error, number>
// $ExpectType IOEither<string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType IOEither<never, number>
pipe(
  _.right('a'),
  _.flatMap(() => _.right(1))
)

// $ExpectType IOEither<number, number>
pipe(
  _.right('a'),
  _.flatMap(() => _.right<number, number>(1))
)

// $ExpectType IOEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.flatMap(() => _.right<number, number>(1))
)

// -------------------------------------------------------------------------------------
// fromRefinementOrElse
// -------------------------------------------------------------------------------------

// $ExpectType IOEither<string | number, string>
pipe(sn, _.fromRefinementOrElse(isString, identity))

// $ExpectType IOEither<Error, string>
pipe(
  sn,
  _.fromRefinementOrElse(
    isString,
    (
      _n // $ExpectType string | number
    ) => new Error()
  )
)

pipe(
  sn,
  _.fromRefinementOrElse(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    identity
  )
)

// -------------------------------------------------------------------------------------
// fromPredicateOrElse
// -------------------------------------------------------------------------------------

// $ExpectType IOEither<string | number, string | number>
pipe(sn, _.fromPredicateOrElse(predicate, identity))

// $ExpectType IOEither<Error, string | number>
pipe(
  sn,
  _.fromPredicateOrElse(predicate, () => new Error())
)

// $ExpectType IOEither<number, number>
pipe(n, _.fromPredicateOrElse(predicate, identity))

pipe(
  n,
  _.fromPredicateOrElse(
    (
      _n // $ExpectType number
    ) => true,
    identity
  )
)

// -------------------------------------------------------------------------------------
// refineOrElse
// -------------------------------------------------------------------------------------

// $ExpectType IOEither<string | number | boolean, string>
pipe(fsn, _.refineOrElse(isString, identity))

// $ExpectType IOEither<boolean | Error, string>
pipe(
  fsn,
  _.refineOrElse(
    isString,
    (
      _n // $ExpectType string | number
    ) => new Error()
  )
)

pipe(
  fsn,
  _.refineOrElse(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    identity
  )
)

// -------------------------------------------------------------------------------------
// filterOrElse
// -------------------------------------------------------------------------------------

// $ExpectType IOEither<string | number | boolean, string | number>
pipe(fsn, _.filterOrElse(predicate, identity))

// $ExpectType IOEither<boolean | Error, string | number>
pipe(
  fsn,
  _.filterOrElse(predicate, () => new Error())
)

// $ExpectType IOEither<number | boolean, number>
pipe(fn, _.filterOrElse(predicate, identity))

pipe(
  fn,
  _.filterOrElse(
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

// $ExpectType IO<string | null>
pipe(
  _.right('a'),
  _.getOrElse(() => null)
)

//
// getOrElseE
//

// $ExpectType IO<string | null>
pipe(
  _.right('a'),
  _.getOrElseE(() => IO.of(null))
)

//
// flatMapEitherK
//

// $ExpectType IOEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.flatMapEitherK(() => E.right<number, number>(1))
)

//
// do notation
//

// $ExpectType IOEither<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, string>(1),
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bind('a3', () => _.right<boolean, number>(true))
)

//
// pipeable sequence S
//

// $ExpectType IOEither<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(_.right<number, string>(1), _.bindTo('a1'), _.apS('a2', _.right('b')), _.apS('a3', _.right<boolean, number>(true)))

//
// Do
//

// $ExpectType IOEither<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.right<number, string>(1)),
  _.bind('a2', () => _.right<string, string>('b'))
)

//
// filterOrElse
//

// $ExpectType IOEither<"a1" | "a2", number>
pipe(
  _.left<'a1', number>('a1'),
  _.filterOrElse(
    (result) => result > 0,
    () => 'a2' as const
  )
)

//
// tapErrorIOK
//

// $ExpectType IOEither<string, never>
pipe(
  _.left('a'),
  _.tapErrorIOK((a) => IO.of(a.length))
)
