import * as _ from '../../src/Semigroup'
import { pipe } from '../../src/function'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// tuple
//

// $ExpectType Semigroup<[string, number, boolean]>
_.tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)

//
// struct
//

// $ExpectType Semigroup<{ a: string; b: number; c: boolean; }>
_.struct({ a: S.Semigroup, b: N.SemigroupSum, c: B.SemigroupAll })

//
// concatAll
//

// $ExpectType string
pipe(['a'], _.concatAll(S.Semigroup)(''))
