import * as _ from '../../src/StateT'
import * as RTE from '../../src/ReaderTaskEither'

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType <A, FS, FR2, FW2, FE2, S, B>(f: (a: A) => StateT<ReaderTaskEitherF, FS, FR2, FW2, FE2, S, B>) => <FR1, FW1, FE1>(ma: StateT<ReaderTaskEitherF, FS, FR1, FW1, FE1, S, A>) => StateT<ReaderTaskEitherF, FS, FR1 & FR2, FW2 | FW1, FE2 | FE1, S, B>
_.flatMap(RTE.Flattenable)
