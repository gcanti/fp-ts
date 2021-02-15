import * as _ from '../../src/Show'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// struct
//

// $ExpectType Show<{ readonly a: string; readonly b: number; readonly c: boolean; }>
_.struct({ a: S.Show, b: N.Show, c: B.Show })

//
// tuple
//

// $ExpectType Show<readonly [string, number, boolean]>
_.tuple(S.Show, N.Show, B.Show)
