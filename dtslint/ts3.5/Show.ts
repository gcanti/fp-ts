import * as _ from '../../src/Show'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// tuple
//

// $ExpectType Show<readonly [string, number, boolean]>
_.tuple(S.Show, N.Show, B.Show)
