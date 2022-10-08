import * as _ from '../../src/AsyncResult'
import * as T from '../../src/Async'
import * as E from '../../src/Result'
import * as IOE from '../../src/SyncResult'
import { pipe } from '../../src/Function'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.AsyncResult<string, (n: number) => boolean>
declare const fa: _.AsyncResult<Error, number>
// $ExpectType AsyncResult<string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType AsyncResult<never, number>
pipe(
  _.of('a'),
  _.flatMap(() => _.of(1))
)

// $ExpectType AsyncResult<number, number>
pipe(
  _.of('a'),
  _.flatMap(() => _.of(1) as _.AsyncResult<number, number>)
)

// $ExpectType AsyncResult<string | number, number>
pipe(
  _.of('a') as _.AsyncResult<string, string>,
  _.flatMap(() => _.of(1) as _.AsyncResult<number, number>)
)

//
// -------------------------------------------------------------------------------------
//

//
// getOrElse
//

// $ExpectType Async<string | null>
pipe(_.of('a'), _.getOrElse(null))

//
// getOrElseAsync
//

// $ExpectType Async<string | null>
pipe(_.of('a'), _.getOrElseAsync(T.of(null)))

//
// flatMapEitherK
//

// $ExpectType AsyncResult<string | number, number>
pipe(
  _.of('a') as _.AsyncResult<string, string>,
  _.flatMapResult(() => E.of(1) as E.Result<number, number>)
)

//
// flatMapSyncResultK
//

// $ExpectType AsyncResult<string | number, number>
pipe(
  _.of('a') as _.AsyncResult<string, string>,
  _.flatMapSyncResult(() => IOE.of(1) as IOE.SyncResult<number, number>)
)

//
// taskify
//

declare function apiForTaskify(path: string, callback: (err: Error | null | undefined, result?: string) => void): void

_.taskify(apiForTaskify) // $ExpectType (a: string) => AsyncResult<Error, string>

//
// do notation
//

// $ExpectType AsyncResult<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.of(1) as _.AsyncResult<string, number>,
  _.bindTo('a1'),
  _.bind('a2', () => _.of('b')),
  _.bind('a3', () => _.of(true) as _.AsyncResult<number, boolean>)
)

//
// pipeable sequence S
//

// $ExpectType AsyncResult<string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.of(1) as _.AsyncResult<string, number>,
  _.bindTo('a1'),
  _.bindRight('a2', _.of('b')),
  _.bindRight('a3', _.of(true) as _.AsyncResult<number, boolean>)
)

//
// Do
//

// $ExpectType AsyncResult<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of(1) as _.AsyncResult<string, number>),
  _.bind('a2', () => _.of('b') as _.AsyncResult<string, string>)
)
