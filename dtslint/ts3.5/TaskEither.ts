import * as _ from '../../src/TaskEither'
import * as T from '../../src/Task'
import { pipe } from '../../src/pipeable'

//
// getOrElseW
//

// $ExpectType Task<string | null>
pipe(
  _.right('a'),
  _.getOrElseW(() => T.of(null))
)

//
// chainW
//

// $ExpectType TaskEither<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chainW(() => _.right<number, number>(1))
)
