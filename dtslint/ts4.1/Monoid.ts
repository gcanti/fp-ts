import * as _ from '../../src/Monoid'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// getTupleMonoid
//

// $ExpectType Monoid<[string, number, boolean]>
_.getTupleMonoid(S.Monoid, N.MonoidSum, B.MonoidAll)

//
// getStructMonoid
//

// $ExpectType Monoid<{ a: string; b: number; c: boolean; }>
_.getStructMonoid({ a: S.Monoid, b: N.MonoidSum, c: B.MonoidAll })
