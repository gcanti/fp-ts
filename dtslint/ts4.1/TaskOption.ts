import * as _ from '../../src/TaskOption'
import * as T from '../../src/Task'
import * as E from '../../src/Either'
import * as IOE from '../../src/IOEither'
import { pipe } from '../../src/function'

//
// getOrElseW
//

// $ExpectType Task<string | null>
pipe(
  _.some('a'),
  _.getOrElseW(() => null)
)

//
// getOrElseEW
//

// $ExpectType Task<string | null>
pipe(
  _.some('a'),
  _.getOrElseEW(() => T.of(null))
)

//
// matchW
//

// $ExpectType Task<number | boolean>
pipe(
  _.some('a'),
  _.matchW(
    () => 1,
    () => true
  )
)

//
// matchEW
//

// $ExpectType Task<number | boolean>
pipe(
  _.some('a'),
  _.matchEW(
    () => T.of(1),
    () => T.of(true)
  )
)
