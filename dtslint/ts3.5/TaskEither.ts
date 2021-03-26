import * as _ from '../../src/TaskEither'
import * as T from '../../src/Task'
import * as E from '../../src/Either'
import * as TO from '../../src/TaskOption'
import * as IOE from '../../src/IOEither'
import { pipe } from '../../src/function'

//
// getOrElseW
//

// $ExpectType Task<string | null>
pipe(
  _.right('a'),
  _.getOrElseW(() => T.of(null))
)

//
// chainW
//

// $ExpectType TaskEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chainW(() => _.right<number, number>(1))
)

//
// chainEitherKW
//

// $ExpectType TaskEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chainEitherKW(() => E.right<number, number>(1))
)

//
// chainIOEitherKW
//

// $ExpectType TaskEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chainIOEitherKW(() => IOE.right<number, number>(1))
)

//
// swapped
//

// $ExpectType TaskEither<number, string>
pipe(
  _.right<number, string>('foo'),
  _.swapped(
    _.mapLeft((a) => `${a}bar`)
  )
)

// $ExpectType TaskEither<number, string>
pipe(
  _.left<number, string>(1),
  _.swapped(
    _.map((a) => a + 1)
  )
)

//
// swappedW
//

// $ExpectType TaskEither<number, number>
pipe(
  _.right<number, string>('foo'),
  _.swappedW(
    _.mapLeft((a) => a.length)
  )
)

// $ExpectType TaskEither<string, string>
pipe(
  _.left<number, string>(1),
  _.swappedW(
    _.map(String)
  )
)

// $ExpectType TaskEither<string, number>
pipe(
  _.left<number, string>(1),
  _.swappedW(
    _.bimap(
      (a) => a.length,
      String
    )
  )
)

//
// fromTaskOption
//

// $ExpectType TaskEither<string, number>
pipe(
  TO.some(1),
  _.fromTaskOption(() => 'a')
)

//
// taskify
//

declare function apiForTaskify(path: string, callback: (err: Error | null | undefined, result?: string) => void): void

_.taskify(apiForTaskify) // $ExpectType (a: string) => TaskEither<Error, string>

//
// do notation
//

// $ExpectType TaskEither<string | number, { a: number; b: string; c: boolean; }>
pipe(
  _.right<string, number>(1),
  _.bindTo('a'),
  _.bind('b', () => _.right('b')),
  _.bindW('c', () => _.right<number, boolean>(true))
)

//
// pipeable sequence S
//

// $ExpectType TaskEither<string | number, { a: number; b: string; c: boolean; }>
pipe(_.right<string, number>(1), _.bindTo('a'), _.apS('b', _.right('b')), _.apSW('c', _.right<number, boolean>(true)))

//
// Do
//

// $ExpectType TaskEither<string, { a: number; b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of<string, number>(1)),
  _.bind('b', () => _.of<string, string>('b'))
)

//
// filterOrElseW
//

// $ExpectType TaskEither<"a" | "b", number>
pipe(
  _.left<'a', number>('a'),
  _.filterOrElseW(
    (result) => result > 0,
    () => 'b' as const
  )
)
