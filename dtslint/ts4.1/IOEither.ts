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
  _.succeed('a'),
  _.flatMap(() => _.succeed(1))
)

// $ExpectType IOEither<number, number>
pipe(
  _.succeed('a'),
  _.flatMap(() => _.succeed(1) as _.IOEither<number, number>)
)

// $ExpectType IOEither<string | number, number>
pipe(
  _.succeed('a') as _.IOEither<string, string>,
  _.flatMap(() => _.succeed(1) as _.IOEither<number, number>)
)

//
// -------------------------------------------------------------------------------------
//

//
// getOrElse
//

// $ExpectType IO<string | null>
pipe(_.succeed('a'), _.getOrElse(null))

//
// getOrElseIO
//

// $ExpectType IO<string | null>
pipe(_.succeed('a'), _.getOrElseIO(IO.succeed(null)))

//
// flatMapEitherK
//

// $ExpectType IOEither<string | number, number>
pipe(
  // tslint:disable-next-line: no-unnecessary-type-assertion
  _.succeed('a') as _.IOEither<string, string>,
  _.flatMapEither(() => E.succeed(1) as E.Either<number, number>)
)

//
// do notation
//

// $ExpectType IOEither<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.IOEither<string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.succeed('b')),
  _.bind('a3', () => _.succeed(true) as _.IOEither<number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType IOEither<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.IOEither<string, number>,
  _.bindTo('a1'),
  _.bindRight('a2', _.succeed('b')),
  _.bindRight('a3', _.succeed(true) as _.IOEither<number, boolean>)
)

//
// Do
//

// $ExpectType IOEither<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.succeed(1) as _.IOEither<string, number>),
  _.bind('a2', () => _.succeed('b') as _.IOEither<string, string>)
)
