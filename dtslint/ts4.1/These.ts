import * as _ from '../../src/These'
import { bindTo_ } from '../../src/Functor'
import { semigroupString } from '../../src/Semigroup'

//
// bindTo
//

// $ExpectType <N extends string>(name: N) => <E, A>(fa: These<E, A>) => These<E, { [K in N]: A; }>
const bindTo = bindTo_(_.Functor)

const M = _.getMonad(semigroupString)

// $ExpectType <N extends string>(name: N) => <A>(fa: These<string, A>) => These<string, { [K in N]: A; }>
const bindTo2 = bindTo_<_.URI, string>(M)
