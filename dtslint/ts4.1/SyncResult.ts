import * as _ from '../../src/SyncResult'
import * as IO from '../../src/Sync'
import * as E from '../../src/Result'
import { pipe } from '../../src/Function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.SyncResult<string, (n: number) => boolean>
declare const fa: _.SyncResult<Error, number>
// $ExpectType SyncResult<string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType SyncResult<never, number>
pipe(
  _.succeed('a'),
  _.flatMap(() => _.succeed(1))
)

// $ExpectType SyncResult<number, number>
pipe(
  _.succeed('a'),
  _.flatMap(() => _.succeed(1) as _.SyncResult<number, number>)
)

// $ExpectType SyncResult<string | number, number>
pipe(
  _.succeed('a') as _.SyncResult<string, string>,
  _.flatMap(() => _.succeed(1) as _.SyncResult<number, number>)
)

//
// -------------------------------------------------------------------------------------
//

//
// getOrElse
//

// $ExpectType Sync<string | null>
pipe(_.succeed('a'), _.getOrElse(null))

//
// getOrElseIO
//

// $ExpectType Sync<string | null>
pipe(_.succeed('a'), _.getOrElseSync(IO.of(null)))

//
// flatMapEitherK
//

// $ExpectType SyncResult<string | number, number>
pipe(
  // tslint:disable-next-line: no-unnecessary-type-assertion
  _.succeed('a') as _.SyncResult<string, string>,
  _.flatMapResult(() => E.succeed(1) as E.Result<number, number>)
)

//
// do notation
//

// $ExpectType SyncResult<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.SyncResult<string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.succeed('b')),
  _.bind('a3', () => _.succeed(true) as _.SyncResult<number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType SyncResult<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.succeed(1) as _.SyncResult<string, number>,
  _.bindTo('a1'),
  _.bindRight('a2', _.succeed('b')),
  _.bindRight('a3', _.succeed(true) as _.SyncResult<number, boolean>)
)

//
// Do
//

// $ExpectType SyncResult<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.succeed(1) as _.SyncResult<string, number>),
  _.bind('a2', () => _.succeed('b') as _.SyncResult<string, string>)
)
