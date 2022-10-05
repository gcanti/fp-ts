import * as _ from '../../src/EitherT'
import * as RTE from '../../src/ReaderTaskEither'
import type * as E from '../../src/Result'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

const ap = _.ap(RTE.Apply)

declare const fab: RTE.ReaderTaskEither<{ r1: 'r1' }, number, E.Result<string, (n: number) => boolean>>
declare const fa: RTE.ReaderTaskEither<{ r2: 'r2' }, boolean, E.Result<Error, number>>
// $ExpectType ReaderTaskEither<{ r1: "r1"; } & { r2: "r2"; }, number | boolean, Result<string | Error, boolean>>
ap(fa)(fab)
