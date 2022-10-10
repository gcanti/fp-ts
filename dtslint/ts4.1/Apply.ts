import * as _ from '../../src/typeclasses/Apply'
import * as RTE from '../../src/ReaderAsyncResult'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

// $ExpectType <FS, FR2, FO2, FE2, GS, GR2, GO2, GE2, A>(fa: ReaderAsyncResult<FR2, FE2, ReaderAsyncResult<GR2, GE2, A>>) => <FR1, FO1, FE1, GR1, GO1, GE1, B>(self: ReaderAsyncResult<FR1, FE1, ReaderAsyncResult<GR1, GE1, (a: A) => B>>) => ReaderAsyncResult<FR1 & FR2, FE2 | FE1, ReaderAsyncResult<GR1 & GR2, GE2 | GE1, B>>
_.apComposition(RTE.Apply, RTE.Apply)
