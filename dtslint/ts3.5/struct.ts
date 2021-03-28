import * as _ from '../../src/struct'
import * as N from '../../src/number'
import * as S from '../../src/string'

_.getShow({ key1: N.Show, key2: S.Show }) // $ExpectType Show<{ readonly key1: number; readonly key2: string; }>

_.getEq({ key1: N.Eq, key2: S.Eq }) // $ExpectType Eq<{ readonly key1: number; readonly key2: string; }>

_.getSemigroup({ key1: N.SemigroupSum, key2: S.Semigroup }) // $ExpectType Semigroup<{ readonly key1: number; readonly key2: string; }>

_.getMonoid({ key1: N.MonoidSum, key2: S.Monoid }) // $ExpectType Monoid<{ readonly key1: number; readonly key2: string; }>
