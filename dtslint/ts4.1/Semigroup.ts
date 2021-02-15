import * as _ from '../../src/Semigroup'
import { pipe } from '../../src/function'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// struct
//

// $ExpectType Semigroup<{ readonly a: string; readonly b: number; readonly c: boolean; }>
_.struct({ a: S.Semigroup, b: N.SemigroupSum, c: B.SemigroupAll })

//
// tuple
//

// $ExpectType Semigroup<readonly [string, number, boolean]>
_.tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)

//
// concatAll
//

// $ExpectType string
pipe(['a'], _.concatAll(S.Semigroup)(''))
