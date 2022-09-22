import * as _ from '../../src/ReaderTask'
import { pipe } from '../../src/function'
import * as RIO from '../../src/ReaderIO'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderTask<{ r1: 'r1' }, (n: number) => boolean>
declare const fa: _.ReaderTask<{ r2: 'r2' }, number>
// $ExpectType ReaderTask<{ r1: "r1"; } & { r2: "r2"; }, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTask<unknown, number>
pipe(
  _.of('a'),
  _.flatMap(() => _.of(1))
)

// $ExpectType ReaderTask<{ b: number; }, number>
pipe(
  _.of('a'),
  _.flatMap(() => _.of<number, { b: number }>(1))
)

// $ExpectType ReaderTask<{ a: string; } & { b: number; }, number>
pipe(
  _.of<string, { a: string }>('a'),
  _.flatMap(() => _.of<number, { b: number }>(1))
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
_.fromReaderIO(RIO.of<boolean, R1>(true))

//
// fromReaderIOK
//

// $ExpectType (a: boolean) => ReaderTask<R1, boolean>
_.fromReaderIOK((a: boolean) => RIO.of<boolean, R1>(a))

//
// flatMapReaderIOKW
//

// $ExpectType ReaderTask<R1 & R2, boolean>
pipe(
  _.of<number, R1>(1),
  _.flatMapReaderIOKW(() => RIO.of<boolean, R2>(true))
)

//
// flatMapReaderIOK
//

// $ExpectType ReaderTask<R1, number>
pipe(
  _.of<number, R1>(1),
  _.flatMapReaderIOK(() => RIO.of(1))
)

pipe(
  _.of<number, R1>(1), // $ExpectError
  _.flatMapReaderIOK(() => RIO.of<boolean, R2>(true))
)

//
// tapReaderIOK
//

// $ExpectType ReaderTask<R1 & R2, number>
pipe(
  _.of<number, R1>(1),
  _.tapReaderIO(() => RIO.of<boolean, R2>(true))
)

//
// Do
//

// $ExpectType ReaderTask<unknown, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of<number, unknown>(1)),
  _.bind('a2', () => _.of<string, unknown>('b'))
)
