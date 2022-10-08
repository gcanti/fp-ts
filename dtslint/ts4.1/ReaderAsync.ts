import * as _ from '../../src/ReaderAsync'
import { pipe } from '../../src/Function'
import * as RIO from '../../src/ReaderSync'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderAsync<{ r1: 'r1' }, (n: number) => boolean>
declare const fa: _.ReaderAsync<{ r2: 'r2' }, number>
// $ExpectType ReaderAsync<{ r1: "r1"; } & { r2: "r2"; }, boolean>
_.apPar(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderAsync<unknown, number>
pipe(
  _.of('a'),
  _.flatMap(() => _.of(1))
)

// $ExpectType ReaderAsync<{ b: number; }, number>
pipe(
  _.of('a'),
  _.flatMap(() => _.of(1) as _.ReaderAsync<{ b: number }, number>)
)

// $ExpectType ReaderAsync<{ a: string; } & { b: number; }, number>
pipe(
  _.of('a') as _.ReaderAsync<{ a: string }, string>,
  _.flatMap(() => _.of(1) as _.ReaderAsync<{ b: number }, number>)
)

//
// -------------------------------------------------------------------------------------
//

interface R1 {
  foo: string
}

interface R2 {
  bar: string
}

//
// fromReaderSync
//

// $ExpectType ReaderAsync<R1, boolean>
_.fromReaderSync(RIO.of(true) as RIO.ReaderSync<R1, boolean>)

//
// fromReaderSyncK
//

// $ExpectType (a: boolean) => ReaderAsync<R1, boolean>
_.liftReaderSync((a: boolean) => RIO.of(a) as RIO.ReaderSync<R1, boolean>)

//
// flatMapReaderSyncKW
//

// $ExpectType ReaderAsync<R1 & R2, boolean>
pipe(
  _.of(1) as _.ReaderAsync<R1, number>,
  _.flatMapReaderSync(() => RIO.of(true) as RIO.ReaderSync<R2, boolean>)
)

//
// flatMapReaderSyncK
//

// $ExpectType ReaderAsync<R1, number>
pipe(
  _.of(1) as _.ReaderAsync<R1, number>,
  _.flatMapReaderSync(() => RIO.of(1))
)

//
// Do
//

// $ExpectType ReaderAsync<unknown, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  // tslint:disable-next-line: no-unnecessary-type-assertion
  _.bind('a1', () => _.of(1) as _.ReaderAsync<unknown, number>),
  // tslint:disable-next-line: no-unnecessary-type-assertion
  _.bind('a2', () => _.of('b') as _.ReaderAsync<unknown, string>)
)
