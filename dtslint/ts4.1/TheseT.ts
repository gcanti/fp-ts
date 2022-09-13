import * as _ from '../../src/TheseT'
import * as RTE from '../../src/ReaderTaskEither'
import * as TH from '../../src/These'
import * as string from '../../src/string'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

const ap = _.ap(RTE.ApplyPar, string.Semigroup)

declare const fab: RTE.ReaderTaskEither<{ r1: 'r1' }, number, TH.These<string, (n: number) => boolean>>
declare const fa: RTE.ReaderTaskEither<{ r2: 'r2' }, boolean, TH.These<string, number>>
// $ExpectType ReaderTaskEither<{ r1: "r1"; } & { r2: "r2"; }, number | boolean, These<string, boolean>>
ap(fa)(fab)
