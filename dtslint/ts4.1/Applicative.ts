import * as _ from '../../src/Applicative'
import * as E from '../../src/Either'
import * as S from '../../src/Semigroup'
import * as R from '../../src/Reader'

//
// getApplicativeComposition
//

const applicativeValidation = E.getApplicativeValidation(S.semigroupString)

_.getApplicativeComposition(R.Applicative, applicativeValidation).map // $ExpectType <FE, A, B>(fa: Reader<FE, Either<string, A>>, f: (a: A) => B) => Reader<FE, Either<string, B>>
