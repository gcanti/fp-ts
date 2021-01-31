import * as _ from '../../src/Semigroup'
import { pipe } from '../../src/function'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// getTupleSemigroup
//

// $ExpectType Semigroup<[string, number, boolean]>
_.getTupleSemigroup(S.Semigroup, N.SemigroupSum, B.SemigroupAll)

//
// getStructSemigroup
//

// $ExpectType Semigroup<{ a: string; b: number; c: boolean; }>
_.getStructSemigroup({ a: S.Semigroup, b: N.SemigroupSum, c: B.SemigroupAll })

//
// fold
//

// $ExpectType string
pipe(['a'], _.fold(S.Semigroup)(''))
