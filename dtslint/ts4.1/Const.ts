import * as _ from '../../src/Const'
import { pipe } from '../../src/function'

//
// contramap
//

// $ExpectType Const<boolean, string>
pipe(
  _.make<boolean>(true),
  _.contramap((s: string) => s.length)
)
