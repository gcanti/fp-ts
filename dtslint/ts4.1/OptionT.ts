import * as _ from '../../src/OptionT'
import * as RTE from '../../src/ReaderTaskEither'
import type { Option } from '../../src/Option'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

const ap = _.ap(RTE.Apply)

declare const fab: RTE.ReaderTaskEither<{ r1: 'r1' }, number, Option<(n: number) => boolean>>
declare const fa: RTE.ReaderTaskEither<{ r2: 'r2' }, boolean, Option<number>>
// $ExpectType ReaderTaskEither<{ r1: "r1"; } & { r2: "r2"; }, number | boolean, Option<boolean>>
ap(fa)(fab)
