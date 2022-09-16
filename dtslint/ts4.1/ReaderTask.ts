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
// chain widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTask<unknown, number>
pipe(
  _.of('a'),
  _.chain(() => _.of(1))
)

// $ExpectType ReaderTask<{ b: number; }, number>
pipe(
  _.of('a'),
  _.chain(() => _.of<number, { b: number }>(1))
)

// $ExpectType ReaderTask<{ a: string; } & { b: number; }, number>
pipe(
  _.of<string, { a: string }>('a'),
  _.chain(() => _.of<number, { b: number }>(1))
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
// chainReaderIOKW
//

// $ExpectType ReaderTask<R1 & R2, boolean>
pipe(
  _.of<number, R1>(1),
  _.chainReaderIOKW(() => RIO.of<boolean, R2>(true))
)

//
// chainReaderIOK
//

// $ExpectType ReaderTask<R1, number>
pipe(
  _.of<number, R1>(1),
  _.chainReaderIOK(() => RIO.of(1))
)

pipe(
  _.of<number, R1>(1), // $ExpectError
  _.chainReaderIOK(() => RIO.of<boolean, R2>(true))
)

//
// chainFirstReaderIOKW
//

// $ExpectType ReaderTask<R1 & R2, number>
pipe(
  _.of<number, R1>(1),
  _.chainFirstReaderIOKW(() => RIO.of<boolean, R2>(true))
)

//
// chainFirstReaderIOK
//

// $ExpectType ReaderTask<R1, number>
pipe(
  _.of<number, R1>(1),
  _.chainFirstReaderIOK(() => RIO.of(true))
)

pipe(
  _.of<number, R1>(1), // $ExpectError
  _.chainFirstReaderIOK(() => RIO.of<boolean, R2>(true))
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
