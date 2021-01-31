import * as _ from '../../src/Eq'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// getTupleEq
//

// $ExpectType Eq<[string, number, boolean]>
_.getTupleEq(S.Eq, N.Eq, B.Eq)

//
// getStructEq
//

// $ExpectType Eq<{ a: string; b: number; c: boolean; }>
_.getStructEq({ a: S.Eq, b: N.Eq, c: B.Eq })
