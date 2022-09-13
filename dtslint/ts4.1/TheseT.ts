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

// -------------------------------------------------------------------------------------
// chain widening
// -------------------------------------------------------------------------------------

// $ExpectType <A, S, R2, W2, FE2, B>(f: (a: A) => ReaderTaskEither<R2, FE2, These<string, B>>) => <R1, W1, FE1>(ma: ReaderTaskEither<R1, FE1, These<string, A>>) => ReaderTaskEither<R1 & R2, FE2 | FE1, These<string, B>>
_.chain(RTE.Monad, string.Semigroup)
