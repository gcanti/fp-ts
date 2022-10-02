import * as _ from '../../src/StateT'
import * as RTE from '../../src/ReaderTaskEither'

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType <A, S, FS, R2, O2, E2, B>(f: (a: A) => StateT<ReaderTaskEitherTypeLambda, S, FS, R2, O2, E2, B>) => <R1, O1, E1>(self: StateT<ReaderTaskEitherTypeLambda, S, FS, R1, O1, E1, A>) => StateT<ReaderTaskEitherTypeLambda, S, FS, R1 & R2, O2 | O1, E2 | E1, B>
_.flatMap(RTE.Flattenable)
