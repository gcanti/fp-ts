import * as _ from '../../src/typeclasses/Monoid'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// struct
//

// $ExpectType Monoid<{ readonly a: string; readonly b: number; readonly c: boolean; }>
_.struct({ a: S.Monoid, b: N.MonoidSum, c: B.MonoidAnd })

//
// tuple
//

// $ExpectType Monoid<readonly [string, number, boolean]>
_.tuple(S.Monoid, N.MonoidSum, B.MonoidAnd)
