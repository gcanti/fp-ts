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
  _.getOrElseW(() => IO.of(null))
)

//
// orElse
//

// $ExpectType IOEither<number, never>
pipe(
  _.left('a'),
  _.orElse((a) => _.left(a.length))
)

//
// orElseW
//

// $ExpectType IOEither<never, string | number>
pipe(
  _.left<string, string>('a'),
  _.orElseW((a) => _.right(a.length))
)

//
// orElseFirst
//

// $ExpectType IOEither<string, never>
pipe(
  _.left('a'),
  _.orElseFirst((a) => _.right(a.length))
)

//
// orElseFirstW
//

// $ExpectType IOEither<string | number, never>
pipe(
  _.left('a'),
  _.orElseFirstW((a) => _.left(a.length))
)

//
// orElseFirstIOK
//

// $ExpectType IOEither<string, never>
pipe(
  _.left('a'),
  _.orElseFirstIOK((a) => IO.of(a.length))
)

//
// orLeft
//

// $ExpectType IOEither<number, never>
pipe(
  _.left('a'),
  _.orLeft((a) => IO.of(a.length))
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
  _.right<string, number>(1),
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bindW('a3', () => _.right<number, boolean>(true))
)

//
// pipeable sequence S
//

// $ExpectType IOEither<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<string, number>(1),
  _.bindTo('a1'),
  _.apS('a2', _.right('b')),
  _.apSW('a3', _.right<number, boolean>(true))
)

//
// Do
//

// $ExpectType IOEither<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of<string, number>(1)),
  _.bind('a2', () => _.of<string, string>('b'))
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
