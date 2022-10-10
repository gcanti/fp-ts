import * as _ from '../../src/transformers/TheseT'
import * as RTE from '../../src/ReaderAsyncResult'
import type { These } from '../../src/These'
import * as string from '../../src/string'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

const ap = _.ap(RTE.Apply, string.Semigroup)

declare const fab: RTE.ReaderAsyncResult<{ r1: 'r1' }, number, These<string, (n: number) => boolean>>
declare const fa: RTE.ReaderAsyncResult<{ r2: 'r2' }, boolean, These<string, number>>
// $ExpectType ReaderAsyncResult<{ r1: "r1"; } & { r2: "r2"; }, number | boolean, These<string, boolean>>
ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType <A, S, R2, O2, FE2, B>(f: (a: A) => ReaderAsyncResult<R2, FE2, These<string, B>>) => <R1, O1, FE1>(self: ReaderAsyncResult<R1, FE1, These<string, A>>) => ReaderAsyncResult<R1 & R2, FE2 | FE1, These<string, B>>
_.flatMap(RTE.Monad, string.Semigroup)
