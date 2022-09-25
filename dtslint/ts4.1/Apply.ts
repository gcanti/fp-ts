import * as _ from '../../src/Apply'
import * as RTE from '../../src/ReaderTaskEither'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

// $ExpectType <λS, λR2, λO2, λE2, μS, μR2, μO2, μE2, A>(fa: ReaderTaskEither<λR2, λE2, ReaderTaskEither<μR2, μE2, A>>) => <λR1, λO1, λE1, μR1, μO1, μE1, B>(self: ReaderTaskEither<λR1, λE1, ReaderTaskEither<μR1, μE1, (a: A) => B>>) => ReaderTaskEither<λR1 & λR2, λE2 | λE1, ReaderTaskEither<μR1 & μR2, μE2 | μE1, B>>
_.getApComposition(RTE.ApplyPar, RTE.ApplyPar)
