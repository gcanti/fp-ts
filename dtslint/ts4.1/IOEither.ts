import * as _ from '../../src/IOEither'
import * as IO from '../../src/IO'
import * as E from '../../src/Either'
import { pipe } from '../../src/function'

//
// getOrElseW
//

// $ExpectType IO<string | null>
pipe(
  _.right('a'),
  _.getOrElseW(() => null)
)

//
// getOrElseEW
//

// $ExpectType IO<string | null>
pipe(
  _.right('a'),
  _.getOrElseEW(() => IO.of(null))
)

//
// chainW
//

// $ExpectType IOEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chainW(() => _.right<number, number>(1))
)

//
// chainEitherKW
//

// $ExpectType IOEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chainEitherKW(() => E.right<number, number>(1))
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
// filterOrElseW
//

// $ExpectType IOEither<"a1" | "a2", number>
pipe(
  _.left<'a1', number>('a1'),
  _.filterOrElseW(
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
