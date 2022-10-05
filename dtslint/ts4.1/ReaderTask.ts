import * as _ from '../../src/ReaderTask'
import { pipe } from '../../src/Function'
import * as RIO from '../../src/ReaderIO'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderTask<{ r1: 'r1' }, (n: number) => boolean>
declare const fa: _.ReaderTask<{ r2: 'r2' }, number>
// $ExpectType ReaderTask<{ r1: "r1"; } & { r2: "r2"; }, boolean>
_.apPar(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTask<unknown, number>
pipe(
  _.succeed('a'),
  _.flatMap(() => _.succeed(1))
)

// $ExpectType ReaderTask<{ b: number; }, number>
pipe(
  _.succeed('a'),
  _.flatMap(() => _.succeed(1) as _.ReaderTask<{ b: number }, number>)
)

// $ExpectType ReaderTask<{ a: string; } & { b: number; }, number>
pipe(
  _.succeed('a') as _.ReaderTask<{ a: string }, string>,
  _.flatMap(() => _.succeed(1) as _.ReaderTask<{ b: number }, number>)
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
// fromReaderIO
//

// $ExpectType ReaderTask<R1, boolean>
_.fromReaderIO(RIO.succeed(true) as RIO.ReaderIO<R1, boolean>)

//
// fromReaderIOK
//

// $ExpectType (a: boolean) => ReaderTask<R1, boolean>
_.liftReaderIO((a: boolean) => RIO.succeed(a) as RIO.ReaderIO<R1, boolean>)

//
// flatMapReaderIOKW
//

// $ExpectType ReaderTask<R1 & R2, boolean>
pipe(
  _.succeed(1) as _.ReaderTask<R1, number>,
  _.flatMapReaderIO(() => RIO.succeed(true) as RIO.ReaderIO<R2, boolean>)
)

//
// flatMapReaderIOK
//

// $ExpectType ReaderTask<R1, number>
pipe(
  _.succeed(1) as _.ReaderTask<R1, number>,
  _.flatMapReaderIO(() => RIO.succeed(1))
)

//
// Do
//

// $ExpectType ReaderTask<unknown, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  // tslint:disable-next-line: no-unnecessary-type-assertion
  _.bind('a1', () => _.succeed(1) as _.ReaderTask<unknown, number>),
  // tslint:disable-next-line: no-unnecessary-type-assertion
  _.bind('a2', () => _.succeed('b') as _.ReaderTask<unknown, string>)
)
