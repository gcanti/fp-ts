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

// $ExpectType IOEither<string | number, { readonly a: number; readonly b: string; readonly c: boolean; }>
pipe(
  _.right<string, number>(1),
  _.bindTo('a'),
  _.bind('b', () => _.right('b')),
  _.bindW('c', () => _.right<number, boolean>(true))
)

//
// pipeable sequence S
//

// $ExpectType IOEither<string | number, { readonly a: number; readonly b: string; readonly c: boolean; }>
pipe(_.right<string, number>(1), _.bindTo('a'), _.apS('b', _.right('b')), _.apSW('c', _.right<number, boolean>(true)))

//
// Do
//

// $ExpectType IOEither<string, { readonly a: number; readonly b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of<string, number>(1)),
  _.bind('b', () => _.of<string, string>('b'))
)

//
// filterOrElseW
//

// $ExpectType IOEither<"a" | "b", number>
pipe(
  _.left<'a', number>('a'),
  _.filterOrElseW(
    (result) => result > 0,
    () => 'b' as const
  )
)
