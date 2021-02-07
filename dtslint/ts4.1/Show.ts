import * as _ from '../../src/Show'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// tuple
//

// $ExpectType Show<[string, number, boolean]>
_.tuple(S.Show, N.Show, B.Show)

//
// struct
//

// $ExpectType Show<{ a: string; b: number; c: boolean; }>
_.struct({ a: S.Show, b: N.Show, c: B.Show })
