import * as _ from '../../src/Apply'
import * as RTE from '../../src/ReaderTaskEither'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

// $ExpectType <FS, FR2, FO2, FE2, GS, GR2, GO2, GE2, A>(fa: ReaderTaskEither<FR2, FE2, ReaderTaskEither<GR2, GE2, A>>) => <FR1, FO1, FE1, GR1, GO1, GE1, B>(self: ReaderTaskEither<FR1, FE1, ReaderTaskEither<GR1, GE1, (a: A) => B>>) => ReaderTaskEither<FR1 & FR2, FE2 | FE1, ReaderTaskEither<GR1 & GR2, GE2 | GE1, B>>
_.getApComposition(RTE.Apply, RTE.Apply)
