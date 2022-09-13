import * as _ from '../../src/OptionT'
import * as RTE from '../../src/ReaderTaskEither'
import * as O from '../../src/Option'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

const ap = _.ap(RTE.ApplyPar)

declare const fab: RTE.ReaderTaskEither<{ r1: 'r1' }, number, O.Option<(n: number) => boolean>>
declare const fa: RTE.ReaderTaskEither<{ r2: 'r2' }, boolean, O.Option<number>>
// $ExpectType ReaderTaskEither<{ r1: "r1"; } & { r2: "r2"; }, number | boolean, Option<boolean>>
ap(fa)(fab)
