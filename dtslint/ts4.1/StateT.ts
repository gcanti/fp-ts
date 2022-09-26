import * as _ from '../../src/StateT'
import * as RTE from '../../src/ReaderTaskEither'

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType <A, FS, R2, O2, E2, S, B>(f: (a: A) => StateT<ReaderTaskEitherTypeLambda, FS, R2, O2, E2, S, B>) => <R1, O1, E1>(ma: StateT<ReaderTaskEitherTypeLambda, FS, R1, O1, E1, S, A>) => StateT<ReaderTaskEitherTypeLambda, FS, R1 & R2, O2 | O1, E2 | E1, S, B>
_.flatMap(RTE.Flattenable)
