import * as _ from '../../src/Option'
import { pipe } from '../../src/pipeable'

//
// getOrElseW
//

// $ExpectType string | null
pipe(
  _.some('a'),
  _.getOrElseW(() => null)
)
