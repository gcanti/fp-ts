import * as _ from '../../src/ReaderIO'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderIO<{ r1: 'r1' }, (n: number) => boolean>
declare const fa: _.ReaderIO<{ r2: 'r2' }, number>
// $ExpectType ReaderIO<{ r1: "r1"; } & { r2: "r2"; }, boolean>
_.ap(fa)(fab)
