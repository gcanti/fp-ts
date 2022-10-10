import type { Reader } from '../../src/Reader'
import * as _ from '../../src/transformers/ReaderT'
import * as RTE from '../../src/ReaderAsyncResult'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

const ap = _.ap(RTE.Apply)

declare const fab: Reader<{ r1: 'r1' }, RTE.ReaderAsyncResult<{ r3: 'r3' }, number, (n: number) => boolean>>
declare const fa: Reader<{ r2: 'r2' }, RTE.ReaderAsyncResult<{ r4: 'r4' }, boolean, number>>
// $ExpectType Reader<{ r1: "r1"; } & { r2: "r2"; }, ReaderAsyncResult<{ r3: "r3"; } & { r4: "r4"; }, number | boolean, boolean>>
ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType <A, R2, S, FR2, O2, E2, B>(f: (a: A) => Reader<R2, ReaderAsyncResult<FR2, E2, B>>) => <R1, FR1, O1, E1>(ma: Reader<R1, ReaderAsyncResult<FR1, E1, A>>) => Reader<R1 & R2, ReaderAsyncResult<FR1 & FR2, E2 | E1, B>>
_.flatMap(RTE.Flattenable)

//
// -------------------------------------------------------------------------------------
//
