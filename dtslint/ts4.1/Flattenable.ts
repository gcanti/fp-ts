import * as _ from '../../src/typeclasses/Flattenable'
import * as RTE from '../../src/ReaderAsyncResult'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

// $ExpectType <S, R2, O2, E2, A>(fa: ReaderAsyncResult<R2, E2, A>) => <R1, O1, E1, B>(self: ReaderAsyncResult<R1, E1, (a: A) => B>) => ReaderAsyncResult<R1 & R2, E2 | E1, B>
_.ap(RTE.Flattenable)
