import * as _ from '../src/Applicative'
import * as E from '../src/Either'
import * as R from '../src/Reader'
import * as S from '../src/Semigroup'

//
// getApplicativeComposition
//

const applicativeValidation = E.getValidation(S.semigroupString)

_.getApplicativeComposition(R.reader, applicativeValidation).map // $ExpectType <FE, A, B>(fa: Reader<FE, Either<string, A>>, f: (a: A) => B) => Reader<FE, Either<string, B>>
