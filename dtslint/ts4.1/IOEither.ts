import * as _ from '../../src/IOEither'
import * as IO from '../../src/IO'
import * as E from '../../src/Either'
import { pipe } from '../../src/function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.IOEither<string, (n: number) => boolean>
declare const fa: _.IOEither<Error, number>
// $ExpectType IOEither<string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// chain widening
// -------------------------------------------------------------------------------------

// $ExpectType IOEither<never, number>
pipe(
  _.right('a'),
  _.chain(() => _.right(1))
)

// $ExpectType IOEither<number, number>
pipe(
  _.right('a'),
  _.chain(() => _.right<number, number>(1))
)

// $ExpectType IOEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chain(() => _.right<number, number>(1))
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
// chainEitherK
//

// $ExpectType IOEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chainEitherK(() => E.right<number, number>(1))
)

//
// do notation
//

// $ExpectType IOEither<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, string>(1),
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bindW('a3', () => _.right<boolean, number>(true))
)

//
// pipeable sequence S
//

// $ExpectType IOEither<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, string>(1),
  _.bindTo('a1'),
  _.apS('a2', _.right('b')),
  _.apSW('a3', _.right<boolean, number>(true))
)

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
// orElseFirstIOK
//

// $ExpectType IOEither<string, never>
pipe(
  _.left('a'),
  _.orElseFirstIOK((a) => IO.of(a.length))
)
