import * as _ from '../../src/Flat'
import * as RTE from '../../src/ReaderTaskEither'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

// $ExpectType <S, R2, W2, E2, A>(fa: ReaderTaskEither<R2, E2, A>) => <R1, W1, E1, B>(fab: ReaderTaskEither<R1, E1, (a: A) => B>) => ReaderTaskEither<R1 & R2, E2 | E1, B>
_.ap(RTE.Flat)
