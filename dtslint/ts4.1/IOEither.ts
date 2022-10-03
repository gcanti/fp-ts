import * as _ from '../../src/IOEither'
import * as IO from '../../src/IO'
import * as E from '../../src/Either'
import { pipe } from '../../src/Function'

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
  _.flatMap(() => _.right(1) as _.IOEither<number, number>)
)

// $ExpectType IOEither<string | number, number>
pipe(
  _.right('a') as _.IOEither<string, string>,
  _.flatMap(() => _.right(1) as _.IOEither<number, number>)
)

//
// -------------------------------------------------------------------------------------
//

//
// getOrElse
//

// $ExpectType IO<string | null>
pipe(_.right('a'), _.getOrElse(null))

//
// getOrElseIO
//

// $ExpectType IO<string | null>
pipe(_.right('a'), _.getOrElseIO(IO.of(null)))

//
// flatMapEitherK
//

// $ExpectType IOEither<string | number, number>
pipe(
  // tslint:disable-next-line: no-unnecessary-type-assertion
  _.right('a') as _.IOEither<string, string>,
  _.flatMapEither(() => E.right(1) as E.Either<number, number>)
)

//
// do notation
//

// $ExpectType IOEither<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right(1) as _.IOEither<string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bind('a3', () => _.right(true) as _.IOEither<number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType IOEither<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right(1) as _.IOEither<string, number>,
  _.bindTo('a1'),
  _.bindRight('a2', _.right('b')),
  _.bindRight('a3', _.right(true) as _.IOEither<number, boolean>)
)

//
// Do
//

// $ExpectType IOEither<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.right(1) as _.IOEither<string, number>),
  _.bind('a2', () => _.right('b') as _.IOEither<string, string>)
)
