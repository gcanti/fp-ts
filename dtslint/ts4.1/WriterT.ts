import * as _ from '../../src/transformers/WriterT'
import * as RTE from '../../src/ReaderAsyncResult'
import type { Writer } from '../../src/Writer'
import * as string from '../../src/string'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

const ap = _.ap(RTE.Apply, string.Semigroup)

declare const fab: RTE.ReaderAsyncResult<{ r1: 'r1' }, number, Writer<string, (n: number) => boolean>>
declare const fa: RTE.ReaderAsyncResult<{ r2: 'r2' }, boolean, Writer<string, number>>
// $ExpectType ReaderAsyncResult<{ r1: "r1"; } & { r2: "r2"; }, number | boolean, Writer<string, boolean>>
ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType <A, S, R1, FO1, E1, B>(f: (a: A) => ReaderAsyncResult<R1, E1, Writer<string, B>>) => <R2, FO2, E2>(self: ReaderAsyncResult<R2, E2, Writer<string, A>>) => ReaderAsyncResult<R1 & R2, E1 | E2, Writer<string, B>>
_.flatMap(RTE.Flattenable, string.Semigroup)
