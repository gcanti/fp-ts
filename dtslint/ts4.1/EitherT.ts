import * as _ from '../../src/EitherT'
import * as RTE from '../../src/ReaderTaskEither'
import * as E from '../../src/Either'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

const ap = _.ap(RTE.ApplyPar)

declare const fab: RTE.ReaderTaskEither<{ r1: 'r1' }, number, E.Either<string, (n: number) => boolean>>
declare const fa: RTE.ReaderTaskEither<{ r2: 'r2' }, boolean, E.Either<Error, number>>
// $ExpectType ReaderTaskEither<{ r1: "r1"; } & { r2: "r2"; }, number | boolean, Either<string | Error, boolean>>
ap(fa)(fab)
