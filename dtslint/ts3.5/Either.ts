import * as _ from '../../src/Either'
import { pipe } from '../../src/pipeable'

//
// getOrElseW
//

// $ExpectType string | null
pipe(
  _.right('a'),
  _.getOrElseW(() => null)
)

//
// chainW
//

// $ExpectType Either<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chainW(() => _.right<number, number>(1))
)
