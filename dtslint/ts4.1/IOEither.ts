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

// $ExpectType IOEither<string | number, { a: number; b: string; c: boolean; }>
pipe(
  _.right<string, number>(1),
  _.bindTo('a'),
  _.bind('b', () => _.right('b')),
  _.bindW('c', () => _.right<number, boolean>(true))
)

//
// pipeable sequence S
//

// $ExpectType IOEither<string | number, { a: number; b: string; c: boolean; }>
pipe(_.right<string, number>(1), _.bindTo('a'), _.apS('b', _.right('b')), _.apSW('c', _.right<number, boolean>(true)))

//
// Do
//

// $ExpectType IOEither<string, { a: number; b: string; }>
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
