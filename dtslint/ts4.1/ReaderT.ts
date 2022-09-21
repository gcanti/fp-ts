import type { Reader } from '../../src/Reader'
import * as _ from '../../src/ReaderT'
import * as RTE from '../../src/ReaderTaskEither'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

const ap = _.ap(RTE.ApplyPar)

declare const fab: Reader<{ r1: 'r1' }, RTE.ReaderTaskEither<{ r3: 'r3' }, number, (n: number) => boolean>>
declare const fa: Reader<{ r2: 'r2' }, RTE.ReaderTaskEither<{ r4: 'r4' }, boolean, number>>
// $ExpectType Reader<{ r1: "r1"; } & { r2: "r2"; }, ReaderTaskEither<{ r3: "r3"; } & { r4: "r4"; }, number | boolean, boolean>>
ap(fa)(fab)

// -------------------------------------------------------------------------------------
// chain widening
// -------------------------------------------------------------------------------------

// $ExpectType <A, R2, S, FR2, W2, E2, B>(f: (a: A) => Reader<R2, ReaderTaskEither<FR2, E2, B>>) => <R1, FR1, W1, E1>(ma: Reader<R1, ReaderTaskEither<FR1, E1, A>>) => Reader<R1 & R2, ReaderTaskEither<FR1 & FR2, E2 | E1, B>>
_.chain(RTE.Chain)

//
// -------------------------------------------------------------------------------------
//
