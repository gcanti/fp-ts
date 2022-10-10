import * as _ from '../../src/transformers/StateT'
import * as RTE from '../../src/ReaderAsyncResult'

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType <A, S, FS, R2, O2, E2, B>(f: (a: A) => (s: S) => ReaderAsyncResult<R2, E2, readonly [S, B]>) => <R1, O1, E1>(self: (s: S) => ReaderAsyncResult<R1, E1, readonly [S, A]>) => (s: S) => ReaderAsyncResult<R1 & R2, E2 | E1, readonly [S, B]>
_.flatMap(RTE.Flattenable)
