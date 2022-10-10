import * as _ from '../../src/typeclasses/Semigroup'
import { pipe } from '../../src/Function'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// struct
//

// $ExpectType Semigroup<{ readonly a: string; readonly b: number; readonly c: boolean; }>
_.struct({ a: S.Semigroup, b: N.SemigroupSum, c: B.SemigroupAnd })

//
// tuple
//

// $ExpectType Semigroup<readonly [string, number, boolean]>
_.tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAnd)

//
// concatAll
//

// $ExpectType string
pipe(['a'], _.combineAll(S.Semigroup)(''))
