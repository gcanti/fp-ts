import * as _ from '../../src/Monoid'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// tuple
//

// $ExpectType Monoid<[string, number, boolean]>
_.tuple(S.Monoid, N.MonoidSum, B.MonoidAll)

//
// struct
//

// $ExpectType Monoid<{ a: string; b: number; c: boolean; }>
_.struct({ a: S.Monoid, b: N.MonoidSum, c: B.MonoidAll })
