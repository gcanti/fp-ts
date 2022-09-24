import * as _ from '../../src/Const'
import { pipe } from '../../src/function'

//
// contramap
//

// $ExpectType Const<true, string>
pipe(
  _.make(true),
  _.contramap((s: string) => s.length)
)
