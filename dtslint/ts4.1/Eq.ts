import * as _ from '../../src/Eq'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// tuple
//

// $ExpectType Eq<[string, number, boolean]>
_.tuple(S.Eq, N.Eq, B.Eq)

//
// struct
//

// $ExpectType Eq<{ a: string; b: number; c: boolean; }>
_.struct({ a: S.Eq, b: N.Eq, c: B.Eq })
