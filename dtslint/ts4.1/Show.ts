import * as _ from '../../src/Show'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// getTupleShow
//

// $ExpectType Show<[string, number, boolean]>
_.getTupleShow(S.Show, N.Show, B.Show)

//
// getStructShow
//

// $ExpectType Show<{ a: string; b: number; c: boolean; }>
_.getStructShow({ a: S.Show, b: N.Show, c: B.Show })
